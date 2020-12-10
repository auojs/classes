/**
 * Array.indexOf
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @param {T} obj
 * @return {*}  {number}
 */
export function indexOf<T = string>(arr: T[], obj: T): number {
  if (arr.indexOf) return arr.indexOf(obj);
  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
}

/**
 * Initialize a new ClassList for `el`.
 *
 * @export
 * @class Classes
 */
class ClassesApi<T extends Element> {
  /**
   * classList
   *
   * @private
   * @type {DOMTokenList}
   */
  private readonly list: DOMTokenList;

  /**
   * Creates an instance of Classes.
   * @param {T} el
   */
  constructor(private readonly el: T) {
    this.list = el.classList;
  }

  /**
   * Return an array of classes.
   *
   * @return {string[]}
   */
  public array(): string[] {
    const className = this.el.getAttribute('class') || '';
    const str = className.replace(/^\s+|\s+$/g, '');
    const arr = str.split(/\s+/);
    if ('' === arr[0]) arr.shift();
    return arr;
  }

  /**
   * Add class `name` if not already present.
   *
   * @param {string} name
   * @return {this}
   */
  public add(name: string): this {
    if (this.list) {
      this.list.add(name);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (i === -1) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  }

  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {(string | RegExp)} name
   * @return {this}
   */
  public remove(name: string | RegExp): this {
    if (name instanceof RegExp) {
      return this.removeMatching(name);
    }

    // classList
    if (this.list) {
      this.list.remove(name);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (i !== -1) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  }

  /**
   * Remove all classes matching `re`.
   *
   * @private
   * @param {RegExp} reg
   * @return {this}
   */
  private removeMatching(reg: RegExp): this {
    const arr = this.array();

    for (const key in arr) {
      if (reg.test(arr[key])) {
        this.remove(arr[key]);
      }
    }
    return this;
  }

  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {string} name
   * @param {boolean} force
   * @return {this}
   */
  public toggle(name: string, force: boolean): this {
    // classList
    if (this.list) {
      if ('undefined' !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    // fallback
    if ('undefined' !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  }

  /**
   * Check if class `name` is present.
   *
   * @param {string} name
   * @return {boolean}
   */
  public has(name: string): boolean {
    return this.list
      ? this.list.contains(name)
      : indexOf(this.array(), name) !== -1;
  }
}

export default function classes<T extends Element>(el: T): ClassesApi<T> {
  return new ClassesApi<T>(el);
}
