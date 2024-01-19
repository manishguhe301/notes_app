import { useState } from 'react';
import NavBar from './components/NavBar';
import Notes from './components/Notes';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || []
  );
  const [editNote, setEditNote] = useState(null);

  const handleSave = (newNote) => {
    const updatedNotes = [...notes];
    if (editNote) {
      const index = notes.indexOf(editNote);
      updatedNotes[index] = newNote;
    } else {
      updatedNotes.push(newNote);
    }
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setEditNote(null);
  };

  const handleDelete = (indexToDelete) => {
    const updatedNotes = notes.filter((note, index) => index !== indexToDelete);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <NavBar handleSave={handleSave} initialNote={editNote} />
      <Notes
        notes={notes}
        handleDelete={handleDelete}
        handleEdit={setEditNote}
      />
    </div>
  );
};

export default App;
