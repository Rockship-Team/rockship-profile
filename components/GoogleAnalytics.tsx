"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

/**
 * GA4, wired for three things the previous hand-rolled version got wrong:
 * the ID is configurable, admin routes are excluded, and client-side
 * navigations are counted.
 *
 * The measurement ID is read at module scope because Next inlines
 * NEXT_PUBLIC_* at build time — it is not readable from a runtime env file.
 */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Routes that must never reach analytics. Our own CMS sessions are not traffic. */
function isExcluded(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Hooks run unconditionally; the *render* is what gets gated. Returning
  // early before the hooks would break the rules of hooks on navigation
  // between an excluded and an included route.
  const enabled = Boolean(GA_MEASUREMENT_ID) && !isExcluded(pathname);

  // gtag('config') fires its own page_view for whichever route the browser
  // loaded. Sending ours as well would double-count that first view, so the
  // first enabled path is recorded and skipped.
  const initialPathTracked = useRef(false);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    if (!initialPathTracked.current) {
      initialPathTracked.current = true;
      lastTrackedPath.current = pathname;
      return;
    }

    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    trackPageView(pathname);
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      {/*
        Consent Mode v2. This must execute before gtag.js loads and before the
        gtag('config') call, so the first hit is sent under these defaults.
        beforeInteractive puts it in the document head, ahead of the
        afterInteractive scripts that <GoogleAnalytics /> injects.

        analytics_storage is 'granted': GA writes its _ga cookie and performs
        full, standard measurement — real (not modelled) sessions and users,
        visible in Realtime immediately. Ad storage stays denied because we do
        not run ads; this is analytics only.

        Because this sets an analytics cookie, GDPR/ePrivacy jurisdictions expect
        a cookie notice. To gate it, flip analytics_storage back to 'denied' here
        and call gtag('consent','update',{analytics_storage:'granted'}) when the
        visitor accepts. Nothing else needs to change.
      */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'granted',
            'functionality_storage': 'granted',
            'personalization_storage': 'denied',
            'security_storage': 'granted'
          });
        `}
      </Script>

      <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID!} />
    </>
  );
}
