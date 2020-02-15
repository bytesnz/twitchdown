/*eslint-disable no-console */
import test from 'ava';
import twitchdown from '../index';
import mock from 'mock-require';
import sinon from 'sinon'
const twitchSpy = sinon.spy(twitchdown);

test.before(() => {
  mock('twitchdown', twitchSpy);
})

test('ensure the example code runs', (t) => {
  const realLog = console.log;
  let output;
  console.log = (message) => {
    output = message
  };
  require('../example');
  t.is(1, twitchSpy.callCount);
  t.deepEqual([
    { type: "h1", props: { key: 0 , id: "test" }, children: [ "Test" ] },
    { type: "p", props: { key: 2 }, children: [ "This is some ", "test", " markdown" ] },
    { type: "ul", props: { key: 6 }, children: [
      { type: "li", props: { key: 4 }, children: [
        "good ",
        { type: "a", props: { key: 0 , href: "me" }, children: [ "me" ] }
      ] },
      { type: "li", props: { key: 5 }, children: [
        "one ",
        "First is 'first', the rest is 'second,third"
      ] }
    ] },
    "You are super 'bob' because twitch",
    { type: "pre", props: { key: 7 , className: "code javascript" }, children: [
      "function hello() {\n  console.debug('hello');\n}"
    ] }
  ], output, 'script output');
  console.log = realLog;
});

