import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SpecStep {
  keyword: 'Given' | 'When' | 'Then' | 'And' | 'Step';
  text: string;
}

interface Spec {
  title: string;
  preconditions: string[];
  steps: SpecStep[];
  expectedResults: string[];
  filename: string;
}

class SpecParser {
  parse(content: string, filename: string): Spec {
    const lines = content.split('\n');
    const spec: Spec = {
      title: '',
      preconditions: [],
      steps: [],
      expectedResults: [],
      filename,
    };

    let currentSection: 'none' | 'preconditions' | 'steps' | 'expected' = 'none';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('# ')) {
        spec.title = line.substring(2).trim();
        continue;
      }

      if (line === '## Preconditions') {
        currentSection = 'preconditions';
        continue;
      }

      if (line === '## Steps') {
        currentSection = 'steps';
        continue;
      }

      if (line === '## Expected Results') {
        currentSection = 'expected';
        continue;
      }

      if (line.startsWith('##')) {
        currentSection = 'none';
        continue;
      }

      if (line === '' || line.startsWith('---')) {
        continue;
      }

      if (currentSection === 'preconditions') {
        if (line.startsWith('- ')) {
          spec.preconditions.push(line.substring(2).trim());
        }
      } else if (currentSection === 'steps') {
        const stepMatch = line.match(/^\*\*(Given|When|Then|And)\*\*\s+(.+)$/);
        if (stepMatch) {
          spec.steps.push({
            keyword: stepMatch[1] as any,
            text: stepMatch[2].trim(),
          });
        } else if (line.match(/^\d+\.\s+/)) {
          spec.steps.push({
            keyword: 'Step',
            text: line.replace(/^\d+\.\s+/, '').trim(),
          });
        }
      } else if (currentSection === 'expected') {
        if (line.startsWith('- ')) {
          spec.expectedResults.push(line.substring(2).trim());
        }
      }
    }

    return spec;
  }
}

class TestGenerator {
  private baseURL = "http://localhost:5173";

  generate(spec: Spec): string {
    const testName = this.sanitizeTestName(spec.title);
    const imports = this.generateImports();
    const testSuite = this.generateTestSuite(spec);

    return `${imports}\n\n${testSuite}`;
  }

  private sanitizeTestName(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private generateImports(): string {
    return `import { test, expect } from '@playwright/test';
import { findLink, findButton, findHeading } from '../../utils/locators';`;
  }

  private generateTestSuite(spec: Spec): string {
    const testName = spec.title;
    const testSteps = this.generateTestSteps(spec.steps);

    return `test.describe('${testName}', () => {
  test('${testName}', async ({ page }) => {
${testSteps}
  });
});`;
  }

  private generateTestSteps(steps: SpecStep[]): string {
    const generatedSteps: string[] = [];
    let lastKeyword: string = '';

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const keyword = step.keyword === 'And' ? lastKeyword : step.keyword;
      const code = this.generateStepCode(keyword, step.text, i + 1);

      if (code) {
        const comment = step.keyword === 'And'
          ? `    // And ${step.text}`
          : `    // ${step.keyword} ${step.text}`;
        generatedSteps.push(comment);
        generatedSteps.push(code);
      }

      if (step.keyword !== 'And') {
        lastKeyword = step.keyword;
      }
    }

    return generatedSteps.join('\n');
  }

  private generateStepCode(keyword: string, text: string, stepNumber: number): string {
    const lowerText = text.toLowerCase();

    if (keyword === 'Given') {
      if (lowerText.includes('home page') || lowerText.includes('homepage')) {
        return `    await page.goto('/');`;
      }
      if (lowerText.includes('blog listing') || lowerText.includes('blog page')) {
        return `    await page.goto('/blog');`;
      }
      return `    // TODO: Implement precondition - ${text}`;
    }

    if (keyword === 'When') {
      if (lowerText.includes('click') && lowerText.includes('first') && lowerText.includes('post')) {
        return `    const firstPost${stepNumber} = page.locator('main article a, main [class*="post"] a').first();
    await firstPost${stepNumber}.click();
    await page.waitForLoadState('networkidle');`;
      }

      if (lowerText.includes('click') && (lowerText.includes('reset') || lowerText.includes('clear'))) {
        return `    const resetButton${stepNumber} = await findButton(page, /reset|clear|all/i);
    await resetButton${stepNumber}.click();
    await page.waitForTimeout(500);`;
      }

      if (lowerText.includes('click') && (lowerText.includes('tag') || lowerText.includes('filter'))) {
        return `    const tagButton${stepNumber} = page.locator('button[class*="tag"], a[class*="tag"]').first();
    await tagButton${stepNumber}.click();
    await page.waitForTimeout(500);`;
      }

      if (lowerText.includes('click') && lowerText.includes('blog')) {
        return `    const blogLink${stepNumber} = await findLink(page, /blog/i);
    await blogLink${stepNumber}.click();
    await page.waitForURL(/\\/blog/);`;
      }

      if (lowerText.includes('click')) {
        const match = text.match(/clicks?\s+(?:on\s+)?(?:the\s+)?["']?([^"']+)["']?/i);
        if (match) {
          const linkText = match[1].trim();
          return `    const link${stepNumber} = await findLink(page, /${linkText}/i);
    await link${stepNumber}.click();
    await page.waitForLoadState('networkidle');`;
        }
      }

      return `    // TODO: Implement action - ${text}`;
    }

    if (keyword === 'Then') {
      if (lowerText.includes('blog listing') && lowerText.includes('displayed')) {
        return `    await expect(page).toHaveURL(/\\/blog/);
    const blogHeading${stepNumber} = await findHeading(page, /blog|posts/i);
    await expect(blogHeading${stepNumber}).toBeVisible();`;
      }

      if (lowerText.includes('blog post') && lowerText.includes('displayed')) {
        return `    await expect(page).toHaveURL(/\\/blog\\/.+/);`;
      }

      if (lowerText.includes('post') && lowerText.includes('title')) {
        return `    const postTitle${stepNumber} = page.locator('h1');
    await expect(postTitle${stepNumber}).toBeVisible();
    await expect(postTitle${stepNumber}).not.toBeEmpty();`;
      }

      if (lowerText.includes('post') && lowerText.includes('content')) {
        return `    const postContent${stepNumber} = page.locator('article, main');
    await expect(postContent${stepNumber}).toBeVisible();`;
      }

      if (lowerText.includes('listing') && lowerText.includes('update')) {
        return `    await page.waitForTimeout(300);
    const posts${stepNumber} = page.locator('article, [class*="post"]');
    await expect(posts${stepNumber}.first()).toBeVisible();`;
      }

      if (lowerText.includes('no filter') || (lowerText.includes('filter') && lowerText.includes('not') && lowerText.includes('active'))) {
        return `    const activeFilters${stepNumber} = page.locator('[class*="active"], [aria-pressed="true"]');
    const count${stepNumber} = await activeFilters${stepNumber}.count();
    expect(count${stepNumber}).toBe(0);`;
      }

      if (lowerText.includes('all posts') || lowerText.includes('show all')) {
        return `    const posts${stepNumber} = page.locator('article, [class*="post"]');
    const postCount${stepNumber} = await posts${stepNumber}.count();
    expect(postCount${stepNumber}).toBeGreaterThan(0);`;
      }

      if (lowerText.includes('filter') && (lowerText.includes('active') || lowerText.includes('indicated'))) {
        return `    const activeFilter${stepNumber} = page.locator('[class*="active"], [aria-pressed="true"]');
    await expect(activeFilter${stepNumber}).toBeVisible();`;
      }

      return `    // TODO: Implement assertion - ${text}`;
    }

    return `    // ${keyword}: ${text}`;
  }
}

async function generateTests() {
  const specsDir = path.join(__dirname, 'specs');
  const generatedDir = path.join(__dirname, 'generated');

  if (!fs.existsSync(specsDir)) {
    console.error(`Specs directory not found: ${specsDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(generatedDir)) {
    fs.mkdirSync(generatedDir, { recursive: true });
  }

  console.log('Generating tests from specifications...\n');

  const specFiles = fs.readdirSync(specsDir).filter(f => f.endsWith('.md'));

  if (specFiles.length === 0) {
    console.log('No specification files found in', specsDir);
    return;
  }

  const parser = new SpecParser();
  const generator = new TestGenerator();

  let generatedCount = 0;

  for (const specFile of specFiles) {
    const specPath = path.join(specsDir, specFile);
    const content = fs.readFileSync(specPath, 'utf-8');

    console.log(`Processing: ${specFile}`);

    const spec = parser.parse(content, specFile);

    if (!spec.title) {
      console.warn(`  ⚠️  Skipping ${specFile}: No title found`);
      continue;
    }

    console.log(`  Title: ${spec.title}`);
    console.log(`  Steps: ${spec.steps.length}`);

    const testCode = generator.generate(spec);

    const outputFilename = specFile.replace('.md', '.spec.ts');
    const outputPath = path.join(generatedDir, outputFilename);

    fs.writeFileSync(outputPath, testCode, 'utf-8');
    console.log(`  ✓ Generated: ${outputFilename}\n`);

    generatedCount++;
  }

  console.log(`\nGenerated ${generatedCount} test file(s) in ${generatedDir}`);
  console.log('\nRun with: npm run test:gen:run');
}

generateTests().catch(error => {
  console.error('Test generation failed:', error);
  process.exit(1);
});
