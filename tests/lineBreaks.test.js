import test from 'ava';
import reactdown from '../';

test('parses two new lines as line breaks', (t) => {
  t.is('Something with<br />a line break', reactdown('Something with\n\na line break'));
});

test('parses two spaces as a line break', (t) => {
  t.is('Something with<br />a line break', reactdown('Something with  \na line break'));
});

