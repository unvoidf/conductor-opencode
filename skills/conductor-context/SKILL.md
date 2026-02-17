---
name: conductor-context
description: Provides context and the Universal File Resolution Protocol for Conductor-managed projects
---

# Conductor Context

---

## 1.0 Universal File Resolution Protocol

When resolving files within a Conductor project, use the following resolution order:

1. **Index File Resolution** - Read `conductor/index.md` to find links to all project files
2. **Direct Path** - If a file is not in the index, check `conductor/<filename>`
3. **Tracks Directory** - For track-specific files, resolve via `conductor/tracks.md` registry

### Core Files

| File | Purpose |
|------|---------|
| `conductor/index.md` | Project context index |
| `conductor/product.md` | Product definition |
| `conductor/product-guidelines.md` | Product guidelines |
| `conductor/tech-stack.md` | Technology stack |
| `conductor/workflow.md` | Development workflow |
| `conductor/tracks.md` | Tracks registry |
| `conductor/code_styleguides/` | Code style guides |

### Track Files

Each track has its own directory with:
- `spec.md` - Track specification
- `plan.md` - Implementation plan
- `metadata.json` - Track metadata
- `index.md` - Track context index

### Resolution Protocol

```
1. Read conductor/index.md
2. Parse links to find target file
3. If found, return the path
4. If not found, check direct path
5. Report error if file doesn't exist
```

---

## 2.0 Project State Indicators

### Track Status Markers

| Marker | Status |
|--------|--------|
| `[ ]` | New/Pending |
| `[~]` | In Progress |
| `[x]` | Completed |

### File State

Check `conductor/setup_state.json` for initialization progress:
- `""` - Not started
- `"2.1_product_guide"` - Product guide complete
- `"2.2_product_guidelines"` - Product guidelines complete
- `"2.3_tech_stack"` - Tech stack complete
- `"2.4_code_styleguides"` - Code styleguides complete
- `"2.5_workflow"` - Workflow complete
- `"3.3_initial_track_generated"` - Setup complete

---

## 3.0 Conductor Commands

| Command | Description |
|---------|-------------|
| `/conductor-setup` | Initialize Conductor for project |
| `/conductor-implement` | Execute tasks from track plan |
| `/conductor-new-track` | Create a new track |
| `/conductor-review` | Review completed work |
| `/conductor-status` | Show project progress |
| `/conductor-revert` | Revert previous work |

---

## 4.0 Session Context

When working in a Conductor project:

1. Always check `conductor/index.md` first for project context
2. Read the current track's `plan.md` for task status
3. Follow the workflow defined in `conductor/workflow.md`
4. Adhere to code styleguides in `conductor/code_styleguides/`
5. Update track status as tasks progress
