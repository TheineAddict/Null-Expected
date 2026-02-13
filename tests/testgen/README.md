# Test Generation from Specifications

Automatically generate Playwright tests from markdown specifications.

## Overview

The test generator converts human-readable markdown specifications into executable Playwright tests. This enables specification-driven testing where specs serve as both documentation and test source.

## Usage

### Generate Tests

```bash
npm run test:gen
```

This reads all `.md` files from `tests/testgen/specs/` and generates corresponding `.spec.ts` files in `tests/testgen/generated/`.

### Generate and Run Tests

```bash
npm run test:gen:run
```

This generates tests and immediately runs them with Playwright.

### Run Generated Tests Only

```bash
playwright test tests/testgen/generated
```

## Specification Format

Specifications use a simple markdown format with these sections:

### Structure

```markdown
# Test Title

## Preconditions
- Prerequisite 1
- Prerequisite 2

## Steps

**Given** initial state
**When** user action
**Then** expected result
**And** additional validation

## Expected Results
- Expected outcome 1
- Expected outcome 2
```

### Keywords

- **Given**: Setup and preconditions (initial state)
- **When**: User actions
- **Then**: Assertions and expected outcomes
- **And**: Continuation of previous keyword

## Supported Patterns

The generator recognizes common patterns and generates appropriate Playwright code:

### Given (Preconditions)

| Pattern | Generated Code |
|---------|----------------|
| "user is on the home page" | `await page.goto('/');` |
| "user is on the blog listing page" | `await page.goto('/blog');` |

### When (Actions)

| Pattern | Generated Code |
|---------|----------------|
| "clicks on the Blog link" | Uses `findLink()` helper with regex |
| "clicks on the first blog post" | Selects first post link and clicks |
| "clicks on a tag filter" | Clicks first tag button |
| "clicks on reset button" | Uses `findButton()` helper |

### Then (Assertions)

| Pattern | Generated Code |
|---------|----------------|
| "blog listing page should be displayed" | URL check + heading visibility |
| "blog post page should be displayed" | URL pattern match |
| "post should have a title" | h1 element visibility check |
| "post should have content" | article/main element visibility |
| "listing should update" | Wait + verify posts visible |
| "filter should be active" | Check for active state |
| "no filters should be active" | Count active filters = 0 |

## Example Specifications

### Example 1: Blog Browsing

**File**: `specs/blog-browsing.md`

```markdown
# Browse Blog Listing and Open a Post

## Preconditions
- User is on the home page
- Blog has at least one published post

## Steps

**Given** the user is on the home page

**When** the user clicks on the "Blog" navigation link

**Then** the blog listing page should be displayed

**When** the user clicks on the first blog post

**Then** the blog post page should be displayed
**And** the post should have a title
**And** the post should have content

## Expected Results
- User successfully navigates from home to blog listing
- User can open and view a blog post
- Blog post displays title and content correctly
```

### Example 2: Tag Filtering

**File**: `specs/blog-tag-filter.md`

```markdown
# Filter Blog Posts by Tag

## Preconditions
- User is on the blog listing page
- Blog has posts with various tags

## Steps

**Given** the user is on the blog listing page

**When** the user clicks on a tag filter

**Then** the blog listing should update to show only posts with that tag
**And** the filter should be visually indicated as active

**When** the user clicks on the reset or clear filters button

**Then** the blog listing should show all posts again
**And** no filters should be active

## Expected Results
- Tag filtering works correctly
- Filtered results show only relevant posts
- Reset functionality restores the full listing
- UI indicates active filter state
```

## Generated Test Structure

Each generated test includes:

### Imports

```typescript
import { test, expect } from '@playwright/test';
import { findLink, findButton, findHeading } from '../../utils/locators';
```

### Test Suite

```typescript
test.describe('Test Title', () => {
  test('Test Title', async ({ page }) => {
    // Given steps
    // When steps
    // Then steps
  });
});
```

### Comments

Each step includes a comment showing the original specification:

```typescript
// Given the user is on the home page
await page.goto('/');

// When the user clicks on the Blog link
const blogLink2 = await findLink(page, /blog/i);
await blogLink2.click();
```

## Self-Healing Locators

Generated tests use the self-healing locators from `tests/utils/locators.ts`:

- `findLink(page, text)` - Find links by text with fallback strategies
- `findButton(page, text)` - Find buttons by text with fallback strategies
- `findHeading(page, text)` - Find headings by text with fallback strategies

These locators have multiple strategies to handle UI changes gracefully.

## Creating New Specifications

1. Create a new `.md` file in `tests/testgen/specs/`
2. Follow the specification format (Title, Preconditions, Steps, Expected Results)
3. Use Given/When/Then keywords
4. Run `npm run test:gen` to generate tests
5. Review generated tests and customize if needed

## Extending the Generator

To add support for new patterns, edit `generate.ts`:

```typescript
private generateStepCode(keyword: string, text: string, stepNumber: number): string {
  const lowerText = text.toLowerCase();

  // Add your custom pattern
  if (keyword === 'When' && lowerText.includes('your pattern')) {
    return `    // Your custom code`;
  }

  // ... existing patterns
}
```

## Best Practices

### Write Clear Specifications

✅ **Good**: "When the user clicks on the Blog navigation link"
❌ **Bad**: "When user goes to blog"

✅ **Good**: "Then the blog listing page should be displayed"
❌ **Bad**: "Then user sees stuff"

### Use Standard Keywords

Stick to Given/When/Then/And for consistency:
- **Given** = Setup/preconditions
- **When** = Actions
- **Then** = Assertions
- **And** = Continuation

### Keep Steps Focused

Each step should do one thing:

✅ **Good**:
```markdown
**When** the user clicks on the Blog link
**Then** the blog page should be displayed
```

❌ **Bad**:
```markdown
**When** the user clicks on the Blog link and sees the blog page
```

### Document Preconditions

Always specify what state the application should be in:

```markdown
## Preconditions
- User is on the home page
- Blog has at least one published post
```

## Limitations

### What It Can Generate

- ✅ Basic navigation flows
- ✅ Link and button clicks
- ✅ URL assertions
- ✅ Visibility checks
- ✅ Content validation
- ✅ Tag filtering flows

### What It Cannot Generate (Without Extending)

- ❌ Complex multi-step workflows
- ❌ Authentication flows
- ❌ Form filling
- ❌ File uploads
- ❌ API calls
- ❌ Custom business logic

For unsupported patterns, the generator adds TODO comments that you can implement manually.

## Directory Structure

```
tests/testgen/
├── specs/                    # Markdown specifications
│   ├── blog-browsing.md
│   └── blog-tag-filter.md
├── generated/                # Generated Playwright tests
│   ├── blog-browsing.spec.ts
│   └── blog-tag-filter.spec.ts
├── generate.ts               # Generator script
└── README.md                 # This file
```

## Troubleshooting

### "No specification files found"

Check that:
- Files are in `tests/testgen/specs/`
- Files have `.md` extension
- Files contain valid markdown

### "No title found"

Ensure your spec has a level 1 heading:
```markdown
# Your Test Title
```

### "TODO: Implement" in generated tests

The generator couldn't match your step text to a known pattern. You can:
1. Rephrase the step to match a supported pattern
2. Manually implement the step in the generated test
3. Extend the generator to support your pattern

### Tests fail after generation

Common causes:
- Application structure doesn't match assumptions
- Need to adjust locators in generated tests
- Need to add waits for dynamic content
- Custom logic required for your specific UI

## Summary

The test generator provides:
- ✅ Spec-driven test development
- ✅ Consistent test structure
- ✅ Self-healing locators
- ✅ Pattern-based generation
- ✅ Living documentation
- ✅ No external dependencies
- ✅ Easy to extend

Perfect for specification-driven development and maintaining living documentation alongside executable tests.
