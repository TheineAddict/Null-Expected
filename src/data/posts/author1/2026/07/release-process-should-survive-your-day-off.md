---
title: "Your Release Process Should Survive Your Day Off"
excerpt: "Three GTD practices that reduce key-person dependency and turn release knowledge into a workflow the team can actually continue."
tags: ["expected-behaviour", "quality-mindset"]
author: "author1"
date: "2026-07-31"
readTime: "4 min read"
slug: "release-process-should-survive-your-day-off"
---

*Expected Behaviour is a lightweight weekly column about the small process failures that create disproportionate delivery problems.*

A release process can look perfectly established until the person who knows how it actually works takes a week off.

The tracker still exists. The procedure is still in Confluence. The meetings remain in everyone’s calendars. Yet basic questions suddenly become difficult to answer.

Who normally provides this approval? Was this exception already accepted? Which deployment step is still manual? Why was that dependency moved out of scope? Who needs to be chased, and when?

Teams often describe this as someone having “their own way of doing things.” It can also be treated as a form of job security: become indispensable by being the person who knows where everything is buried.

In practice, it creates two problems.

The person carrying the knowledge remains permanently interruptible. The team becomes operationally fragile whenever that person is unavailable.

The first three stages of the [Getting Things Done methodology](https://gettingthingsdone.com/what-is-gtd/) offer a useful way to address this: **Capture, Clarify and Organize**.

## Capture: collect what has your attention

The official GTD definition of Capture is simple:

> Collect what has your attention.

In personal GTD practice, this means moving open loops out of your head and into a trusted external system. David Allen’s [guidance on capture](https://gettingthingsdone.com/2011/10/gtd-best-practices-collect-part-1-of-5/) is explicit that commitments should not depend on your mind continuously remembering them.

For a release manager, the same principle applies to operational knowledge.

Capture the information that another person would need to continue the release:

• Decisions made during meetings or in chat  
• Exceptions to the standard release process  
• Unresolved dependencies and questions  
• Manual activities that are not visible in the delivery tooling  
• Approvals that have been requested but not received  
• Commitments made to stakeholders  
• Relevant contacts, access requirements and escalation routes  
• Lessons from previous releases that affect the current one  

This is not an instruction to document every conversation or create a second administrative job around the release.

The useful test is narrower:

> Would this information block, delay or materially change the release if I were unavailable tomorrow?

If the answer is yes, it should not exist only in your head.

## Clarify: process what it means

The official GTD definition of Clarify is:

> Process what it means.

Capturing “Security approval pending” removes the thought from your head, but it does not yet make the item useful to anyone else.

Clarification means deciding what the item represents and what needs to happen next.

For example:

**Unclear**

`Security approval pending`

**Clarified**

`Waiting for: Marta to confirm security approval by Thursday at 14:00. Follow up on Thursday morning if no response is received.`

The clarified version tells another release manager:

• What is expected  
• Who currently owns the next move  
• When the response is needed  
• When intervention becomes necessary  

The same approach applies to other release information:

• Is this a next action?  
• Is someone else responsible, making it a waiting-for item?  
• Is it a recorded decision?  
• Is it a risk requiring mitigation or acceptance?  
• Is it reference information for future releases?  
• Is it obsolete and safe to remove?  

A status label describes a condition. A clarified item explains how the team should respond to it.

## Organize: put it where it belongs

The official GTD definition of Organize is:

> Put it where it belongs.

Captured and clarified information still has limited value if it remains scattered across personal notes, meeting transcripts, private messages and old email threads.

In release management, organizing means placing each type of information where the team would reasonably expect to find it:

• Actions in the release tracker  
• Dependencies and external commitments in a visible waiting-for list  
• Decisions in a dated decision log  
• Risks in the release risk register  
• Repeatable operational steps in the release runbook  
• Evidence beside the approval or control that requires it  
• Reference material in the shared team workspace  

The tool matters less than the agreement around it.

Jira, Confluence, SharePoint, a release platform or a structured spreadsheet can all work. None of them is a trusted system when the team must still ask one particular person where the real information lives.

## A ten-minute Friday check

Before finishing for the week, choose one active release and imagine that you will be unexpectedly unavailable on Monday.

Then apply the three GTD stages:

• **Capture:** Write down anything important that still exists only in your memory, inbox or private notes.

• **Clarify:** Decide what each item means, who owns the next move and what should happen next.

• **Organize:** Put it in the shared location where another release manager or team member would look for it.

You do not need to create a perfect handover document every Friday. You need to leave the release in a state that can be understood and continued without reconstructing your thinking from fragments.

A process that only works when a particular person is present is not yet an established process. It is individual expertise being used as operational infrastructure.

If the release cannot survive your day off, the next action is not to become more available. It is to improve the system before absence turns an ordinary gap into a delivery risk.

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*