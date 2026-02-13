import type { Page, Locator } from '@playwright/test';

export interface LocatorOptions {
  role?: string;
  name?: string | RegExp;
  testId?: string;
  text?: string | RegExp;
  css?: string;
  timeout?: number;
}

export class SelfHealingLocator {
  private page: Page;
  private strategies: Array<() => Promise<Locator | null>> = [];
  private strategyNames: string[] = [];

  constructor(page: Page, options: LocatorOptions) {
    this.page = page;
    this.buildStrategies(options);
  }

  private buildStrategies(options: LocatorOptions): void {
    if (options.role && options.name) {
      this.strategies.push(async () => {
        try {
          const locator = this.page.getByRole(options.role as any, { name: options.name });
          if (await locator.count() > 0) {
            return locator;
          }
        } catch (e) {
          // Strategy failed, try next
        }
        return null;
      });
      this.strategyNames.push(`getByRole('${options.role}', name: '${options.name}')`);
    }

    if (options.testId) {
      this.strategies.push(async () => {
        try {
          const locator = this.page.getByTestId(options.testId!);
          if (await locator.count() > 0) {
            return locator;
          }
        } catch (e) {
          // Strategy failed, try next
        }
        return null;
      });
      this.strategyNames.push(`getByTestId('${options.testId}')`);
    }

    if (options.text) {
      this.strategies.push(async () => {
        try {
          const locator = this.page.getByText(options.text!);
          if (await locator.count() > 0) {
            return locator;
          }
        } catch (e) {
          // Strategy failed, try next
        }
        return null;
      });
      this.strategyNames.push(`getByText('${options.text}')`);
    }

    if (options.css) {
      this.strategies.push(async () => {
        try {
          const locator = this.page.locator(options.css!);
          if (await locator.count() > 0) {
            return locator;
          }
        } catch (e) {
          // Strategy failed, try next
        }
        return null;
      });
      this.strategyNames.push(`locator('${options.css}')`);
    }
  }

  async locate(): Promise<Locator> {
    const timeout = 5000;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      for (let i = 0; i < this.strategies.length; i++) {
        const locator = await this.strategies[i]();
        if (locator) {
          if (i > 0) {
            console.log(`[Self-Healing Locator] Primary strategy failed, used fallback: ${this.strategyNames[i]}`);
          }
          return locator;
        }
      }

      await this.page.waitForTimeout(100);
    }

    const attemptedStrategies = this.strategyNames.join(', ');
    throw new Error(
      `[Self-Healing Locator] All locator strategies failed after ${timeout}ms.\n` +
      `Attempted strategies: ${attemptedStrategies}\n` +
      `Current URL: ${this.page.url()}\n` +
      `Suggestion: Verify the element exists and update the locator strategies.`
    );
  }
}

export function findElement(page: Page, options: LocatorOptions): Promise<Locator> {
  const selfHealingLocator = new SelfHealingLocator(page, options);
  return selfHealingLocator.locate();
}

export async function findHeading(page: Page, text: string | RegExp): Promise<Locator> {
  return findElement(page, {
    role: 'heading',
    name: text,
    text: text,
    css: 'h1, h2, h3, h4, h5, h6',
  });
}

export async function findLink(page: Page, name: string | RegExp): Promise<Locator> {
  return findElement(page, {
    role: 'link',
    name: name,
    text: name,
    css: 'a',
  });
}

export async function findButton(page: Page, name: string | RegExp): Promise<Locator> {
  return findElement(page, {
    role: 'button',
    name: name,
    text: name,
    css: 'button',
  });
}

export async function findByTestId(page: Page, testId: string, fallbackCss?: string): Promise<Locator> {
  return findElement(page, {
    testId: testId,
    css: fallbackCss,
  });
}

export async function findNavigation(page: Page): Promise<Locator> {
  return findElement(page, {
    role: 'navigation',
    css: 'nav, header nav',
  });
}

export async function findHeader(page: Page): Promise<Locator> {
  return findElement(page, {
    role: 'banner',
    css: 'header',
  });
}

export async function findFooter(page: Page): Promise<Locator> {
  return findElement(page, {
    role: 'contentinfo',
    css: 'footer',
  });
}
