/**
 * Created by rhett on 5/13/16.
 */
'use strict';


module.exports = function (err, logFunc) {
  if (/time\s?limit/i.test(err.message)) {
    logFunc('Search timeout elapsed.');
    logFunc('Your query may be too vague.');
    logFunc('Try adding filters for employee-only `-e` or department `-D <department-name>`');
  } else if (/size\s?limit/i.test(err.message)) {
    logFunc('Size limit exceeded.');
    logFunc('No results were returned by the server because the number of results exceeds 100.');
    logFunc('Try adding filters for employee-only `-e` or department `-D <department-name>`');
  } else {
    logFunc(err.message);
    logFunc(err.stack);
  }
  process.exit(1);
};
