#!/usr/bin/env node
'use strict';

var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');
var params = process.argv;
var indexOfNew;
var newBranchName;
var branch;

if(params.every(function(param,i){
    var isNotNew = param.toLowerCase() !== "new";
    if (!isNotNew){
        indexOfNew = i;
    }
    return isNotNew;
})){
    if (params[2] === 'local' || params[2] === 'all' || params[2] === undefined){

        var type = params[2] || 'local';

        var resultObj = {};
        git.getBranches[type]().then(function(branches){

            resultObj.branches = branches;
            return git.getCurrentBranch();

        }).then(function(currentBranch){

            resultObj.currentBranch = currentBranch;
            console.log('Your current branch is ' + currentBranch.bold);
            return prompt.branches(resultObj.branches);

        }).then(function(checkoutBranch){

            return git.checkout(checkoutBranch);
            
        }).then(function(branch){

            console.log('You are now in ' + branch.bold + ' branch');

        }).catch(function(err){

            console.log(err.toString().red);

        });

    }
    else {
        
        git.checkout(params[2]).then(function(branch){

            console.log('You are now in ' + branch.bold + ' branch');

        }).catch(function(err){

            console.log(err.toString().red);

        });

        
    }
    
    

}
else {

    prompt.newBranchName(params[indexOfNew + 1]).then(function(newBranchName){

        return git.newBranch(newBranchName);

    }).then(function(newBranchName){

        console.log('New branch created. You are now in your new branch ' + newBranchName.bold);

    }).catch(function(err){

        console.log(err.toString().red);

    });
}
