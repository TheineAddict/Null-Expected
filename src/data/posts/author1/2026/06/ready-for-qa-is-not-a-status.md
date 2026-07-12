---
title: "Ready for QA Is Not a Status"
excerpt: "Moving a ticket into QA does not make it testable. Ready for QA should describe the condition of the work, not the end of coding."
tags: ["expected-behaviour"]
author: "author1"
date: "2026-07-12"
readTime: "4 min read"
slug: "ready-for-qa-is-not-a-status"
---

# Ready for QA Is Not a Status

*Expected Behaviour is a lightweight weekly column about the small process failures that create disproportionate delivery problems.*

A developer finishes the implementation, moves the ticket into **Ready for QA**, and starts the next item.

The change has not been deployed to the test environment. A dependency is still in progress. The acceptance criteria no longer describe what was built. The feature requires configuration that nobody has mentioned.

According to the board, testing can begin.

In practice, the ticket has simply changed queues.

## What does Ready for QA mean?

Ready for QA should mean that the change is available, sufficiently stable, and supported by enough context for meaningful testing to begin.

It does not mean that development activity has stopped. It does not mean that a pull request has been merged. It should certainly not mean that the developer needs the ticket to leave their column.

A workflow status is a claim about the condition of the work. When the claim is routinely false, the board stops representing delivery reality.

That matters beyond QA. Product managers use workflow data to understand progress. Delivery leads use it to identify bottlenecks. Teams use cycle time and work-in-progress metrics to make planning decisions. If tickets enter QA before they are testable, those signals become unreliable.

The process may appear to be moving. The work is not.

## A handover should reduce uncertainty

Testing will always involve uncertainty. Testers explore behaviour, challenge assumptions and discover conditions the implementation did not anticipate.

That is different from beginning every ticket by reconstructing the development context.

A tester should not need to determine whether the correct version has been deployed, discover an undocumented feature flag, chase basic test data, or infer the expected behaviour from implementation details. Those are not testing activities. They are recovery work created by an incomplete handover.

The distinction is important because capable QA engineers often absorb this work quietly. They investigate, message several people, prepare missing data and eventually make the ticket testable themselves.

The delivery system then learns the wrong lesson: premature handovers appear to work because QA compensates for them.

## Readiness should be observable

Teams do not need a large governance document to define Ready for QA. They need a small number of conditions that can be verified.

Can the tester access the change now? Is the expected behaviour clear enough to distinguish a defect from a misunderstanding? Are the required dependencies, configuration and test data available? Has the implementation received a basic developer check? Are known limitations visible rather than waiting to be discovered during execution?

The exact answers will vary by product and risk profile.

A small isolated UI change may require little more than a deployed build and clear expected behaviour. A change involving data migration, permissions, external interfaces or shared services may need additional deployment notes, dependency confirmation, affected-component information and a clearer view of regression risk.

The principle is consistent: moving the ticket should indicate that useful testing can start, not that QA may now begin finding out why it cannot.

## Premature handovers damage flow

A ticket moved too early does not wait harmlessly in a queue.

The tester starts analysis, prepares data or begins execution against an incomplete environment. Questions are raised. Developers switch context to answer them. The ticket becomes blocked, moves backwards, or remains officially in progress while no meaningful validation is happening.

That creates avoidable operational noise.

QA capacity is consumed by setup and clarification. Development receives interruptions after the work was considered complete. Cycle-time reporting becomes distorted because waiting and recovery work are recorded as testing. The usable test window shrinks, often without changing the release date.

By the time the change is genuinely ready, part of the time allocated to testing has already been spent.

This is how weak handovers become release risk. Not through one dramatic failure, but through repeated erosion of the time and attention available for actual evaluation.

## QA should not preserve the fiction

When a ticket is not testable, the response should be explicit.

Record what is missing. Make the blocker visible. Return ownership to the person or team able to resolve it. Do not leave the item appearing active while QA waits for a deployment, dependency or decision.

This is not QA acting as a gatekeeper. It is basic flow control.

A team cannot improve a delay it refuses to classify correctly. If incomplete work is routinely accepted into QA, then the board will continue to report handovers that did not happen and testing that did not start.

Before moving the next ticket into Ready for QA, ignore the label for a moment and ask the operational question behind it:

**Could a tester begin meaningful testing now, without first completing the handover on behalf of the team?**

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*