/**
 * Created by rhett on 5/13/16.
 */
'use strict';


module.exports = function (err, logFunc) {
  logFunc(err.message);
  logFunc(err.stack);
  process.exit(1);
};
