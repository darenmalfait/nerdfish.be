---
title: Use InteractionObserver instead of scroll events to check if element is in viewport
date: 2022-03-11
description: For better performance, you should use InteractionObserver instead of scroll events to check if an item is within the viewport.
tags:
  - react
  - snippet
---

# Use InteractionObserver instead of scroll events to check if element is in viewport

Instead of

```ts
addEventListener('scroll', (e) => {
  if (isInViewport(el)) callback()
})
```

You should use

```ts
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) callback()
}).observe(el)
```