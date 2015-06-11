'use strict';

var mockery = require('mockery');
var expect = require('chai').expect;
var git;
var fakeChild = function(error, result){
    return {
        exec: function(cmd, callback){
            callback(error, result);
        }
    };
};

describe('git', function(){

    describe('getAllBranches', function(){

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

        it('should successfully return all branch information', function(done){
            mockery.registerMock('child_process',fakeChild(null ,'123 refs/heads/branch1\n 123 refs/heads/branch2\n'));
            git = require('../lib/git');
            git.getAllBranches().then(function(branches){
                expect(branches).to.deep.equal(['branch1','branch2']);
                done();
            });
        });

        it('should successfully throw an error when there is no branch information', function(done){
            mockery.registerMock('child_process', fakeChild('no branches', 'doesnt mamtter'));
            git = require('../lib/git');
            git.getAllBranches().then(function(result){
                expect(result).to.be.undefined;
            }).catch(function(error){
                expect(error).to.equal('no branches');
                done();
            });
        });
    });

    describe('checkout', function(){
        
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

        it('should return the branch name if checkout is successful', function(done){
            mockery.registerMock('child_process', fakeChild(null,'success'));
            git = require('../lib/git');
            git.checkout('branch name').then(function(result){
                expect(result).to.equal('branch name');
                done();
            });
        });
    
        it('should return an error if checkout throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','doesnt matter'));
            git = require('../lib/git');
            git.checkout().catch(function(error){
                expect(error).to.equal('error');
                done();
            });
        });
    
    });

});