import test from 'ava';
import twitchdown from '../index';

test('parses bold with **', (t) => {
  t.deepEqual([ 'I ', { type: 'strong', props: null, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I **like** tiny libraries'));
});

test('parses bold with __', (t) => {
  t.deepEqual([ 'I ', { type: 'strong', props: null, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I __like__ tiny libraries'));
});

test('parses italics with *', (t) => {
  t.deepEqual([ 'I ', { type: 'em', props: null, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I *like* tiny libraries'));
});

test('parses italics with _', (t) => {
  t.deepEqual([ 'I ', { type: 'em', props: null, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I _like_ tiny libraries'));
});
