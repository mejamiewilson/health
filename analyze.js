var fs = require('fs');
var entries = require('./entries.json');
var today = new Date();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getYear() + 1900;
var toSearch, points = 0;

if(process.argv[2] === 'today') {
    if(entries[year] && entries[year][month] && entries[year][month][day]) {
      toSearch = entries[year][month][day];
    }
}
if(process.argv[2] === 'yesterday') {
  if(entries[year] && entries[year][month] && entries[year][month][day-1]) {
    toSearch = entries[year][month][day-1];
  }
}

if(toSearch) {
  toSearch.forEach(function(f) {
      points += Math.floor(f.points);
      var pieces = f.food.name.split(',');
      var p = Math.floor(f.points);
      var log = p + ': ';
      if(p < 10) {
        log = ' ' + p + ': ';
      }
      console.log(log + pieces.slice(0,2).join(',') + ' (' + f.food.index + ')');
  })
  console.log('------------------------');
  console.log(points + ': Todays points');
}
