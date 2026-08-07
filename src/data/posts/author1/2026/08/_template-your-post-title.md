---
title: "Could You Reconstruct Last Tuesday's Release?"
excerpt: "The CRA's 24-hour reporting clock exposes a practical problem: how quickly can you establish what was actually released?"
tags: ["qa-processes", "industry-trends", "featured"]
author: "author1"
date: "2026-08-07"
readTime: "9 min read"
slug: "could-you-reconstruct-last-tuesdays-release"
---

Take last Tuesday's production release and try to reconstruct it without asking anyone who was on the release call.

You need to establish what version was actually deployed, which build artefact it came from, the source revision behind it, the third-party components it contained, which tests were run against that build, the known defects or vulnerabilities at the point of release, where it was deployed and what the rollback position was.

If customers can be on different versions, you also need to know who received what.

None of this is particularly exotic information. Most organisations probably have it.

The problem is whether they can bring it together quickly enough, with enough confidence, when something has gone wrong.

That becomes a much more concrete question in September.

## The reporting clock starts on 11 September

The EU [Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) entered into force in December 2024. Most of its requirements become applicable on 11 December 2027, but one important part arrives considerably earlier.

From **11 September 2026**, manufacturers of products with digital elements covered by the CRA will be required to report actively exploited vulnerabilities and severe incidents affecting the security of those products.

The European Commission's [CRA reporting guidance](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) sets out the reporting sequence:

| Reporting stage | Deadline | Expected information |
| --- | --- | --- |
| Early warning | Within 24 hours of becoming aware | Initial notification of the vulnerability or incident |
| Main notification | Within 72 hours | Product, vulnerability or incident information and an initial assessment |
| Final report - vulnerability | Within 14 days after a corrective or mitigating measure is available | Impact, severity and remediation details |
| Final report - severe incident | Within one month after the 72-hour notification | Detailed impact, likely cause and mitigation |

The notifications will be submitted through the [Single Reporting Platform](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp), established and operated by ENISA. The platform routes the notification to the relevant CSIRT coordinator and ENISA, with further dissemination to the relevant Member States subject to the rules in the CRA.

There is an important detail in the Commission's current guidance that is easy to miss if attention is focused on the 2027 date. The Article 14 reporting requirements apply to products with digital elements that have already been made available on the EU market, including products placed on the market before the CRA becomes fully applicable in December 2027.

For organisations within scope, this is therefore not a 2027 problem.

And the 24-hour deadline is not really a reporting problem either. It is an information problem.

## What happens before anyone opens the reporting platform

The early warning is deliberately an early warning. Nobody expects a complete forensic investigation within the first 24 hours.

By the 72-hour notification, however, the organisation needs a better understanding of what it is dealing with. Depending on whether the report concerns an actively exploited vulnerability or a severe incident, this can include information about the affected product, the nature of the vulnerability or incident, corrective or mitigating measures already taken, measures users can take, and where the product has been made available.

The final report requires more again: severity, impact, remediation and, for incidents, the likely root cause.

ENISA's current [Single Reporting Platform guidance](https://www.enisa.europa.eu/topics/product-security-and-certification/single-reporting-platform-srp) even documents the reporting fields expected at the different stages. That is useful preparation, but filling those fields is downstream of a much messier piece of work.

Someone has to establish the facts first.

Imagine the initial signal is an actively exploited vulnerability in a third-party component.

Security may be able to identify the vulnerability and the affected component immediately. That does not necessarily establish whether the component exists in every supported version of the product, which build first introduced it, what is currently deployed, whether some customers remain on older releases, or how quickly a safe remediation can move through the delivery process.

The relevant information is likely to sit across several systems and several teams.

Engineering understands the component and the implementation. CI/CD records contain build and deployment history. Product knows which versions are supported. Release Management may hold the relationship between release scope, promoted builds, approvals and known issues. Operations has the current runtime picture. Customer-facing teams may know which versions are still in use in environments the organisation does not directly control. Legal, Security or Compliance then have to interpret those facts against the reporting obligation.

In a well-connected delivery organisation, these views reinforce each other.

In a less mature one, they disagree.

A CMDB says one version is deployed. The deployment system shows another. A product team has a spreadsheet because neither is considered reliable. Test evidence is attached to a release ticket, but two builds went through the same test cycle after a late fix. The release notes describe functional change but do not identify the artefact. Support knows that several customers postponed an upgrade, although the central inventory assumes everyone moved.

This is ordinary enterprise delivery messiness. During a regulatory reporting window, it becomes part of incident response.

The 24-hour clock does not care how many Jira projects are involved.

## Release evidence looks different when you need it six months later

Release governance tends to be evaluated while a release is moving forward.

Has testing completed? Are the remaining defects understood? Have the required approvals been obtained? Is the deployment plan ready? Did production validation pass?

Those are legitimate questions, but they encourage us to think about evidence as something needed to get a release through the current decision.

A vulnerability investigation has a different relationship with that evidence. It starts in the present and moves backwards.

A team may need to establish which historical release introduced a component, which artefact actually contained it, whether the same artefact reached every deployment target, what test and security evidence existed at the time, what changed in later releases and which users may still be exposed.

This is where apparently adequate release records can become surprisingly fragile.

A change record with a link to a pipeline may be perfectly usable while the pipeline history is still available. A dashboard may show that regression passed, without retaining enough context to identify exactly which candidate build was tested. Release notes can describe the content accurately for customers while still being useless for artefact-level traceability.

An evidence trail is only as durable as the systems behind the links.

The CRA also makes software composition much more relevant here. Under [Annex I of Regulation (EU) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj), manufacturers are required to identify and document vulnerabilities and components contained in products with digital elements, including by drawing up a software bill of materials in a commonly used, machine-readable format covering at least the product's top-level dependencies.

An SBOM can materially improve the first stage of a vulnerability investigation. If a vulnerable library is announced, it gives the organisation a much better basis for establishing whether its products contain it.

It still has to connect to the rest of the delivery history.

An SBOM associated with version 6.4 is useful only if the organisation can reliably determine where version 6.4 exists. A build record matters only if the build can be connected to an actual release. A release record matters only if it reflects what was really deployed or distributed.

None of this requires an enormous release evidence pack.

It requires the evidence that already exists to form a chain that can be followed later.

## The process crosses organisational boundaries very quickly

There is another problem here that tooling will not solve.

Article 14 places the reporting obligation on the manufacturer. Inside an organisation, that obligation has to become somebody's executable process.

There may be a clear owner for submitting the notification. The harder question is how that person gets to a position where the organisation is comfortable submitting it.

Awareness of a potential reporting event may begin with Security, Engineering, Support or an external vulnerability disclosure. Product scope has to be established. Technical impact needs investigation. Release and deployment information may need reconstruction. Somebody has to understand where affected products were made available. Remediation needs engineering capacity and a realistic delivery route. Customer communication may be required. Legal or Compliance may have to determine whether the event meets the regulatory threshold and what can be reported at each stage.

Those activities already exist in most technology organisations. They are simply not always designed to operate as one process against the same clock.

I would be cautious about a CRA procedure that effectively says "Security owns it" and stops there.

Security can own the vulnerability or incident process without owning the product inventory, historical release evidence, customer deployment state, remediation schedule or the authority to coordinate all the teams needed to establish those things.

This is closer to the coordination problem seen during a difficult production incident or cross-platform release than it is to completing a regulatory form.

Someone needs to keep the evidence, decisions, unknowns and actions moving while different specialists do the investigation.

That role matters particularly in the first hours, when incomplete information is normal and the organisation still has to distinguish between what it knows, what it thinks it knows, and what it is trying to establish.

## I would test the delivery system, not the paperwork

The obvious readiness exercise is a CRA tabletop.

Give the participants a hypothetical vulnerability, the affected product and version, an incident timeline and some customer impact. Walk through the notification process and see whether everyone knows their role.

That can test the procedure. It does not tell you much about whether the organisation can actually produce the information the procedure assumes.

A more useful exercise would start with much less.

Take a real historical product release and introduce a plausible security signal against one of its components. Do not provide the affected build, customer population or deployment history in the scenario. Make the teams establish those things using the systems, permissions, records and escalation routes that would be available during a real investigation.

Watch where the trail becomes uncertain.

Perhaps the release record identifies a version but not the build. Perhaps the SBOM exists but is not retained against historical versions. Perhaps deployment records cover SaaS production but not customer-managed installations. Perhaps test evidence exists but cannot be confidently associated with the final candidate after an emergency fix. Perhaps everyone knows who would normally approve the notification, but there is no clear delegate.

Those findings are much more valuable than a perfectly completed sample report.

They show where reporting readiness depends on institutional memory, manual reconciliation or the availability of a particular person. They also expose problems that matter outside the CRA: incident response, vulnerability management, auditability, rollback analysis and ordinary release governance all benefit from being able to reconstruct what actually happened.

The European Commission published its latest [CRA implementation guidance on 27 July 2026](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation). The guidance is non-binding, but it gives organisations more detail on scope, reporting, risk assessment and implementation at a point when the first major deadline is close.

For organisations expecting to fall within the Article 14 reporting obligations, I would use the remaining time to test the information chain as well as the formal procedure.

Take an ordinary historical release. Follow it from product version to component information, build, testing, deployment and affected users. Include the people who would need to make decisions if a vulnerability were discovered today.

Where the evidence stops connecting, you have found part of the reporting process that still needs work.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*