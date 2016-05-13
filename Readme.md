#directory

## Description

Search public UCI directory/ldap for employee information -- intended for employees to find other employees info.

## Usage

To install directory from npm, run:

```
$ npm install -g uci-directory-search
```

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
    -p, --phone <number>          Phone number in x49999, 49999, 9999, or standard 7 or 10 digit formats
    -r, --room <number>           Room number in format <TBD??>
    -d, --department <value>      Department to which people belong
    -e, --employee                Staff and Faculty only. No Students
    -D, --delivery-point <value>  Delivery point type of results, (gmail|o365|es|other) (other = anything but gmail, o365, or es)
    -P, --pretty-text             Display as Pretty Text. Default: true
    -j, --json                    Display as JSON instead of pretty text
    -J, --json-pretty             Display as JSON with pretty spacing instead of pretty text
    -C, --csv                     Display as CSV instead of pretty text
    -H, --csv-headers             Display headers if CSV. Default: True
    -L, --limit <n>               Limit results to <n>
    -S, --skip <n>                Skip <n> results

```

## License

Copyright (c) 2016 Rhett Lowe

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
