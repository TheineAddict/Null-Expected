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
