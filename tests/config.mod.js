﻿var chai = require('chai');

var config = require('asyncawait/config');

var expect = chai.expect;

// Define test mods
var tracking = [];
var testModA = {
    overrideProtocol: function (base, options) {
        return ({
            acquireFiber: function () {
                tracking.push('acquire A');
                return base.acquireFiber.apply(null, arguments);
            },
            releaseFiber: function () {
                tracking.push('release A');
                base.releaseFiber.apply(null, arguments);
            },
            startup: function () {
                return tracking.push('apply A');
            },
            shutdown: function () {
                return tracking.push('reset A');
            }
        });
    },
    defaultOptions: { a: 1 }
};
var testModB = {
    overrideProtocol: function (base, options) {
        return ({
            acquireFiber: function () {
                tracking.push('acquire B');
                return base.acquireFiber.apply(null, arguments);
            },
            releaseFiber: function () {
                tracking.push('release B');
                base.releaseFiber.apply(null, arguments);
            },
            startup: function () {
                return tracking.push('apply B');
            },
            shutdown: function () {
                return tracking.push('reset B');
            }
        });
    },
    defaultOptions: { b: 2 }
};

beforeEach(function () {
    config.useDefaults();
    tracking = [];
});

describe('The config.mod(...) function', function () {
    // TODO: was...
    //it('registers the specified mod, without applying it', () => {
    //    expect(extensibility.externalMods).to.be.empty;
    //    async.config.mod(testModA);
    //    expect(extensibility.externalMods).to.deep.equal([testModA]);
    //    async.config.mod(testModB);
    //    expect(extensibility.externalMods).to.deep.equal([testModA, testModB]);
    //    expect(tracking).to.be.empty;
    //});
    it('adds the mod\'s defaults to config', function () {
        expect(config.options()).to.not.have.key('a');
        config.use(testModA);
        expect(config.options()).to.haveOwnProperty('a');
        expect(config.options()['a']).to.equal(1);
    });

    it('rejects multiple registrations of the same mod', function () {
        config.use(testModA);
        expect(function () {
            return config.use(testModA);
        }).to.throw();
        config.use(testModB);
        expect(function () {
            return config.use(testModB);
        }).to.throw();
    });
    // TODO: was...
    //it('rejects registrations after async(...) is called', () => {
    //    async.config.mod(testModA);
    //    var foo = async (()=>{});
    //    expect(() => async.config.mod(testModB)).to.throw();
    //});
});

describe('Registered mods', function () {
    // TODO: was... restore/modify/fix all tests in here...
    //it('are applied when async(...) is first called', () => {
    //    async.config.mod(testModA);
    //    expect(tracking).to.be.empty;
    //    var foo = async (()=>{});
    //    expect(tracking).to.deep.equal(['apply A']);
    //});
    //it('are applied such that latest registrations are outermost in joint protocol call chains', () => {
    //    expect(tracking).to.be.empty;
    //    async.config.mod(testModA);
    //    async.config.mod(testModB);
    //    expect(tracking).to.deep.equal(['apply A', 'apply B']);
    //});
    //it('have their joint protocol overrides applied', async.cps(() => {
    //    expect(tracking).to.be.empty;
    //    async.config.mod(testModA);
    //    var foo = async (()=>{});
    //    await (foo());
    //    expect(tracking).to.deep.equal(['apply A', 'acquire A', 'release A']);
    //}));
    //it('have their joint protocol overrides called with correct nesting', async.cps(() => {
    //    expect(tracking).to.be.empty;
    //    async.config.mod(testModA);
    //    async.config.mod(testModB);
    //    var foo = async (()=>{});
    //    await (foo());
    //    expect(tracking).to.deep.equal(['apply A', 'apply B', 'acquire B', 'acquire A', 'release B', 'release A']);
    //}));
    ////TODO: in a specific order? eg opposite of apply?
    //it('have their reset() functions called when resetMods() is called', async.cps(() => {
    //    async.config.mod(testModA);
    //    async.config.mod(testModB);
    //    var foo = async (()=>{});
    //    await (foo());
    //    tracking = [];
    //    extensibility.resetAll();
    //    expect(tracking).to.contain('reset A');
    //    expect(tracking).to.contain('reset B');
    //}));
});
//# sourceMappingURL=config.mod.js.map
