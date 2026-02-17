# Conductor Status

Displays the current progress of the project.

---

## 1.0 SYSTEM DIRECTIVE

You are an AI agent. Your primary function is to provide a status overview of the current tracks file. This involves reading the Tracks Registry, parsing content, and summarizing progress.

CRITICAL: You must validate the success of every tool call. If any tool call fails, halt and await instructions.

---

## 1.1 SETUP CHECK

**PROTOCOL: Verify Conductor environment.**

1. **Verify Core Context:**
   - **Tracks Registry** (`conductor/tracks.md`)
   - **Product Definition** (`conductor/product.md`)
   - **Tech Stack** (`conductor/tech-stack.md`)
   - **Workflow** (`conductor/workflow.md`)

2. **Handle Failure:**
   - If files are missing, announce: "Conductor is not set up. Please run `/conductor-setup`."
   - Halt operation.

---

## 2.0 STATUS OVERVIEW PROTOCOL

### 2.1 Read Project Plan

1. **Locate and Read:** Read `conductor/tracks.md`.

2. **Locate and Read Tracks:**
   - Parse `conductor/tracks.md` to identify all registered tracks.
   - Parsing: Look for lines matching `- [ ] **Track:` or `## [ ] Track:`.
   - For each track, read its `plan.md`.

### 2.2 Parse and Summarize Plan

1. **Parse Content:**
   - Identify major phases/sections.
   - Identify tasks and their status (`[ ]`, `[~]`, `[x]`).

2. **Generate Summary:**
   - Total number of major phases.
   - Total number of tasks.
   - Number of tasks completed, in progress, and pending.

### 2.3 Present Status Overview

**Output format:**

```markdown
# Conductor Status Report

**Generated:** [Current Date/Time]

## Project Overview
- **Status:** [On Track / Behind Schedule / Blocked]
- **Current Track:** [Track name or "None in progress"]
- **Current Phase:** [Phase name or "N/A"]
- **Current Task:** [Task name or "N/A"]
- **Next Action:** [Next pending task or "No pending tasks"]
- **Blockers:** [Any blockers or "None"]

## Progress Summary

| Metric | Count |
|--------|-------|
| Total Tracks | [number] |
| Completed Tracks | [number] |
| In Progress | [number] |
| Pending | [number] |
| **Total Tasks** | [number] |
| **Completed Tasks** | [number] |
| **Progress** | [X/Y (Z%)] |

## Track Details

### [Track Name] - [Status]
- **Phase:** [Current phase]
- **Progress:** [X/Y tasks complete]
- **Next Task:** [Task name]

---

### [Track Name] - [Status]
...
```

---

## 3.0 ADDITIONAL INFORMATION

If user requests more detail, provide:

1. **File Statistics:**
   - Number of files changed per track
   - Lines of code added/removed

2. **Time Tracking:** (if `metadata.json` contains timestamps)
   - Track creation date
   - Last updated date

3. **Recent Activity:**
   - Last 5 completed tasks across all tracks
