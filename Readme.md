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
    -m, --email <value>           Search by Email Address
    -p, --phone <number>          Phone number in x49999, 49999, 9999, or standard 7, 10, or 11 digit formats
    -D, --department <value>      Department to which people belong
    -e, --employee                Staff and Faculty only. No Students
    -P, --delivery-point <value>  Delivery point type of results, (gmail|o365|es|hs|exchange|other) (other = anything but gmail, o365, exchange, hs, or es)
    --raw                         Display as pretty JSON with LDAP headers
    -j, --json                    Display as JSON instead of pretty text
    -J, --json-pretty             Display as JSON with pretty spacing instead of pretty text
    -C, --csv                     Display as CSV instead of pretty text
    -H, --csv-headers             Display headers if CSV. Default: True
    -L, --limit <n>               Limit results to <n>
    -S, --skip <n>                Skip <n> results
```

## Todo

- [ ] Make Tests
- [ ] Add to Travis
- [ ] Add search by Room

## License

BSD 2-Clause Simplified. See [LICENSE](LICENSE) for full info.

## Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander).
