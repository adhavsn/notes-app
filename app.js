

const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

yargs.version('1.0.0');
yargs.command({
    command: 'add',
    describe: 'adding notes',
    builder: {
        title:{
            describe: 'title of notes',
            require:true,
            type:'String'
        },
        body:{
            describe:'body of notes',
            require:true,
            type:'String'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }

});

yargs.command({
    command:'remove',
    describe:'remove notes',
    builder: {
        title: {
            describe: 'Remove title',
            require: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command:'read',
    describe:'Read a note',
    builder: {
        title: {
            describe: 'read note',
            require: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.findNote(argv.title);
    }
});
yargs.command({
    command:'list',
    describe:'list all notes',
    handler(){ notes.listNotes();
    }
});

yargs.parse();



// const mesg = notes();
// console.log(mesg);
// console.log(validator.isEmail('naras@outlook.com'));
// console.log(chalk.green.underline.bold('Succeess!'));
// const fs = require('fs');
// fs.appendFileSync('Muhil.txt', "Hello Muhil how are you?");
