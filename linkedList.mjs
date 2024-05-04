export const LinkedList = function() {
  let head = null;
  let tail = null;

  // append(value) adds a new node containing value to the end of the list
  const append = (key, value) => {
    if (!head) {
      head = tail = new Node(key, value);
    } else {
      let current = this.head;
      while(current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = new Node(key, value);
      let newTail = current.nextNode;
      tail = newTail;
    }
  }

  // pop removes the last element from the list
  const pop = () => {
    let current = head;
    if (current.nextNode === null) {
      current.key = null;
      current.value = null;
      head = tail = null;
    } else {
      let previous = current;
      current = current.nextNode;
      while (current.nextNode) {
        previous = current;
        current = current.nextNode;
      }
      previous.nextNode = null;
      tail = previous;
    }
  }

  // contains(value) returns true if the passed in value is in the list and otherwise returns false
  const contains = (key, value) => {
    let current = head;
    while (current) {
      if (current.key == key && current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }
  
  // find(value) returns the index of the node containing value, or null if not found
  const find = (key, value) => {
    let current = head;
    let index = 0;
    while (current) {
      if (current.key == key && current.value === value) {
        return index;
      }
      current = current.nextNode;
      index++;
    }
    return null;
  }

  return {get tail() { return tail }, get head() { return head }, append, pop, contains, find};
}

export const Node = function(key = null, value = null, nextNode = null) {
  this.key = key;
  this.value = value;
  this.nextNode = nextNode;
}