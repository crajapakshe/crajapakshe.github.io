const fs = require('fs');
const path = require('path');

const [version] = process.argv.slice(2);
if (!version) {
  throw new Error('You must provide the version argument.');
}

const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

const changelog = fs.readFileSync(changelogPath, {
  encoding: 'utf8',
});

const cleanSection = '## [Unreleased] - yyyy-mm-dd\n\n### Added\n\n### Changed\n\n### Fixed';

const [date] = new Date().toISOString().split('T');

console.log('Updating change log with: ');
console.log({ date, version });

const updated = changelog.replace(/## \[Unreleased\] - yyyy-mm-dd/, `${cleanSection}\n\n## [${version}] - ${date}`);

fs.writeFileSync(changelogPath, updated);

console.log(`Wrote to ${changelogPath}`);
