#!/usr/bin/env node
'use strict';

var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');

git.getAllBranches().then(function(branches){
    
    return prompt.branches(branches);

}).then(function(checkoutBranch){
    
    return git.checkout(checkoutBranch);

}).then(function(branch){

    console.log('You are now in ' + branch.bold + ' branch');

}).catch(function(err){

    console.log(err.red);

});
