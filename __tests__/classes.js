const { beforeEach, expect } = require('@jest/globals');

const classes = require('../dist/index.js');
console.log(classes);

let el;
beforeEach(() => {
  el = document.createElement('div');
});

describe('.add(class)', () => {
  test('should add a class', () => {
    classes(el).add('foo');
    expect(el.className).toBe('foo');
  });

  test('should not add the same class twice', () => {
    var list = classes(el);
    list.add('foo');
    list.add('foo');
    list.add('foo');
    list.add('bar');
    expect(el.className).toBe('foo bar');
  });
});

describe('.remove(class)', function () {
  test('should remove a class from the beginning', function () {
    el.className = 'foo bar baz';
    classes(el).remove('foo');
    expect(el.className).toBe('bar baz');
  });

  test('should remove a class from the middle', function () {
    el.className = 'foo bar baz';
    classes(el).remove('bar');
    expect(el.className).toBe('foo baz');
  });

  test('should remove a class from the end', function () {
    el.className = 'foo bar baz';
    classes(el).remove('baz');
    expect(el.className).toBe('foo bar');
  });
});

describe('.remove(regexp)', function () {
  test('should remove matching classes', function () {
    el.className = 'foo item-1 item-2 bar';
    classes(el).remove(/^item-/);
    expect(el.className).toBe('foo bar');
  });
});

describe('.toggle(class, force)', function () {
  describe('when present', function () {
    test('should remove the class', function () {
      el.className = 'foo bar hidden';
      classes(el).toggle('hidden');
      expect(el.className).toBe('foo bar');
    });
  });

  describe('when not present', function () {
    test('should add the class', function () {
      el.className = 'foo bar';
      classes(el).toggle('hidden');
      expect(el.className).toBe('foo bar hidden');
    });
  });

  describe('when force is true', function () {
    test('should add the class', function () {
      el.className = 'foo bar';
      classes(el).toggle('hidden', true);
      expect(el.className).toBe('foo bar hidden');
    });

    test('should not remove the class', function () {
      el.className = 'foo bar hidden';
      classes(el).toggle('hidden', true);
      expect(el.className).toBe('foo bar hidden');
    });
  });

  describe('when force is false', function () {
    test('should remove the class', function () {
      el.className = 'foo bar hidden';
      classes(el).toggle('hidden', false);
      expect(el.className).toBe('foo bar');
    });

    test('should not add the class', function () {
      el.className = 'foo bar';
      classes(el).toggle('hidden', false);
      expect(el.className).toBe('foo bar');
    });
  });
});

describe('.array()', function () {
  test('should return an array of classes', function () {
    el.className = 'foo bar baz';
    var ret = classes(el).array();
    expect(ret[0]).toBe('foo');
    expect(ret[1]).toBe('bar');
    expect(ret[2]).toBe('baz');
  });

  test('should return an empty array when no className is defined', function () {
    var ret = classes(el).array();
    expect(ret.length).toBe(0);
  });

  test('should ignore leading whitespace', function () {
    el.className = '  foo bar    baz';
    var ret = classes(el).array();
    expect(ret[0]).toBe('foo');
    expect(ret[1]).toBe('bar');
    expect(ret[2]).toBe('baz');
    expect(ret.length).toBe(3);
  });

  test('should ignore trailing whitespace', function () {
    el.className = 'foo bar   baz     ';
    var ret = classes(el).array();
    expect(ret[0]).toBe('foo');
    expect(ret[1]).toBe('bar');
    expect(ret[2]).toBe('baz');
    expect(ret.length).toBe(3);
  });
});

describe('.has(class)', function () {
  test('should check if the class is present', function () {
    el.className = 'hey there';
    expect(classes(el).has('foo')).toBe(false);
    expect(classes(el).has('hey')).toBe(true);
    expect(classes(el).has('there')).toBe(true);
  });
});
