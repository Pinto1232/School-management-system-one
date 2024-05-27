import React, { useState, useEffect } from 'react'
import { IconButton, Tooltip, useTheme } from '@mui/material'
import { FaArrowUp } from 'react-icons/fa'

const BackToTopButton = ({ iconButtonW, iconButtonH }) => {
  const [showButton, setShowButton] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showButton && (
        <Tooltip title="Back to Top" arrow>
          <IconButton
            onClick={handleClick}
            sx={{
              zIndex: 3000,
              position: 'fixed',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
              borderRadius: '50%',
              height: theme.spacing(5),
              width: theme.spacing(5),
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <FaArrowUp style={{ width: iconButtonW, height: iconButtonH }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

const MemoizedBackToTopButton = React.memo(BackToTopButton)
export default MemoizedBackToTopButton
