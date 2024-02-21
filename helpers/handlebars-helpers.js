module.exports = {
    truncate: function (str, len) {
      if (str && str.length > len) {
        return str.substring(0, len) + '...';
      }
      return str;
    },
    formatDate: function (date, format) {
      const newDate = new Date(date);
      return newDate.toDateString(); // Simple example, adjust as needed
    },
    readTime: function (text) { // Note the correction here
      const wordsPerMinute = 200; // Average reading speed
      const textLength = text.split(' ').length; // Split by words and count
      const time = textLength / wordsPerMinute;
      const minutes = Math.ceil(time);
      return `${minutes} min read`; // Return the estimated time to read
    }
  };
  