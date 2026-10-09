const yargs = require('yargs');
const fs = require('fs');

const argv = yargs
    .option('tag', {
      type: 'string',
      description: 'The tag for this release, such as 1.2.1 or v1.2.1'
    })
    .option('project', {
      type: 'string',
      description: 'The github project, such as dysonfyke/pbta-impulsedrive'
    })
    .demandOption(['tag', 'project'])
    .argv;

// Load the existing manifest.
const systemRaw = fs.readFileSync('./dist/system.json');
let system = JSON.parse(systemRaw);

// Update the version and URLs. The manifest always points at the latest
// release, while the download is pinned to this release's tag.
const project = `https://github.com/${argv.project}`;
system.version = argv.tag.replace(/^v/, '');
system.url = project;
system.manifest = `${project}/releases/latest/download/system.json`;
system.download = `${project}/releases/download/${argv.tag}/${system.id}.zip`;

fs.writeFileSync('./dist/system.json', JSON.stringify(system, null, 2));
console.log(`Build: ${system.version}`);
console.log(`Project: ${system.url}`);
console.log(`Manifest: ${system.manifest}`);
console.log(`Download: ${system.download}`);
