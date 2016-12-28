const utils = require('../utils');
const { expect } = require('chai');

describe('Utils', () => {
    it('should split && commands', () => {
        const actual = utils.splitCmds('node foo && node bar');
        expect(actual).to.deep.equal(['node foo', 'node bar']);
    });

    it('should split & commands', () => {
        const actual = utils.splitCmds('node foo & node bar');
        expect(actual).to.deep.equal(['node foo', 'node bar']);
    });

    it('should not split commands', () => {
        const actual = utils.splitCmds('node foo');
        expect(actual).to.deep.equal(['node foo']);
    });

    it('should return NORMAL run type', () => {
        const expected = utils.constants.NORMAL;
        const actual = utils.runType('node foo');
        expect(actual).to.equal(expected);
    });

    it('should return SERIES run type', () => {
        const expected = utils.constants.SERIES;
        const actual = utils.runType('node foo && node bar');
        expect(actual).to.equal(expected);
    });

    it('should return CONCURRENT run type', () => {
        const expected = utils.constants.CONCURRENT;
        const actual = utils.runType('node foo & node bar');
        expect(actual).to.equal(expected);
    });

    it('should remove environment variables', () => {
        const actual = utils.removeEnvVars('NODE_ENV=production node foo');
        expect(actual).to.equal('node foo');
    });

    it('should get environment variables', () => {
        const actual = utils.getEnvVars('NODE_ENV=production node foo');
        expect(actual).to.deep.equal({ NODE_ENV: 'production' });
    });
});
