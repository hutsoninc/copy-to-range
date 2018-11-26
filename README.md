# copy-to-range

[![Build Status](https://travis-ci.com/hutsoninc/copy-to-range.svg?branch=master)](https://travis-ci.com/hutsoninc/copy-to-range) [![Current npm package version](https://img.shields.io/npm/v/copy-to-range.svg)](https://www.npmjs.com/package/copy-to-range) 

Copy a file to a range of directories.

## Installation

`npm install --save copy-to-range`

## Usage

```js
const copyToRange = require('copy-to-range');

copyToRange('file.txt', '1-4');
```

```
$ tree
.
├── file.txt
├── 1
│   └── file.txt
├── 2
│   └── file.txt
├── 3
│   └── file.txt
├── 4
│   └── file.txt
│ ...
```

With options:

```js
const copyToRange = require('copy-to-range');

copyToRange('file.txt', '11-13,20', {
    destination: 'out',
    append: 'a',
    prepend: 'p'
});
```

```
$ tree
.
├── file.txt
├── out
│   ├── p11a
│   │   └── file.txt
│   ├── p12a
│   │   └── file.txt
│   ├── p13a
│   │   └── file.txt
│   └── p20a
│       └── file.txt
│ ...
```

## Options

Property | Description | Default
--- | --- | ---
destination | Destination directory | `""`
append | String to append to directory names | `""`
prepend | String to prepend to directory names | `""`

## Related

- [copy-to-range-cli](https://github.com/hutsoninc/copy-to-range-cli) - CLI for this module
- [make-dir-range](https://github.com/hutsoninc/make-dir-range) - Make directories from a range of integers
- [move-to-range](https://github.com/hutsoninc/move-to-range) - Move files to corresponding directories given a range

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details