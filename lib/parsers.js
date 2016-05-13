/**
 * Created by rhett on 5/11/16.
 */
'use strict';

var parsers = module.exports = {
  ucfirst: function (str) {
    return str ? ('' + str).slice(0,1).toUpperCase() + ('' + str).slice(1).toLowerCase() : '';
  },
  uppercase: function (str) {
    return ('' + str).toUpperCase();
  },
  number: function (num) {
    return + ('' + num).replace(/[^\d]/g, '');
  },
  phone: function (num) {
    // I think there should be more here,
    //   this is why it is separate
    return parsers.number(num);
  },
  room: function (num) {
    // I think there should be more here,
    //   this is why it is separate
    return parsers.number(num);
  }
};
