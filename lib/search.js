/**
 * Created by rhett on 5/11/16.
 */
'use strict';

var ldap = require('uci-ldap-search');

var log = {
  log:   function () {
  },
  debug: function () {
  },
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

  if (opts.phone) {
    let phone = ('' + opts.phone).replace(/[^\d]/g, '');
    if (phone.length === 4) {
      phone = '(949) 824-' + phone;
    } else if (phone.length === 5) {
      phone = '(949) 82' + phone.slice(0, 1) + '-' + phone.slice(1);
    } else if (phone.length === 10) {
      phone = '(' + phone.slice(0, 3) + ') '
        + phone.slice(3, 6) + '-' + phone.slice(6);
    } else if (phone.length === 11) {
      phone = '(' + phone.slice(1, 4) + ') '
        + phone.slice(4, 7) + '-' + phone.slice(7);
    }
    byline.push(`(telephoneNumber=${phone})`);
  }

  if (opts.email) {
    let user = opts.email.split(/@/)[0];
    byline.push(`(|(mail=${opts.email})(ucinetid=${user}))`);
  }

  if (opts.deliveryPoint) {
    let dp    = '';
    let dpOpt = opts.deliveryPoint.toLowerCase();

    if (dpOpt === 'other') {
      byline.push(`(!(|(mailDeliveryPoint=*@gmailbox.es.uci.edu)(mailDeliveryPoint=*@exchange.uci.edu)(mailDeliveryPoint=*@es.nacs.uci.edu)(mailDeliveryPoint=*@hs.uci.edu)))`);
    } else {
      if (dpOpt === 'gmail') {
        dp = '@gmailbox.es.uci.edu';
      } else if (dpOpt === 'es') {
        dp = '@es.nacs.uci.edu';
      } else if (dpOpt === 'hs') {
        dp = '@hs.uci.edu';
      } else if (dpOpt === 'o365' || dpOpt === 'exchange') {
        dp = '@exchange.uci.edu';
      }
      byline.push(`(mailDeliveryPoint=*${dp})`);
    }
  }

  // if (opts.room) {
  //   let room = opts.room.replace(/[^\d]/g, '');
  //   byline.push(`(postalAddress=${room}*)`);
  // }

  var searchPhrase = '(&' + byline.join('') + ')';
  log.debug(`Searching LDAP for ${searchPhrase}`);

  ldap.searchBy(searchPhrase, function (err, data) {
    if (err) {
      cb(err);
    } else {
      log.debug(`LDAP returned ${data.length} results`);

      if (!opts.output.raw) {
        data = data.map(i => {
          let email = i.ucinetid + '@uci.edu';
          return {
            fname:         i.givenName,
            lname:         i.sn,
            department:    i.department,
            ucinetid:      i.ucinetid,
            employee:      i.UCIaffiliation.indexOf('employee') !== -1,
            affiliation:   i.UCIaffiliation,
            email:         email,
            aliasEmail:    i.mail === email ? '' : i.mail,
            address:       i.postalAddress,
            addressZip:    i.postalCode,
            title:         i.title,
            deliveryPoint: i.mailDeliveryPoint,
            campusid:      i.campusid,
            phone:         i.telephoneNumber,
            fax:           i.facsimileTelephoneNumber,
          };
        });
      }

      cb(null, data);
    }
  });
};

var setLoger = module.exports.setLogger = function (logger) {
  return log = logger;
};
