const run = require('../run');
const { expect } = require('chai');
const proc = require('child_process');
const { stub } = require('sinon');
const bprom = require('bluebird');

describe('Run', () => {
    it('should run a single command', done => {
        proc.spawn = stub().withArgs('node', 'foo').returns({ on() {} });
        run('node foo')
            .then(() => {
                done();
            })
        .catch(done);

        proc.spawn.callArg(3)
    });

    it('should run a series command', done => {
        bprom.mapSeries = stub().returns(Promise.resolve());
        run('node foo && node bar')
            .then(() => {
                done();
            }).catch(done);
    });

    it('should run a concurrent command', done => {
        bprom.map = stub().returns(Promise.resolve());
        run('node foo & node bar')
            .then(() => {
                done();
            }).catch(done);
    });
});
