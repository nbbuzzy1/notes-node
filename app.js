const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const optionsTitle = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  }
}
const optionsBody = {
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
}

const argv = yargs
  .command('add', 'Add a new note', optionsTitle, optionsBody)
  .command('list', 'List all notes')
  .command('read', 'Read a note', optionsTitle)
  .command('remove', 'Remove a note', optionsTitle)
  .help()
  .argv;
let command = argv._[0]

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created')
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => notes.logNote(note));
} else if (command === 'read') {
  const note = notes.getNote(argv.title)
  if (note) {
    console.log('Note found');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  const message = noteRemoved ? 'Note was removed' : 'Note note found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
