const chalk = require('chalk');
const yargs = require('yargs')
const {getNotes, addNote, removeNote, listNotes, readNote} = require('./notes.js');

// Customize yargs version 
yargs.version('1.1.0')

//add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        addNote(argv.body, argv.title)
    }
}).command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            description: '',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        removeNote(argv.title);
    }
}).command({
    command: 'list',
    describe: 'Lists notes',
    handler(){
        listNotes()
    }
}).command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            description: 'Title of the body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        readNote(argv.title)
    }
})

yargs.parse()