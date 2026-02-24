---
title: "AI in Testing: Where It Actually Helps vs Where It’s Mostly Theatre"
excerpt: "A senior QA view on practical AI wins in test strategy, triage, and maintenance - and the hype patterns that waste time and erode trust."
tags: ["industry-trends","tools-tech","unpopular-opinion"]
author: "author1"
date: "2026-02-23"
readTime: "8 min read"
slug: "ai-in-testing-where-it-helps-vs-theatre"
---
The AI conversation in QA has split into two parallel realities.

In the first, teams quietly use LLMs to remove friction from the work that actually slows delivery: clarifying requirements, mapping coverage, reducing triage time, turning messy logs into hypotheses, and keeping automation maintainable when UI moves.

These wins are not glamorous, but they are real.

In the second reality, vendors sell “autonomous testing” that looks fantastic in a demo.

Then it collapses the moment you add authentication, stateful flows, flaky environments, compliance constraints, and the basic requirement that a test must be explainable and repeatable.

The output is theatre: lots of motion, little truth, and a long tail of distrust in “AI testing” as a concept.

This post is a pragmatic line-drawing exercise. Not “AI good” or “AI bad”.

Just: where it pays for itself, where it becomes a quality risk, and how to keep your test strategy anchored in evidence instead of vibes.

## A useful definition: AI is valuable when it reduces thinking tax, not when it replaces thinking

Most QA work is not “typing tests”.

It’s decision-making under uncertainty: what matters most in this release, what changed in a meaningful way, where this can fail in production (and how you’d notice), what the smallest reliable PR check is, and how to get from symptom to cause when something breaks.

AI helps when it compresses time-to-clarity.

It stops helping when it generates output you still have to reverse engineer to trust.

If you have to audit every step because the system is non-deterministic or opaque, you haven’t automated work - you’ve moved it.

## Where AI actually helps (and why it works)

### Test design support: turning chaos into a structured coverage map

This is the least sexy and most consistently useful area.

LLMs are strong at transforming input formats. A PR description plus tickets plus release notes becomes a draft list of risk areas and scenarios. An API schema plus sample payloads becomes a set of edge cases worth validating. Acceptance criteria becomes a highlight of ambiguous statements and missing constraints.

A regression suite can become a map of gaps and redundancy.

The nuance matters. This is design support, not design authority.

You still own the decisions, because you still own the consequences. The value is that you start from a sensible draft instead of a blank page.

A practical way to operationalise it is to force the model into your existing structure, so it can’t freewheel into generic advice and you can keep the output reviewable.

**Inputs.** Feed the model the change summary, key user flows, and relevant incident history. If you can’t share incidents, summarise the failure modes and the “how we’d notice in prod” signals instead.

**Output shape.** Ask for a risk-based coverage map grouped by user impact and failure mode, not by feature list. You want an argument about what can hurt, not a catalogue of screens.

**Constraints.** Force the output into your artefacts: charters, test notes, a PR checklist, or the headings of your test plan. The goal is reviewability, not creativity.

**Memory.** Record what you accepted or rejected, and why. Otherwise you’re generating chat exhaust instead of building institutional memory.

In regulated or high-risk domains, this can improve consistency. Not because the model is “more correct”, but because it’s reliably thorough at enumerating categories humans forget when tired, rushed, or context-switched.

### Log triage and incident support: summarise, cluster, hypothesise

LLMs are legitimately good at compressing noisy evidence, especially when the output is auditable against raw logs.

In practice, this looks like grouping similar stack traces by signature, extracting the first meaningful failure from long CI output, turning traces into a short narrative a developer can act on, and suggesting plausible buckets like config drift, data issues, auth failures, timing problems, dependency outages, or environment instability.

This is most valuable when it reduces the “scroll tax” during triage without asking anyone to trust a black box.

One failure snapshot that shows the line: a model can summarise 2,000 lines of CI output into “first failure is auth token refresh, downstream errors are noise”. It cannot decide whether that’s acceptable risk for a release. You still have to own the decision.

The guardrail here is not technical - it’s governance.

Logs routinely contain secrets, internal URLs, customer identifiers, or personal data. If your AI workflow doesn’t have a default-redaction habit and a clear rule about what leaves your controlled environment, you’re building risk into your quality process.

### Coverage mapping for automation: from “we have tests” to “we cover risk”

Many teams still measure automation by count because it’s easy to count.

AI can help you move from quantity to intent by mapping checks to requirements, risks, and user journeys, and by showing where you have five versions of the same assertion but nothing meaningful for the highest-impact failure modes.

This is where AI becomes a test strategy tool rather than a test authoring trick.

A good coverage map helps you keep PR gating minimal and high-signal, push long-running checks to nightly, and stop confusing “a lot of tests” with “safe enough to ship”.

If your automation dashboard can’t answer “what risks are covered in PR vs nightly vs manual”, it’s probably measuring activity, not safety.

### Maintenance assistance: self-healing as a suggestion engine, not an oracle

“Self-healing” is one of the most marketable and one of the most dangerous concepts, because it can silently change what your test is doing.

The version that helps is conservative. It proposes locator updates as a diff. You review it like code. It ships with evidence (DOM snapshot, screenshot, trace) that the new target is equivalent. It never mutates your suite at runtime.

A failure snapshot worth remembering: a healed locator retargets a different “Continue” button with the same label. The test passes. The user flow is broken. CI looks green and you’ve just paid for false confidence.

If you’re in a Playwright stack, it’s useful to treat AI-assisted maintenance as a separate lane.

Your deterministic suite remains the source of truth, and “healing” produces suggestions plus artifacts that humans can accept or reject.

### Exploratory acceleration: agentic browsing as a smoke detector

Agentic browser tools are polarising for a reason.

They are rarely deterministic enough to replace regression, and pretending otherwise is how teams end up with flaky gates and false confidence.

Where they can help is as a smoke detector that runs out-of-band and reports weirdness: broken navigation paths, unexpected error pages, flows blocked by new validation or permission changes, and obvious visual anomalies.

If you treat this as reconnaissance rather than proof, it can be a useful early warning system.

For example, a Playwright-driven agent that outputs a markdown report with screenshots is valuable when it’s non-blocking and designed to surface candidates for human investigation, not to certify release readiness.

## The tool landscape you will actually run into

The market is crowded, but most offerings cluster into a few categories. The names change; the tradeoffs don’t.

**AI coding assistants used by QA.** GitHub Copilot, ChatGPT/Claude-style assistants, Cursor-style IDE agents. Excellent for scaffolding, refactors, and “get me started” code, but assume silent incorrectness. Treat it like a junior pair: review like it matters, because it does.

**AI-first test authoring platforms.** mabl, Tricentis Testim, Functionize, Katalon’s AI features. Strong demos, mixed day-2 operations. If you can’t version, review, and debug like code, it tends to become a bottleneck.

**Self-healing / auto-maintenance.** Often embedded inside cloud platforms and proprietary engines. Helpful when it proposes diffs with evidence. Dangerous when it mutates locators silently.

**Visual “AI” testing.** Applitools, Percy/Chromatic-style visual diffs. Often genuinely valuable because it’s evidence-based, but it still needs disciplined baselining and review. Visual noise is still noise.

**AI for triage and observability.** “Smart” grouping and summarisation in Sentry/Datadog/New Relic ecosystems. Useful because it reduces noise, but it’s not a substitute for understanding failure modes and adding proper signals.

If you want a portfolio-friendly, practical setup in a Playwright codebase without betting the farm on a vendor, the boring-but-credible pattern is additive rather than invasive.

Keep your Playwright suite as the source of truth, and introduce AI as support workflows that produce reviewable artifacts.

A reference point for “managed AI-generated tests” positioning is QA Wolf. Even if you don’t adopt it, it’s useful to study the boundaries of the model and what’s implicitly offloaded to process and people.

## Where it’s mostly theatre (and how it fails in practice)

### “AI will generate your entire regression suite”

The promise is speed: generate a full suite from requirements and ship faster.

The failure mode is predictable. Teams generate lots of flow coverage with shallow assertions. Flakiness appears due to timing and environment variance. Failures start getting ignored. The suite becomes expensive false confidence.

A generated regression suite is not a regression suite if you can’t explain what it asserts, why it asserts it, and what it is allowed to ignore.

If you want a fast, honest regression suite, you still need prioritisation, deterministic setup, clear assertions, and stable test data.

AI can help you draft tests. It can’t replace the engineering of reliability.

### “Self-healing means maintenance is solved”

The promise is reduced toil.

The failure mode is silent behaviour change. A tool “fixes” a test by changing what it clicks, or what it waits for, or what it considers equivalent. In a gate, that’s an unreviewed code change applied at runtime.

If a tool can’t show you what it changed, why it believes the new target is equivalent, evidence of equivalence (DOM, accessibility tree, screenshots, traces), and a clear rollback mechanism, it isn’t safe in any environment where failures have real consequences.

At best it hides breakage. At worst it approves the wrong thing.

### “Natural language testing means anyone can write tests”

The promise is broad participation.

The failure mode is fragility. If “anyone can write tests” but nobody can debug them, you’ve created dependency on a vendor or the one person who understands the translation layer.

Natural language is not a test strategy. It’s a user interface.

The only version that scales is when natural language sits on top of real, version-controlled code and artifacts, with diffs and review like everything else that affects delivery safety.

### “AI assertions can replace explicit checks”

The promise is that a model can judge correctness from “looking”.

The failure mode is unbounded interpretation. Sometimes “this looks wrong” is useful as a supplement. It is not a replacement for explicit assertions tied to business rules.

A model can tell you “this looks like a login page”.

It cannot reliably tell you whether the system applied the correct entitlement, tax rule, or policy constraint unless you’ve given it deterministic signals to verify.

If you want to avoid “AI assertions” turning into theatre, keep them scoped, and pair them with at least one explicit, deterministic assertion in the same test - especially in any flow that matters.

## A practical decision filter: does it produce artifacts you can trust?

Ignore marketing language and ask three questions.

Can you reproduce the result?  
If the output changes run-to-run, it belongs in exploration and support, not gating.

Can you audit the result?  
If you can’t inspect what changed and why, it isn’t safe for release decisions.

Can you own the workflow?  
If the tool forces a black box where tests are not code, history is not visible, and diffs are not reviewable, you’re trading short-term speed for long-term lock-in and brittleness.

## A “grown-up” way to use AI in a Playwright stack (without turning CI into chaos)

If you’re running React + TypeScript + Playwright, you can adopt AI in a way that is credible and operationally calm.

Keep your main suite deterministic and human-authored.

Then add optional lanes that produce artifacts, not authority: an exploratory runner that crawls key paths nightly and outputs a markdown report with screenshots; a spec-to-test generator that produces drafts clearly marked “needs review”; and a maintenance helper that proposes locator updates as diffs, never as silent runtime changes.

If you experiment with “AI checks”, keep them non-blocking and limited to places where they add signal, like quick UI anomaly detection in low-risk areas.

Make the boundaries obvious in the repo. Keep `/tests` as the source of truth. Put experiments under `/ai` and require them to output artifacts you can review: reports, traces, screenshots, diffs, draft PRs.

Keep the boundaries obvious in CI too.

In PRs, gate only on deterministic smoke checks and publish Playwright reports as artifacts. Nightly jobs can afford to be noisier: exploratory bots that publish markdown reports, traces, and screenshots are useful even when they’re not perfectly repeatable.

If you run a generation lane, treat it as a draft factory. It can create artifacts or open PRs. It should never merge directly.

The point is simple: AI becomes additive. It improves feedback loops without asking the organisation to trust the model.

## The uncomfortable truth: AI doesn’t remove accountability, it concentrates it

A lot of “AI testing” hype is really an attempt to outsource judgment.

But quality is a decision-making function. If you delegate it to an opaque system, you are still accountable for the consequences - you just have fewer levers to understand and correct what happened.

Use AI to reduce the grind around good QA practice: faster triage, better coverage conversations, cleaner test design drafts, more maintainable suites via suggested diffs, and wider exploratory reconnaissance without pretending it’s regression.

Be ruthless about the theatre.

Anything non-deterministic does not gate releases. Anything un-auditable does not auto-change your suite. Anything that cannot be debugged like code does not scale.

If your AI adoption doesn’t end in fewer escaped defects, faster diagnosis, or a more trustworthy release decision, it’s not an innovation.

It’s decoration.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*