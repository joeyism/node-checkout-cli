'use strict';

var exec = require('child_process').exec;
var Promise = require('promise');

var getAllBranches = function(){ 
    return new Promise(function(resolve, reject){
        exec('git show-ref', function(err, result){
            if(err){
                reject(err);
            }
            else {
                var branches = [];
                result.split('\n').forEach(function(branch){
                    if(branch.indexOf('refs/heads') > -1){
                        branches.push(branch.replace('refs/heads','').substring(branch.indexOf('refs/heads')+1));
                    }
                });
                resolve(branches);
            }
        });
    });
};

var checkout = function(branch){
    return new Promise(function(resolve, reject){
        exec('git checkout ' + branch, function(err, result){
            if(err){
                reject(err);
            }
            else {
                resolve(branch);
            }
        });
    });
};

var getCurrentBranch = function(){
    return new Promise(function(resolve, reject){
        exec('git rev-parse --abbrev-ref HEAD', function(err, result){
            if(err){
                reject(err);
            }
            else {
                resolve(result.split("\n").join(""));
            }
        }); 
    });
};

module.exports = {
    getAllBranches: getAllBranches,
    getCurrentBranch: getCurrentBranch,
    checkout: checkout
};
