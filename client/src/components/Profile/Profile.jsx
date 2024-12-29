import { Close, Send } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material'
import React, { useRef } from 'react'
import { useValue } from '../../context/ContextProvider'
import { UpdateProfile } from '../../actions/user'

const Profile = () => {
  const {
    state: { profile, currentUser, light },
    dispatch
  } = useValue()
  const nameRef = useRef()
  const handleClose = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { ...profile, open: false } })
  }
  /* cuando se selecciona una nueva imagen actualiza el perfil (profile) */
  const handleChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const photoURL = URL.createObjectURL(file)
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: { ...profile, file, photoURL }
      })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    /* send request to change user info */
    const name = nameRef.current.value

    UpdateProfile(currentUser, { name, file: profile.file }, dispatch)

    console.log(response)
  }

  return (
    <Dialog open={profile.open} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey'
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating the fields
          </DialogContentText>
          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            id='name'
            label='Name'
            type='text'
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={currentUser?.result.user.nombre}
          />
          <label htmlFor='profilePhoto'>
            <input
              accept='image/*'
              id='profilePhoto'
              type='file'
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <Avatar
              src={profile.photoURL}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
          </label>
        </DialogContent>
        {/* botton de enviar */}
        <DialogActions sx={{ px: '19px' }}>
          <Button
            type='submit'
            variant='contained'
            endIcon={<Send />}
            sx={{
              bgcolor: light
                ? `var(--ihc-toolbar-light-mode)`
                : `var(--ihc-dark-mode-text)`
            }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Profile
