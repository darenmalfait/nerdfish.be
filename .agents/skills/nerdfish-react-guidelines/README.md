# Nerdfish React Guidelines

Meta-skill: apply nerdfish standards **while building** and **when auditing**
changes. Loads the right `nerdfish-*` (and related) skills for the task.

## Structure

Thin skill — `SKILL.md` (skill index + development + audit workflows). Rule
content lives in the skills this one loads.

## Usage

```bash
npx skills add darenmalfait/nerdfish-agent-skills --skill nerdfish-react-guidelines
```

During work: implement with applicable skills loaded. For a pass on a diff:
“nerdfish review” / “audit my changes against nerdfish”.
