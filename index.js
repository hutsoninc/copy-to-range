'use strict';
const fs = require('fs');
const path = require('path');
const validFilename = require('valid-filename');
const rangify = require('rangify-string');

const defaults = {
    fs,
    destination: '',
    append: '',
    prepend: ''
};

module.exports = (file, range, opts) => {

    if (!fs.existsSync(path.resolve(file))) {
        const err = new Error(`File not found: ${file}`);
        throw err;
    }

    range = rangify(range);

    opts = Object.assign({}, defaults, opts);

    for (let i = 0; i < range.length; i++) {
        let dirname = opts.prepend + range[i] + opts.append;

        if (validFilename(dirname)) {
            try {
                opts.fs.copyFileSync(path.resolve(file), path.resolve(opts.destination, `${dirname}/${file}`));
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error(`Invalid directory name: ${directory}`);
        }
    }

};