var JOURNAL = [
{"events":["work", "touched tree", "pizza", "running", "television"], 
"squirrel":false},
{"events":["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], 
"squirrel":false},
{"events":["weekend", "cycling", "break", "peanuts", "beer"], "squirrel":true},
  {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],
  "squirrel":false},
  {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false},
  {"events":["brussel sprouts","pudding","brushed teeth","running","weekend"],"squirrel":false},
  {"events":["pizza","brushed teeth","computer","work","touched tree"],
  "squirrel": true},
  {"events":["bread","beer","brushed teeth","cycling","work"],
  "squirrel":false},
];

function hasEvent(event, entry) {
    return entry.events.indexOf(event) !== -1;
}

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i], index = 0;
        if (hasEvent(event, entry)) index += 1;
        if (entry.squirrel) index += 2;
        table[index] += 1;
    }
    return table;
}

var allEvents = [];
JOURNAL.forEach(entry => {
    entry.events.forEach(event => {
        if (allEvents.indexOf(event) === -1) { allEvents.push(event); }
    });
});
//console.log(allEvents);
var allTables = allEvents.map(event => { 
  return {event: event, value: tableFor(event, JOURNAL)}});
//console.log(allTables);

function phi(a, b, c, d) {
    const numerator = a * d - b * c;
    const denominator = Math.sqrt((a + b) * (c + d) * (a + c) * (b + d));
    return (numerator/denominator).toFixed(2);
}
var allPhis = allTables.map(table => {
    return { event: table.event, phi: phi.apply(null, table.value)};
});

//console.log(allPhis);

var correlations = [
    { min:-1.0, max: -0.7, result: "strong negative association." },
    { min: -0.7, max: -0.3, result: "weak negative association." },
    { min: -0.3, max: +0.3, result: "little or no association." },
    { min: +0.3, max: +0.7, result: "weak positive association." },
    { min: +0.7, max: +1.0, result: "strong positive association."}
];

var rangedCorrelations = [[], [], [], [], []];
var generateRangedCorrelations = function (correlations, phis) {
    phis.forEach(phi => {
        if (phi.phi < -0.7) {
            rangedCorrelations[0].push(phi);
        } else if (phi.phi < -0.3) {
            rangedCorrelations[1].push(phi);
        } else if (phi.phi < 0.3) {
            rangedCorrelations[2].push(phi);
        } else if (phi.phi < 0.7) {
            rangedCorrelations[3].push(phi);
        } else {
            rangedCorrelations[4].push(phi);
        }
    });
};

generateRangedCorrelations(correlations, allPhis);

var strongCorrelations = allPhis.filter(value => {
    return value.phi < -0.5 || value.phi > 0.5;
});

console.log('You are likely turn to a wolf:', strongCorrelations);
console.log('rangedCorrelations', rangedCorrelations);
