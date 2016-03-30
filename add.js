var fs = require('fs');
var _ = require('lodash');
var today = new Date();
var data = require('./data.json');
var food = process.argv[2];
var quantity = process.argv[3];
var entries_location = './entries.json';

food = _.filter(data, {
  index: parseInt(food)
})[0];
console.log("Adding: ", food.name, 'Quantity: ', quantity);

//* Load entries *//
var entries;
try {
  entries = require(entries_location);
} catch (ex) {
  if (ex.message.indexOf('Cannot find module') !== -1) {
    entries = {};
  }
}

var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getYear() + 1900;
if (!entries[year]) {
  entries[year] = {};
}
if (!entries[year][month]) {
  entries[year][month] = {};
}
if (!entries[year][month][day]) {
  entries[year][month][day] = [];
}

var entry = {
  food: food,
  quantity: quantity,
  points: food.points * (quantity / 100)
};
entries[year][month][day].push(entry);

fs.writeFileSync(entries_location, JSON.stringify(entries), {
  utf8: 'encoding'
});
