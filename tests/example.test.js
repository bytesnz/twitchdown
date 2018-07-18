import test from 'ava';
import twitchdown from '../index';
import mock from 'mock-require';
import sinon from 'sinon'
const twitchSpy = sinon.spy(twitchdown);

test.before(() => {
  mock('twitchdown', twitchSpy);
})

test('ensure the example code runs', (t) => {
  require('../example');
  t.is(1, twitchSpy.callCount);
});
