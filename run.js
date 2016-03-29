/* This generates a data file based off NZ raw nutrition data */

var fs = require('fs');
var _ = require('lodash');

var data = fs.readFileSync('./raw.data', {
  encoding: 'utf8'
});
data = data.split('\n');
data.shift();

var titles = data.shift().split('~'),
  titleType = data.shift().split('~'),
  foods = [];

data.pop();

//Attach Titles to each Food
data.forEach(function(food) {
  var vals = food.split('~');
  var keys = {};
  for (var i = 0; i < vals.length; i++) {
    keys[titles[i]] = {
      value: vals[i],
      measurement: titleType[i]
    };
  }
  foods.push(keys);
});

//Calculate Pro Points
var output = [];
foods.forEach(function(food) {
  var C = parseFloat(food['Energy, total metabolisable (kcal)'].value);
  var S = parseFloat(food['Sugars, total'].value);
  var F = parseFloat(food['Fat, total'].value);
  var P = parseFloat(food['Protein, total; calculated from total nitrogen'].value);
  var Points = (C + (1 * 4 * S) + (1 * 9 * F) - (0.8 * 4 * P)) / 33;
  output.push({
    name: food['Food Name'].value,
    calories: C,
    sugar: S,
    fat: F,
    protein: P,
    points: Points
  });
});

fs.writeFileSync('./data.json', JSON.stringify(output), {
  encoding: 'utf8'
});
