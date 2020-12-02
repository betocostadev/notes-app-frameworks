import React, { useState } from 'react'
import {
  TextField, Button
} from '@material-ui/core'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    })

    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <div>
        <TextField
          id="new-note-input"
          name="new-note-input"
          type="text"
          label="new-note"
          placeholder={'Add a note'}
          value={newNote}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button variant="contained" color="inherit" type="submit" disabled={newNote.length ? false : true}>save</Button>
      </div>
    </form>
  )
}

export default NoteForm
