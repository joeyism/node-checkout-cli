#!/usr/bin/env node
'use strict';

var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');
var resultObj = {};

git.getAllBranches().then(function(branches){
    
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
