import test from 'ava';
import reactdown from '../';

test('parses inline code', (t) => {
  t.deepEqual(['Here is some code ', { type: 'code', props: null, children: ['var a = 1'] }, '.'], reactdown('Here is some code `var a = 1`.'));
});

test('escapes inline code', (t) => {
  t.deepEqual(['a ', { type: 'code', props: null, children: [ '&lt;&quot;&gt;' ] }, ' b' ], reactdown('a `<">` b'));
});

test('parses three backtricks (```) as a code block', (t) => {
  t.deepEqual([ { type: 'pre', props: { className: 'code' }, children: [ 'function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}' ] } ], reactdown('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));

  t.deepEqual([ { type: 'pre', props: { className: 'code js' }, children: [ 'function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}' ] } ], reactdown('```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));
});

test('uses highlight function if given in options', (t) => {
  const highlighter = (content, language) => {
    return ((language && language + ' ') || '') + 'CODE ' + content
  };

  t.deepEqual(['a ', { type: 'code', props: null, children: [ '&lt;&quot;&gt;' ] }, ' b' ], reactdown('a `<">` b', {
    highlight: highlighter
  }));

  t.deepEqual([ 'CODE function codeBlocks() {\n\treturn "Can be inserted";\n}' ], reactdown('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```', {
    highlight: highlighter
  }));

  t.deepEqual([ 'js CODE function codeBlocks() {\n\treturn "Can be inserted";\n}' ], reactdown('```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```', {
    highlight: highlighter
  }));
});

test('parses tabs as a code poetry block', (t) => {
  t.deepEqual([ { type: 'pre', props: { className: 'code poetry' }, children: [ 'var a = 1' ] } ], reactdown('\tvar a = 1'));
});

test('escapes code/quote blocks', (t) => {
  t.deepEqual([ { type: 'pre', props: { className: 'code' }, children: [ '&lt;foo&gt;' ] } ], reactdown('```\n<foo>\n```'));
  t.deepEqual([ { type: 'pre', props: { className: 'code poetry' }, children: [ '&lt;foo&gt;' ] } ], reactdown('\t<foo>'));
});

test('parses a block quote', (t) => {
  t.deepEqual([ { type: 'blockquote', props: null, children: [ 'To be or not to be' ] } ], reactdown('> To be or not to be'));
});

test('parses lists within block quotes', (t) => {
  t.deepEqual([ { type: 'blockquote', props: null, children: [
    { type: 'ul', props: null, children: [
      { type: 'li', props: null, children: [ 'one' ] },
      { type: 'li', props: null, children: [ 'two' ] },
      { type: 'li', props: null, children: [
        { type: 'strong', props: null, children: [ 'three' ] }
      ] }
    ] }
  ] }, 'hello' ], reactdown('> - one\n> - two\n> - **three**\nhello'));
});

