# Research v2 — Apple light theme, competitor comparison, and section proposal

Response to review points 12, 13 and 14. Read before the v4 mockup.

**Method:** fetched and inspected live HTML + linked CSS. Apple's numbers below are read from their served stylesheets, not estimated.

---

## Part 1 — apple.com, measured (point 12)

The whole system is smaller than it looks. It reduces to five rules:

| | Value |
|---|---|
| **Surfaces** | Exactly two: `#FFFFFF` and `#F5F5F7`. Nothing else. |
| **Text color** | One: `#1D1D1F`. Headlines and body are the *same* colour — hierarchy is size and weight, never colour. Secondary `#6E6E73`. |
| **Weights** | Exactly two: **600** for every headline tier, **400** for body, captions and *all button labels*. No 700 anywhere. |
| **Type ladder** | Fixed px steps: `80 · 64 · 56 · 48 · 40 · 32 · 28 · 24 · 21 · 19 · 17 · 14 · 12`. Responsive = stepping down the same ladder. Body is 17px. |
| **Section separation** | **No borders at all.** Background swap + `144px` top / `216px` bottom padding. At mobile it only drops to `112px`. |

Two details worth copying exactly:

- **Tracking flips sign with size.** `-0.015em` at 80px, `0em` at 40px, `+0.009em` at 24px. Large type tightens, small type opens. Most people apply one value everywhere and it's why their type looks amateur next to Apple's.
- **The hero cluster is tight, the space around it is huge.** Eyebrow → headline → tagline are locked at `8px` gaps; the generosity is all *outside* the group. Hero block padding is only `64px` — less than a content section's `144px` — because the group reads as one object.

Buttons: pill (`border-radius: 980px`), `9px/16px` padding, label at **14px weight 400**. Never bold. Their neutral variant is `#1D1D1F` fill with white text — which is our CTA, since we're monochrome.

**Applied to v4:** two surfaces (`#FFFFFF` / `#F5F5F7`), one ink (`#1D1D1F`), weights 600/400 only, borders removed in favour of background swaps and large padding, size-dependent tracking, pill CTAs at 400 weight.

---

## Part 2 — competitor comparison (4 companies)

I picked **Palantir, Toptal, Turing and sixonefourlabs** — the two poles of our positioning (forward-deployed ownership) and the two poles of our model (vetted talent supply).

### How the talent companies prove quality

**Toptal — a number at the door.** `Hire the Top 3% of the World's Talent™` is the H1, trademarked. The homepage carries only the claim plus two sentences: *"Every applicant to the Toptal network is rigorously tested and vetted. Our highly selective process leads to a 98% trial-to-hire success rate."* The evidence sits on a separate page, `/top-3-percent`, with five named stages and published pass rates — **26.4% → 7.4% → 3.6% → 3.2% → 3%**. The decimals are the point: they read as measured, not rounded.

**Turing — a trial at the exit.** No acceptance rate appears anywhere on their page. Instead: *"the largest AI-vetted talent network"*, `20,000 ML data signals`, `5+ hours of tests and interviews` — and risk reversal repeated four separate times (`3-week free trial available.`, `Your first vetted, on-demand technical professional is on us.`, `Ready to start your 2-week trial?`).

**The structural insight: Toptal de-risks by exclusion, Turing de-risks by refund.** Both work. We currently do neither.

### How the forward-deployed companies frame ownership

**Palantir never says "forward-deployed engineer" on its homepage.** Its ownership language is about the platform: `Day 1 Value`, *"Days, not years."*, *"Move past demos, get hands-on-keyboard, and push to production."* The FDE language lives in job postings — *"own the end-to-end execution and implementation of high-stakes projects"*.

**sixonefourlabs puts it in the H1** and names the market shift: *"The role this shift is creating — Forward-Deployed Engineering — is the career this program prepares you for."* On its client page it names our exact problem out loud:

> *"Vietnam is one of the fastest-growing technical talent markets in the world — yet quality is hard to verify from the outside."*
> *"We close that gap: deep local expertise, university pipelines, a technical council that vets talent, and a training program that manufactures the best AI-native engineers."*

That is the sentence our entire homepage has to answer.

### What to borrow vs avoid

| Borrow | Avoid |
|---|---|
| Toptal's staged funnel with published rates — claim on homepage, evidence on its own page | Turing's `Sam Altman / Jeff Dean / Adam D'Angelo` display — those people don't work there. Borrowed fame reads as desperate |
| Turing's risk reversal stated as a number | Palantir's compliance flex — we hold no certifications, and claiming FedRAMP has legal exposure |
| sixonefour's named mentors with checkable credentials (`Ex-NVIDIA Director`, `Ex-Google & McKinsey`) | Toptal's 14-section homepage — far too long for us |
| sixonefour naming the offshore-quality objection directly instead of dodging it | Palantir's analyst-ranking block — we have no analyst coverage |

---

## Part 3 — recommended sections (point 13)

My answer to your three questions:

**The #1 question a US/EU/SG/JP client asks:** *"How do I know your engineers are actually good, when I can't verify it from here?"* Our page does not currently answer it. Everything below is ordered by how directly it does.

### Recommended — build these

**1. Selection bar / how we vet.** *The single highest-leverage section we're missing.* It's the objection, stated by our own benchmark. Toptal makes it their H1; Turing substitutes process volume when they lack a number. Claim on the homepage, evidence on a `/how-we-select` page. **Needs from Ops: applications received, how many pass, the actual stages.** If we don't have a number, we use Turing's pattern — name the process, count the hours.

**2. Risk reversal — a trial with a number on it.** Turing repeats theirs four times because it works. For a buyer who can't easily visit, can't easily sue and can't verify credentials, a bounded trial removes more friction than any copy. We already have "paid trial sprint" in the process content; it should be promoted to a headline promise. **Needs a leadership decision on what we'll actually commit to.**

**3. Engagement models.** The clearest gap in the whole competitive set — Toptal and Palantir have *nothing*. sixonefour's `/commercial` names four models in one sentence each. The second question after "are they good?" is "how do I contract this, and how do I get out?" Naming the models answers it without publishing rates.

**4. FAQ.** Only Turing's client page has one, and it earns its place: it absorbs IP ownership, timezone, contract terms and pricing — the objections that otherwise silently block a "book a call". Cheap to build, high yield, and the natural home for the questions we can't fit elsewhere.

### Recommended against — for now

**Testimonials.** Three of four competitors have them and they'd help. But we have zero client permissions. Inventing them is what the current site already does (fake quotes attributed to Zuckerberg, Hassabis, Karpathy, Friedman — still in `lib/data.ts`). No section until we have two real ones.

**Tech stack.** Worth adding, but only once Engineering gives me the real list. An aspirational stack list gets tested on the first call.

**Third-party validation.** Palantir and Toptal both lead with it. We have no analyst coverage or review-site presence. Worth *starting* — a G2 or Clutch profile is a quarter's work, not a design task.

---

## Part 4 — "A Career, Redefined" (point 11): a caution

I've built it, but the evidence says be careful, and you asked for judgment rather than execution.

**None of the four companies mixes audiences on one page.** Palantir's homepage is 100% client; careers is a separate route. **Toptal is the strongest case: the words "freelancer", "apply" and "join" appear nowhere on their homepage** — not in nav, not in footer. Turing splits by route (`/talent` vs `/hire-developers`). sixonefourlabs is the inverse of Toptal — its homepage is *entirely* talent-facing and clients are exiled to `/commercial`.

The one genuine dual-audience page in the set is Toptal's `/top-3-percent`, and it works for a specific reason: **a candidate asking "can I get in?" and a client asking "how rigorous is this?" want identical content for opposite reasons.**

**So my recommendation:** keep the section, but write it as *proof of our talent bar*, not as recruiting. "Here is how we select and train the engineers you'll be assigned" serves the client's evaluation directly and attracts engineers as a side effect. A "we're hiring" block does the opposite — it spends client attention on a non-client action.

That's how I've built it in v4: the section is titled "A career, redefined" as you asked, but every line is written to be read by a client as quality assurance. The full recruiting content belongs on `/careers`.

**Flagging the tension rather than silently resolving it** — if the intent is genuinely to recruit engineers from the homepage, that's a different page architecture and worth deciding deliberately.

---

## Part 5 — Events: my recommendation (point 14)

**Standalone `/events` page, linked in the nav. No homepage section yet.**

Evidence: **zero of the four put events on the homepage.** Toptal's `/events` isn't even linked from their footer — it's talent-retention infrastructure, deliberately firewalled off the client funnel. sixonefourlabs links `/events` in the main nav and nowhere else.

A homepage teaser costs client attention for a candidate-facing action, and — more practically — **we have no real events yet.** An empty or stubbed section on the homepage is worse than no section. Once we've run three or four, a teaser earns its place.

**Event entry fields**, taken from sixonefourlabs' schema, which is the best in the set:

| Field | Example |
|---|---|
| Status badge | `Upcoming` / `Ended` — drives the CTA |
| Date | `Fri, 17 Jul 2026` |
| Title | `AI-Native Engineering Showcase` |
| Time | `5:00 PM` |
| Where | `Shared on registration` |
| CTA | `Register →` (upcoming) / `View recap →` (past) |

Two details worth copying: the status badge drives which CTA appears, and venue is deliberately withheld until registration. They outsource registration to Luma rather than building it — we should too.

Built as `mockup-v4-events.html` with placeholder entries, all clearly flagged. **Real event data needed before this ships.**

---

## Part 6 — two implementation corrections (points 8 and 9)

**Point 8, the logo:** `public/rockship.svg` exists, but **all nine of its paths are hardcoded `fill="white"`.** On the new white background it renders invisible. It must be inlined with `fill="currentColor"` so it inherits text colour and works in both themes. Done in v4; the same fix is needed in the real `Navbar` and `Footer` components.

**Point 9, the modal:** the reference you gave — `src/components/FormModal` and `/api/sendEmail` — **does not exist in this repo.** There's no `FormModal` component (only `components/admin/TagFormModal.tsx`, unrelated) and no `sendEmail` route. What exists is `app/api/contact/route.ts`, which sends via Resend and takes `firstName`, `lastName`, `email`, `message`.

So the modal should POST to the existing `/api/contact`, not a new endpoint. Two things to fix in that route while we're there:

1. It reads the API key from `NEXT_PUBLIC_RESEND_API_KEY` — the `NEXT_PUBLIC_` prefix ships the secret to the browser. Rename to `RESEND_API_KEY` and rotate.
2. The sender is `onboarding@resend.dev`, Resend's unverified sandbox address. Mail from it lands in spam. Needs a verified `rockship.co` sender before launch.

---

## Sources

apple.com · apple.com/macbook-pro · palantir.com · Palantir FDSE job posting · toptal.com · toptal.com/top-3-percent · toptal.com/events · turing.com · turing.com/hire-developers · sixonefourlabs.com · sixonefourlabs.com/commercial · sixonefourlabs.com/events

*Retrieval note: toptal.com blocks automated fetching (403); its content came via a rendering proxy. turing.com's root served a talent-facing page with a canonical of `/talent` and signs of geo/segment personalisation — a US visitor may see something different, so I inventoried both that and `/hire-developers`.*
