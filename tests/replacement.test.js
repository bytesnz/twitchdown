const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

const options = { replacePunctuation: true };

test('it does not replace --, --- or ... without option', () => {
  assert.deepStrictEqual(['Code ', '--', ' ', '---', ' ', '...', ' Here'], twitchdown('Code -- --- ... Here'));
});

test('it does not replace --, --- or ... in code', () => {
  assert.deepStrictEqual([ { type: 'pre', props: { key: 0, className: 'code js' }, children: [ 'function codeBlocks() {\n\treturn &quot;-- --- ...Can be inserted&quot;;\n}' ] } ], twitchdown('```js\nfunction codeBlocks() {\n\treturn "-- --- ...Can be inserted";\n}\n```', options));
});

test('it replaces -- with an endash', () => {
  assert.deepStrictEqual([{ type: 'h1', props: { key: 0 }, children: [ 'Header ', '&ndash;', ' Here'] }, 'Code ', '&ndash;', ' Here'], twitchdown('# Header -- Here\nCode -- Here', options));
});

test('it replaces --- with an emdash', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header ', '&mdash;', ' Here' ] }, 'Code ', '&mdash;', ' Here' ], twitchdown('# Header --- Here\nCode --- Here', options));
});

test('it replaces ... with an ellipsis', () => {
  assert.deepStrictEqual([{ type: 'h1', props: { key: 0 }, children: [ 'Header ', '&hellip;', ' Here'] }, 'Code ', '&hellip;', ' Here'], twitchdown('# Header ... Here\nCode ... Here', options));
});
