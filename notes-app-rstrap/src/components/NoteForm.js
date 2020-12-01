import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={addNote}>
      <Form.Control
        id="new-note-input"
        name="new-note-input"
        type="text"
        placeholder={'Add a note'}
        value={newNote}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" disabled={newNote.length ? false : true}>save</Button>
    </Form>
  )
}

export default NoteForm
