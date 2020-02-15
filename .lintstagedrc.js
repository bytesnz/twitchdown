module.exports = {
  '{README.src.md,CHANGELOG.md,config.example.js,package.json}': [
    () => 'util/mkReadme.js',
    'git add README.md'
  ],
  'index.js': [
    'eslint',
    () => 'uglifyjs index.js > index.min.js',
    'git add index.min.js'
  ]
};
