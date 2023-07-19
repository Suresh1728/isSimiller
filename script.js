function isSimilar(obj1, obj2) {
    // Check if the types of obj1 and obj2 are the same
    if (typeof obj1 !== typeof obj2) {
      return false;
    }
  
    // Handle arrays
    if (Array.isArray(obj1)) {
      if (obj1.length !== obj2.length) {
        return false;
      }
  
      for (let i = 0; i < obj1.length; i++) {
        if (!isSimilar(obj1[i], obj2[i])) {
          return false;
        }
      }
  
      return true;
    }
  
    // Handle maps
    if (obj1 instanceof Map && obj2 instanceof Map) {
      if (obj1.size !== obj2.size) {
        return false;
      }
  
      for (const [key, value] of obj1.entries()) {
        if (!isSimilar(value, obj2.get(key))) {
          return false;
        }
      }
  
      return true;
    }
  
    // Handle objects
    if (typeof obj1 === 'object' && typeof obj2 === 'object') {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) {
        return false;
      }
  
      for (const key of keys1) {
        if (!obj2.hasOwnProperty(key)) {
          return false;
        }
  
        if (!isSimilar(obj1[key], obj2[key])) {
          return false;
        }
      }
  
      return true;
    }
  
    // Handle primitive values
    return obj1 === obj2;
  }
  
  document.getElementById('compareBtn').addEventListener('click', function() {
    const obj1 = document.getElementById('obj1').value.trim();
    const obj2 = document.getElementById('obj2').value.trim();
    let parsedObj1, parsedObj2;
  
    try {
      parsedObj1 = JSON.parse(obj1);
      parsedObj2 = JSON.parse(obj2);
    } catch (error) {
      console.error('Invalid input format.');
    }
  
    const resultElement = document.getElementById('result');
    if (parsedObj1 && parsedObj2) {
      const result = isSimilar(parsedObj1, parsedObj2);
      resultElement.textContent = `Result: ${result}`;
    } else {
      resultElement.textContent = 'Invalid input.';
    }
  });
  