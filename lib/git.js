'use strict';

var exec = require('child_process').exec;
var Promise = require('promise');
var _ = require('lodash');

var parseBranches = {
    all: function(result){
        var branches = [];
        result = result.split('\n');
        result.pop();
        result.forEach(function(branch){
            branch = branch.substring(2);
            if(branch.indexOf('remotes') > -1){
                branch = branch.replace('remotes/','');
                branch = branch.substring(branch.indexOf('/')+1);
                branches.push(branch);
            }
            else {
                branches.push(branch);
            } 
        });
        return branches;
    },
    local: function(result){
        var branches = [];
        result.split('\n').forEach(function(branch){
            if(branch.indexOf('refs/heads') > -1){
                branches.push(branch.replace('refs/heads','').substring(branch.indexOf('refs/heads')+1));
            }
        });
        return branches;
    } 
};

var getBranches = {
    local: function(){ 
        return new Promise(function(resolve, reject){
            exec('git show-ref', function(err, result){
                if(err){
                    reject(err);
                }
                else {
                    var branches = parseBranches.local(result);
                    resolve(branches);
                }
            });
        });
    },
    all: function(){
        return new Promise(function(resolve, reject){
            exec('git branch -a', function(err, result){
                if(err){
                    reject(err);
                }
                else {
                    var branches = parseBranches.all(result);
                    branches = _.uniq(branches);
                    resolve(branches);
                }
            });
        });
    }
}

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

var newBranch = function(newBranchName){
    return new Promise(function(resolve, reject){
        exec('git checkout -b ' + newBranchName, function(err){
            if(err){
                reject(err);
            }
            else {
                resolve(newBranchName);
            }
        }); 
    });

}; 

module.exports = {
    getBranches: getBranches,
    getCurrentBranch: getCurrentBranch,
    newBranch: newBranch,
    checkout: checkout
};
