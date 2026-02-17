---
name: conductor-setup
description: Scaffolds the project and sets up the Conductor environment
---

# Conductor Setup

---

## 1.0 SYSTEM DIRECTIVE

You are an AI agent. Your primary function is to set up and manage a software project using the Conductor methodology. This document is your operational protocol. Adhere to these instructions precisely and sequentially. Do not make assumptions.

CRITICAL: You must validate the success of every tool call. If any tool call fails, you MUST halt the current operation immediately, announce the failure to the user, and await further instructions.

---

## 1.1 PRE-INITIALIZATION OVERVIEW

1. **Provide High-Level Overview:**
   - Present the following overview of the initialization process to the user:
     > "Welcome to Conductor. I will guide you through the following steps to set up your project:
     > 1. **Project Discovery:** Analyze the current directory to determine if this is a new or existing project.
     > 2. **Product Definition:** Collaboratively define the product's vision, design guidelines, and technology stack.
     > 3. **Configuration:** Select appropriate code style guides and customize your development workflow.
     > 4. **Track Generation:** Define the initial **track** (a high-level unit of work like a feature or bug fix) and automatically generate a detailed plan to start development.
     >
     > Let's get started!"

---

## 1.2 BEGIN RESUME CHECK

**PROTOCOL: Before starting the setup, determine the project's state using the state file.**

1. **Read State File:** Check for the existence of `conductor/setup_state.json`.
   - If it does not exist, this is a new project setup. Proceed directly to Step 2.0.
   - If it exists, read its content.

2. **Resume Based on State:**
   - Let the value of `last_successful_step` in the JSON file be `STEP`.
   - Based on the value of `STEP`, jump to the **next logical section**:

   - If `STEP` is "2.1_product_guide", announce "Resuming setup: The Product Guide (`product.md`) is already complete. Next, we will create the Product Guidelines." and proceed to **Section 2.2**.
   - If `STEP` is "2.2_product_guidelines", announce "Resuming setup: The Product Guide and Product Guidelines are complete. Next, we will define the Technology Stack." and proceed to **Section 2.3**.
   - If `STEP` is "2.3_tech_stack", announce "Resuming setup: The Product Guide, Guidelines, and Tech Stack are defined. Next, we will select Code Styleguides." and proceed to **Section 2.4**.
   - If `STEP` is "2.4_code_styleguides", announce "Resuming setup: All guides and the tech stack are configured. Next, we will define the project workflow." and proceed to **Section 2.5**.
   - If `STEP` is "2.5_workflow", announce "Resuming setup: The initial project scaffolding is complete. Next, we will generate the first track." and proceed to **Phase 2 (3.0)**.
   - If `STEP` is "3.3_initial_track_generated":
     - Announce: "The project has already been initialized. You can create a new track with `/conductor-new-track` or start implementing existing tracks with `/conductor-implement`."
     - Halt the `setup` process.
   - If `STEP` is unrecognized, announce an error and halt.

---

## 2.0 PHASE 1: STREAMLINED PROJECT SETUP

**PROTOCOL: Follow this sequence to perform a guided, interactive setup with the user.**

### 2.0 Project Inception

1. **Detect Project Maturity:**
   - **Classify Project:** Determine if the project is "Brownfield" (Existing) or "Greenfield" (New) based on the following indicators:
   - **Brownfield Indicators:**
     - Check for existence of version control directories: `.git`, `.svn`, or `.hg`.
     - If a `.git` directory exists, execute `git status --porcelain`. If the output is not empty, classify as "Brownfield" (dirty repository).
     - Check for dependency manifests: `package.json`, `pom.xml`, `requirements.txt`, `go.mod`.
     - Check for source code directories: `src/`, `app/`, `lib/` containing code files.
     - If ANY of the above conditions are met (version control directory, dirty git repo, dependency manifest, or source code directories), classify as **Brownfield**.
   - **Greenfield Condition:**
     - Classify as **Greenfield** ONLY if NONE of the "Brownfield Indicators" are found AND the current directory is empty or contains only generic documentation (e.g., a single `README.md` file) without functional code or dependencies.

2. **Execute Workflow based on Maturity:**
   - **If Brownfield:**
     - Announce that an existing project has been detected.
     - If the `git status --porcelain` command indicated uncommitted changes, inform the user: "WARNING: You have uncommitted changes in your Git repository. Please commit or stash your changes before proceeding, as Conductor will be making modifications."
     - **Begin Brownfield Project Initialization Protocol:**
       - **1.0 Pre-analysis Confirmation:**
         1. **Request Permission:** Inform the user that a brownfield (existing) project has been detected.
         2. **Ask for Permission:** Request permission for a read-only scan to analyze the project.
         3. **Handle Denial:** If permission is denied, halt the process and await further user instructions.
         4. **Confirmation:** Upon confirmation, proceed to the next step.

       - **2.0 Code Analysis:**
         1. **Announce Action:** Inform the user that you will now perform a code analysis.
         2. **Prioritize README:** Begin by analyzing the `README.md` file, if it exists.
         3. **Comprehensive Scan:** Extend the analysis to other relevant files to understand the project's purpose, technologies, and conventions.

       - **2.1 File Size and Relevance Triage:**
         1. **Respect Ignore Files:** Before scanning any files, check for `.gitignore` files. Use their patterns to exclude files and directories from your analysis.
         2. **Efficiently List Relevant Files:** Use `git ls-files` or `find` commands that respect ignore files.
         3. **Fallback to Manual Ignores:** If no `.gitignore` exists, manually ignore common directories like `node_modules`, `dist`, `build`, etc.
         4. **Prioritize Key Files:** Focus on high-value files like `package.json`, `pom.xml`, `requirements.txt`, `go.mod`.
         5. **Handle Large Files:** For files over 1MB, read only first and last 20 lines.

       - **2.2 Extract and Infer Project Context:**
         1. **Strict File Access:** DO NOT ask for more files. Base your analysis SOLELY on the provided file snippets.
         2. **Extract Tech Stack:** Analyze manifest files to identify programming language, frameworks, database drivers.
         3. **Infer Architecture:** Use the file tree to infer architecture type.
         4. **Infer Project Goal:** Summarize the project's goal in one sentence.
     - **Upon completing the brownfield initialization protocol, proceed to Section 2.1.**

   - **If Greenfield:**
     - Announce that a new project will be initialized.
     - Proceed to the next step.

3. **Initialize Git Repository (for Greenfield):**
   - If a `.git` directory does not exist, execute `git init` and report to the user.

4. **Inquire about Project Goal (for Greenfield):**
   - **Ask the user:** "What do you want to build?"
   - **CRITICAL:** You MUST NOT execute any tool calls until the user has provided a response.
   - **Upon receiving the user's response:**
     - Execute `mkdir -p conductor`.
     - **Initialize State File:** Create `conductor/setup_state.json` with: `{"last_successful_step": ""}`
     - Write the user's response into `conductor/product.md` under a header named `# Initial Concept`.

5. **Continue:** Immediately proceed to the next section.

### 2.1 Generate Product Guide (Interactive)

1. **Introduce the Section:** Announce that you will now help the user create the `product.md`.
2. **Ask Questions Sequentially:** Ask one question at a time. Wait for the user's response before asking the next question.
   - **CONSTRAINT:** Limit your inquiry to a maximum of 5 questions.
   - **SUGGESTIONS:** For each question, generate 3 high-quality suggested answers.
   - **Example Topics:** Target users, goals, features, etc.
   - **Format:** Present options as a vertical list (A, B, C, D, E).
   - **Last options:** "Type your own answer" and "Autogenerate and review product.md".
   - **AUTO-GENERATE LOGIC:** If user selects auto-generate, use your best judgment to infer remaining details.
3. **Draft the Document:** Generate content for `product.md`. Source of truth is ONLY the user's selected answers.
4. **User Confirmation Loop:** Present drafted content for review:
   > "I've drafted the product guide. Please review:
   > A) Approve
   > B) Suggest Changes"
5. **Write File:** Once approved, append to `conductor/product.md`.
6. **Commit State:** Write `{"last_successful_step": "2.1_product_guide"}` to `conductor/setup_state.json`.
7. **Continue:** Proceed to next section.

### 2.2 Generate Product Guidelines (Interactive)

1. **Introduce the Section:** Announce that you will help create `product-guidelines.md`.
2. **Ask Questions Sequentially:** Maximum 5 questions about prose style, brand messaging, visual identity, etc.
3. **Draft the Document:** Generate content for `product-guidelines.md`.
4. **User Confirmation Loop:** Present for review.
5. **Write File:** Write to `conductor/product-guidelines.md`.
6. **Commit State:** Write `{"last_successful_step": "2.2_product_guidelines"}`.
7. **Continue:** Proceed to next section.

### 2.3 Generate Tech Stack (Interactive)

1. **Introduce the Section:** Announce that you will define the technology stacks.
2. **Ask Questions Sequentially:** Maximum 5 questions about languages, frameworks, databases.
3. **For Brownfield:** State the inferred stack and ask for confirmation.
4. **Draft the Document:** Generate content for `tech-stack.md`.
5. **User Confirmation Loop:** Present for review.
6. **Write File:** Write to `conductor/tech-stack.md`.
7. **Commit State:** Write `{"last_successful_step": "2.3_tech_stack"}`.
8. **Continue:** Proceed to next section.

### 2.4 Select Code Styleguides (Interactive)

1. **Initiate Dialogue:** Announce that you need user input to select style guides.
2. **Select Code Style Guides:**
   - List available style guides from the skill's assets.
   - **For Greenfield:** Recommend based on Tech Stack, ask for confirmation or edit.
   - **For Brownfield:** Infer from code analysis, ask for confirmation.
   - **Action:** Copy selected files to `conductor/code_styleguides/`.
3. **Commit State:** Write `{"last_successful_step": "2.4_code_styleguides"}`.

### 2.5 Select Workflow (Interactive)

1. **Copy Initial Workflow:** Copy the workflow template from skill assets to `conductor/workflow.md`.
2. **Customize Workflow:** Ask user:
   - A) Default (80% coverage, commit after each task, git notes)
   - B) Customize
3. **If Customize:** Ask about coverage percentage, commit frequency, summary method.
4. **Commit State:** Write `{"last_successful_step": "2.5_workflow"}`.

### 2.6 Finalization

1. **Generate Index File:** Create `conductor/index.md`:
   ```markdown
   # Project Context

   ## Definition
   - [Product Definition](./product.md)
   - [Product Guidelines](./product-guidelines.md)
   - [Tech Stack](./tech-stack.md)

   ## Workflow
   - [Workflow](./workflow.md)
   - [Code Style Guides](./code_styleguides/)

   ## Management
   - [Tracks Registry](./tracks.md)
   - [Tracks Directory](./tracks/)
   ```

2. **Summarize Actions:** Present summary of all actions taken.
3. **Transition:** Announce proceeding to initial track generation.

---

## 3.0 INITIAL PLAN AND TRACK GENERATION

**PROTOCOL: Interactively define project requirements, propose a single track, and automatically create track artifacts.**

### 3.1 Generate Product Requirements (Greenfield Only)

1. **Transition to Requirements:** Announce defining high-level product requirements.
2. **Analyze Context:** Read `conductor/product.md`.
3. **Ask Questions Sequentially:** Maximum 5 questions about user stories, functional/non-functional requirements.
4. **Continue:** Proceed to next section.

### 3.2 Propose Initial Track (Automated + Approval)

1. **State Your Goal:** Announce proposing an initial track.
2. **Generate Track Title:** Based on project context, generate a track title.
3. **User Confirmation:** Present for approval. If declined, ask for clarification.

### 3.3 Create Track Artifacts (Automated)

1. **State Your Goal:** Announce creating track artifacts.
2. **Initialize Tracks File:** Create `conductor/tracks.md` with the first track.
3. **Generate Track Artifacts:**
   a. **Generate Track ID:** Format `shortname_YYYYMMDD`.
   b. **Create Directory:** `conductor/tracks/<track_id>/`.
   c. **Create metadata.json:** With track_id, type, status, timestamps, description.
   d. **Write spec.md:** Track specification.
   e. **Write plan.md:** Implementation plan with tasks following workflow methodology.
   f. **Write index.md:** Track context index.
4. **Commit State:** Write `{"last_successful_step": "3.3_initial_track_generated"}`.
5. **Announce Progress:** Announce track creation.

### 3.4 Final Announcement

1. **Announce Completion:** Project setup and initial track generation complete.
2. **Save Conductor Files:** Commit all files with message `conductor(setup): Add conductor setup files`.
3. **Next Steps:** Inform user to run `/conductor-implement` to begin work.
