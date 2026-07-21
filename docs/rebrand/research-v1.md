# Research: hero patterns, section structure, and what to call the offering

Response to review points 2, 4, 5 and 6. Read this before the revised mockups.

**Method:** fetched and inspected the live HTML/CSS of each site. Where a site blocks automated fetching (Toptal, thoughtbot return 403), typography and color are marked *not determinable* rather than guessed.

---

## Part 1 — Hero sections: 8 companies

| Company | Headline | Words | Case | Headline size | Hero CTAs | Accent |
|---|---|---|---|---|---|---|
| sixonefourlabs | "For engineers who ship outcomes, not just code." | 8 | Renders ALL CAPS* | 88px | 1 | Red `#e8000d` |
| Toptal | "Hire the Top 3% of the World's Talent™" | 8 | Title | n/d | 1 | n/d |
| Lemon.io | "Ship software faster with experienced engineers" | 6 | **Sentence** | 64px | 1 | Mint `#5cffe4` |
| Turing | "Training Superintelligence" | 2 | Title | n/d | 1 | n/d |
| Andela | "The Human Layer / Powering Production AI" | 6 | Title | 72px | 2 | Green `#338632` |
| Gun.io | "The Technical Standard for High Stakes Engineering" | 7 | Title | 52px | 1 | **None** |
| thoughtbot | "When the stakes are high, experience matters" | 7 | **Sentence** | n/d | 1 | n/d |
| Crema | "A design & technology consultancy building world-class digital experiences and teams." | 11 | **Sentence** | 52px | 1 | Link only |

\* *Important finding:* sixonefourlabs' headline is **sentence case in the source**. It renders as caps only because the active `swiss` theme applies `text-transform: uppercase` to `h1`. So even the one apparent caps example isn't written in caps.

### What the numbers say

- **ALL CAPS: 1 of 8** — and that one is a CSS transform, not authored caps. The reviewer's read is correct; caps is not what this category does.
- **Median headline: 7 words.** Range 2–11. Nothing above 11.
- **Median sub-headline: ~24 words.** Range 6–38. sixonefourlabs' 38-word sub is the longest in the set by 50%.
- **One CTA is the norm: 7 of 8.** Only Andela ships two.
- **Headline size clusters at 52–72px.** Gun.io and Crema — arguably the two most credible-looking — both sit at **52px**. 88px is the top of the range, not the middle.
- **Monochrome is viable and used:** Gun.io is fully monochrome with no chromatic accent anywhere in the hero. Crema is white-on-dark with accent only on an inline link. Where an accent does appear, it touches **exactly two things: one word in the headline, and the CTA fill** — never more.

### The gap nobody flagged

**6 of 8 put a client logo strip or talent proof strip immediately below the hero, inside the first viewport.** Gun.io runs the strongest version: an auto-scrolling row of headshot + name + "Previously at" + employer logo + tech stack.

sixonefourlabs is the *only* site in the set with no proof element near the hero — so on this specific dimension, our benchmark is the weakest example available. Both of my mockups copied that weakness. This is the most valuable finding in the research and it should change the design regardless of the other points.

### 5 patterns I'm borrowing, and why

1. **Sentence case, 7–8 words, 52–64px.** *(Gun.io, Crema, thoughtbot, Lemon.io)* — Restrained scale reads as more confident than a billboard, and it's what the category actually does.
2. **Sub-headline cut to ~20 words, one idea per sentence.** *(Gun.io's 6-word "Elite Talent. Automated Governance. Certain Delivery.", thoughtbot's 18)* — directly serves review point 2.
3. **Proof strip inside the first viewport.** *(Gun.io, Toptal, Lemon.io, Andela, Crema, thoughtbot)* — the pattern our benchmark is missing.
4. **A single CTA.** *(7 of 8)* — my previous hero had two competing buttons.
5. **Mono micro-eyebrow above, micro-meta line below the CTA.** *(sixonefourlabs, Crema)* — adds specificity without adding headline words, and works perfectly in monochrome.

---

## Part 2 — Section structure (review point 5)

I fetched sixonefourlabs to study its section discipline. One correction, offered so we build to what's actually there:

**Its nav does not map 1:1 to its sections.** There are 6 nav items — `#program`, `#career`, `#about`, `/commercial`, `#apply`, `/events` — against 5 sections, with two pointing to separate pages and at least one anchor having no matching section. The 1:1 nav requirement in the review is a **good idea, but an improvement on the benchmark rather than a copy of it.** I'm implementing it as specified.

What sixonefourlabs genuinely does well, and what I'm taking:

- **Numbered sub-items inside sections** — `01–03` in the curriculum, `01–05` in the career section. The numbering marks real sequences, not decoration.
- **Eyebrow does the work of the heading** — e.g. "14 weeks. A career redefined." There's no separate heading competing with it.
- **Very little body text** — ~60–80 words of intro per section, then structured items.
- **Separation is whitespace, not rules or alternating fills.** Generous vertical space does the job on its own.

**Applied to our page:** the homepage becomes exactly the five sections in the issue — Services → Why Rockship → Case Studies → Team → CTA — each numbered `01`–`05`, with the nav mapping one item per section plus scroll-spy highlighting of the section you're currently in.

Consequence worth a decision: **the "How it works" 4-step process section comes off the homepage.** Keeping it would mean six sections against the five in the issue, and folding it into Services would create exactly the mixed-content block point 5 warns about. It's good trust-building content, so I recommend it becomes its own `/how-we-work` page later. It's preserved in the copy doc, not deleted.

---

## Part 3 — "Embedded engineers": the reviewer is right, and I was wrong

### Why I chose it

I picked "embedded engineers" to avoid "staff augmentation," which reads as procurement jargon, and because sixonefourlabs uses a similar constructed term ("Forward-Deployed Engineering"). I optimised for register and did not check how the phrase resolves in search or on first read. That was the mistake.

### The evidence against it

Searches for `embedded engineer jobs` and `embedded engineer salary` return firmware and hardware results **almost exclusively**:

- LinkedIn: *"79,000+ Embedded Engineer jobs in United States"*
- Aggregate skills in those results: *"Expert-level C/C++ embedded development"*, *"firmware integration, and CAN communication"*, *"real-time operating systems"*
- Industries: *"aerospace, automotive, IoT, defense, and robotics"*
- levels.fyi has a canonical title page: *"Embedded Systems Software Engineer Salary"*

The decisive test: even a **services-framed** query — "embedded engineering team agency hire senior engineers into your team" — returned firmware recruiting in 8 of 10 results. The collision survives context.

**Of the ten companies checked, zero use "embedded engineers" as the name of their offering.**

### What the industry actually calls it

| Term | Who uses it |
|---|---|
| "Hire developers / Hire a team" | Toptal, Turing, Revelo, Lemon.io, Scalable Path — the most common *nav* choice |
| "Staff augmentation" | BairesDev (primary); dominant as an SEO category term |
| "Dedicated teams / dedicated developers" | BairesDev, Prosigns |
| **"Team Augmentation"** | **thoughtbot** — `/services/team-augmentation` |
| "Pods" / "squads" | Turing ("AI-native pods"), Revelo ("a full squad") |
| "Elastic Teams" | Distributed (coined brand term) |
| "Managed Outcomes" | Gun.io |

The consistent pattern: **"embedded" works as a verb or modifier, never as the product name.** BairesDev, thoughtbot and Turing all write "embed directly into your team" in body copy while naming the offer something else.

### On "staff augmentation"

It's what buyers search, but it carries real baggage. Documented industry hostility — agencies calling staff-aug firms *"body shops"* and *"going the way of the dinosaur"*. Tellingly, **Revelo, Toptal, Lemon.io, Gun.io and Turing all avoid it in their nav** despite competing in exactly that category.

### Recommendation

**Primary: "Team Augmentation"** — thoughtbot's exact term. Keeps the search adjacency of "staff augmentation" while dropping the word "staff," which is the specific token that triggers the headcount/body-shop reading. "Staff" implies interchangeable people; "team" implies a unit. Validated by a studio our target audience respects.

**Keep "embedded" as description, not as a name.** The service is called Team Augmentation; the copy says "senior engineers embedded in your team." This is what the whole industry does and it costs us nothing.

**Use "staff augmentation" exactly once**, in the meta description, for search capture.

**Avoid:** "fractional engineering" (the market has attached "fractional" to leadership roles; a fractional IC reads as part-time), "pods"/"squads" as a nav label (fine as internal vocabulary, too cute as an offer name), "engineers on demand" (nobody uses it, and "on demand" undercuts the seniority claim).

**One caveat to sanity-check:** if a meaningful share of the Singapore/EU pipeline is hardware, IoT or robotics — sectors that hire actual embedded systems engineers — then even "embedded" as a modifier carries residual risk, and we should drop the word entirely.

---

## Sources

Sites inspected: sixonefourlabs.com · toptal.com · lemon.io · turing.com · andela.com · gun.io · thoughtbot.com · crema.us · distributed.com · scalablepath.com · revelo.com · bairesdev.com · prosigns.io · devsu.com · rubick.com/embedded-model · daedtech.com/staff-aug-dirty-term · levels.fyi · LinkedIn and Indeed job search results

Not verifiable, flagged rather than estimated: keyword search-volume figures (no Ahrefs/SEMrush access); typography and color for Toptal, Turing and thoughtbot (bot-blocked).
