#directory

Search public UCI directory/ldap for employee information -- intended for employees to find other employees info.

## Dependancies
- NodeJS -- installs Node Package Manager (npm) -- installation instructions at [nodejs.org](http://nodejs.org/)

### Example 
```
$ directory rhett lowe
Found 1 result:
  Result #1:
    Name: Rhett Norman Lowe
    Is Employee
    Is NOT Student
    Title: Application Developer
    Department: Education
    Phone #: (949) 824-8564
    Fax #: (949) 824-9103
    UCINetID: rhett
    Email Address: rhett@uci.edu
    Email Alias: n/a
    Email Delivery Point: rhett@gmailbox.es.uci.edu
    Address: 2040 Education, Irvine, CA 92697-5500
```

## Install
To install directory from npm, run:
```
$ npm install -g uci-directory-search
```

To force update from `0.0.1 => 1.x`
```
$ npm install -g uci-directory-search@latest
```

## Usage

```
$ directory --help
  
  Usage: directory [options] [name...]

  Search public UCI directory/ldap for employee information -- intended for employees to find other employees info.

  Options:

    -h, --help                    output usage information
    -d, --debug                   enable debugger
    -V, --version                 output the version number
    -n, --name <value>            Name of person. single word or double-quote(") surrounded text. Same as  using name in non-tag usage of this command. explicit -n or --name will override non-tag usage
    -i, --ucinetid <value>        Search by UCINetID
    -c, --campusid <n>            Search by Campus ID
    -t, --title <value>           Search by Job Title
    -m, --email <value>           Search by Email Address
    -p, --phone <number>          Phone number in x49999, 49999, 9999, or standard 7, 10, or 11 digit formats
    -D, --department <value>      Department to which people belong
    -e, --employee                Staff and Faculty only
    -s, --student                 Students only
    -P, --delivery-point <value>  Delivery point type of results, (gmail|o365|es|hs|exchange|other) (other = anything but gmail, o365, exchange, hs, or es)
    --raw                         Display as pretty JSON with LDAP headers
    -j, --json                    Display as JSON instead of pretty text
    -J, --json-pretty             Display as JSON with pretty spacing instead of pretty text
    -C, --csv                     Display as CSV instead of pretty text
    -H, --csv-headers             Display headers if CSV. Default: True
    -L, --limit <n>               Limit results to <n>
    -S, --skip <n>                Skip <n> results
```

## Optional Aliases
You can put aliases into your `~/.bashrc` or `~/.aliases` file, if you have `~/.aliases` references in `~./bashrc` via `source ~/.aliases` or equivilant. 

- `alias d=directory` :arrow_right: allows for quicker access ex: `d rhett` or `d rhett -e` will produce people with rhett in their names
- `alias di="directory -i"` :arrow_right: does a UCINetID because I often know the NetID and can look that up faster withthis shortcut. ex: `di rhett` will bring up Rhett Lowe, `di rhe*` produces 23 results at time of this commit.

## Todo

- [ ] Add to Travis
- [ ] Add search by Room

## License

BSD 2-Clause Simplified. See [LICENSE](LICENSE) for full info.

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
