'use strict';

var inq = require('inquirer');
var Promise = require('promise');

var branches = function(branches){
    var question = [
        {
            type:'list',
            name: 'checkoutBranch',
            message:'Please select the branch you would like to check out:',
            choices: branches
        }
    ];

    return new Promise(function(resolve, reject){
        inq.prompt(question, function(answers){
            resolve(answers.checkoutBranch);
        });
    });
};


module.exports = {
    branches: branches
};
