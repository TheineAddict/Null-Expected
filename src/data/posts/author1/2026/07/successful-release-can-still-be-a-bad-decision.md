---
title: "A Successful Release Can Still Be a Bad Decision"
excerpt: "Production survived, but that does not prove the release decision was sound. Outcome bias can turn luck into false confidence."
tags: ["expected-behaviour", "unpopular-opinion"]
author: "author1"
date: "2026-07-18"
readTime: "4 min read"
slug: "successful-release-can-still-be-a-bad-decision"
---

*Expected Behaviour is a lightweight weekly column about the assumptions, incentives and habits behind everyday QA and release work.*

The release went ahead with incomplete regression, an unresolved dependency and a rollback plan nobody had tested.

Production remained stable.

By the next morning, the decision was being described as sensible. The risks had apparently been proportionate. The additional testing had apparently been unnecessary. The people who had raised concerns had apparently been too cautious.

But nothing about the outcome proved any of that.

The release may simply have succeeded despite the decision, not because of it.

## Outcome bias makes luck look like judgement

We tend to evaluate decisions by looking at what happened afterwards.

When the result is good, the decision appears good. When the result is bad, every ignored warning suddenly looks obvious.

This is outcome bias, and release management creates ideal conditions for it.

Most release risks do not materialise every time. A missing test may cover a path that happened not to be exercised. A fragile dependency may remain available. A defect may affect only a subset of users who did not encounter it during the release window.

The absence of an incident does not tell us whether the risk was understood, whether the evidence was sufficient, or whether the exposure was acceptable.

It tells us only that the feared outcome did not occur this time.

## A green result can reinforce a weak process

This is where successful releases can become dangerous.

When a team repeatedly takes poorly understood risks and gets away with them, the behaviour starts to feel validated. Controls are treated as optional. Test scope is reduced more aggressively. Concerns are reframed as excessive caution because previous exceptions did not cause visible harm.

The organisation is not necessarily becoming better at judging risk. It may simply be becoming more comfortable with uncertainty it no longer examines.

Eventually, the exception becomes precedent:

“We released like this last time.”

That statement sounds like evidence, but it often means only that the previous gamble was not punished.

## Decision quality must be reviewed separately

A sound release decision does not require certainty. Delivery work rarely offers that.

It requires a defensible understanding of what is known, what remains uncertain, what could happen, who would be affected and what options exist if the release goes wrong.

A decision can therefore be good even when the outcome is bad. The team may have made a reasonable judgement using the best available evidence, only for a low-probability failure to occur.

The reverse is also true. A decision can be weak even when production remains quiet.

That distinction matters during retrospectives and post-release reviews. If teams only investigate decisions after incidents, they miss the questionable decisions that happened to succeed. Those are often the decisions shaping future behaviour.

A useful review should ask:

Did we understand the material risks at the point of decision? Was the evidence proportionate to the exposure? Were uncertainties made visible? Did deadline pressure change how we interpreted missing information? Would we make the same decision again if we did not already know the outcome?

These questions examine judgement rather than fortune.

## Confidence should not be borrowed from survival

Production stability is valuable evidence about the system. It is not automatic validation of the process that put the system there.

When a risky release succeeds, the correct response is not to manufacture regret. It is to resist rewriting the original decision as stronger than it was.

Record which assumptions held. Identify which risks did not materialise. Ask whether the decision would still have been defensible had the outcome been different.

Otherwise, luck becomes part of the release strategy without ever being named.

The next time someone says, “It was fine last time,” the useful question is not whether the previous release succeeded.

It is whether the previous decision deserved to.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*