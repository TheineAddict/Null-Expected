---
title: "Testing AI Features When the Answer Is Probabilistic"
excerpt: "AI testing cannot rely on single expected results. QA needs evidence that matches uncertainty, risk, and real product decisions."
tags: ["qa-processes", "quality-mindset", "industry-trends"]
author: "author1"
date: "2026-05-02"
readTime: "10 min read"
slug: "testing-ai-features-when-answer-is-probabilistic"

---

Most software testing still leans on a familiar contract.

Given this input, under these conditions, the system should produce this result.

That contract has served us well. It gives test design structure. It keeps defect conversations anchored. It helps teams distinguish between preference, ambiguity, and actual failure.

Then AI-based features arrive and the contract starts to wobble.

A classifier returns a probability. A recommendation engine changes the ranking after a retraining cycle. A summarisation feature produces different but plausible summaries. A large language model gives a fluent answer that is mostly right, except for the one detail that matters. A risk score moves from 0.78 to 0.82 because the input distribution shifted.

The lazy conclusion is that AI cannot really be tested.

The more useful conclusion is that some AI features cannot be tested well using only deterministic habits.

That distinction matters.

Testing AI features is not about abandoning expected results. It is about becoming much more precise about what “expected” means when the output is probabilistic, generated, ranked, scored, inferred, or dependent on data.

ISTQB’s Certified Tester AI Testing v2.0 material makes this shift explicit. The updated syllabus focuses on testing AI-based systems and calls out probabilistic behaviour, non-determinism, reliance on data, difficult test oracles, and statistical approaches as AI-specific testing concerns. That is not a minor add-on to traditional test design. It changes the shape of the evidence we need. See [ISTQB CT-AI v2.0](https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/) and the [ISTQB announcement for the updated syllabus](https://istqb.org/istqb-releases-certified-tester-ai-testing-ct-ai-syllabus-version-2-0/).

The mistake is not asking, “What is the expected result?”

The mistake is stopping there.

## The oracle problem gets sharper, not softer

In traditional testing, an expected result is the predicted observable behaviour of the test item under specified conditions. ISTQB’s glossary definition is plain enough: expected behaviour comes from the test basis. See [ISTQB glossary: expected result](https://glossary.istqb.org/en_US/term/expected-result).

That works cleanly when the behaviour is deterministic and the requirement is testable.

A payment fails because the card is expired.

A mandatory field is empty, so the form blocks submission.

A user without permission receives a 403 response.

A calculation returns a known value.

The test oracle is clear. We know what correctness looks like before we run the test.

AI-based features make the oracle less comfortable. Not absent. Less comfortable.

For a document summariser, there may be several acceptable outputs. For a recommendation engine, there may be no single correct ranking. For a fraud model, the “right” answer may only become clear after investigation. For a chatbot, the output may be syntactically clean, emotionally convincing, and still unsupported by the source material.

This is where teams start to get sloppy.

They say, “The answer varies because it is AI.”

Fine. Variation may be normal.

But normal variation is not the same as acceptable variation.

A summary can vary in wording, but it must not invent obligations, alter numbers, remove caveats, or misstate named entities. A classifier can work with confidence thresholds, but it must not silently route high-risk cases into a low-risk workflow because the average score looks fine. A generated answer can use different phrasing, but it must not present uncertainty as fact.

The test oracle has to move from one exact answer to a more disciplined model of acceptability.

That might include tolerance bands, prohibited behaviours, confidence thresholds, domain rules, baseline comparisons, statistical claims, human judgement, or metamorphic relations.

Less neat.

More honest.

## Probabilistic output does not excuse fuzzy accountability

One of the worst things a team can do with AI features is let probabilistic behaviour dilute ownership.

“The model said so” is not a release argument.

“The score was above threshold” is not enough either, unless the threshold itself has been justified against the risk.

A probabilistic output still lands somewhere in a product workflow. It may recommend, rank, block, approve, escalate, summarise, draft, classify, prioritise, translate, search, or trigger another system. The output may be probabilistic. The consequence is often not.

The product either shows the answer or it does not.

The workflow either routes the case or it does not.

The user either trusts the recommendation or ignores it.

The downstream system either consumes the generated text or rejects it.

This is why AI testing has to test the decision path, not only the model.

A model can be statistically impressive and still be dangerous inside a badly designed workflow. A confidence score can be meaningful to a data scientist and meaningless to an end user. A human review step can exist on paper while the UI nudges people to accept the AI output without thinking. A system can technically allow override while making override operationally expensive.

That is not just model quality. That is product quality.

NIST’s AI Risk Management Framework describes trustworthy AI through characteristics such as validity and reliability, safety, security and resilience, accountability and transparency, explainability and interpretability, privacy enhancement, and fairness with harmful bias managed. See the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) and the [AI RMF 1.0 document](https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf).

For QA, those are not decorative principles. They are test strategy pressure points.

Can users understand the limits of the output?

Can the system fail safely when confidence is low?

Can support or operations reconstruct what happened?

Can the feature be disabled, rolled back, or routed around?

Does the product make uncertainty visible, or does it launder uncertainty into a clean-looking answer?

That last question deserves more attention.

A probabilistic system can become organisationally deterministic when the interface presents the result with too much authority.

## A few examples do not prove the feature

AI demos are dangerous because they are usually made of carefully chosen examples.

The prompt works.

The summary looks good.

The recommendation feels plausible.

The classifier gets the visible example right.

That is not nothing. It is also not release evidence.

Probabilistic features need evaluation across sets, not only examples. The quality question is not merely “did this one input pass?” It is “what pattern of behaviour do we see across the input space we expect in production?”

This is where AI testing becomes closer to evidence design.

The team needs to know what the evaluation set represents, what it excludes, how it was labelled, how current it is, and whether it reflects the intended release scope. A model that performs well against yesterday’s clean benchmark may still fail against messy production inputs, rare cases, newer formats, minority classes, long-tail user behaviour, or adversarial prompts.

Aggregate metrics are useful, but they are also very good at hiding uncomfortable details.

Accuracy is the obvious trap. A model can be 95% accurate and still fail disproportionately on the 5% of cases that carry the highest business, legal, financial, safety, or reputational impact. Precision and recall are better only if the team understands which error matters more. False positives and false negatives do not have symmetrical consequences in most real products.

This is where a mature QA conversation should get slightly annoying.

Not obstructive. Annoying in the useful way.

What does the metric mean?

What does it hide?

What population was tested?

Which segments were examined separately?

What is the cost of being wrong?

What happens when the input data changes?

What failure rate is tolerable, and who has accepted that tolerance?

Google’s “ML Test Score” paper is still useful here because it treats production machine learning as a wider testing and monitoring problem, not as an offline accuracy contest. The paper proposes tests and monitoring needs across data, model development, infrastructure, and production behaviour, and notes that prediction behaviour can be difficult to specify in advance. See [The ML Test Score](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/).

The uncomfortable lesson is simple enough.

If the output is probabilistic, the evidence cannot be anecdotal.

## Variation needs rules before sign-off

A generated answer being different from the previous run is not automatically a defect.

A ranking shifting after retraining is not automatically a defect.

A confidence score moving slightly is not automatically a defect.

But none of that helps if the team has not agreed what kind of movement is acceptable.

This needs to be defined before testing starts, not negotiated during release sign-off when the date is already politically expensive.

For a summarisation feature, the team may accept variation in phrasing, ordering, and compression. It may not accept invented facts, removed caveats, changed numbers, incorrect names, or unsupported conclusions.

For an extraction feature, the team may accept formatting differences. It may not accept changed dates, currencies, identifiers, contractual terms, quantities, or parties.

For a recommendation feature, the team may accept variation in ranking. It may not accept restricted recommendations, systematic suppression of required options, or degradation in a commercially important segment.

For a risk-scoring feature, the team may accept small score movement. It may not accept threshold crossings in critical cases without review, unexplained segment drift, or weak behaviour in the exact cases the model is meant to protect.

This is not bureaucracy.

This is what testability looks like when the product behaviour is partly statistical.

A QA team does not need to pretend that every output has one golden answer. It does need to force the product, engineering, data, risk, and compliance conversation into language that can be tested.

“Looks reasonable” is not a release criterion.

“Acceptable variation is defined and evidenced” is closer.

## Metamorphic testing is not niche here

When the exact expected output is hard to define, one useful move is to test relationships.

That is the practical value of metamorphic testing.

Instead of asking only whether one output is correct, we ask what should remain true when the input is changed in a controlled way.

If a user query is rephrased without changing its meaning, the intent classification should not flip.

If irrelevant formatting noise is added to a document, extracted facts should remain stable.

If two applicants, claims, customers, or cases are equivalent under the business rules, the model-supported recommendation should not diverge without a relevant reason.

If a protected attribute should not influence the decision, removing or changing it should not materially change the outcome.

If a document contains a number, currency, or date, a summary should not alter it.

This is not a magic technique. The relations still need domain knowledge. Some input transformations that look harmless to a tester may be meaningful in context. Some apparent invariants may be false. Poor metamorphic relations create false confidence just as easily as poor test cases.

But the technique fits the problem.

It gives testers a way to challenge AI behaviour when an exact expected answer is unavailable or insufficient. It also gives teams a better vocabulary than “the model is unpredictable.”

Unpredictable in what way?

Under which transformation?

With what consequence?

That is a testable conversation.

## LLM features add a product-safety problem

Large language model features bring the probabilistic-output problem into a more public and more seductive form.

The answer reads well.

That is part of the danger.

A generated answer can be fluent, useful, and wrong. It can cite the wrong source. It can omit uncertainty. It can follow malicious instructions embedded in user-controlled content. It can reveal sensitive data. It can produce output that another system treats as trusted input.

OWASP’s Top 10 for Large Language Model Applications lists risks including prompt injection, sensitive information disclosure, insecure output handling, excessive agency, and overreliance. See [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/).

Those risks belong in QA conversations because they are product failure modes, not only security findings.

If an assistant gives a false answer and the user acts on it, that is product harm.

If an LLM-generated output is passed into a downstream system without validation, that is product design.

If the interface encourages the user to trust the answer more than the evidence supports, that is UX and governance.

If the system has tool access and can take action, the failure mode moves from “bad text” to “bad operation.”

The UK National Cyber Security Centre has also argued that prompt injection should not be treated as a neat equivalent to SQL injection, because current LLMs do not enforce a robust security boundary between instructions and data in the way classical systems do. Their framing of LLMs as “inherently confusable deputies” is blunt, but useful. See [NCSC: Prompt injection is not SQL injection](https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection).

That has a direct testing implication.

For LLM features, QA should not only test whether the generated answer is useful. QA should test whether the product constrains the possible damage when the answer is wrong, manipulated, over-trusted, or consumed by another system.

The output is only part of the risk.

The authority given to the output is the rest of it.

## Release criteria need to match the impact

Not every AI feature deserves the same level of ceremony.

A low-risk internal tagging assistant does not need the same evidence model as an AI feature influencing credit, healthcare, employment, insurance, legal review, market-sensitive analysis, safety operations, or access to services.

That should be obvious. It often is not.

Teams like reusable checklists because reusable checklists feel efficient. But AI risk is highly dependent on intended use, user population, autonomy, data sensitivity, failure cost, and the extent to which humans can detect or correct wrong outputs.

The EU AI Act uses a risk-based approach and places stricter obligations on high-risk AI systems, including risk management, data quality, logging, documentation, transparency, human oversight, robustness, cybersecurity, and accuracy. See the European Commission’s overview of the [AI Act regulatory framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai).

Even when a feature is not legally classified as high-risk, the engineering lesson still applies.

The higher the consequence of being wrong, the stronger the evidence needs to be.

A serious AI release decision should be able to explain the intended use, the non-use, the known failure modes, the evaluation method, the threshold logic, the monitoring plan, and the fallback path. If the answer to any of those is “we will watch it after release,” the next question is what exactly will be watched and who can act when the signal turns bad.

Post-release monitoring is not a comfort blanket.

It is only useful if the signals are meaningful, timely, owned, and connected to a decision.

## Monitoring is part of the test strategy

AI features can degrade after release.

The model may not change, but the world around it does. Input formats change. User behaviour changes. Upstream systems change. Data quality changes. Prompt patterns change. Fraud patterns change. Business rules change. The user population changes. A new integration starts feeding subtly different content. A model update shifts behaviour in a way that looks small globally but hurts a critical slice.

That is why AI testing cannot end at deployment.

The production environment needs signals that describe behaviour, not only availability.

For example, a team may need to watch confidence score movement, input distribution changes, fallback rates, refusal rates, human override rates, user corrections, complaint patterns, segment-specific degradation, hallucination reports, safety violations, downstream exception rates, latency, and cost spikes.

The exact signals depend on the feature.

The principle does not.

If the release argument depends on behaviour remaining within an acceptable range, the team needs a way to know when behaviour has left that range.

This is where QA management and release governance should be closer than usual. A probabilistic feature may pass pre-release evaluation and still need a staged rollout, kill switch, threshold guard, human review period, or enhanced monitoring window.

That is not fear.

That is proportionate control.

## Tools help, but only after the test question is clear

There are useful tools in this space, but they do not remove the need for judgement.

A tool can help run evaluations, compare outputs, inspect traces, monitor drift, or red-team an LLM workflow. It cannot decide what kind of wrong answer your product can tolerate. It cannot tell you which customer segment carries the real risk. It cannot turn a vague product expectation into a release criterion.

That is still the work.

The better way to talk about AI testing tools is to connect them to the type of evidence the team needs.

For traditional ML and data-heavy systems, tools such as [Evidently](https://docs.evidentlyai.com/), [Deepchecks](https://docs.deepchecks.com/stable/getting-started/welcome.html), [WhyLabs](https://docs.whylabs.ai/docs/), and [Fiddler](https://www.fiddler.ai/ml-model-monitoring) can support checks around data quality, data drift, model monitoring, distribution changes, performance degradation, and production behaviour.

For LLM and RAG applications, tools such as [Ragas](https://docs.ragas.io/), [TruLens](https://www.trulens.org/), [Arize Phoenix](https://arize.com/docs/phoenix), and [LangSmith](https://docs.langchain.com/langsmith/home) can help evaluate retrieval quality, groundedness, answer relevance, traces, tool calls, latency, and workflow-level behaviour.

For prompt and model evaluation, tools such as [promptfoo](https://www.promptfoo.dev/docs/intro/), [DeepEval](https://deepeval.com/), and [OpenAI Evals](https://github.com/openai/evals) are useful examples of moving away from casual prompt checking and toward repeatable evals.

For LLM security and adversarial testing, tools and references such as [Giskard](https://docs.giskard.ai/), [promptfoo red teaming](https://www.promptfoo.dev/docs/guides/), [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/), and Microsoft’s [PyRIT](https://github.com/Azure/PyRIT) can help teams explore prompt injection, unsafe output, sensitive information disclosure, excessive agency, and other failure modes that do not show up in a normal happy-path demo.

None of these tools should become the strategy.

They are instrumentation around the strategy.

If the team has not defined acceptable variation, failure tolerance, high-risk slices, fallback behaviour, and release thresholds, tool output will only make the uncertainty look more professional.

## What QA should insist on

QA does not need to own the model. QA does need to challenge the evidence around the product behaviour.

For AI features, the useful questions are rarely the loudest ones.

The question is not “Did we test the AI?”

The question is whether the team has enough evidence for the decision the product is about to make possible.

That evidence usually has to cover a few things:

• What the feature is intended to do, and what it must not be used for

• What kind of variation is acceptable, and what kind is a defect

• Which outputs require exact correctness, and which allow tolerance

• Which metric is being used, and why that metric matches the product risk

• Which slices were tested separately because the average is not good enough

• What happens when confidence is low, missing, unstable, or contradictory

• Whether deterministic business rules override AI output where they should

• Whether the user can understand, challenge, ignore, or escalate the output

• Whether the system can be monitored, disabled, rolled back, or routed around

• Who is accepting the residual risk, and on what evidence

That list is not a template. It is a set of pressure points.

The actual test strategy depends on the product.

A chatbot needs different evidence from a scoring model. A scoring model needs different evidence from a recommender. A recommender needs different evidence from an extraction system. An internal assistant needs different governance from a customer-facing decision support feature.

The QA skill is in mapping the evidence to the risk without turning the process into theatre.

## The useful shift

Testing AI features when the answer is probabilistic requires a different kind of discipline.

Not less discipline.

Different discipline.

Expected results still matter, but they may become expected boundaries, expected relationships, expected distributions, expected refusal behaviour, expected monitoring signals, or expected human review paths.

Pass and fail still matter, but they may need to be argued at dataset level, segment level, workflow level, and release-risk level.

Automation still matters, but it will not carry the whole strategy. Some AI risks require expert review, adversarial exploration, statistical evaluation, production monitoring, and governance decisions that cannot be reduced to a generated pack of test cases.

The weak version of AI testing asks whether the model gave a good answer in the examples we tried.

The stronger version asks whether the product can be trusted when the answer varies, the context changes, the user over-trusts it, the input is hostile, the data drifts, or the output moves downstream.

That is where QA belongs.

Not as the department that says AI is too risky.

As the function that refuses to let uncertainty become invisible.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*