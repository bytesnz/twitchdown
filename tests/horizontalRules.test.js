import test from 'ava';
import reactdown from '../';

test('should parse ---', (t) => {
  t.is('foo<hr />bar', reactdown('foo\n\n---\nbar'));
  t.is('foo<hr />bar', reactdown('foo\n\n----\nbar'), '----');
  t.is('<blockquote>foo</blockquote><hr />bar', reactdown('> foo\n\n---\nbar'));
});

test('should parse * * *', (t) => {
  t.is('foo<hr />bar', reactdown('foo\n* * *\nbar'));
  t.is('foo<hr />bar', reactdown('foo\n* * * *\nbar'), '* * * *');
  t.is('<blockquote>foo</blockquote><hr />bar', reactdown('> foo\n\n* * *\nbar'));
});

