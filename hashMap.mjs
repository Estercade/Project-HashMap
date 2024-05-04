import { LinkedList, Node } from './linkedList.mjs';

const HashMap = function() {

  let buckets = new Array(16);
  let capacity = buckets.length;

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

  return { get buckets() { return buckets }, get capacity() { return capacity }, hash, set, get, has, remove };
}

let map = new HashMap;
map.set('Carla', 2);
map.set('Carlass', 4);
console.log(map.buckets[9].head);
console.log(map.remove('Carlass'));
console.log(map.buckets[9].head);