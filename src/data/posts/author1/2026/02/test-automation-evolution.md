---
title: "How Test Automation Has Changed: From Heavy Frameworks to Flexible Tools"
excerpt: "Five years ago, Selenium was king. Today, web automation is a toolchain: E2E runners, component workflows, visual AI, cloud grids, and low-code platforms - plus a different tester mindset."
tags: ["qa-processes", "industry-trends", "featured"]
author: "author1"
date: "2026-02-02"
readTime: "15 min read"
slug: "test-automation-evolution"
---

Five-ish years ago, “web test automation” usually meant one thing: Selenium WebDriver, plus a homegrown framework that quietly became a second product. Your value as an automation person was strongly correlated with how well you could engineer that framework, keep it stable, and explain its failures at 02:00.

Today, web automation is no longer a single choice. It’s a spectrum of approaches, and it’s created a real shift in what teams hire for, what “good tests” look like, and what skills are actually scarce.

Not because “Selenium is dead” (it isn’t). But because the industry stopped treating browser automation as a monolith and started treating it as a toolchain problem.


### The toolchain era (what changed, not just what’s trendy)

The last five years gave us multiple parallel “lanes” that can all be valid in the same organisation:

• Modern E2E frameworks that bias for fast feedback and strong debugging ergonomics: Playwright ([https://playwright.dev/](https://playwright.dev/)) and Cypress ([https://www.cypress.io/](https://www.cypress.io/))

• DevTools-first automation that’s basically “the browser platform talking back”: Puppeteer ([https://pptr.dev/](https://pptr.dev/))

• A modernised WebDriver ecosystem (still “classic”, but with better DX): WebdriverIO ([https://webdriver.io/](https://webdriver.io/)) and Nightwatch ([https://nightwatchjs.org/](https://nightwatchjs.org/))

• “No WebDriver” frameworks that aim to remove whole classes of flakiness and setup pain: TestCafe ([https://testcafe.io/](https://testcafe.io/))

• Component-first testing workflows that move UI validation earlier: Storybook ([https://storybook.js.org/](https://storybook.js.org/)) and Chromatic ([https://www.chromatic.com/](https://www.chromatic.com/))

• Visual testing moving from “nice idea” to “automation primitive”: Applitools Ultrafast Grid ([https://applitools.com/](https://applitools.com/))

• Low-code/no-code and AI-assisted platforms that explicitly target maintenance pain: Tosca ([https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation](https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation)), Katalon ([https://docs.katalon.com/](https://docs.katalon.com/)), mabl ([https://www.mabl.com/low-code-test-automation](https://www.mabl.com/low-code-test-automation)), Testim ([https://www.testim.io/](https://www.testim.io/)), Functionize ([https://www.functionize.com/test-maintenance](https://www.functionize.com/test-maintenance))

Under the hood, even the protocols are evolving. There’s now a W3C “WebDriver BiDi” specification ([https://www.w3.org/TR/webdriver-bidi/](https://www.w3.org/TR/webdriver-bidi/)), and Selenium documents BiDi support inside WebDriver ([https://www.selenium.dev/documentation/webdriver/bidi/](https://www.selenium.dev/documentation/webdriver/bidi/)). That matters because it’s part of how “classic” automation is modernising rather than fossilising. ([Tricentis][1])

### Selenium didn’t just dominate - it shaped the tester identity

Selenium’s own docs describe what made it so foundational:

> “WebDriver drives a browser natively, as a user would, either locally or on a remote machine using the Selenium server.” [[https://www.selenium.dev/documentation/webdriver/](https://www.selenium.dev/documentation/webdriver/)] ([Selenium][2])

That sentence contains the old world in miniature: native browser control, local vs remote grids, and the implied engineering burden of making it reliable at scale.

In the Selenium era, the “automation tester” often looked like a software engineer building a framework:

• Heavy Page Object layers, wrappers, helpers, and custom waits

• Grid orchestration and browser/driver version management

• Parallelisation that’s possible, but usually not “one flag and done”

• Failure triage driven by logs and screenshots, not rich execution traces

• A mindset that the automation codebase must be engineered like a long-lived system, because it is

None of that is inherently bad. It’s just optimising for a specific kind of reality: complex estates, long-lived products, compliance constraints, and environments where you cannot “just use a SaaS runner”.

### What the modern tools did differently (and why it changed behaviour)

Modern frameworks didn’t just add features. They baked in opinions that changed how teams behave.

**Playwright** makes test authoring and debugging feel like a first-class workflow, not an afterthought. For example, it explicitly treats test generation as a built-in capability:

> “Record actions and generate tests for multiple languages.” [[https://playwright.dev/docs/test-cli](https://playwright.dev/docs/test-cli)] ([Playwright][3])

And it treats trace-based debugging as a normal part of failure analysis:

> “The trace viewer is a tool to explore recorded Playwright traces…” [[https://playwright.dev/docs/trace-viewer](https://playwright.dev/docs/trace-viewer)] ([testomat.io][4])

**Cypress** went even harder on “debug UX”, with an app that makes execution visible and inspectable:

> “The Cypress App takes snapshots of your application and enables you to time travel…” [[https://docs.cypress.io/app/get-started/why-cypress](https://docs.cypress.io/app/get-started/why-cypress)] ([docs.cypress.io][5])

Meanwhile, DevTools-first tools like **Puppeteer** position themselves as an API over the browser’s native debugging protocols (and increasingly BiDi):

> “Puppeteer is a JavaScript library… to control Chrome or Firefox over the DevTools Protocol or WebDriver BiDi.” [[https://classic.yarnpkg.com/en/package/puppeteer](https://classic.yarnpkg.com/en/package/puppeteer)] ([Yarn][6])

And some tools explicitly market themselves as removing whole categories of setup overhead:

> “No WebDriver required, no manual timeouts, cross-browser capable out of the box.” [[https://testcafe.io/](https://testcafe.io/)] ([testcafe.io][7])

The net effect is not just “less code”. It’s less *framework invention*. Which is why the tester identity shifted away from “framework engineer” toward “toolchain pragmatist”.

### Alex and Sam (two mindsets, both rational)

The easiest way to talk about this without turning it into a religion is with two humans.

#### Alex: the framework engineer (Selenium-native thinking, still relevant)

Alex treats automation as software engineering with long-term architectural concerns. The test suite is a product. It’s designed to survive. It’s versioned. It has conventions. It has an internal “way” of doing things, because without that, Selenium at scale becomes chaos.

Alex’s default mode is: control the environment, control the data, control the execution.

Alex’s strengths aren’t just “coding”. They’re systems skills:

• Building maintainable abstractions (Page Objects and beyond)

• Designing stable selectors and interaction layers that survive UI churn

• Engineering CI execution to be predictable under load

• Making failures diagnosable and auditable

• Handling enterprise constraints (proxy/SAML/SSO, locked down networks, bespoke certs, air-gapped setups)

This is the mindset that fits regulated environments and sensitive product work where cloud services are either forbidden or politically expensive. If you can’t run tests outside the perimeter, you can’t “rent scale”. You build it.

The trade-off is that Alex can accidentally end up owning a framework that needs constant gardening. A framework can become a gravity well: it pulls time, design decisions, and people into maintaining the test system itself. When the UI changes fast, this becomes a tax. When the product has to move slowly (regulation, audit, risk appetite), it’s a cost worth paying.

#### Sam: the toolchain pragmatist (modern automation as delivery capability)

Sam treats automation as a delivery capability: fast signals, high leverage, minimum ceremony. The suite doesn’t need to be “beautiful”. It needs to be trustworthy, fast to run, and fast to debug.

Sam’s default mode is: reduce time-to-signal, reduce maintenance, increase visibility.

Sam’s toolkit is usually multi-layered:

• E2E checks in Playwright or Cypress

• Component isolation for UI behaviour in Storybook

• Visual diffs for the “it still works but looks wrong” category

• Cloud execution for cross-browser/device scale when it’s allowed

• Low-code and AI-assisted tools where they remove toil rather than hide risk

This is where the “less code” story gets real, because the whole point is to avoid writing plumbing.

Storybook’s own positioning captures why component-first approaches exploded:

> “Storybook is a frontend workshop for building UI components and pages in isolation.” [[https://storybook.js.org/](https://storybook.js.org/)] ([Storybook][8])

Chromatic frames UI testing as something that happens continuously, across a fleet of browsers:

> “Chromatic renders every possible state of your UI in a fleet of cloud browsers…” [[https://www.chromatic.com/features/test](https://www.chromatic.com/features/test)] ([chromatic.com][9])

Applitools pushes visual coverage into “seconds, not days” territory:

> “Ultrafast Grid allows you perform visual testing across multiple browsers and devices in seconds…” [[https://applitools.com/docs/eyes/concepts/test-execution/ultrafast-grid](https://applitools.com/docs/eyes/concepts/test-execution/ultrafast-grid)] ([applitools.com][10])

And low-code platforms explicitly pitch the idea that automation shouldn’t be gated by deep programming skill:

> “Model-based test automation is a codeless approach that literally anyone can learn and use.” [[https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation](https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation)] ([Tricentis][1])

Sam’s trade-off is different: tool sprawl and vendor gravity. Six services later, the test stack becomes a procurement problem, a security review problem, and a “who owns this contract” problem. Also, when a tool promises to remove complexity, it doesn’t delete it - it relocates it. Sometimes that’s fine. Sometimes it’s a trap.

### The skills shift: from “framework engineering” to “adaptability engineering”

A big part of your article’s thesis is the identity shift: from the programmer-tester archetype (OOP, patterns, algorithmic thinking applied to test architecture) toward the flexible tester-engineer archetype (curiosity, quick assembly of solutions, pragmatic layering).

This is real, but it’s easy to misunderstand.

It’s not that technical skill became irrelevant. It’s that the bottleneck moved.

In the Selenium era, the bottleneck was often “can we build and maintain the framework and infrastructure”. In the toolchain era, the bottleneck is often “can we design the right signals, at the right layer, with the right cost”.

That’s why you see tools positioning themselves around maintenance and stability rather than pure authoring.

Testim makes that promise very explicit:

> “Smart locators… automatically self-heal to keep tests working even as applications change.” [[https://www.testim.io/](https://www.testim.io/)] ([testim.io][11])

Functionize says the same thing, just more bluntly:

> “Renaming or restyling a button, even moving it on the page won’t break your tests.” [[https://www.functionize.com/test-maintenance](https://www.functionize.com/test-maintenance)] ([functionize.com][12])

mabl leans into “agentic” language - a sign of where the market is trying to go:

> “Our agentic tester… complements your team’s human expertise with a digital teammate…” [[https://www.mabl.com/agentic-testing-for-software-development-mabl](https://www.mabl.com/agentic-testing-for-software-development-mabl)] ([mabl.com][13])

Even Katalon’s docs still highlight record-and-playback as a first-class entry point:

> “This tutorial demonstrates how to create a Web UI test case… using Record and Playback.” [[https://docs.katalon.com/katalon-studio/get-started/sample-projects/webui/webui-create-and-run-web-ui-test-case-using-record-and-playback-in-katalon-studio](https://docs.katalon.com/katalon-studio/get-started/sample-projects/webui/webui-create-and-run-web-ui-test-case-using-record-and-playback-in-katalon-studio)] ([docs.katalon.com][14])

This is the modern story in one sentence: automation moved from “write a lot of code to drive the browser” to “get stable signals with minimal bespoke machinery”.

### A concrete example: the “wait tax” got priced into the tools

One of the most practical differences between old and new is how much time you spend fighting timing and state. In Selenium-heavy suites, explicit waiting strategies were practically a rite of passage. In modern frameworks, a lot of that pain is intentionally absorbed by the runner.

A Selenium-flavoured snippet (the kind Alex has written 1,000 times):

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("[data-testid='save']")));
button.click();
```

And a Playwright-flavoured equivalent (what Sam expects to be the default experience):

```ts
await page.getByTestId("save").click();
```

The point isn’t that Playwright never needs thought. It’s that modern frameworks assume the web is asynchronous and build auto-waiting + better debugging into the core experience, instead of forcing every team to reinvent it. That changes velocity. It also changes who can contribute to automation, because the barrier to writing a reliable first test is simply lower.

### Where Alex beats Sam (and why it’s not nostalgia)

There are scenarios where the old-school approach is still the better engineering decision.

• Regulated industries with strict data perimeter requirements: finance, healthcare, defence

• Products with unreleased features that cannot leak into third-party logs or screenshots

• Environments with restricted internet access, corporate proxies, or air-gapped test labs

• Legacy browser support requirements

• Organisations that need full auditability of test execution and tooling changes

This is where Selenium’s “local or remote machine using the Selenium server” model remains powerful. [[https://www.selenium.dev/documentation/webdriver/](https://www.selenium.dev/documentation/webdriver/)] ([Selenium][2])
It’s not about stubbornness. It’s about risk surfaces.

### Where Sam beats Alex (and why it’s not just hype)

And there are scenarios where the modern toolchain approach is simply higher leverage.

• High-change web products where UI churn is constant and releases are frequent

• Teams that want quality signals inside PRs, not after merge

• Frontend-heavy orgs where component isolation is a genuine asset

• Products where “it renders wrong” is as damaging as “it throws an error”

• Teams that can use cloud infrastructure to get scale without building a grid

This is also where cloud device/browser platforms become a strategic accelerator. BrowserStack markets:

> “Instant access to 3000+ browsers and real iOS and Android devices…” [[https://www.browserstack.com/](https://www.browserstack.com/)] ([BrowserStack][15])

And Chromatic operationalises “test the UI states in real browsers” as a default expectation, not a special event. [[https://www.chromatic.com/features/test](https://www.chromatic.com/features/test)] ([chromatic.com][9])

![Automation spectrum: WebDriver frameworks to modern runners to component and visual layers to low-code/AI tools](/assets/posts/test-automation-evolution/automation-spectrum.png)

### The uncomfortable truth: modern doesn’t mean simpler - it means redistributed complexity

The new world didn’t remove complexity. It redistributed it:

• Less time writing waits and framework glue

• More time deciding where tests belong (component vs E2E vs visual vs API)

• Less effort building grids

• More effort managing vendors, security reviews, and integration seams

• Less “one framework to rule them all”

• More “portfolio management” of quality signals

That’s why “adaptability” is the real meta-skill now. Not in the fluffy sense. In the engineering sense: being able to reason about trade-offs, choose tools deliberately, and keep the signal-to-noise ratio sane.

### Hiring and career implications (the bar didn’t drop, it shifted)

If a team still hires exclusively for “deep Selenium framework experience”, they can accidentally hire for a world where the primary work is building and defending a framework. If a team hires exclusively for “Playwright/Cypress and vibes”, they can end up with brittle coverage, shallow risk thinking, and a toolchain no one truly owns.

The strong profile in 2026 is bilingual:

• Alex-level respect for maintainability, observability, and risk

• Sam-level pragmatism about speed, debugability, and tool leverage

• Enough engineering depth to know when a low-code tool is a gift vs a liability

• Enough product sense to decide what should be automated at all (and what should not)

The evolution of test automation isn’t “code to no-code”. It’s “framework-centric identity to signal-centric identity”. Selenium made us framework engineers. Modern toolchains are turning us into quality systems designers.

[1]: https://www.tricentis.com/products/automate-continuous-testing-tosca/model-based-test-automation?utm_source=chatgpt.com "Tricentis Tosca – Model-Based Test Automation"
[2]: https://www.selenium.dev/documentation/webdriver/?utm_source=chatgpt.com "WebDriver"
[3]: https://playwright.dev/docs/test-cli?utm_source=chatgpt.com "Command line"
[4]: https://testomat.io/blog/debugging-tracing-playwright-features-tips-techniques-to-running-and-debugging-tests/?utm_source=chatgpt.com "Debugging & Tracing Playwright features – tips, techniques ..."
[5]: https://docs.cypress.io/app/get-started/why-cypress?utm_source=chatgpt.com "Cypress testing solutions | Cypress Documentation | Cypress ..."
[6]: https://classic.yarnpkg.com/en/package/puppeteer?utm_source=chatgpt.com "puppeteer"
[7]: https://testcafe.io/?utm_source=chatgpt.com "TestCafe"
[8]: https://storybook.js.org/?utm_source=chatgpt.com "Storybook: Frontend workshop for UI development"
[9]: https://www.chromatic.com/features/test?utm_source=chatgpt.com "UI Tests • Chromatic"
[10]: https://applitools.com/docs/eyes/concepts/test-execution/ultrafast-grid?utm_source=chatgpt.com "Cross Browser Testing With The Applitools Ultrafast Grid"
[11]: https://www.testim.io/?utm_source=chatgpt.com "Testim"
[12]: https://www.functionize.com/test-maintenance?utm_source=chatgpt.com "Test Maintenance - Self-healing Test Automation with RCA"
[13]: https://www.mabl.com/agentic-testing-for-software-development-mabl?utm_source=chatgpt.com "Agentic Testing"
[14]: https://docs.katalon.com/katalon-studio/get-started/sample-projects/webui/webui-create-and-run-web-ui-test-case-using-record-and-playback-in-katalon-studio?utm_source=chatgpt.com "[WebUI] Create and Run Web UI Test Case using Record and ..."
[15]: https://www.browserstack.com/?utm_source=chatgpt.com "BrowserStack: Most Reliable App & Cross Browser Testing ..."

---

*Disclaimer: The perspectives expressed herein are personal interpretations intended to foster professional dialogue; they do not represent any official stance of current or former employers.*