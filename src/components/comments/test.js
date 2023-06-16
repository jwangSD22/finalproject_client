var format = require('date-fns/format');
var formatDistanceToNow = require ('date-fns/formatDistanceToNow')

const time = new Date('2023-06-01T00:02:23.603+00:00')

console.log(format(time,`MMMM d, yyyy 'at' hh:mm a`))

// returns January 31, 2022 at 04:02 PM

const formattedDate = formatDistanceToNow(time, { addSuffix: true });

console.log(formattedDate)

//returns over 1 year ago
