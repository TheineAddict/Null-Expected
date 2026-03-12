---
title: "The Real Job Is Better Decisions, Not More Testing"
excerpt: "A senior QA reflection on why the real work is not more testing, but better decisions under pressure and imperfect evidence."
tags: ["quality-mindset","featured","unpopular-opinion"]
author: "author1"
date: "2026-03-12"
readTime: "7 min read"
slug: "better-decisions-not-more-testing"
---

Somewhere along the way, I became less interested in testing itself and much more interested in the quality of the decisions being made around it.

That is not because testing stopped mattering. It matters a great deal. But I have seen too many teams pour energy into test activity while avoiding the harder question underneath it: do we actually understand what we are shipping, what could go wrong, what evidence we have, and who is choosing to live with the remaining risk?

That, to me, is the real work.

Early in my career, I cared a lot about whether the test effort looked complete. Were the cases written? Was regression covered? Did we hit the expected environments? Had the bugs been raised, triaged, retested, closed? Those things still matter. I am not pretending process discipline is irrelevant. In regulated environments or high-risk release windows, it very much is not.

But the longer I have worked in delivery, the less impressed I am by test activity on its own.

A team can execute a large regression pack and still have weak release judgement. A dashboard can glow green while confidence is built on stale assumptions, partial coverage, and a quiet agreement not to look too hard at what remains unknown. A release gate can be technically passed while the real decision has simply been deferred, blurred, or spread so thinly across functions that nobody owns it with any conviction.

That is why I now see testing as one input to decision quality, not the centre of quality work.

The distinction matters because teams often respond to uncertainty by asking for more testing when what they actually lack is clearer ownership, better evidence, tighter scope control, or the courage to say that confidence is not where it needs to be. More tests can help. They can also become a respectable way to avoid naming the real problem.

I have seen this most clearly around release readiness. Under pressure, people ask familiar questions because they feel safer. Have we run regression? How many defects are still open? Is automation green? Has QA signed off? These are not useless questions, but they are often treated as substitutes for judgement.

They are not judgement. They are fragments of evidence.

The hard part is interpreting those fragments honestly.

A passed automation suite tells me something, but not as much as people like to pretend. It tells me the checks that still exist and still run and still assert the right things have passed in the conditions we executed them. That is useful. It is not the same as saying the system is safe, the change is understood, or the user impact is acceptable. Anyone who has spent time living with brittle suites, partial coverage, stale assertions, or permanent pipeline noise knows how easy it is to overstate what automation has really bought you.

The same is true of defect data. An open defect list can look manageable right up until someone asks the inconvenient questions. What kind of defects are these? What conditions expose them? What is the operational fallback? Who accepted them? What other areas were not exercised because time moved, scope changed, environments broke, or ownership got muddy? A clean-looking bug count can hide a messy risk picture.

This is where I think mature QA leadership quietly shifts shape. At some point, the role becomes less about proving that testing happened and more about improving the quality of the conversations that determine what happens next.

That means asking better questions, earlier and more often.

Not "Did we test it?" but "What do we know, how do we know it, and what still rests on assumption?"

Not "Is QA comfortable?" but "Who is making this release decision, on what basis, and with what mitigation if we are wrong?"

Not "Can we get sign-off?" but "Is anyone relying on process language to avoid a sharper risk call?"

This is also why I have become more suspicious of process theatre over time. A lot of organisations have learned how to produce the appearance of control. They have gates, templates, entry criteria, exit criteria, sign-off rituals, severity definitions, traceability matrices, and polished reporting. None of that guarantees good decisions. Sometimes it actively gets in the way by creating too many places to hide.

If everyone can point to a process artefact, then nobody has to state a view plainly.

The release can move forward because the paperwork says enough happened, even when the underlying confidence is thin. Or the release can be blocked because a control was not satisfied in form, even though the actual product risk is understood and manageable. In both directions, the failure is the same. The decision quality is poor.

That is why I now pay closer attention to the quality of evidence than the volume of activity. I want to know whether the evidence is current, whether it reflects the actual shape of the change, whether the known gaps are visible, and whether the people making the call understand the consequences. I care more about the integrity of that picture than I do about whether the ritual looked complete.

Sometimes the best quality move is more testing. Sometimes it is a narrower release. Sometimes it is feature flags, staged rollout, stronger post-release checks, better observability, or a frank conversation that the change should not go this week. Sometimes the smartest move is admitting that the team does not need another round of execution nearly as much as it needs a real owner for a risky dependency or a decision-maker willing to trade scope for confidence.

That is a different posture from the one many QA functions were taught to adopt.

It is less flattering in some ways. It gives you fewer easy symbols of importance. You are not the person heroically catching everything at the end. You are not building your identity around test volume, defect counts, or the moral weight of the QA sign-off. You are doing something quieter and, in my view, more valuable. You are improving the quality of decisions under pressure.

That also means accepting an uncomfortable truth: good quality work does not always look like more testing. Sometimes it looks like sharper framing, earlier challenge, clearer trade-offs, or a refusal to let vague confidence pass as evidence. Sometimes it means saying that the problem is not insufficient execution. The problem is that nobody wants to own the risk in plain language.

I have written before that quality is rarely decided by the test team alone. It is shaped by product ambition, engineering choices, operational readiness, time pressure, environment stability, release constraints, and the honesty of the conversations happening around all of that. Testing helps expose reality. It does not replace decision-making.

And if I sound slightly impatient with the old framing, that is because I am. I think a lot of QA people were trained to defend the importance of testing when the more useful move would have been to raise the standard for how delivery decisions get made. Those are not the same thing.

This is part of why I keep coming back to unpopular opinions in QA. The rituals are familiar. The language is familiar. The comfort they offer is familiar. But familiarity is not the same as control. I go deeper on that tension in [the book](https://www.amazon.com/dp/B0GHZY3CTQ), especially where QA work becomes more about protecting process optics than improving delivery judgement.

These days, I still care about testing. I care about regression confidence, defect triage, coverage gaps, automation maintenance, and release evidence. I just do not mistake any of them for the job itself.

The job is better decisions.

If the testing function produces more activity but not better decisions, I am no longer convinced it is doing quality work at all.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*