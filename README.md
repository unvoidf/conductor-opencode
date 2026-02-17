# Conductor for OpenCode

Spec-driven development framework for OpenCode. Port of the original [Conductor](https://github.com/gemini-cli-extensions/conductor) for Gemini CLI.

## What is Conductor?

Conductor is a spec-driven development methodology that helps you build software systematically:

1. **Define** your product vision, guidelines, and tech stack
2. **Plan** features as "tracks" with detailed specifications
3. **Implement** tasks following your defined workflow
4. **Review** work against your guidelines and standards
5. **Iterate** with confidence knowing everything is tracked

## Installation

```bash
npm install conductor-opencode
```

## Usage

Add to your `opencode.json`:

```json
{
  "plugin": ["conductor-opencode"]
}
```

### Available Commands

| Command | Description |
|---------|-------------|
| `/conductor-setup` | Initialize Conductor for project |
| `/conductor-implement` | Execute tasks from track plan |
| `/conductor-new-track` | Create a new track |
| `/conductor-review` | Review completed work |
| `/conductor-status` | Show project progress |
| `/conductor-revert` | Revert previous work |

## Quick Start

1. **Setup**: Run `/conductor-setup` in your project directory
2. **Define**: Answer questions about your product, tech stack, and workflow
3. **Implement**: Use `/conductor-implement` to execute tasks
4. **Review**: Run `/conductor-review` to verify your work

## Project Structure

After setup, Conductor creates:

```
your-project/
├── conductor/
│   ├── index.md              # Project context index
│   ├── product.md            # Product definition
│   ├── product-guidelines.md # Brand and style guidelines
│   ├── tech-stack.md         # Technology decisions
│   ├── workflow.md           # Development workflow
│   ├── tracks.md             # Track registry
│   ├── code_styleguides/     # Code style guides
│   └── tracks/               # Track directories
│       └── <track_id>/
│           ├── spec.md       # Track specification
│           ├── plan.md       # Implementation plan
│           └── metadata.json # Track metadata
```

## Features

### Spec-Driven Development
- Define specifications before implementation
- Generate detailed plans from specs
- Track progress against plans

### Autonomous Execution
- Implement tasks automatically
- Follow defined workflows
- Continue without user intervention

### Git Integration
- Track commits against tasks
- Revert work cleanly
- Review changes systematically

### Code Style Enforcement
- Include style guides for your languages
- Review code against guidelines
- Maintain consistency

## Workflow Customization

The default workflow includes:
- 80% test coverage requirement
- Commit after each task
- Git notes for task summaries

Customize during setup or edit `conductor/workflow.md`.

## Supported Languages

Code styleguides available for:
- TypeScript
- JavaScript
- Python
- Go
- C++
- C#
- Dart
- HTML/CSS
- General best practices

## Credits

Ported from [Conductor for Gemini CLI](https://github.com/gemini-cli-extensions/conductor) by Google.

## License

Apache 2.0 - See [LICENSE](LICENSE)
