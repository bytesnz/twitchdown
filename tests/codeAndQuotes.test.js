import test from 'ava';
import reactdown from '../';

test('parses inline code', (t) => {
  t.is('Here is some code <code>var a = 1</code>.', reactdown('Here is some code `var a = 1`.'));
});

test('escapes inline code', (t) => {
  t.is('a <code>&lt;&quot;&gt;</code> b', reactdown('a `<">` b'));
});

test('parses three backtricks (```) as a code block', (t) => {
  t.is('<pre class="code ">function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}</pre>', reactdown('```\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));

  t.is('<pre class="code js">function codeBlocks() {\n\treturn &quot;Can be inserted&quot;;\n}</pre>', reactdown('```js\nfunction codeBlocks() {\n\treturn "Can be inserted";\n}\n```'));
});

test('parses tabs as a code poetry block', (t) => {
  t.is('<pre class="code poetry">var a = 1</pre>', reactdown('\tvar a = 1'));
});

test('escapes code/quote blocks', (t) => {
  t.is('<pre class="code ">&lt;foo&gt;</pre>', reactdown('```\n<foo>\n```'));
  t.is('<pre class="code poetry">&lt;foo&gt;</pre>', reactdown('\t<foo>'));
});

test('parses a block quote', (t) => {
  t.is('<blockquote>To be or not to be</blockquote>', reactdown('> To be or not to be'));
});

test('parses lists within block quotes', (t) => {
  t.is('<blockquote><ul><li>one</li><li>two</li><li><strong>three</strong></li></ul></blockquote>\nhello', reactdown('> - one\n> - two\n> - **three**\nhello'));
});

