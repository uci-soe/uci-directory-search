/**
 * Created by rhett on 5/11/16.
 */
'use strict';

var ldap = require('uci-ldap-search');

var log = {
  log: function () {},
  debug: function () {},
};

var search = module.exports = function (opts, cb) {
  var byline = [];

  if (opts.name && opts.name.length) {
    opts.name.split(/\s+/).forEach(w => {
      byline.push(`(cn=*${w}*)`);
    });
  }

  if (opts.ucinetid) {
    byline.push(`(ucinetid=${opts.ucinetid})`);
  }

  if (opts.employee) {
    byline.push(`(UCIaffiliation=employee)`);
  }

  var searchPhrase = '(&' + byline.join('') + ')';
  log.debug(`Searching LDAP for ${searchPhrase}`);

  ldap.searchBy(searchPhrase, function (err, data) {
    if (err) {
      cb(err);
    } else {
      log.debug(`LDAP returned ${data.length} results`);

      data = data.map(i => {
        let email = i.ucinetid + '@uci.edu';
        return {
          fname: i.givenName,
          lname: i.sn,
          department: i.department,
          ucinetid: i.ucinetid,
          employee: i.UCIaffiliation.indexOf('employee') !== -1,
          affiliation: i.UCIaffiliation,
          email: email,
          aliasEmail: i.mail === email ? '' : i.mail,
          address: i.postalAddress,
          addressZip: i.postalCode,
          title: i.title,
          deliveryPoint: i.mailDeliveryPoint,
          campusid: i.campusid,
          phone: i.telephoneNumber,
          fax: i.facsimileTelephoneNumber,
        };
      });

      cb(null, data);
    }
  });
};

var setLoger = module.exports.setLogger = function (logger) {
  return log = logger;
};
