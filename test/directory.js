/* global describe, it */
'use strict';

var assert = require('assert');
var csv = require('csv');
var exec = require('child_process').exec;
var path = require('path');

describe('directory search', function () {
  let cmd;
  beforeEach(function () {
    cmd = 'node ' + path.join(__dirname, '../bin/directory') + ' ';
  });

  it('--help should run without errors', function (done) {
    exec(cmd + '--help', function (error, stdout, stderr) {
      assert(!error);
      done();
    });
  });
  it('--version should run without errors', function (done) {
    exec(cmd + '--version', function (error, stdout, stderr) {
      assert(!error);
      done();
    });
  });
  it('should return error on missing command', function (done) {
    this.timeout(4000);

    exec(cmd, function (error, stdout, stderr) {
      assert(error);
      assert.equal(error.code, 1);
      done();
    });
  });

  it('should filter by name', function (done) {
    this.timeout(4000);

    let name = 'rhett';

    cmd += ` --json --name ${name}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      // number of results equals number of people
      // who have ${name} in their name
      assert.equal(
        data.length,
        data.filter(i => {
          return (new RegExp(name, 'i')).test(i.fname + ' ' + i.lname);
        }).length,
        `all people in results should have the ${name} in their full name`
      );

      done();
    });
  });
  it('should filter by department', function (done) {
    this.timeout(4000);

    let dept = 'education';

    cmd += ` --json --name john --department ${dept}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      // number of results equals number of people
      // who have ${dept} in their dept
      assert.equal(
        data.length,
        data
          .filter(i => i.department && (new RegExp(dept, 'i')).test(i.department))
          .length
        ,
        `all people in results should contain the provided dept`
      );

      done();
    });
  });
  it('should filter by UCINetID', function (done) {
    this.timeout(4000);

    let id = 'rhett';

    cmd += ` --json --ucinetid ${id}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'Only UCINetID ${id} should be returned');

      done();
    });
  });
  it('should allow UCINetID, or others, to allow wildcards', function (done) {
    this.timeout(4000);

    let id = 'rhett*';

    cmd += ` --json --ucinetid ${id}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      // number of results equals number of people
      // who have ${id} in their id
      assert.equal(
        data.length,
        data
          .filter(i => i.ucinetid && (new RegExp(id, 'i')).test(i.ucinetid))
          .length
        ,
        `all people in results should have UCINetID containing ${id}`
      );

      done();
    });
  });
  it('should filter by Title', function (done) {
    this.timeout(4000);

    let title = '*developer*';

    cmd += ` --json --name rhett --title ${title}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      // number of results equals number of people
      // who have ${title} in their title
      assert.equal(
        data.length,
        data
          .filter(i => i.title && (new RegExp(title.replace(/\*/g, ''), 'i')).test(i.title))
          .length
        ,
        `all people in results should have Title containing ${title}`
      );

      done();
    });
  });
  it('should filter by CampusID', function (done) {
    this.timeout(4000);

    let campusid = '1181700';

    cmd += ` --json --campusid ${campusid}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert((new RegExp(`^0*${campusid}$`, 'i')).test(data[0].campusid), `campus id should be ${campusid} preceeded by 0-n "0" chars`);

      done();
    });
  });
  it('should filter by email', function (done) {
    this.timeout(4000);

    let email = 'rhett@uci.edu';

    cmd += ` --json --email ${email}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert.equal(email, data[0].email, `Person should have email given ${email}`);

      done();
    });
  });
  it('should filter by email with alias name', function (done) {
    this.timeout(4000);

    let email = 'nayssan.safavian@uci.edu';

    cmd += ` --json --email ${email}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many/few results.');
      assert.equal(email, data[0].aliasEmail.toLowerCase(), `Person should have email given ${email}`);

      done();
    });
  });
  it('should filter by email delivery point', function (done) {
    this.timeout(4000);

    let point = 'gmail';

    cmd += ` --json --delivery-point ${point} --name rhett `;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(
        data.length,
        data
          .filter(i => i.deliveryPoint && /@gmailbox/i.test(i.deliveryPoint))
          .length
        ,
        `all people in results should point to gmail servers`
      );

      done();
    });
  });
  it('should throw error if email delivery point is not listed value (gmail|o365|es|hs|exchange|other)', function (done) {
    this.timeout(4000);

    let point = 'blah';

    cmd += ` --json --delivery-point ${point} --department education --employee`;
    exec(cmd, function (error, stdout, stderr) {
      assert(error);
      assert.equal(error.code, 1);

      done();
    });
  });
  it('should filter by phone number (4-digit)', function (done) {
    this.timeout(4000);

    let phone = '8564';

    cmd += ` --json --phone ${phone}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert.equal('949824' + phone, data[0].phone.replace(/[^\d]/g, ''), `Person should have phone number 949824${phone}.`);

      done();
    });
  });
  it('should filter by phone number (5-digit)', function (done) {
    this.timeout(4000);

    let phone = '48564';

    cmd += ` --json --phone ${phone}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert.equal('94982' + phone, data[0].phone.replace(/[^\d]/g, ''), `Person should have phone number 94982${phone}.`);

      done();
    });
  });
  it('should filter by phone number (10-digit)', function (done) {
    this.timeout(4000);

    let phone = '9498248564';

    cmd += ` --json --phone ${phone}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert.equal(phone, data[0].phone.replace(/[^\d]/g, ''), `Person should have phone number 94982${phone}.`);

      done();
    });
  });
  it('should filter by phone number (11-digit)', function (done) {
    this.timeout(4000);

    let phone = '19498248564';

    cmd += ` --json --phone ${phone}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(1, data.length, 'found too many results.');
      assert.equal(phone.slice(1), data[0].phone.replace(/[^\d]/g, ''), `Person should have phone number 94982${phone}.`);

      done();
    });
  });
  it('should filter by employee', function (done) {
    this.timeout(4000);


    cmd += ` --json --employee rhett`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(
        data.length,
        data
          .filter(i => i.employee)
          .length
        ,
        `all people in results should be employees`
      );

      done();
    });
  });
  it('should filter by student', function (done) {
    this.timeout(4000);


    cmd += ` --json --student rhett`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(
        data.length,
        data
          .filter(i => i.student)
          .length
        ,
        `all people in results should be students`
      );

      done();
    });
  });

  it('should output in raw LDAP', function (done) {
    this.timeout(4000);

    let name = 'rhett';

    cmd += ` --raw --name ${name}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert.equal(
        data.length,
        data
          .filter(i => i.dn)
          .length
        ,
        `all results should have dn raw LDAP flag`
      );

      done();
    });
  });
  it('should output in json', function (done) {
    this.timeout(4000);

    let name = 'rhett';

    cmd += ` --json --name ${name}`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);

      assert(data, 'Data should return as a json string with --json flag');
      assert(data.filter, 'Data should return as array');

      done();
    });
  });
  it('should output in json with pretty spacing', function (done) {
    this.timeout(4000);

    let name = 'rhett';

    cmd += ` --json-pretty --name ${name}`;
    exec(cmd, function (error, pretty, stderr) {
      assert(!error);

      exec(cmd.replace(/--json-pretty/, '--json'), function (error, mini, stderr) {
        assert(!error);

        assert.notEqual(pretty, mini, 'texts should not be the same. pretty should have additional tabs or spaces');

        let prettyData = JSON.parse(pretty);
        let miniData = JSON.parse(mini);

        assert(prettyData, 'pretty json string should compile to object');
        assert(miniData, 'mini json string should compile to object');
        assert.deepStrictEqual(prettyData, miniData, 'Data should return as array');

        done();
      });
    });
  });
  it('should output in csv', function (done) {
    this.timeout(4000);

    cmd += ` --csv --ucinetid rhett`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      csv.parse(stdout, function (err, lines) {
        assert(!err, 'output text should be parse-able csv');
        assert(lines.map, 'parsed csv data should be an array');
        assert.equal(1, lines.length, '--ucinetid should only have 1 result')

        done();
      });

    });
  });
  it('should output in csv with headers', function (done) {
    this.timeout(4000);

    cmd += ` --csv --csv-headers --ucinetid rhett`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      csv.parse(stdout, function (err, lines) {
        assert(!err, 'output text should be parse-able csv');
        assert(lines.map, 'parsed csv data should be an array');
        assert.equal(2, lines.length, '--ucinetid should only have 1 result plus 1 row headers');

        done();
      });

    });
  });

  it('should limit returned results', function (done) {
    this.timeout(6000);

    cmd += ` --json --limit 1 --phone 5118`;
    exec(cmd, function (error, stdout, stderr) {
      assert(!error);

      let data = JSON.parse(stdout);
      assert.equal(1, data.length, 'should only have one entry');

      done();
    });
  });
  it('should skip returned results', function (done) {
    this.timeout(6000);

    cmd += ` --json --phone 5118 --limit 5`;
    exec(cmd, function (error, full, stderr) {
      assert(!error);

      let fullData = JSON.parse(full);

      cmd += ` --skip 1`;
      exec(cmd, function (error, part, stderr) {
        assert(!error);

        let partialData = JSON.parse(part);
        assert.deepStrictEqual(fullData[1], partialData[0], 'should only have one entry');

        done();
      });
    });
  });
});
