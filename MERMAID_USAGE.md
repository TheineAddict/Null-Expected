# Mermaid Diagram Usage

Mermaid diagrams are now fully supported in your blog posts. You can create various types of diagrams using simple text-based syntax.

## How to Use

In your markdown blog posts, use code blocks with the `mermaid` language identifier:

````markdown
```mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
```
````

## Supported Diagram Types

### Flowchart
```mermaid
graph LR
    A[QA] --> B[Testing]
    B --> C[Release]
```

### Sequence Diagram
```mermaid
sequenceDiagram
    Developer->>QA: Submit Code
    QA->>Developer: Report Bugs
    Developer->>QA: Fix Bugs
    QA->>Release: Approve
```

### Gantt Chart
```mermaid
gantt
    title QA Sprint Timeline
    dateFormat  YYYY-MM-DD
    section Testing
    Unit Tests       :a1, 2024-01-01, 3d
    Integration Tests:a2, after a1, 5d
    E2E Tests        :a3, after a2, 4d
```

### Class Diagram
```mermaid
classDiagram
    class TestCase {
        +String name
        +String status
        +execute()
        +validate()
    }
```

### State Diagram
```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review
    Review --> Approved
    Review --> Rejected
    Rejected --> Draft
    Approved --> [*]
```

### Pie Chart
```mermaid
pie title Test Coverage
    "Unit Tests" : 45
    "Integration Tests" : 30
    "E2E Tests" : 25
```

## Example in Blog Post

Here's how you would use a diagram in your blog post:

````markdown
---
title: "Understanding the QA Process Flow"
slug: "qa-process-flow"
excerpt: "A visual guide to modern QA workflows"
author: author1
date: 2024-01-15
tags: [qa-processes, testing]
readTime: 5 min read
---

# Understanding the QA Process Flow

The modern QA process follows a structured workflow:

```mermaid
graph TD
    A[Code Commit] --> B[Automated Tests]
    B --> C{Tests Pass?}
    C -->|Yes| D[Code Review]
    C -->|No| E[Developer Fix]
    E --> B
    D --> F{Review OK?}
    F -->|Yes| G[Merge]
    F -->|No| E
```

This diagram shows how code flows through our quality gates...
````

## Styling

Diagrams are automatically styled with:
- Light background (gray-50)
- Padding and rounded corners
- Centered alignment
- Overflow handling for large diagrams

## Resources

For more diagram types and syntax, visit:
- [Mermaid Documentation](https://mermaid.js.org/)
- [Live Editor](https://mermaid.live/)
