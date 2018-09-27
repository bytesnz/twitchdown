import test from 'ava';
import twitchdown from '../index';

test('parses inline code', (t) => {
  t.deepEqual(['Here is some code ', { type: 'code', props: { key: 0 }, children: ['var a = 1'] }, '.'], twitchdown('Here is some code `var a = 1`.'));
});

test('escapes inline code', (t) => {
  t.deepEqual(['a ', { type: 'code', props: { key: 0 }, children: [ '&lt;&quot;&gt;' ] }, ' b' ], twitchdown('a `<">` b'));
});

test('parses three backtricks (```) as a code block', (t) => {
  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code' }, children: [ 'function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}' ] } ], twitchdown('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));

  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code js' }, children: [ 'function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}' ] } ], twitchdown('```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));
});

test('uses highlight function if given in options', (t) => {
  const highlighter = (content, language) => {
    return ((language && language + ' ') || '') + 'CODE ' + content
  };

  t.deepEqual(['a ', { type: 'code', props: { key: 0 }, children: [ '&lt;&quot;&gt;' ] }, ' b' ], twitchdown('a `<">` b', {
    highlight: highlighter
  }));

  t.deepEqual([ 'CODE function codeBlocks() {\n\treturn "Can be inserted";\n}' ], twitchdown('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```', {
    highlight: highlighter
  }));

  t.deepEqual([ 'js CODE function codeBlocks() {\n\treturn "Can be inserted";\n}' ], twitchdown('```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```', {
    highlight: highlighter
  }));
});

test('parses tabs as a code poetry block', (t) => {
  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code poetry' }, children: [ 'var a = 1' ] } ], twitchdown('\tvar a = 1'));
});

test('escapes code/quote blocks', (t) => {
  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code' }, children: [ '&lt;foo&gt;' ] } ], twitchdown('```\n<foo>\n```'));
  t.deepEqual([ { type: 'pre', props: { key: 0, className: 'code poetry' }, children: [ '&lt;foo&gt;' ] } ], twitchdown('\t<foo>'));
});

test('parses a block quote', (t) => {
  t.deepEqual([ { type: 'blockquote', props: { key: 0 }, children: [ 'To be or not to be' ] } ], twitchdown('> To be or not to be'));
});

test('parses lists within block quotes', (t) => {
  t.deepEqual([ { type: 'blockquote', props: { key: 0 }, children: [
    { type: 'ul', props: { key: 3 }, children: [
      { type: 'li', props: { key: 0 }, children: [ 'one' ] },
      { type: 'li', props: { key: 1 }, children: [ 'two' ] },
      { type: 'li', props: { key: 2 }, children: [
        { type: 'strong', props: { key: 1 }, children: [ 'three' ] }
      ] }
    ] }
  ] }, 'hello' ], twitchdown('> - one\n> - two\n> - **three**\nhello'));
});

