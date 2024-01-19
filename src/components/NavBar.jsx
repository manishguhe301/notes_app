import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarNotes = ({ handleSave, initialNote }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ title: '', description: '', time: '' });

  useEffect(() => {
    if (initialNote) {
      setNote(initialNote);
      setOpen(true);
    }
  }, [initialNote]);

  const handleClickOpen = () => {
    setNote({ title: '', description: '', time: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNoteSave = () => {
    if (note.title.trim() === '' || note.description.trim() === '') {
      alert('Title and description cannot be empty.');
      return;
    }

    const newNote = { ...note, time: new Date().toLocaleString() };
    handleSave(newNote);
    setOpen(false);
  };

  return (
    <div>
      <AppBar position='static' sx={{ background: '#2196f3' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h5' sx={{ color: '#ffffff' }}>
            Notes App
          </Typography>
          <Button
            variant='contained'
            sx={{ backgroundColor: '#fff', color: '#2195f3' }}
            onClick={handleClickOpen}
          >
            Create Note
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{initialNote ? 'Edit Note' : 'Create Note'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and description for the note.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Title'
            type='text'
            fullWidth
            variant='standard'
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            margin='dense'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNoteSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppBarNotes;
