import { useState } from 'react';
import { Grid, MenuItem, Pagination, Select, Typography } from '@mui/material';
import NoteCard from './NoteCard';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding: 50px;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const StyledInput = styled.input`
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #2196f3;
  outline: none;
  border-radius: 4px;
`;

const Container = styled.div`
  height: 100vh;
`;

const Notes = ({ notes, handleDelete, handleEdit }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title');
  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  let filteredNotes = notes?.filter(
    (note) => note.title.includes(search) || note.description.includes(search)
  );

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  if (sort === 'title') {
    filteredNotes = filteredNotes?.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sort === 'date') {
    filteredNotes = filteredNotes?.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
  }

  return (
    <Container>
      <div className='px-[50px] pt-5 flex justify-between items-center max-sm:flex-col'>
        <StyledInput
          type='text'
          placeholder='Search notes'
          value={search}
          onChange={handleSearch}
          className='max-sm:w-full'
        />
        <Select value={sort} onChange={handleSort}>
          <MenuItem value='title'>Sort by Title</MenuItem>
          <MenuItem value='date'>Sort by Date</MenuItem>
        </Select>
      </div>
      {filteredNotes?.length > 0 ? (
        <Container>
          <StyledGrid container spacing={3}>
            {filteredNotes
              ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note.time}>
                  <NoteCard
                    note={note}
                    handleDelete={() => handleDelete(notes.indexOf(note))}
                    handleEdit={() => handleEdit(note)}
                  />
                </Grid>
              ))}
          </StyledGrid>
          <StyledPagination
            count={Math.ceil(filteredNotes?.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{ color: '#2196f3' }}
          />
        </Container>
      ) : (
        <Typography
          variant='h6'
          component='div'
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          There are no notes to show.
        </Typography>
      )}
    </Container>
  );
};

export default Notes;
