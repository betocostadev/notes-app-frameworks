import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'

const Notes = (props) => {
  return (
    <div>
      <h2>Notes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {props.notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <span>{note.important ? '⚠' : ''} </span>
                    <Link to={`/notes/${note.id}`}>{note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user ? note.user.name : 'Anonymous'}
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{'fontSize': '0.75rem'}} onClick={() => props.toggleImportance(note.id)}>{note.important ? 'not important' : 'important'}</Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" style={{'fontSize': '0.8rem'}} onClick={() => props.deleteNote(note.id)}>✘</Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    )
}

export default Notes
