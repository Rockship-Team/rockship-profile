# AI R&D Lab — source copy

Section 06 of the homepage, between Case studies (05) and Career (07).
Rendered by `components/home/AiRdLab.tsx`; content lives in `AI_RD_LAB` in
`lib/home-content.ts`.

Source brief: `Rockship-AI-RD-Lab.docx`, supplied 2026-09-10. The text below is
the brief tightened to the homepage voice — short sentences, no adjective
stacking. Nothing has been invented; every claim traces to the brief.

## Head

- Eyebrow: **AI R&D Lab**
- Headline: **Our innovation engine.**
- Intro: A proprietary Agentic AI & Data Platform that closes the gap between
  static enterprise data and proactive, goal-driven autonomy.

## Body

> Rather than simple chatbots or isolated models, the platform deploys
> coordinated multi-agent workflows that safely query data silos, reason
> through high-stakes constraints, and execute mission-critical tasks in real
> time.

> We are rolling out structured access and early-adopter deployments for global
> enterprise partners who want to automate domain-specific operations without
> compromising security or data sovereignty.

## Capabilities

The five pillars are the five labels on the platform diagram
(`public/images/ai-rd-lab.png`). They are repeated as text on purpose: the
diagram carries them as pixels, so without the list they are invisible to
screen readers and to search.

| Pillar | Line |
| --- | --- |
| Agentic workflows | Coordinated multi-agent runs with hand-offs and guardrails, not single-shot prompts. |
| Data silo integration | Governed queries across systems that were never built to talk to each other. |
| Goal-driven autonomy | Agents work towards a stated outcome and reason through the constraints on the way. |
| Security & data sovereignty | Deployed inside your boundary, so the data stays where your regulator expects it. |
| Enterprise operations | Built for the domain-specific, mission-critical work that runs the business. |

## Advisor note

Dr. Wray Buntine also appears in the Advisory Board row of the Team section
(03). He is repeated here in a different register: Team answers *who you will
work with*, this note answers *why the lab is credible*. The credentials
(NASA Ames, UC Berkeley, Monash; 17,000+ citations; top 0.75% most-cited in AI)
come from the brief and should not be edited without a new source.

## Layout note

This is the only two-column section on the homepage — prose left, diagram
right. The diagram is the argument, so it sits beside the claim rather than
under it. The section runs on paper (no `alt` grey) so the dark diagram reads
as artwork rather than a floating panel.

The five pillars sit in a full-width hairline strip *below* the two columns,
not inside the prose column. In the column they ran ~350px taller than the
diagram and left a third of the right column empty. They are a strip rather
than cards because Case studies (05) and Career (07) are both card grids and a
third one between them flattens the page into a single deck.
