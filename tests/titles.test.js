import test from 'ava';
import reactdown from '../';

test('parses H1 titles', (t) => {
  t.is('<h1>I like tiny libraries</h1>', reactdown('# I like tiny libraries'));
});

test('parses underlined H1 titles', (t) => {
  t.is('<h1>I like tiny libraries</h1>', reactdown('I like tiny libraries\n==='));
});

test('parses H2 titles', (t) => {
  t.is('<h2>I like tiny libraries</h2>', reactdown('## I like tiny libraries'));
});

test('parses H3 titles', (t) => {
  t.is('<h3>I like tiny libraries</h3>', reactdown('### I like tiny libraries'));
});

test('parses titles with reference links', (t) => {
  t.is('<h1>I like <a href="https://github.com/developit/reactdown">tiny libraries</a></h1>',
    reactdown('# I like [tiny libraries]\n\n[tiny libraries]: https://github.com/developit/reactdown')
  );
});

