import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteCard = ({ note, handleDelete, handleEdit, index }) => {
  const date = new Date(note.time);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? '0' + minutes : minutes
  } ${ampm}`;

  return (
    <div>
      <StyledCard>
        <StyledCardContent>
          <Typography variant='h5' component='div'>
            {note.title}
          </Typography>
          <StyledTypography variant='body2'>
            {note.description}
          </StyledTypography>
          <Typography variant='body2' color='text.secondary'>
            Updated on: {formattedDate} at {formattedTime}
          </Typography>
        </StyledCardContent>
        <CardContent>
          <Tooltip title='Edit Note'>
            <IconButton aria-label='edit' onClick={() => handleEdit(index)}>
              <EditNoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Note'>
            <IconButton aria-label='delete' onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default NoteCard;
