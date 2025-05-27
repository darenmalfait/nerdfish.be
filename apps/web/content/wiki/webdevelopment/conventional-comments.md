---
seo:
  title:
    'Conventional Comments: Clear, Actionable Feedback for Code & Content
    Reviews'
  description:
    'Discover how Conventional Comments can transform your review process with
    clear, labeled feedback like **suggestion:** or **issue:**. Enhance
    collaboration, clarity, and automation across code reviews, editing, and
    peer feedback.'
title: Code review conventional comments
tags:
  - webdevelopment
  - ops
excerpt:
  Improve clarity, reduce misunderstandings, and promote collaboration in
  reviews by using labeled, structured comments like **suggestion:** or **issue
  (non-blocking):**. Conventional Comments offer a human-friendly and
  machine-readable standard for effective feedback.
date: 2025-05-27 12:26:15
---

Comments like this are unhelpful...

```
This is not worded correctly.
```

By simply prefixing the comment with a label, the intention is clear and the
tone dramatically changes.

```
**suggestion:** This is not worded correctly.
```

```
**issue (non-blocking):** This is not worded correctly.
```

Labels also prompt the reviewer to give more **actionable** comments.

```
**suggestion:** This is not worded correctly.
Can we change this to match the wording of the marketing page?
```

Labeling comments encourages collaboration and saves **hours** of
undercommunication and misunderstandings. They are also parseable by machines!

## Examples

```
**suggestion:** Let's avoid using this specific function...
If we reference much of a function marked "Deprecated", it is almost certain to disagree with us, sooner or later.
```

```
**issue (ux,non-blocking):** These buttons should be red, but let's handle this in a follow-up.
```

## Target audience

Conventional Comments is a standard for formatting comments of any kind of
review/feedback process, such as:

- [Code review](https://en.wikipedia.org/wiki/Code_review)
- [Peer review](https://en.wikipedia.org/wiki/Peer_review)
- [Revising](<https://en.wikipedia.org/wiki/Revision_(writing)>) and
  [editing](https://en.wikipedia.org/wiki/Editing)
- [RFC](https://en.wikipedia.org/wiki/Request_for_Comments)

## Format

Adhering to a consistent format improves reader's expectations and machine
readability. Here's the format we propose:

```
<label> [decorations]: <subject>
[discussion]
```

- _label_ - This is a single label that signifies what kind of comment is being
  left.
- _subject_ - This is the main message of the comment.
- _decorations (optional)_ - These are extra decorating labels for the comment.
  They are surrounded by parentheses and comma-separated.
- _discussion (optional)_ - This contains supporting statements, context,
  reasoning, and anything else to help communicate the "why" and "next steps"
  for resolving the comment. For example:

```
**question (non-blocking):** At this point, does it matter which thread has won?
Maybe to prevent a race condition we should keep looping until they've all won?
```

Can be automatically parsed into:

```json
{
	"label": "question",
	"subject": "At this point, does it matter which thread has won?",
	"decorations": ["non-blocking"],
	"discussion": "Maybe to prevent a race condition we should keep looping until they've all won?"
}
```

## Labels

## Labels

We strongly suggest using the following labels:

|                 |                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **praise:**     | Praises highlight something positive. Try to leave at least one of these comments per review. _Do not_ leave false praise (which can actually be damaging). _Do_ look for something to sincerely praise.                                                                                  |
| **nitpick:**    | Nitpicks are trivial preference-based requests. These should be non-blocking by nature.                                                                                                                                                                                                   |
| **suggestion:** | Suggestions propose improvements to the current subject. It's important to be explicit and clear on _what_ is being suggested and _why_ it is an improvement. Consider using patches and the _blocking_ or _non-blocking_ [decorations](#decorations) to further communicate your intent. |
| **issue:**      | Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a `suggestion`. If you are not sure if a problem exists or not, consider leaving a `question`.             |
| **todo:**       | TODO's are small, trivial, but necessary changes. Distinguishing todo comments from issues: or suggestions: helps direct the reader's attention to comments requiring more involvement.                                                                                                   |
| **question:**   | Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.                                                                                            |
| **thought:**    | Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.                                                                                |
| **chore:**      | Chores are simple tasks that must be done before the subject can be "officially" accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.                                       |
| **note:**       | Notes are always non-blocking and simply highlight something the reader should take note of.                                                                                                                                                                                              |

If you like to be a bit more expressive with your labels, you may also consider:

|              |                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **typo:**    | Typo comments are like **todo:**, where the main issue is a misspelling.                                                                                                  |
| **polish:**  | Polish comments are like a **suggestion**, where there is nothing necessarily wrong with the relevant content, there's just some ways to immediately improve the quality. |
| **quibble:** | Quibbles are very much like **nitpick:**, except it does not conjure up images of lice and animal hygiene practices.                                                      |

Feel free to diverge from this specific list of labels if it seems appropriate.

## Decorations

Decorations give additional context for a comment. They help further classify
comments which have the same label (for example, a security suggestion as
opposed to a test suggestion).

```
**suggestion (security):** I'm a bit concerned that we are implementing our own DOM purifying function here...
Could we consider using the framework instead?
```

```
**suggestion (test,if-minor):** It looks like we're missing some unit test coverage that the cat disappears completely.
```

Decorations may be specific to each organization. If needed, we recommend
establishing a minimal set of decorations (leaving room for discretion) with no
ambiguity. Possible decorations include: | | | | ------------------ |

---

Possible decorations include:

|                    |                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(non-blocking)** | A comment with this decoration **should not** prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.                       |
| **(blocking)**     | A comment with this decoration **should** prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default. |
| **(if-minor)**     | This decoration gives some freedom to the author that they should resolve the comment only if the changes ends up being minor or trivial.                                                               |

Adding a decoration to a comment should improve understandability and maintain
readability. Having a list of many decorations in one comment would conflict
with this goal.

## More examples

```
**nitpick:** `little star` => `little bat`
Can we update the other references as well?
```

```
**chore:** Let's run the `jabber-walk` CI job to make sure this doesn't break any known references.
Here are [the docs](https://en.wikipedia.org/wiki/Jabberwocky) for running this job. Feel free to reach out if you need any help!
```

```
**praise:** Beautiful test!
```

## Best Practices

These will be expanded later, but for now, here are some best practices for
writing helpful review feedback:

- Mentoring pays off exponentially
- Leave actionable comments
- Combine similar comments
- Replace "you" with "we"
- Replace "should" with "could"

## Sources

- [Conventional Commits](https://www.conventionalcommits.org)
- [Google Engineering Practices](https://github.com/google/eng-practices/blob/57c895ad4b09c8941288c04e44a08797b76b4d4d/review/reviewer/standard.md#mentoring)
  The characters used in the examples are respectfully adapted from Lewis
  Carroll's [Alice in Wonderland][alice], illustrated by [John
  Tenniel][jtenniel]. [alice]:
  https://en.wikipedia.org/wiki/Alice%27s_Adventures_in_Wonderland [jtenniel]:
  https://en.wikipedia.org/wiki/John_Tenniel
