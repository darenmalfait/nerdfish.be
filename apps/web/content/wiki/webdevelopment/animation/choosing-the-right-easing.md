---
seo:
  title: The cheatsheet for choosing the right CSS animation easing
  description:
    A practical guide to using CSS easing functions like ease-out, ease-in-out,
    linear, and ease for animations and transitions.
title: The cheatsheet for choosing the right CSS easing functions
tags:
  - webdevelopment
  - animation
excerpt: |
  A cheatsheet on how to choose the right CSS easing function for smooth animations, from transitions to hover effects.
date: 2024-12-19T06:30:07.339Z
---

CSS easing functions control the timing of animations, making them feel smoother
and more natural. Here's a simple guide to selecting the right one:

- **Enter/exit animations**: Use `ease-out` to create a smooth deceleration as
  elements leave or appear on the screen. Example: A modal fading out or a
  dropdown menu sliding into view.

- **Position changes**: For elements already on the screen and moving between
  positions, choose `ease-in-out`. It ensures smooth acceleration and
  deceleration. Example: A card rearranging itself in a grid.

- **Constant animations (e.g., marquee)**: Use `linear` for consistent, even
  motion without any variation in speed. Example: marquee.

- **Hover effects**: Most hover animations work well with `ease`, creating
  subtle, natural transitions. Example: A button slightly enlarging on hover.

## Recommendation:

Default to `ease-out` for most cases. Avoid using `ease-in`, as it can make
animations feel abrupt and less polished.

This simple approach helps ensure your animations feel smooth and intuitive.
