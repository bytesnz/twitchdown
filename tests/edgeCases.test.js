import test from 'ava';
import reactdown from '../';

test('should close unclosed tags', (t) => {
  t.is('<em>foo</em>', reactdown('*foo'));
  t.is('foo<strong></strong>', reactdown('foo**'));
  t.is('<a href="#winning">some <strong>bold text</strong></a>', reactdown('[some **bold text](#winning)'));
  t.is('`foo', reactdown('`foo'));
});

test('should not choke on single characters', (t) => {
  t.is('<em></em>', reactdown('*'));
  t.is('<em></em>', reactdown('_'));
  t.is('<strong></strong>', reactdown('**'));
  t.is('>', reactdown('>'));
  t.is('`', reactdown('`'));
});

