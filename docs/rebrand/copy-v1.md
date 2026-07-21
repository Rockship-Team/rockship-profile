# Rockship — Homepage Copy v1

**Status:** For review. Nothing here is built yet.
**Branch:** `feature/rebrand-international`
**Reviewer:** please redline directly in this file or in PR comments.

`TK` marks a fact I do not have and cannot invent. Every `TK` must be resolved or the line gets cut before launch.

---

## 0. Two findings that change the brief

**a) The site is already entirely in English.** The requirement "no bilingual content on the main page" is already satisfied — the only Vietnamese in the repo is developer comments in the source, which users never see. The real problem isn't language, it's *register*: the current copy is written in enterprise-vendor abstraction ("operational bottlenecks", "cognitive infrastructure") that reads as generic to a US or Singapore buyer. That's what this rewrite fixes.

**b) The current positioning and the new brief are different businesses.** The site today sells *enterprise AI automation consulting*. The brief asks for *high-quality engineering talent — staff augmentation and dedicated teams*. Those speak to different buyers with different objections. I've written toward the brief, using the existing AI projects as proof of delivery capability. **This needs an explicit yes before design proceeds** — it's a strategy decision, not a copy decision.

---

## 1. Positioning statement

*Internal, not for the page. Everything below is derived from this.*

> Rockship supplies senior product engineers to companies in the US, Singapore and Europe that need to ship faster than they can hire. We are not a body shop billing hours against a spec — we take ownership of outcomes, ship into production, and stay for the operating phase.

**Who we're talking to:** a founder or engineering leader at a funded startup or mid-market company, 10–200 people, with a roadmap and a hiring problem.

**The objection we must answer above the fold:** *"Offshore agencies burned me before."* Every section below is arranged to answer that.

---

## 2. Headline options

Ranked. My recommendation is A.

### A. `Senior engineers who ship outcomes, not tickets.` ← recommended
Sub: *Rockship embeds vetted senior engineers and full product teams with companies in the US, Singapore and Europe. We take ownership from architecture to production — not from ticket to pull request.*

Closest to the sixonefourlabs register: engineer-to-engineer, no adjectives doing the work. "Not tickets" names the exact failure mode of the agencies our buyer has already been burned by, which makes it a differentiator rather than a boast. Sets up the case studies as evidence.

### B. `The engineering team you'd have built, if you had six months.`
Sub: *Senior product engineers, embedded with your team in weeks — not the two quarters it takes to hire them yourself.*

Leads with the buyer's real constraint: time-to-hire. Strongest for a founder audience. Slightly long to set at hero scale, and marginally softer on quality.

### C. `Product engineers, embedded in your team, shipping in week one.`
Sub: *We place senior engineers who join your standups, your repo and your on-call — and own what they build.*

The most concrete about *what we actually sell*. Zero ambiguity, which matters when a visitor has five seconds. Least memorable of the five.

### D. `We don't sell hours. We ship systems that run in production.`
Sub: *Senior engineering teams for companies building internationally — accountable for outcomes, not timesheets.*

Sharpest attack on the category. Risk: opening on a negative can read as defensive, and it implicitly criticises how the buyer may currently be working.

### E. `Curated engineering teams out of Ho Chi Minh City. Shipping worldwide.`
Sub: *Vetted senior engineers, working in your timezone, for companies in the US, Singapore and Europe.*

Leads with geography — states the thing a buyer will discover anyway, on our terms. Only choose this if leadership is confident the location is an asset to open with rather than an objection to answer later. **This is a positioning call, worth a deliberate decision.**

---

## 3. Services

Replaces the current "Operational Challenges" + "How It Works" sections. Three offers, ordered by commitment.

> **Section heading:** Three ways to work with us
> **Section intro:** Every engagement is staffed with senior engineers who have shipped production systems before. No junior bench, and no account-manager layer between you and the people writing the code.

### 3.1 Embedded engineers
*For teams with a roadmap and no capacity*

One to five senior engineers who join your standups, your repo and your on-call rotation. They report to your engineering lead and work in your process — we handle contracts, payroll and cover. Month-to-month after the first quarter.

`Your process` · `Your repo` · `From 1 engineer`

### 3.2 Dedicated product teams
*For a product you need built end to end*

A self-sufficient pod — tech lead, engineers, designer, QA — that owns a product surface from discovery to launch and keeps operating it afterwards. You get one point of accountability and a roadmap you can hold us to.

`Discovery → launch` · `Owns delivery` · `3–8 people`

### 3.3 AI delivery sprints
*For AI that has to survive contact with production*

A fixed-scope engagement that takes one workflow from prototype to a system your team actually operates — evaluation harness, guardrails, monitoring and handover included. Most reach production in `TK` weeks.

`LLM systems` · `Evals & guardrails` · `Fixed scope`

> **Note:** this third offer is where the existing five case studies live. It keeps continuity with what Rockship has actually sold while the first two carry the new positioning.

---

## 4. Proof of capability

> **Section heading:** Proof, not promises
> **Section intro:** Every figure below traces to a system running in production for a paying client. Where we can't name the client, we name the market and the measurement.

### 4.1 Metrics band

| Figure | Label | Source |
|---|---|---|
| **5** | AI systems shipped to production, all still operating | Verified — 5 case studies in `lib/data.ts` |
| **3** | Markets delivered into — Singapore, Indonesia, Vietnam | Verified — stated in case study bodies |
| **92.5%** | Manual workload removed for a property management operator | Verified — client-measured, 620 → 148 hrs/month |
| **`TK`** | Engineers on the team | **Needed** |
| **`TK`** | Average years in production software | **Needed** |
| **`TK`** | Years operating | **Needed** — a commented-out "EST. 2024" exists in the code; if that's right, say 2024 and own being young |

**Cut from the current site:** `150+ Enterprise Clients`. It is not supportable next to five case studies, and it is exactly the claim a diligent international buyer will test. Its presence undermines the numbers that *are* real.

Also cut: `99.9% uptime SLA` and the compliance badge row (`ISO 27001 / SOC2 / HIPAA / GDPR / FedRAMP High`) — we hold none of these certifications as far as the repo shows. Claiming FedRAMP is not a marketing exaggeration, it's a claim with legal exposure.

### 4.2 Differentiators

**Senior by default** — Everyone we place has taken a system to production and owned it afterwards. We don't staff engagements with people learning on your budget.

**We stay after launch** — Four of our five shipped systems are still run with our involvement. Handover is a milestone in the contract, not an afterthought. `TK: confirm this is true`

**Written into your timezone** — Pods commit to a fixed overlap window with your team's working day, agreed before kickoff and held to in the SLA. `TK: what overlap can we actually commit to for US clients?`

**Your IP, your repo** — Work happens in your accounts under your controls. Contracts assign IP on delivery, and access is revocable the day an engagement ends. `TK: legal to confirm this matches our MSA`

### 4.3 Tech stack

The brief asks for a stack line. I can evidence what this website is built on, but not what we staff client projects with. **`TK` — I need the real list**, ideally split:

- **Languages:** `TK`
- **Frontend:** `TK` (evidenced on our own site: TypeScript, React, Next.js)
- **Backend / data:** `TK` (evidenced: Node, PostgreSQL/Supabase)
- **AI:** `TK` (evidenced: LLM application work, Groq and Google GenAI in our own product)
- **Cloud / infra:** `TK`

A stack list that's aspirational rather than actual is worse than none — buyers ask follow-up questions about it on the first call.

### 4.4 Client logos

**We currently have none, and cannot ship the section as-is.** The existing logo strip on the site shows *industry names*, not clients. Six named "clients" in the code (`QuantumLeap`, `DataWeave`, `FutureTech`, `Synergy`, `AlphaInc`, `NextGen`) are fabricated placeholders and must be deleted.

Recommendation: ask two clients for logo permission — the Singapore dental clinic group and the Vietnamese food distributor are the best candidates, both have quantified wins. **One real named logo outperforms four anonymous case studies.** If permission isn't granted in time, ship the section as anonymised descriptors ("A multi-site healthcare group in Singapore") — honest and still credible. Never ship invented logos.

### 4.5 Case study cards

| Card | Headline metric | Supporting line |
|---|---|---|
| Resident support automation *(Property management)* | **92.5%** manual workload removed — 620 → 148 hrs/month | A centralised knowledge assistant answering resident enquiries in real time, at 98% response accuracy. |
| Finance automation *(Singapore, multi-site healthcare)* | **95%** time saved — 3–4 days to under 4 hours | Invoice processing, consolidated reporting and settlement across branches, with a sub-1% error rate. |
| Conversational commerce *(Vietnam, B2B distribution)* | **+35%** revenue growth · 140% first-year ROI | 24/7 ordering and product discovery over chat for an 18-year-old distributor with 1,200+ SKUs. |
| Loan origination automation *(Indonesia, microfinance)* | **2.5×** applications per loan officer — 20 to 50+ | Borrower engagement, document validation and credit assessment, cutting approval time by up to 70%. |

*(The fifth, the women's wellness coach platform, is held back from the homepage — it's a consumer product and sits oddly beside three B2B operations wins. It stays on `/case-studies`.)*

---

## 5. Team

> **Section heading:** The people you'll actually be working with
> **Section intro:** You meet the engineers before you commit — and the partners stay reachable for the length of the engagement.

| Person | Title | Previously | Photo |
|---|---|---|---|
| Huy Dang | Managing Partner | `TK` | `/public/Huy.png` ✅ |
| Son Vo | Chief Operating Officer | `TK` | `/public/Son.png` ✅ |
| `TK` (Ngoc?) | `TK` | `TK` | `/public/Ngoc.png` ✅ unused |
| `TK` (Quan?) | `TK` | `TK` | `/public/Quan.png` ✅ unused |

**This is the highest-value missing content in the entire rebrand.** The "previously at" line is the specific mechanism sixonefourlabs uses to build trust — a name and a title prove nothing, but "previously at Grab" or "ex-Google" transfers credibility instantly. Without those lines, this section is *weaker than not having a team section at all*, because it invites the question and doesn't answer it.

Ideally add 1–2 senior engineers, not just leadership. The buyer is hiring engineers; showing only executives suggests the engineers aren't the selling point.

**For each person I need:** full name, exact title, 1–3 previous companies (and whether we may name them publicly), years of experience, optionally a LinkedIn URL.

---

## 6. How it works

> **Section heading:** From first call to first commit

1. **Scoping call** — 30 minutes on the problem, your stack and how your team works. You leave with a written recommendation on team shape, whether or not you hire us.
2. **Engineer shortlist** — We put forward named engineers with the relevant production experience. You interview them yourself; we never place someone you haven't met.
3. **Paid trial sprint** — Two weeks on real work, in your repo, with defined success criteria. Walk away at the end with no further commitment.
4. **Scale or hand over** — Grow the pod as the roadmap grows, or run a structured handover to your in-house team. Both are planned from the start.

`TK: are steps 2 and 3 things we will actually commit to?` The "interview them yourself" and "walk away after two weeks" promises are the strongest trust-builders on the page — and the most damaging if we can't honour them.

---

## 7. Call to action

> **Heading:** Tell us what you're trying to ship
> **Body:** A 30-minute call with an engineer, not a salesperson. You'll get a written view on the team shape we'd recommend — whether you work with us or not.
> **Primary button:** Book a 30-minute call
> **Secondary:** hans.dang@rockship.co
> **Fine print:** Ho Chi Minh City · Replies within one business day

**Recommendation:** replace the contact form with a real Cal.com or Calendly embed. An international buyer three timezones away will not wait a day for a reply to a form. The brief requires "at least one clear, working CTA" — a booking widget satisfies it far better than a form that emails `rockship.ops@gmail.com`.

Current CTA copy being retired: "Start an AI Pilot", "Book an AI Discovery Call", "Schedule an AI Consultation" — three different labels for the same action across the page. One label, used everywhere: **Book a call**.

---

## 8. Metadata / SEO copy

**Title:** `Rockship — Senior Engineering Teams for Companies Building Internationally`
**Description:** `Rockship embeds vetted senior engineers and dedicated product teams with companies in the US, Singapore and Europe. From architecture to production — and we stay for the operating phase.` (159 chars)
**OG image text:** *Senior engineers who ship outcomes, not tickets. — rockship.co*

Current description advertises "custom LLMs, computer vision pipelines, and secure cognitive infrastructure" — none of which matches what we sell. It goes.

---

## 9. Tone guide

**Do:** short declaratives; concrete nouns; numbers with their measurement attached; second person ("your repo", "your on-call"); name the failure mode we prevent.

**Don't use these words** — they appear throughout the current site and each one signals "generic vendor" to the audience we're targeting:

> *cutting-edge · leverage · seamless · robust · world-class · empower · transform your business · solutions · synergy · next-generation · state-of-the-art · unlock · revolutionize*

**Rule of thumb:** if a sentence would be equally true of any other software company, cut it or make it specific.

---

## 10. Open items blocking build

| # | Item | Owner | Blocking |
|---|---|---|---|
| 1 | Confirm the staff-augmentation repositioning | Leadership | **All copy** |
| 2 | Pick a headline (A–E) | Reviewer | Hero |
| 3 | Team headcount, avg. years, years operating | Ops | Metrics band |
| 4 | Team bios + previous companies (4 people) | Ops | Team section |
| 5 | Real tech stack list | Engineering | Proof section |
| 6 | Client logo permissions (2 asks) | Sales | Logo strip |
| 7 | Confirm process promises (interview, 2-week exit) | Leadership | Process section |
| 8 | Committed timezone overlap for US clients | Ops | Differentiators |
| 9 | Booking tool: Cal.com or Calendly? | Leadership | CTA |

## 11. Cleanup that ships in the same PR

Not copy, but found while auditing and it would be negligent to leave:

1. **The AI assistant is stating fabricated credentials.** `services/knowledgeBaseService.ts:32` tells users Rockship has *"$50M Series A funding and 40+ PhD researchers"*. This is live and answering visitor questions right now. Highest-priority fix in the repo.
2. **Fake testimonials attributed to real people** — `lib/data.ts` contains invented quotes from Mark Zuckerberg, Demis Hassabis, Andrej Karpathy and Nat Friedman. The component isn't currently mounted, so nothing renders, but it is one import away from shipping. Delete.
3. **Fabricated client and partner lists** — `lib/data.ts:2-10`. Delete.
4. **Invented research papers** — `researchData` in `lib/data.ts`. Delete.
5. **Broken social previews** — `og-image.jpg` and `twitter-image.jpg` are referenced in metadata but don't exist on disk; `metadataBase` is unset (the console warning in the brief). Fix all three.
6. **A secret is exposed to the browser** — the Resend API key is read from `NEXT_PUBLIC_RESEND_API_KEY` in `app/api/contact/route.ts`. The `NEXT_PUBLIC_` prefix ships it to the client bundle. Rename to `RESEND_API_KEY` and rotate the key.
