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

var newBranchName = function(newBranchName){
    var question = [
        {
            type: 'input',
            name: 'newBranchName',
            message: 'Please input the new branch name you would like to checkout:',
            when: function(){ return (newBranchName === undefined);}
        }
    ];

    return new Promise(function(resolve){
        if (!newBranchName){
            inq.prompt(question, function(answers){
                resolve(answers.newBranchName);
            });
        } else {
            resolve(newBranchName);
        }
    });
};

module.exports = {
    branches: branches,
    newBranchName: newBranchName
};
