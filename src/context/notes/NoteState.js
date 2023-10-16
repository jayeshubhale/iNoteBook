import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"; // Corrected localhost spelling
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Get All Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json); // Update the notes state with the fetched data
    }
    // ___________________________________________________________________________________________________________________________

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        console.log("Add a Note--->   ", note);
        console.log("Adding a new note");

        setNotes([...notes]); // Update the notes state by spreading the previous notes and adding the new note
        // getNotes();
        setNotes(notes.concat(note))

    }

    // ___________________________________________________________________________________________________________________________
    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json(); // Add await here
        console.log(json);
        console.log("Deleting the Note with id " + id);
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    }
    // ___________________________________________________________________________________________________________________________

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    // ___________________________________________________________________________________________________________________________

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;