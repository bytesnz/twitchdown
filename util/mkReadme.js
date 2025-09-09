#!/usr/bin/env node

const fs = require('fs');

fs.writeFileSync('README.md', `${fs.readFileSync('README.src.md')}

\`\`\`javascript
${fs.readFileSync('example.js')}
/* elements will be
${fs.readFileSync('tests/example.output.js').toString().split('\n').slice(1).join('\n')}
*/
\`\`\`


${fs.readFileSync('CHANGELOG.md')}`);
