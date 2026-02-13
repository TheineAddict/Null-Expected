---
title: "Friday the 13th Release: 13 QA “Curses” That Aren’t Bad Luck"
excerpt: "Friday the 13th, but make it professional: 13 repeatable failure modes that masquerade as “bad luck” - and the antidotes that actually work."
tags: ["qa-processes","quality-mindset","unpopular-opinion"]
author: "author1"
date: "2026-02-13"
readTime: "6 min read"
slug: "yfriday-13th-release-13-qa-curses"
---

Friday the 13th has a special talent: it turns ordinary delivery risk into folklore. People start talking about “bad vibes,” “weird outages,” and “the system being cursed.” I’m not here to mock that instinct - it’s a very human way to describe what is usually a very technical, very predictable pattern: uncertainty plus time pressure, wrapped in confidence theatre.

Most “release bad luck” is simply unpriced risk. Not “unknown unknowns” in the romantic sense - more like decisions we avoided making, dependencies we refused to name, and gaps we hoped wouldn’t matter. The calendar doesn’t summon chaos. It just gives us an excuse to notice it.

So here’s a Friday the 13th post that’s deliberately playful, but not childish: 13 QA curses that recur in grown-up teams, in real organisations, with real users and real consequences. Each one comes with an antidote that doesn’t require a new tool, a new framework, or a new religion - just sharper operational habits.

### Curse 1: The release plan written in invisible ink

This is the classic: “We’ll be careful.” “We’ll keep an eye on it.” “We’ll handle it if it happens.” If your plan cannot be paraphrased as concrete conditions and actions, it isn’t a plan - it’s a wish with a calendar invite.

Antidote: translate intent into a guardrail. One. Specific. Measurable. “If error rate exceeds X for Y minutes, we roll back.” “If conversion drops by Z%, we disable the feature flag.” Suddenly the release is governed by decisions, not mood.

### Curse 2: The rollback that exists only as a rumour

Many teams have rollback “in theory” and improvisation “in practice.” The first time rollback is attempted should not be during an incident, under pressure, while someone is narrating in a Slack channel.

Antidote: treat rollback as a first-class capability. Run a boring rollback drill when the stakes are low. If rollback requires heroic coordination, or undocumented credentials, or tribal knowledge, you don’t have rollback - you have a ritual.

### Curse 3: The one person who holds the map

One human becomes the operational load-bearing wall. They know the deployment quirks, the feature toggle gotchas, the “don’t touch this” parts of the pipeline. This works right up until it doesn’t - and then you discover your system is coupled to a person’s availability.

Antidote: name release ownership explicitly, and make it redundant. A release captain and a backup. Not a team name. Not “someone from engineering.” Actual humans. The curse breaks when responsibility stops being implied and starts being assigned.

### Curse 4: “It’s a small change” (the most expensive phrase in delivery)

“Small” is not a property of the diff. It’s a property of impact, and impact is emergent: data shape, traffic profile, caching behaviour, integrations, client versions, third parties, and user workflows all get a vote.

Antidote: re-run risk, briefly but honestly. If you can’t describe user impact in two sentences, you don’t understand the change well enough to call it small. That’s not a judgement. It’s a signal.

### Curse 5: Flaky tests masquerading as reassurance

A green pipeline is comforting. A green pipeline achieved through retries and selective blindness is a lullaby. If the suite is unstable, teams subconsciously stop trusting it, and then it becomes performative - a checkbox that consumes time but produces no confidence.

Antidote: separate signal from noise and make it visible. Flaky tests should be treated as defects because they corrode decision-making. If you must retry, attach an expiry date. Debt is survivable. Silent debt is what turns into superstition.

### Curse 6: Staging as a theme park version of production

Staging is often “close enough” in the way a cardboard shield is “close enough” to armour. Different configs, different data, different traffic, different auth paths, different CDN behaviour, different everything - but we keep calling it “staging” because the word sounds reassuring.

Antidote: actively hunt configuration drift. Document the meaningful differences, especially those that change runtime behaviour. If staging cannot be trusted for certain kinds of validation, say that out loud and adapt your checks accordingly. Reality beats comforting labels.

### Curse 7: Test data that flatters the system

Clean data produces clean outcomes. Real data is messy, partial, inconsistent, stale, duplicated, oddly encoded, and occasionally hostile. If your test data is pristine, you’re validating a product for an imaginary population.

Antidote: introduce an “ugly dataset” on purpose. Not for drama - for coverage. Missing fields, long names, unexpected characters, legacy accounts, partial migrations, conflicting states. You’re not trying to break the system for sport. You’re trying to meet it where users already live.

### Curse 8: The big-bang release with no containment

When everything ships at once, every incident becomes an archaeological dig. You’re not just debugging a symptom - you’re reconstructing which change mattered, under time pressure, with incomplete evidence.

Antidote: containment mechanisms. A feature flag. A kill switch. Progressive exposure. The point is not to ship timidly. The point is to keep blast radius proportional to certainty.

### Curse 9: Observability that begins after the incident begins

If your first “alert” is a customer report, your monitoring strategy is: outsource detection to your users. That’s a very expensive feedback loop, and it trains support teams to become emergency triage for engineering.

Antidote: pick a small set of release-critical signals and watch them deliberately. Not “all dashboards,” not “someone keep an eye out,” but a narrow, release-specific view of risk. Senior teams do this because it’s efficient, not because it’s fancy.

### Curse 10: Bugs without decisions (a backlog of anxiety)

A defect list is not a release strategy. It’s just unresolved tension. When teams carry “known issues” without explicitly pricing them, release readiness becomes an argument about feelings: “I’m not comfortable,” “it should be fine,” “we’ve shipped worse.”

Antidote: force decisions for the high-risk items. Ship, defer, mitigate, or stop. If you ship, write down why and how you’ll contain impact. A decision log isn’t bureaucracy - it’s memory, and memory is how you avoid repeating the same argument every sprint.

Here’s a compact format that fits into a release note without turning into theatre:

`Issue: Intermittent 500s on checkout for iOS 16 (low frequency)
Decision: Ship
Rationale: No data loss observed; fix in progress; impact limited by feature flag
Mitigation: Alert on 500-rate > 1% for 5 min; kill switch available; on-call briefed
Owner: <name>` 

### Curse 11: “QA will validate” as a substitute for engineering judgement

This curse isn’t disrespectful. It’s lazy coupling. It turns QA into the final gatekeeper, and everyone else into someone who “hands work off.” That structure scales badly and burns people out, because it loads all uncertainty onto one function at the end.

Antidote: shared validation as a norm, not a slogan. QA can lead strategy, sharpen risk, and design meaningful coverage - but the system gets safer when developers can explain how they validated their change beyond “tests passed.” Quality isn’t a department. It’s a property of how decisions are made.

### Curse 12: A definition of done that stops at “merged”

“Done” often means “code exists.” Production doesn’t care that your code exists. Production cares that your change behaves under real conditions, with real data, on real devices, with real traffic, in real failure modes.

Antidote: add one production-facing requirement to done, even if it’s temporary. A support note. A dashboard check. A rollback validation. A performance baseline. Not an essay - a thin layer of operational maturity that protects your users and your team.

### Curse 13: Post-release amnesia (the fastest path to repeat incidents)

Teams survive a messy release, patch the worst symptoms, and move on. The cost arrives later: the same failure mode returns, and everyone acts surprised, because nobody wrote down what they learned when it was fresh.

Antidote: a 10-minute micro-retro, designed for extraction not catharsis. What surprised us? What nearly broke? What will we change before the next release? Keep it specific and actionable. Treat it as operational hygiene, not therapy.

If you want the Friday-the-13th energy to actually be useful, frame this as a systems game, not a blame game. Curses aren’t caused by “bad testers” or “careless devs.” They’re produced by incentives, hidden coupling, and ambiguous ownership - the usual suspects in any socio-technical system.

And if your team needs one tasteful nerd reference to make it stick: think of this as your release warding circle. Not magic. Just boundaries.

What’s the one “curse” your team keeps re-summoning - and what would it take to break it for good?

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*