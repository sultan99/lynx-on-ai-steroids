---
name: dev
description: Feature implementation workflow. Use when developer wants to implement a feature or fix - creates branch, plans, implements, and validates.
argument-hint: "<description>"
---

# Feature Implementation Workflow

## Arguments

| Argument | Description |
| -------------- | ------------------------------------------------- |
| `<description>` | Short feature/fix description or GitHub issue URL |

**Accepted formats:**

- Description: `add dark mode toggle`
- GitHub issue URL: `https://github.com/user/repo/issues/123`

**If no description provided:** Ask the developer what they want to implement. Do not proceed without one.

## Usage

```
/dev add dark mode toggle
/dev https://github.com/user/repo/issues/123
```

---

## Resume Detection

Before starting the workflow, check if a progress file exists:

```
.claude/progress/<feature-slug>.md
```

**If progress file exists:**

1. Read the progress file
2. Ensure the current branch matches the branch in the progress file. If not, switch to it.
3. Show the developer a summary:
   > "Found progress for `<feature>`:
   >
   > - Completed: <list completed plan items>
   > - Remaining: <list incomplete plan items>
   >   Continue?"
4. Wait for developer response
5. If confirmed → recreate todo list from the progress file (mark completed items as done), restore the implementation mode (autopilot/pair), continue from the first unchecked plan item in Step 4. If all plan items are done, go to Step 5.
6. If declined → ask if they want to start fresh (this deletes the progress file)

**If no progress file exists**, check git history for prior session work:

1. If the current branch has relevant commits, run `git log main..HEAD --oneline` and `git diff main..HEAD --stat`
2. If there are commits (especially "wip" commits) with relevant changes, summarize what was already done
3. Show the developer a summary and ask which workflow step to resume from
4. If no prior work is found → proceed with Step 1.

---

## Workflow

### Step 1: Understand Requirements

**If a GitHub issue URL was provided:**
- Fetch the issue details using `gh issue view`
- Extract requirements and acceptance criteria

**If a description was provided:**
- Clarify scope with the developer if the description is vague

### Step 2: Setup Branch

Check current branch:

```bash
git branch --show-current
```

**If already on a feature branch for this work** → skip to Step 3.

**Otherwise:**

1. Check for uncommitted changes:

   ```bash
   git status
   ```

2. If changes exist, save them:

   ```bash
   git add -A
   git commit -m "wip: save work before switching branch"
   ```

3. Create new branch using `/git branch`

### Step 3: Plan

1. Create todo list using TaskCreate tool
2. Share plan with developer and ask:

> "Before I start:
>
> 1. Any specific instructions or context? (approach, files to reference, constraints)
> 2. How would you like to work?
>    - **Autopilot** — I implement all plan items, then ask you to verify
>    - **Pair programming** — I implement one plan item at a time, you review each before I continue"

**Wait for response before continuing.**

#### Save Progress

After the developer responds, create the progress file at `.claude/progress/<feature-slug>.md`.

The plan items are the **implementation tasks** from the todo list — the actual work items, not the workflow steps.

```markdown
# Progress: <feature>

## Mode

<autopilot | pair>

## Branch

<current-branch-name>

## Requirements

<requirements summary>

## Plan

- [ ] <plan item 1>
- [ ] <plan item 2>
- [ ] <plan item 3>
- ...

## Developer Notes

<any instructions or context the developer provided>
```

### Step 4: Implement

- Use context7 MCP for current library documentation (ReactLynx, Rspeedy, etc.)
- Implement feature/fix based on requirements
- Follow `.claude/rules/coding.md` for all coding conventions
- Follow `.claude/rules/testing.md` when writing or updating tests

#### Autopilot Mode

Implement all plan items sequentially without pausing. After each item, update the progress file — mark the plan item as `[x]`. After all items are done, proceed to Step 5.

#### Pair Programming Mode

For each plan item:

1. Implement the plan item
2. Show the developer what was done
3. **Wait for developer confirmation** before continuing
4. If developer requests changes → refine, then ask again
5. If confirmed → update the progress file — mark item as `[x]`, move to the next plan item

After all items are done, proceed to Step 5.

### Step 5: Developer Verification

**Ask developer:**

> "All plan items are implemented. Please test the feature and let me know:
>
> 1. **All good** — continue to tests
> 2. **Needs changes** — describe what to fix/refine"

**Wait for developer response.**

- **If all good** → proceed to Step 6
- **If needs changes** → apply fixes, update progress file if plan items change, then ask again

### Step 6: Write Tests

Delegate to the `test-writer` agent:

- Cover main functionality
- Cover edge cases
- Target 80%+ coverage for new code

### Step 7: Finalize

Run `/validate` to check lint, types, and tests in parallel.

Fix any errors before completing.

### Step 8: Commit & PR

**Ask developer:**

> "Would you like to commit the changes?"

- **If yes** → invoke `/git commit`
- **If no** → proceed to Step 9

**Then ask:**
> "Would you like to create a PR?"

- **If yes** → create PR using `gh pr create`
- **If no** → proceed to Step 9

### Step 9: Suggest Instruction Improvements

Reflect on the session and suggest improvements to instructions.
Invoke `/project skill-up` for what to look for and output format.

### Cleanup

After all steps are complete, **delete** the progress file:

```
.claude/progress/<feature-slug>.md
```
