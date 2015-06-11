'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var branches = ['branch1', 'branch2'];
var prompt;

describe('prompt', function(){

    describe('branches', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return the answers to the user\' prompt questions',function(done){
            var answer = { checkoutBranch: branches[0] }; 
            var mockInq = {
                prompt: function(question, callback){
                    callback(answer);
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.branches(branches).then(function(result){
                expect(result).to.equal(branches[0]);
                done();
            });
        });
    });

    describe('newBranch', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });

        it('should successfully return the answers to the user\' prompt questions',function(done){
            var answer = {newBranchName : 'new-branch'}; 
            var mockInq = {
                prompt: function(question, callback){
                    callback(answer);
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.newBranchName().then(function(result){
                expect(result).to.equal('new-branch');
                done();
            });
        });
    });
});
