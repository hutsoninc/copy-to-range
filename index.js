'use strict';
const fs = require('fs');
const path = require('path');

const validationSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];

const defaults = {
    fs,
    destination: '',
    append: '',
    prepend: ''
};

const isSubsetOf = (subset, set) => {
    for (let i = 0; i < subset.length; i++) {
        if (set.indexOf(subset[i]) === -1) {
            return false;
        }
    }
    return true;
}

const testRange = range => {
    if (!isSubsetOf(range.join('').split(''), validationSet)) {
        const err = new Error(`Range contains invalid characters: ${range}`);
        throw err;
    }
    for (let i = 0; i < range.length; i++) {
        let set = range[i].split('-');
        if (
            set.length === 1 &&
            !isNaN(set[0]) &&
            Number.isInteger(Number(set[0]))
        ) {
            continue;
        } else if (
            set.length === 2 &&
            !isNaN(set[0]) &&
            Number.isInteger(Number(set[0])) &&
            !isNaN(set[1]) &&
            Number.isInteger(Number(set[1])) &&
            Number(set[0]) < Number(set[1])
        ) {
            continue;
        } else {
            const err = new Error(`Invalid formatting: ${range[i]}`);
            throw err;
        }
    }
};

const testPath = str => {
    if (process.platform === 'win32') {
        const appendHasInvalidWinCharacters = /[<>:"|?*]/.test(str.replace(path.parse(str).root, ''));
        if (appendHasInvalidWinCharacters) {
            const err = new Error(`Append contains invalid characters: ${str}`);
            err.code = 'EINVAL';
            throw err;
        }
    }
};

module.exports = (file, range, opts) => {

    if (!fs.existsSync(path.resolve(file))) {
        const err = new Error(`File not found: ${file}`);
        throw err;
    }

    if (!Array.isArray(range)) {
        range = range.split(',');
        testRange(range);
    } else {
        testRange(range);
    }

    opts = Object.assign({}, defaults, opts);

    testPath(opts.append);
    testPath(opts.prepend);
    testPath(opts.destination);

    for (let i = 0; i < range.length; i++) {
        let set = range[i].split('-');
        if (set.length === 2) {
            for (let j = set[0]; j <= set[1]; j++) {
                try {
                    opts.fs.copyFileSync(path.resolve(file), path.resolve(opts.destination, `${opts.prepend}${j}${opts.append}/${file}`));
                } catch (err) {
                    throw err;
                }
            }
        } else {
            try {
                opts.fs.copyFileSync(path.resolve(file), path.resolve(opts.destination, `${opts.prepend}${j}${opts.append}/${file}`));
            } catch (err) {
                throw err;
            }
        }
    }

};