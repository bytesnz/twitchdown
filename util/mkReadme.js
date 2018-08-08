#!/usr/bin/env node

const fs = require('fs');

fs.writeFileSync('README.md', `${fs.readFileSync('README.src.md')}

\`\`\`javascript
${fs.readFileSync('example.js')}
\`\`\`


${fs.readFileSync('CHANGELOG.md')}`);
