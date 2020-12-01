import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'

const Notes = (props) => {
  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {props.notes.map(note =>
            <tr key={note.id}>
              <td>
                <span>{note.important ? '⚠' : ''} </span>
                  <Link to={`/notes/${note.id}`}>{note.content}
                </Link>
              </td>
              <td>
                {note.user ? note.user.name : 'Anonymous'}
              </td>
              <td>
                <Button variant="secondary" style={{'fontSize': '0.75rem'}} onClick={() => props.toggleImportance(note.id)}>{note.important ? 'not important' : 'important'}</Button>
              </td>
              <td>
                <Button variant="danger" style={{'fontSize': '0.8rem'}} onClick={() => props.deleteNote(note.id)}>✘</Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    )
}

export default Notes
