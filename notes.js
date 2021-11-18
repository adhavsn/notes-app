const fs = require('fs');
const chalk = require('chalk');

const addNote = (t,b) => {
    const notes = readNotes();

    const duplicateTitle = notes.find((note)=> note.title === t);
    debugger

    if (!duplicateTitle){
        notes.push({title:t, body:b});
        saveNotes(notes);
    } else {
        console.log('duplicate title can not be added');
    }  
};

const readNotes = () => {

    try{
        const notesBuffer = fs.readFileSync('./notes.json');
        const notes = notesBuffer.toString();
        return JSON.parse(notes);
    } catch(e) {
        console.log('no file exists');
        return [];
    }
    
};

const saveNotes = (notes)=>{
    const notesString = JSON.stringify(notes);
    fs.writeFileSync('./notes.json',notesStriing);
};

const removeNote = (t)=>{
    console.log(t);
    const notes = readNotes();

    const cleanupNotes = notes.filter((note) => note.title !== t);
       
    if (cleanupNotes.length === notes.length){
        console.log(chalk.red('Title not found to remove'));
    } else {
        saveNotes(cleanupNotes);
        console.log(chalk.green('title removed'));

    }
 
};

const listNotes = () => {
    const list = readNotes();
    list.forEach(note => {
        const title = note.title;
        console.log(chalk.green(title));
        
    });
    
};

const findNote = (t) => {
    const notes = readNotes();
    const note = notes.find((note)=> note.title === t);
    if(note) {
        console.log(chalk.green(note.title + ' ' + note.body));
    } else{
        console.log(chalk.red('title ' + t + '  not found'));
    }
};
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    findNote: findNote
};