import test from 'ava';
import twitchdown from '../index';

test('parses bold with **', (t) => {
  t.deepEqual([ 'I ', { type: 'strong', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I **like** tiny libraries'));
});

test('parses bold with __', (t) => {
  t.deepEqual([ 'I ', { type: 'strong', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I __like__ tiny libraries'));
});

test('parses italics with *', (t) => {
  t.deepEqual([ 'I ', { type: 'em', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I *like* tiny libraries'));
});

test('parses italics with _', (t) => {
  t.deepEqual([ 'I ', { type: 'em', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I _like_ tiny libraries'));
});

test('parses bold with ** and a block before', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'strong', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI **like** tiny libraries'));
});

test('parses bold with __ and a block before', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'strong', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI __like__ tiny libraries'));
});

test('parses italics with * and a block before', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'em', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI *like* tiny libraries'));
});

test('parses italics with _ and a block before', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'em', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI _like_ tiny libraries'));
});
