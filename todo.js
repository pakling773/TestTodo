'use strict'

var _data = []


// Add a task
exports.add = (body) => {
  try {
    const result = JSON.parse(body)
    _data.push(result)
    return { 'code': 201, 'body': 'Successfully' }
  } catch (err) {
    return { 'code': 410, 'body': 'JSON Object required.' }
  }
}

// List all store items
exports.list = () => {
  return {
    'code': 200, 'body': _data.map((item, index) => ({ id: index, ...item }))
  }
}

// Remove keytask
exports.remove = (body) => {
  try {
      const result = JSON.parse(body);
      const taskToRemove = result.hasOwnProperty('task') ? result.task : null;

      if (taskToRemove === null) {
          return { 'code': 400, 'body': 'Task value is required.' };
      }

      const index = _data.findIndex(item => item.task === taskToRemove);

      if (index !== -1) {
          _data.splice(index, 1);
          return { 'code': 201, 'body': 'Successfully' };
      } else {
          return { 'code': 400, 'body': 'Task not found.' };
      }
  } catch (err) {
      return { 'code': 410, 'body': 'JSON Object required.' };
  }
}