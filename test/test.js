const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const mdr = require('make-dir-range');
const m = require('../');

const testDir = path.resolve(__dirname, 'temp-test');
const testFile = 'test-file.tmp';

describe('Setup test', () => {

    test('setup', () => {
        rimraf.sync(testDir);
        mkdirp.sync(testDir);
        fs.writeFileSync(testFile, 'This is a test.');
    });

});

describe('Should copy file to a single range of dirs', () => {

    const range = '1000-1005';

    const validationSet = [
        '1000',
        '1001',
        '1002',
        '1003',
        '1004',
        '1005'
    ];

    test('setup', () => {
        mdr(range, { destination: testDir });
    });

    test('copy file', () => {
        m(testFile, range, { destination: testDir });
    });

    test('check dirs', () => {
        for (let i = 0; i < validationSet.length; i++) {
            let result = fs.existsSync(path.resolve(testDir, validationSet[i], testFile));
            expect(result).toBe(true);
        }
    });

});

describe('Cleanup test', () => {

    test('cleanup', () => {
        rimraf.sync(testDir);
        fs.unlinkSync(testFile);
    });

});