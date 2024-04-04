/* eslint-disable import/extensions */

import LinkedList from './linkedlist.mjs';

export default class HashMap {
  constructor() {
    this.list = [];
    this.maxSize = 16;
    this.numberOfKeys = 0;
    this.capacity = 16;
    this.loadfactor = this.capacity * 0.75;

    for (let i = 0; i < this.maxSize; i += 1) {
      this.list[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.maxSize;
    }
    if (hashCode < 0 || hashCode >= this.maxSize) {
      throw new Error('The returned hashCode seems to be out of bound.');
    }
    return hashCode;
  }

  has(key) {
    const bucket = this.hash(key);
    const currentLinkedList = this.list[bucket];
    if (currentLinkedList.containsKey(key)) {
      return true;
    }
    return false;
  }

  set(key, value) {
    const bucket = this.hash(key);
    const currentLinkedList = this.list[bucket];

    if (this.has(key)) {
      currentLinkedList.changeValue(key, value);
    } else {
      currentLinkedList.append(key, value);
      this.numberOfKeys += 1;
      this.checkLoadFactor();
    }
    return 'Succesfully added.';
  }

  checkLoadFactor() {
    if (this.loadfactor === this.numberOfKeys) {
      this.increaseHashMap();
    }
  }

  increaseHashMap() {
    const oldList = this.list; // Sauvegarde de la liste existante
    const newList = [];
    for (let i = 0; i < this.maxSize; i += 1) {
      newList[i] = new LinkedList();
    }

    this.list = oldList.concat(newList);
    this.capacity *= 2;
    this.maxSize *= 2;
    this.loadfactor = this.capacity * 0.75;
  }

  get(key) {
    if (this.has(key)) {
      const bucket = this.hash(key);
      const currentLinkedList = this.list[bucket];
      const result = currentLinkedList.findValueFromKey(key);
      return `This is value from ${key} = ${result}`;
    }

    return null;
  }

  // eslint-disable-next-line consistent-return
  removeItem(key) {
    if (this.has(key)) {
      const bucket = this.hash(key);
      const currentLinkedList = this.list[bucket];
      this.numberOfKeys -= 1;
      return currentLinkedList.removeFromKey(key);
    }
    if (!this.has(key)) {
      return false;
    }
  }

  length() {
    return this.numberOfKeys;
  }

  clear() {
    for (let i = 0; i < this.maxSize; i += 1) {
      this.list[i] = new LinkedList();
    }
  }

  values() {
    const valuesArray = [];
    for (let i = 0; i < this.maxSize; i += 1) {
      const result = this.list[i].returnValues();
      if (result !== undefined) {
        valuesArray.push(result);
      }
    }
    // eslint-disable-next-line consistent-return
    return valuesArray;
  }

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.maxSize; i += 1) {
      const result = this.list[i].returnKeys();
      if (result !== undefined) {
        keysArray.push(result);
      }
    }
    return keysArray;
  }

  entries() {
    const pairArray = [];
    for (let i = 0; i < this.maxSize; i += 1) {
      const result = this.list[i].returnPairs();
      if (result !== undefined) {
        pairArray.push(result);
      }
    }
    return pairArray;
  }
}
