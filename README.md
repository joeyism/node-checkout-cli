# Checkout-CLI
[![Build Status](https://travis-ci.org/joeyism/node-checkout-cli.svg?branch=master)](https://travis-ci.org/joeyism/node-checkout-cli)

A simple tool so you don't have to wonder which branch you should run your 'git checkout'. Once you run *checkout*, a list of your available local branches will be shown.

### Installation

    > npm install -g checkout-cli

### To Run 

To checkout into an existing local branch, run

    > checkout


To checkout into any existing branch, whether is it local or remote, run

    > checkout all

### New

To create a new branch, run

    > checkout new [branch name]

If [branch name] is not included, then it'll prompt you for the new branch name you would like to create

### Checkout with name

To just checkout to a different branch, run

    > checkout [branch]

Then you will be in local branch [branch]

### Version Updates
#### 1.3.0
* Added ability to checkout to branch just with name

#### 1.2.0
* Added ability to checkout any branches, whether it is local or remote

#### 1.1.0
* Added ability to create new branch
