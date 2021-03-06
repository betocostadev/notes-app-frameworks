import React, { useState, useEffect, useRef } from 'react'
// useRouteMatch - To use with Router. Not working to found a matching note ID.
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useParams
} from 'react-router-dom'
import noteService from './services/notes'
import loginService from './services/login'

import Container from '@material-ui/core/Container'
import {
  AppBar, Toolbar, Button
} from '@material-ui/core'

import Home from './components/Home'
import Users from './components/Users'
import Notes from './components/Notes'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

const TheNote = ({ notes }) => {
  const id = useParams().id
  const note = notes.find(n => n.id === id)
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user ? note.user.name : ''}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [notifyType, setNotifyType] = useState(null)
  const [user, setUser] = useState(null)


  const hook = () => {
    async function fetchNotes() {
      let initialNotes = await noteService.getAll()
      try {
        setNotes(initialNotes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }

  useEffect(hook, [])
  // console.log('render', notes.length, 'notes')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const clearNotificationState = () => {
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
      setNotifyType(null)
    }, 3800)
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)

      setSuccessMessage(`Welcome ${user.username}!`)
      setNotifyType('success')
      clearNotificationState()

    } catch (error) {
      setErrorMessage('Wrong credentials')
      setNotifyType('error')
      clearNotificationState()
    }
  }

  const handleLogout = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    setUser(null)
    setSuccessMessage('Logout success!')
    setNotifyType('success')
    clearNotificationState()

    if (loggedUserJSON) {
      window.localStorage.removeItem('loggedNoteAppUser')
    }
  }

  const addNote = async (noteObject) => {
    try {
      noteFormRef.current.toggleVisibility()
      let newNote = await noteService.create(noteObject)
      setNotes(notes.concat(newNote))
      showNotification('add-success')
    } catch (error) {
      showNotification('add-error')
      console.log(error)
    }
  }

  const showNotification = (type, content) => {
    if (type === 'add-error') {
      setErrorMessage('Error adding a new note!')
      setNotifyType('error')
      clearNotificationState()
    }
    else if(type === 'note-not-found') {
      setErrorMessage(`The note '${content}' was already deleted from the server`)
      setNotifyType('error')
      clearNotificationState()
    }
    else if(type === 'add-success') {
      setSuccessMessage('note added!')
      setNotifyType('success')
      clearNotificationState()
    }
  }

  const toggleImportanceOf = id => {
    // const noteEndpoint = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(e => {
        console.log(e)
        showNotification('note-not-found', note.content)
        setNotes(notes.filter(n => n.id !== id))
        clearNotificationState()
      })
  }

  const removeNote = id => {
    const note = notes.find(n => n.id === id)
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
        setSuccessMessage('note removed')
        setNotifyType('success')
        clearNotificationState()
      })
      .catch(e => {
        console.log(e)
        showNotification('note-not-found', note.content)
        setNotes(notes.filter(n => n.id !== id))
        clearNotificationState()
      })
  }

  const noteFormRef = useRef()

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // DOM
  return (
    <Router>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/notes">
              notes
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            {user
              ? <em>{user.name} logged in</em>
              : <Button color="inherit" component={Link} to="/login">
                  login
                </Button>
            }
          </Toolbar>
        </AppBar>

      <Switch>
        <Route path="/notes/:id">
          <TheNote notes={notes} />
        </Route>

        <Route path="/notes">
          <Container>
            <h1>Notes App</h1>
            {
              errorMessage
                ? <Notification message={errorMessage} type={notifyType} />
                : successMessage
                  ? <Notification message={successMessage} type={notifyType} />
                  : null
            }
            {
              user === null
                ?
                <div>
                  <Togglable buttonLabel='login'>
                    <LoginForm login={handleLogin}
                    />
                  </Togglable>
                </div>
                :
                <div>
                  <p style={{display: 'inline', margin: '0 1rem 0 0'}}>{user.name} logged-in</p>
                  <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                  <Togglable buttonLabel='new note' ref={noteFormRef}>
                    <NoteForm createNote={addNote} />
                  </Togglable>
                </div>
            }

            <div>
              <Button variant="contained" color="primary" onClick={() => setShowAll(!showAll)}>
                show { showAll ? 'important' : 'all' }
              </Button>
            </div>

            <Notes notes={notesToShow} toggleImportance={toggleImportanceOf} deleteNote={removeNote} />
          </Container>
        </Route>

        <Route path="/users" render={() =>
          user ? <Users /> : <Redirect to="/login" />
        } />

        <Route path="/login">
          <div>
            <Togglable buttonLabel='login'>
              <LoginForm login={handleLogin}
              />
            </Togglable>
          </div>
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />

      </Container>

    </Router>
  )
}

export default App
