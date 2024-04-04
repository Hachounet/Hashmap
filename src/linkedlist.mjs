// eslint-disable-next-line import/extensions
import Node from './node.mjs';

export default class LinkedList {
  constructor(head = null, totalSize = null) {
    this.head = head;
    this.tail = head;
    this.totalSize = totalSize;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.totalSize += 1;
  }

  prepend(value) {
    const newHead = new Node(value);
    if (this.head === null) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      newHead.nextNode = this.head;
      this.head = newHead;
    }
    this.totalSize += 1;
  }

  size() {
    if (this.head === null) {
      return 0;
    }
    return this.totalSize;
  }

  findHead() {
    return this.head;
  }

  findTail() {
    return this.tail;
  }

  atIndex(index) {
    if (this.head === null) {
      return 'List is empty. Cannot find item on list.';
    }
    let currentNode = this.head;
    let counter = 1;
    while (counter !== index) {
      currentNode = currentNode.nextNode;
      counter += 1;
      if (currentNode.nextNode === null && counter !== index) {
        return 'No node at this index.';
      }
    }
    return currentNode;
  }

  pop() {
    const lastNode = this.tail;
    let currentNode = this.head;
    while (currentNode.nextNode !== lastNode) {
      currentNode = currentNode.nextNode;
    }
    this.tail = currentNode;
    this.tail.nextNode = null;
    this.totalSize -= 1;
  }

  containsKey(key) {
    let currentNode = this.head;
    let result = false;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        result = true;
        return result;
      }
      currentNode = currentNode.nextNode;
    }
    return result;
  }

  containsValue(value) {
    let currentNode = this.head;
    let result;
    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        result = true;
        return result;
      }
      currentNode = currentNode.nextNode;
    }
    if (currentNode.nextNode === null && currentNode.value !== value) {
      result = false;
      return result;
    }
    return result;
  }

  // eslint-disable-next-line consistent-return
  changeValue(key, value) {
    let currentNode = this.head;
    let found = false;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        currentNode.value = value;
        found = true;
        break;
      }
      currentNode = currentNode.nextNode;
    }
    if (!found) {
      return 'Error. No item with this key found in this list.';
    }
  }

  find(value) {
    let result;
    if (this.head.value === null && this.head.nextNode === null) {
      result = null;
      return result;
    }
    let currentNode = this.head;
    let index = 1;
    while (currentNode.nextNode !== null) {
      if (currentNode.value === value) {
        return index;
      }
      index += 1;
      currentNode = currentNode.nextNode;
    }
    if (currentNode.nextNode === null && currentNode.value !== value) {
      result = null;
      return result;
    }
    result = index;
    return result;
  }

  findValueFromKey(key) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  toString() {
    let result = '';
    let currentNode = this.head;
    if (
      this.head === null ||
      (this.head.value === null && this.head.nextNode === null)
    ) {
      return null;
    }
    while (currentNode.nextNode !== null) {
      result += `(${currentNode.value}) --> `;
      currentNode = currentNode.nextNode;
    }
    if (currentNode.nextNode === null) {
      result += currentNode.value;
    }
    return result;
  }

  returnPairs() {
    let currentNode = this.head;
    if (this.head === null) {
      return;
    }
    if (this.head !== null) {
      const result = [];
      while (currentNode !== null) {
        result.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
      // eslint-disable-next-line consistent-return
      return result;
    }
  }

  returnKeys() {
    let currentNode = this.head;
    if (this.head === null) {
      return;
    }
    if (this.head !== null) {
      const result = [];
      while (currentNode !== null) {
        result.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
      // eslint-disable-next-line consistent-return
      return result;
    }
  }

  returnValues() {
    let currentNode = this.head;
    if (this.head === null) {
      return;
    }
    if (this.head !== null) {
      const result = [];
      while (currentNode !== null) {
        result.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
      // eslint-disable-next-line consistent-return
      return result;
    }
  }

  insertAt(value, index) {
    const newNode = new Node(value);
    if (index < 0) {
      return 'Index must be a positive number.';
    }
    if (index === 0) {
      newNode.nextNode = this.head;
      this.head = newNode;
      if (this.tail === null) {
        this.tail = newNode;
      }
      return 'Node inserted/';
    }
    let currentNode = this.head;
    let prevNode = null;
    let counter = 0;

    while (currentNode !== null && counter < index) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      counter += 1;
    }
    if (currentNode === null && counter !== index) {
      return 'Error. Index given is greater than total elements in the linked list.';
    }
    newNode.nextNode = currentNode;
    if (prevNode === null) {
      this.head = newNode;
    } else {
      prevNode.nextNode = newNode;
    }
    this.totalSize += 1;
    return 'Node inserted.';
  }

  removeAt(index) {
    if (index < 0) {
      return 'Index must be greather or equal to 0. ';
    }
    if (index === 0) {
      if (this.head === null) {
        return 'List is already empty.';
      }
      this.head = this.head.nextNode;
    }
    let counter = 1;
    let prevNode = this.head;
    let currentNode = this.head.nextNode;
    while (currentNode !== null && index !== counter) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      counter += 1;
    }
    if (currentNode === null) {
      return 'Index is greather than number of elements in the list.';
    }
    prevNode.nextNode = currentNode.nextNode;
    currentNode = null;
    this.totalSize -= 1;
    return 'Node deleted.';
  }

  removeFromKey(key) {
    let prevNode = null;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        if (prevNode === null) {
          this.head = currentNode.nextNode;
          if (this.tail === currentNode) {
            this.tail = null;
          }
        } else {
          prevNode.nextNode = currentNode.nextNode;
          if (currentNode.nextNode === null) {
            this.tail = prevNode;
          }
        }
        currentNode = null;
        this.totalSize -= 1;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
}
