/**
 * Created by rhett on 5/13/16.
 */
'use strict';
var chalk = require('chalk');


var prettyFormat = module.exports = function prettyFormat (data) {
  if (!data) {
    data = [];
  } else if (!(data instanceof Array)) {
    data = [data];
  }

  var out  = [];
  out.push(`Found ${data.length} result${data.length === 1 ? '' : 's'}:`);

  for (let i = 0, l = data.length; i < l; i ++) {
    out.push(`  Result #${i+1}:`);
    out.push(formatOne(data[i], '    '));
  }
  return out.join('\n');
};

var formatOne = module.exports.formatOne = function formatOne (i, lead) {
  lead = lead || '';

  var address = '';
  if (i.address) {
    address += i.address;
    if (i.addressZip) {
      address += ', Irvine, CA ' + i.addressZip;
    }
  }

  var out = [];
  out.push(lead + formatLine('Name', i.fname + ' ' + i.lname));

  out.push(lead + (i.employee ? chalk.blue('Is') : chalk.yellow('Is NOT')) + ' Employee');
  out.push(lead + (i.student ? chalk.blue('Is') : chalk.yellow('Is NOT')) + ' Student');

  out.push(lead + formatLine('Campis ID', i.campusid));
  out.push(lead + formatLine('Title', i.title));
  out.push(lead + formatLine('Department', i.department));
  out.push(lead + formatLine('Phone #', i.phone));
  out.push(lead + formatLine('Fax #', i.fax));
  out.push(lead + formatLine('UCINetID', i.ucinetid));
  out.push(lead + formatLine('Email Address', i.email));
  out.push(lead + formatLine('Email Alias', i.aliasEmail));
  out.push(lead + formatLine('Email Delivery Point', i.deliveryPoint));
  out.push(lead + formatLine('Address', address));

  return out.join('\n');
};

var formatLine = module.exports.formatLine = function formatLine (label, text) {
  return chalk.blue(label + ':') + ' ' + (text || 'n/a');
};
