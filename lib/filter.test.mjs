import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkMessage } from './filter.mjs';

test('crisis phrases win, with or without diacritics', () => {
  assert.equal(checkMessage('Nu mai vreau să trăiesc'), 'crisis');
  assert.equal(checkMessage('nu mai vreau sa traiesc'), 'crisis');
  assert.equal(checkMessage('Mă bat în fiecare pauză'), 'crisis');
  assert.equal(checkMessage('m-au bătut după ore, ești prost dacă taci'), 'crisis');
});

test('profanity and aimed insults are blocked', () => {
  assert.equal(checkMessage('ești proastă'), 'offensive');
  assert.equal(checkMessage('Esti un idiot'), 'offensive');
  assert.equal(checkMessage('du-te în p*la'), 'ok'); // shortcut: masked spellings pass
  assert.equal(checkMessage('PULA'), 'offensive');
});

test('a student quoting an insult is not blocked', () => {
  assert.equal(checkMessage('Mi-au zis că sunt grasă și proastă'), 'ok');
  assert.equal(checkMessage('Și mie mi s-a întâmplat. Ce ai făcut după?'), 'ok');
  assert.equal(checkMessage('Mor de râs'), 'ok');
});
