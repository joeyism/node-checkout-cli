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
                        branches.push(branch.substring(branch.lastIndexOf('/')+1));
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

module.exports = {
    getAllBranches: getAllBranches,
    checkout: checkout
};
