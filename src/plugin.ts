import * as fs from "fs";

export interface PluginContext {
  client: unknown;
  $: (cmd: string) => Promise<{ stdout: string; stderr: string }>;
  directory: string;
}

export interface Plugin {
  (context: PluginContext): Promise<Record<string, (...args: unknown[]) => Promise<unknown>>>;
}
import * as path from "path";

export const ConductorPlugin: Plugin = async ({ client, $, directory }) => {
  const conductorDir = path.join(directory, "conductor");
  const indexPath = path.join(conductorDir, "index.md");
  const tracksPath = path.join(conductorDir, "tracks.md");

  async function isConductorInitialized(): Promise<boolean> {
    try {
      await fs.promises.access(indexPath, fs.constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  async function getConductorContext(): Promise<string | null> {
    if (!(await isConductorInitialized())) {
      return null;
    }

    let context = `## Conductor Context\n\n`;
    context += `This project uses Conductor for spec-driven development.\n\n`;
    context += `### Available Commands\n`;
    context += `- \`/conductor-setup\` - Initialize Conductor for project\n`;
    context += `- \`/conductor-implement\` - Execute tasks from track plan\n`;
    context += `- \`/conductor-new-track\` - Create a new track\n`;
    context += `- \`/conductor-review\` - Review completed work\n`;
    context += `- \`/conductor-status\` - Show project progress\n`;
    context += `- \`/conductor-revert\` - Revert previous work\n\n`;

    try {
      const tracksContent = await fs.promises.readFile(tracksPath, "utf-8");
      const inProgressMatch = tracksContent.match(/\[~\].*?\*\*Track:\s*([^*]+)\*\*/);
      const pendingMatch = tracksContent.match(/\[ \].*?\*\*Track:\s*([^*]+)\*\*/);
      
      if (inProgressMatch) {
        context += `### Current Track (In Progress)\n`;
        context += `${inProgressMatch[1].trim()}\n\n`;
      }
      
      if (pendingMatch) {
        context += `### Next Pending Track\n`;
        context += `${pendingMatch[1].trim()}\n\n`;
      }
    } catch {
      // tracks.md doesn't exist yet
    }

    context += `### Context Files\n`;
    context += `- @conductor/index.md - Project context index\n`;
    context += `- @conductor/product.md - Product definition\n`;
    context += `- @conductor/tech-stack.md - Technology stack\n`;
    context += `- @conductor/workflow.md - Development workflow\n`;

    return context;
  }

  return {
    "session.created": async () => {
      const context = await getConductorContext();
      if (context) {
        process.env.CONDUCTOR_ACTIVE = "true";
      }
    },

    "experimental.session.compacting": async (input: unknown, output: unknown) => {
      if (process.env.CONDUCTOR_ACTIVE === "true") {
        return {
          preserve: [
            "conductor/",
            "*.md"
          ]
        };
      }
      return null;
    }
  };
};

export default ConductorPlugin;
