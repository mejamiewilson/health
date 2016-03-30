var data = require('./data.json');
var _ = require('lodash');

if (process.argv.length < 3) {
  console.log('Please enter a search term');
  return;
}

process.argv.shift();
process.argv.shift();
var enquiry = process.argv.join(' ');

var results = _.filter(data, function(food) {
  return food.name.toUpperCase().indexOf(enquiry.toUpperCase()) !== -1;
});

console.log('Found ' + results.length + ' result' + (results.length !== 1 ? 's' : ''));

results.forEach(function(d) {
  console.log(d.index + ': '+ d.name);
  console.log("Propoints: " + Math.floor(d.points) + ' per 100/g');
})
