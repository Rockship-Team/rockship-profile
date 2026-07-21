# Rockship — Homepage Copy v2

Supersedes `copy-v1.md`. Revised against review points 1–6. Rationale for the terminology and structure changes is in `research-v1.md`.

**What changed:** homepage word count cut from ~640 to ~210. "Embedded engineers" replaced with "Team augmentation" (see research). The How-it-works section comes off the homepage. Section flow now matches the issue exactly.

`TK` = fact I don't have and won't invent.

---

## Hero

> **Eyebrow:** Ho Chi Minh City · Working with teams in the US, Singapore & Europe
> **H1:** Senior engineers who ship outcomes, not tickets.
> **Sub:** We place senior product engineers with your team — and stay through production.
> **CTA (one only):** Book a call
> **Micro-meta:** 30 minutes · with an engineer, not a salesperson

8-word headline, 15-word sub, one CTA. Research median across 8 comparable sites: 7-word headline, ~24-word sub, one CTA. Previous draft was 8 / 38 / two CTAs.

**Headline alternatives** *(unchanged from v1, still open)*: B "The engineering team you'd have built, if you had six months." · C "Product engineers, embedded in your team, shipping in week one." · D "We don't sell hours. We ship systems that run in production." · E "Curated engineering teams out of Ho Chi Minh City. Shipping worldwide."

*Note on C: keep "embedded" here — as a verb it's fine and the whole industry uses it that way. It's the noun "embedded engineers" that fails.*

## Proof strip *(new — inside the first viewport)*

| 5 | 3 | 92.5% | `TK` |
|---|---|---|---|
| Systems shipped to production, all still running | Markets delivered into — SG, ID, VN | Manual workload removed, best result | Engineers, avg. `TK` yrs in production |

Added because 6 of 8 researched competitors put proof inside the first viewport and we had none. Detail in `research-v1.md`.

## 01 — Services

> **H2:** Three ways to work with us.
> **Lede:** Senior engineers only. No junior bench, no account managers.

**01 Team augmentation** — *You have a roadmap, not the capacity*
One to five senior engineers join your repo, your standups, your on-call. From one engineer, month to month.

**02 Dedicated product teams** — *You need it built end to end*
A pod that owns a product surface from discovery to launch — and keeps operating it after.

**03 AI delivery sprints** — *Your prototype has to survive production*
Fixed scope, one workflow, taken live with evals, guardrails and handover included.

> **Renamed:** "Embedded engineers" → **"Team augmentation"** (thoughtbot's term). "Embedded engineer" returns firmware and hardware results almost exclusively — LinkedIn alone lists *"79,000+ Embedded Engineer jobs"* — and zero of ten researched competitors use it as an offer name. Full evidence in `research-v1.md`.

## 02 — Why Rockship

> **H2:** Proof, not promises.
> **Lede:** Every number traces to a system running for a paying client.

- **Senior by default** — Everyone we place has taken a system to production and owned it after.
- **We stay after launch** — Four of five shipped systems still run with our involvement. `TK confirm`
- **Your timezone, in writing** — A fixed overlap window with your working day, agreed before kickoff. `TK what can we commit to for US clients?`
- **Your IP, your repo** — Your accounts, your controls. IP assigns on delivery, access ends with the engagement. `TK legal to confirm`

## 03 — Case studies

> **H2:** What we've put into production.
> **Lede:** Client names withheld under NDA. Metrics measured by the client.

| Link | Market | Metric | Title |
|---|---|---|---|
| `/case-studies/ai-resident-support-automation` | Property management | **92.5%** manual workload removed | Resident support automation |
| `/case-studies/ai-finance-automation` | Singapore, healthcare | **95%** time saved on close | Finance automation for a clinic group |
| `/case-studies/ai-conversational-commerce` | Vietnam, B2B distribution | **+35%** revenue growth, 140% ROI | Conversational commerce |
| `/case-studies/ai-loan-automation` | Indonesia, microfinance | **2.5×** applications per officer | Loan origination automation |

## 04 — Team

> **H2:** The people you'll work with.
> **Lede:** You meet the engineers before you commit.

Huy Dang, Managing Partner · Son Vo, COO · `TK` · `TK` — each with a **"Previously at —"** line.

**Still the highest-value gap in the rebrand.** Research finding: prior-employer credentials are the most common proof device in this category (Toptal names Google/Microsoft/Apple/Meta on its talent cards; Gun.io runs headshot + "Previously at" + logo directly under its hero). Without it this section invites the question and doesn't answer it.

## 05 — Contact

> **H2:** Tell us what you're trying to ship.
> **Body:** Thirty minutes with an engineer. You'll get a written view on the team we'd recommend — either way.
> **CTA:** Book a call

## Metadata

**Title:** Rockship — Senior Engineering Teams for Companies Building Internationally
**Description:** Rockship places senior product engineers with teams in the US, Singapore and Europe. Team augmentation and dedicated product teams — sometimes called staff augmentation, but you get a senior team, not headcount. (203 chars — trim to 155 before build)

*"Staff augmentation" appears exactly once, in meta, for search capture. Buyers search the term; premium brands avoid it in the nav. Reasoning in `research-v1.md`.*

---

## Moved off the homepage

**How it works** (Scoping call → Engineer shortlist → Paid trial sprint → Scale or hand over). Good trust content, but keeping it would mean six sections against the five in the issue, and folding it into Services creates exactly the mixed-content block review point 5 warns against. **Recommend it becomes a `/how-we-work` page.** Full text preserved in `copy-v1.md` §6.

## Cut entirely

`150+ Enterprise Clients` · `99.9% uptime SLA` · the compliance badge row (ISO 27001 / SOC2 / HIPAA / GDPR / FedRAMP High — we hold none) · the fabricated client and partner lists · the fake testimonials attributed to Mark Zuckerberg, Demis Hassabis, Andrej Karpathy and Nat Friedman · the invented research papers.

## Still blocking

| # | Item | Owner |
|---|---|---|
| 1 | Confirm the staff-augmentation repositioning | Leadership |
| 2 | Pick a headline (A–E) | Reviewer |
| 3 | Team headcount + avg. years | Ops |
| 4 | Team bios + previous companies ×4 | Ops |
| 5 | Client logo permissions ×2 | Sales |
| 6 | Confirm timezone overlap commitment for US clients | Ops |
| 7 | Booking tool: Cal.com or Calendly | Leadership |
| 8 | **Chatbot is stating "$50M Series A" and "40+ PhD researchers" to live visitors** | **Engineering — today** |
