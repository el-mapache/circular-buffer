/* Copyright (c) Adam Biagianti/el-mapache
 * Super basic circular buffer implementation for javascript
 * MIT Licensed
 */
(function(window) {
  var root = window,
      CB = root.CB = root.CB || {};

  // {@param size} Number total size of the buffer
  // {@param type} String Type of array buffer to initilize the buffer with.
  CB.CircularBuffer = function(size, type) {

    // Leaves a single unallocated slot for differentiating between the start
    // and end points when the buffer is empty or full
    this.maxSize = size + 1;
    this.start = 0;
    this.end = 0;
    this.buff = new root[type](size+1) || [];
  };

  CB.CircularBuffer.constructor = CB.CircularBuffer;
  
  CB.CircularBuffer.prototype = {
    clear: function() {
      this.start = 0;
      this.end = 0;
      return this.buff = [];
    },

    isEmpty: function() {
      return this.buff.length === 0;
    },

    isFull: function() {
      return ((this.end + 1) % this.maxSize) === this.start;
    },
    
    write: function(data) {
      this.buff[this.end] = data; 
      this.end = (this.end + 1) % this.maxSize;
      if(this.start === this.end) {
        this.start = (this.start + 1) % this.maxSize;
      }
    },
    
    // Read the oldest index
    read: function() {
      if(!this.isEmpty()) {
        var current = this.buff[this.start];
        this.start = (this.start + 1) % this.maxSize;
      }
      return current;
    },
    
    length: function() {
      return this.buff.length;
    },

    last: function() {
      if(this.isEmpty()) {
        return  null;
      }

      return this.end - 1;
    }
  };
  
  return CB.CircularBuffer;
}(window));
