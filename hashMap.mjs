import { LinkedList, Node } from './linkedList.mjs';

const HashMap = function() {
  
  let size = 16;
  let buckets = new Array(size);

  // hash(key) takes a key and produces a hash code with it
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode + key.charCodeAt(i)) % buckets.length);
    }

    return hashCode;
  }

  const findBucketIndex = (key) => {
    let bucketIndex = hash(key);
    return bucketIndex;
  }

  // set(key, value) updates the value of a node if a matching key already exists,
  // or in the case of a collision adds new node to tail of linked list
  const set = (key, value) => {
    let bucketIndex = findBucketIndex(key);
    // if bucket is empty, add new linked list
    if (!buckets[bucketIndex]) {
      const newLinkedList = new LinkedList();
      newLinkedList.append(key, value);
      buckets[bucketIndex] = newLinkedList;
    } else {
      let current = buckets[bucketIndex].head;
      let previous = current;
      while (current) {
        // if matching key is found, update value
        if (current.key === key) {
          current.value = value;
          return;
        }
        previous = current;
        current = current.nextNode;
      }
      // if no matching key is found when tail is reached add new node to linked list
      previous.nextNode = new Node(key, value);
    }
  }

  // get(key) returns the value that is assigned to the key,
  // or returns null if key was not found
  const get = (key) => {
    let bucketIndex = findBucketIndex(key);
    if (!buckets[bucketIndex]) {
      return null;
    }
    let current = buckets[bucketIndex].head;
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.nextNode;
    }
    return null;
  }

  const has = (key) => {
    let bucketIndex = findBucketIndex(key);
    if (!buckets[bucketIndex]) {
      return false;
    }
    let current = buckets[bucketIndex].head;
    while (current) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  const remove = (key) => {
    let bucketIndex = findBucketIndex(key);
    if (!buckets[bucketIndex]) {
      return false;
    }
    let current = buckets[bucketIndex].head;
    let previous = current;
    while (current) {
      if (current.key === key) {
        previous.nextNode = current.nextNode;
        return true;
      }
      previous = current;
      current = current.nextNode;
    }
    return false;
  }

  const length = () => {
    let count = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        count++;
      }
    }
    return count;
  }

  const clear = () => {
    buckets = new Array(size);
  }

  const keys = () => {
    let arr = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].head;
        while (current) {
          arr.push(current.key);
          current = current.nextNode;
        }
      }
    }
    return arr;
  }

  const values = () => {
    let arr = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].head;
        while (current) {
          arr.push(current.value);
          current = current.nextNode;
        }
      }
    }
    return arr;
  }

  const entries = () => {
    let arr = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        let current = buckets[i].head;
        while (current) {
          arr.push([current.key, current.value]);
          current = current.nextNode;
        }
      }
    }
    return arr;
  }

  return { get buckets() { return buckets }, hash, set, get, has, remove, length, clear, keys, values, entries };
}