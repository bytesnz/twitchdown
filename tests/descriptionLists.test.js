const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('parses description lists correctly', () => {
  assert.deepStrictEqual([
    'Something with',
    { type: 'br', props: { key: 0 } },
    { type: 'dl', props: { key: 1 }, children: [
      { type: 'dt', props: { key: 2 }, children: [ 'description term 1' ] },
      { type: 'dd', props: { key: 3 }, children: [ 'description definition 1' ] },
      { type: 'dt', props: { key: 4 }, children: [ 'description term 2' ] },
      { type: 'dt', props: { key: 5 }, children: [ 'description term 2a' ] },
      { type: 'dd', props: { key: 6 }, children: [ 'description definition 2' ] },
      { type: 'dt', props: { key: 7 }, children: [ 'description term 3' ] },
      { type: 'dd', props: { key: 8 }, children: [ 'description definition 3' ] },
      { type: 'dd', props: { key: 9 }, children: [ 'description definition 3a' ] },
    ] },
    { type: 'br', props: { key: 10 } },
    'a line break'
  ], twitchdown(`Something with

description term 1
: description definition 1
description term 2
description term 2a
: description definition 2
description term 3
: description definition 3
: description definition 3a

a line break`));
});

test('parses description lists correctly with paragraphs', () => {
  assert.deepStrictEqual([
      { type: 'p', props: { key: 0 }, children: [ 'Something with' ] },
      { type: 'dl', props: { key: 1 }, children: [
        { type: 'dt', props: { key: 2 }, children: [ 'description term 1' ] },
        { type: 'dd', props: { key: 3 }, children: [ 'description definition 1' ] },
        { type: 'dt', props: { key: 4 }, children: [ 'description term 2' ] },
        { type: 'dt', props: { key: 5 }, children: [ 'description term 2a' ] },
        { type: 'dd', props: { key: 6 }, children: [ 'description definition 2' ] },
        { type: 'dt', props: { key: 7 }, children: [ 'description term 3' ] },
        { type: 'dd', props: { key: 8 }, children: [ 'description definition 3' ] },
        { type: 'dd', props: { key: 9 }, children: [ 'description definition 3a' ] },
      ] },
      { type: 'p', props: { key: 10 }, children: [ 'a line break' ] },
    ], twitchdown(`Something with

description term 1
: description definition 1
description term 2
description term 2a
: description definition 2
description term 3
: description definition 3
: description definition 3a

a line break`, { paragraphs: true }));
});
