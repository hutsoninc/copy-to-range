# copy-to-range

Copy files to a range of directories.

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

## Related

- [copy-to-range-cli](https://github.com/hutsoninc/copy-to-range-cli) - CLI for this module
- [make-dir-range](https://github.com/hutsoninc/make-dir-range) - Make directories from a range of integers

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details