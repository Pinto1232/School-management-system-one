import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon, Email as EmailIcon } from '@mui/icons-material'

const NewsletterPopup = ({
  onSubmit,
  placeholder = 'Enter your email address',
  ...rest
}) => {
  const theme = useTheme()
  const isLargerThan768 = useMediaQuery(theme.breakpoints.up('md'))
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    setIsButtonDisabled(event.target.value === '')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      try {
        onSubmit(email)
        setEmail('')
        setSnackbarMessage("You've successfully subscribed to our newsletter.")
        setSnackbarSeverity('success')
        setSnackbarOpen(true)
        setIsLoading(false)
        setIsOpen(false)
      } catch (error) {
        setSnackbarMessage(error.message)
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
        setIsLoading(false)
      }
    }, 2000)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <Box {...rest}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        {isLargerThan768 ? (
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon />
            Subscribe
          </Box>
        ) : (
          'Subscribe'
        )}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Please provide your email
          <IconButton
            aria-label="close"
            onClick={() => setIsOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address to subscribe to our newsletter.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label={placeholder}
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <DialogActions>
              <Button onClick={() => setIsOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isButtonDisabled || isLoading}
                startIcon={isLoading && <CircularProgress size={20} />}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        severity={snackbarSeverity}
      />
    </Box>
  )
}

const MemoizedNewsletterPopup = React.memo(NewsletterPopup)
export default MemoizedNewsletterPopup
