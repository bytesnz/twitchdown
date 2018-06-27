import test from 'ava';
import reactdown from '../';

test('parses an unordered list with *', (t) => {
  t.is('<ul><li>One</li><li>Two</li></ul>', reactdown('* One\n* Two'));
});

test('parses an unordered list with -', (t) => {
  t.is('<ul><li>One</li><li>Two</li></ul>', reactdown('- One\n- Two'));
});

test('parses an unordered list with +', (t) => {
  t.is('<ul><li>One</li><li>Two</li></ul>', reactdown('+ One\n+ Two'));
});

test('parses an unordered list with mixed bullet point styles', (t) => {
  t.is('<ul><li>One</li><li>Two</li><li>Three</li></ul>', reactdown('+ One\n* Two\n- Three'));
});

test('parses an ordered list', (t) => {
  t.is('<ol><li>Ordered</li><li>Lists</li><li>Numbers are ignored</li></ol>', reactdown('1. Ordered\n2. Lists\n4. Numbers are ignored'));
});

