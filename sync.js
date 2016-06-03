var Rsync = require('rsync');
var colors = require('colors');

var rsync = new Rsync;

var destination = process.argv[2];

rsync
    .source(process.cwd()+'/')
    .destination(destination)
    .recursive()
    .exclude(['.git', '.idea', 'node_modules'])
    .progress();

rsync.execute();