import { sendGAEvent } from "@next/third-parties/google";

/**
 * Typed wrappers around GA4 events.
 *
 * Everything goes through `sendGAEvent` rather than `window.gtag` so the
 * dataLayer name stays in sync with the <GoogleAnalytics /> component and the
 * call signatures are checked at compile time.
 *
 * `sendGAEvent` is a no-op (with a console warning) when GA was never
 * initialised, so calling these on a page where analytics is disabled — admin
 * routes, or any environment without NEXT_PUBLIC_GA_MEASUREMENT_ID — is safe
 * and does not need guarding at the call site.
 */

/** GA4 reserved name. Sent manually because we disable automatic SPA tracking. */
export function trackPageView(path: string) {
  sendGAEvent("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Which form: the modal on the homepage, or the standalone /contact page. */
type ContactSource = "book_call_modal" | "contact_page";

export function trackContactSubmit(source: ContactSource) {
  sendGAEvent("event", "contact_submit", { form_source: source });
}

/**
 * Failures are tracked separately and deliberately. /api/contact returns 503
 * when RESEND_API_KEY is unconfigured, which is invisible to us otherwise —
 * a drop in contact_submit looks identical to a drop in interest.
 */
export function trackContactError(source: ContactSource, reason: string) {
  sendGAEvent("event", "contact_error", { form_source: source, reason });
}

/** A call-to-action that sends someone into the contact flow. */
export function trackContactCtaClick(location: string) {
  sendGAEvent("event", "contact_cta_click", { cta_location: location });
}

/** Blog post -> case study. Answers which writing actually drives interest. */
export function trackBlogToCaseStudy(fromSlug: string, toHref: string) {
  sendGAEvent("event", "blog_to_case_study", {
    from_slug: fromSlug,
    to_href: toHref,
  });
}
