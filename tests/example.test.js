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
    { type: "h1", props: { id: "test" }, children: [ "Test" ] },
    { type: "p", props: null, children: [ "This is some ", "test", " markdown" ] },
    { type: "ul", props: null, children: [
      { type: "li", props: null, children: [
        "good ",
        { type: "a", props: { href: "me" }, children: [ "me" ] }
      ] },
      { type: "li", props: null, children: [
        "one ",
        "First is 'first', the rest is 'second,third"
      ] }
    ] },
    "You are super 'bob' because twitch",
    { type: "pre", props: { className: "code javascript" }, children: [
      "function hello() {\n  console.debug('hello');\n}"
    ] }
  ], output, 'script output');
  console.log = realLog;
});
