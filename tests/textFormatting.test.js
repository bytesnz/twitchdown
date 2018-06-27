import test from 'ava';
import reactdown from '../';

test('parses bold with **', (t) => {
  t.is('I <strong>like</strong> tiny libraries', reactdown('I **like** tiny libraries'));
});

test('parses bold with __', (t) => {
  t.is('I <strong>like</strong> tiny libraries', reactdown('I __like__ tiny libraries'));
});

test('parses italics with *', (t) => {
  t.is('I <em>like</em> tiny libraries', reactdown('I *like* tiny libraries'));
});

test('parses italics with _', (t) => {
  t.is('I <em>like</em> tiny libraries', reactdown('I _like_ tiny libraries'));
});
