const fs = require('fs');

/**
 * Counts the students in a CSV data file.
 * @param {String} path - The path to the CSV data file.
 * @returns {Promise<void>}
 */
const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data.toString('utf-8').trim().split('\n');
      const stuObj = {};
      const fieldNames = fileLines[0].split(',');
      const stuPropNames = fieldNames.slice(0, fieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRow = line.split(',');
        const studentPropValues = studentRow.slice(0, studentRow.length - 1);
        const field = studentRow[studentRow.length - 1];
        if (!Object.keys(stuObj).includes(field)) {
          stuObj[field] = [];
        }
        const stuEntries = stuPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
        stuObj[field].push(Object.fromEntries(stuEntries));
      }

      const total = Object.values(stuObj).reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${total}`);
      for (const [field, group] of Object.entries(stuObj)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
