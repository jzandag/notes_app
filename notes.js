const fs = require('fs');
const chalk = require('chalk')
const getNotes = () =>{
    return 'This is the getNotes function from another file';
}

const addNote = (body, title) => {
    //console.log(`Title: ${title}\nBody: ${body}`);
    const notes = loadNotes();
    let isDuplicate = false
    const dupl = notes.filter(f => {f.title === title ? isDuplicate=true : null})
    const dupl2 =  notes.find(f => {f.title === title})

    console.log(dupl2);
    if(!dupl2){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.red(`Note with title '${title}' created!`));
    }
    else
        console.log(chalk`Note already {bold.red exist}`);
    console.log(notes);
}

const removeNote = (title) =>{
    const notes = loadNotes();
    const filteredData = notes.filter(f => f.title !== title)

    console.log(filteredData);
    if(notes.length > filteredData.length){
        console.log(chalk.bgGreen(`Deleted note with title '${title}'`));
        saveNotes(filteredData);
    }
    else
        console.log(chalk.bgRed('Cannot find element to remove'));
    
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.bold('Your current listed notes'));

    debugger
    notes.forEach(note => {
        console.log('  ', note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(f => f.title == title)

    if(note){
        console.log('Searching notes...');
        console.log(chalk`Title: {green ${note.title}}`);
        console.log(chalk`Body: {yellow ${note.body}}`);
    }else {
        console.log(chalk.red.bold`No note found`);
    }
}

const saveNotes = (notes) =>{
    const data = JSON.stringify(notes);

    fs.writeFileSync('notes.json', data)
}

const loadNotes = () =>{
    try {
        const data = fs.readFileSync('notes.json');
        const dataJson = data.toString();
        return JSON.parse(dataJson)
    } catch (err) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes, 
    readNote
}