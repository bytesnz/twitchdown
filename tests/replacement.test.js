const test = require('ava');
const twitchdown = require('../index');

const options = { replacePunctuation: true };

test('it does not replace --, --- or ... without option', (t) => {
  t.deepEqual(['Code ', '--', ' ', '---', ' ', '...', ' Here'], twitchdown('Code -- --- ... Here'));
});

test('it does not replace --, --- or ... in code', (t) => {
  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code js' }, children: [ 'function codeBlocks() {\n\treturn &quot;-- --- ...Can be inserted&quot;;\n}' ] } ], twitchdown('```js\nfunction codeBlocks() {\n\treturn "-- --- ...Can be inserted";\n}\n```', options));
});

test('it replaces -- with an endash', (t) => {
  t.deepEqual([{ type: 'h1', props: { key: 0 }, children: [ 'Header ', '&ndash;', ' Here'] }, 'Code ', '&ndash;', ' Here'], twitchdown('# Header -- Here\nCode -- Here', options));
});

test('it replaces --- with an emdash', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header ', '&mdash;', ' Here' ] }, 'Code ', '&mdash;', ' Here' ], twitchdown('# Header --- Here\nCode --- Here', options));
});

test('it replaces ... with an ellipsis', (t) => {
  t.deepEqual([{ type: 'h1', props: { key: 0 }, children: [ 'Header ', '&hellip;', ' Here'] }, 'Code ', '&hellip;', ' Here'], twitchdown('# Header ... Here\nCode ... Here', options));
});
