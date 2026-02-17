const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG_DIR = path.join(process.env.HOME, '.config', 'opencode');
const COMMANDS_DIR = path.join(CONFIG_DIR, 'commands');
const SKILLS_DIR = path.join(CONFIG_DIR, 'skills');

const PACKAGE_ROOT = path.resolve(__dirname);
const PACKAGE_COMMANDS = path.join(PACKAGE_ROOT, 'commands');
const PACKAGE_SKILLS = path.join(PACKAGE_ROOT, 'skills');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function install() {
  console.log('Installing Conductor for OpenCode...\n');

  // Create config directories
  ensureDir(CONFIG_DIR);
  ensureDir(COMMANDS_DIR);
  ensureDir(SKILLS_DIR);

  // Copy commands
  console.log('Copying commands...');
  const commandFiles = fs.readdirSync(PACKAGE_COMMANDS).filter(f => f.endsWith('.md'));
  for (const file of commandFiles) {
    copyFile(
      path.join(PACKAGE_COMMANDS, file),
      path.join(COMMANDS_DIR, file)
    );
    console.log(`  - ${file}`);
  }

  // Copy skills
  console.log('\nCopying skills...');
  const skillDirs = fs.readdirSync(PACKAGE_SKILLS, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  for (const skillName of skillDirs) {
    const srcDir = path.join(PACKAGE_SKILLS, skillName);
    const destDir = path.join(SKILLS_DIR, skillName);
    copyDir(srcDir, destDir);
    console.log(`  - ${skillName}/`);
  }

  // Update opencode.json
  const configPath = path.join(CONFIG_DIR, 'opencode.json');
  let config = {};
  
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      config = {};
    }
  }

  // Ensure plugin array exists and contains conductor-opencode
  if (!config.plugin) {
    config.plugin = [];
  }
  if (!config.plugin.includes('conductor-opencode')) {
    config.plugin.push('conductor-opencode');
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log('\nUpdated ~/.config/opencode/opencode.json');

  console.log('\n✓ Conductor for OpenCode installed successfully!');
  console.log('\nAvailable commands:');
  console.log('  /conductor-setup      - Initialize Conductor for project');
  console.log('  /conductor-implement  - Execute tasks from track plan');
  console.log('  /conductor-new-track  - Create a new track');
  console.log('  /conductor-review     - Review completed work');
  console.log('  /conductor-status     - Show project progress');
  console.log('  /conductor-revert     - Revert previous work');
  console.log('\nRun /conductor-setup in a project to get started!');
}

install();
