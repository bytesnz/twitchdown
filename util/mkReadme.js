#!/usr/bin/env node

const fs = require('fs');

fs.writeFileSync('README.md', `${fs.readFileSync('README.src.md')}\n\n${fs.readFileSync('CHANGELOG.md')}`);
