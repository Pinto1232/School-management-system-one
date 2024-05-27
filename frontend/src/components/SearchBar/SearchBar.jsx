import React, { useState } from 'react'
import { InputBase, IconButton, Box, Fade } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

const SearchBar = () => {
  const [showInput, setShowInput] = useState(false)
  const theme = useTheme()
  const textFieldBackgroundColor =
    theme.palette.mode === 'light' ? '#E2E8F0' : '#4A5568'
  const iconsColorBg = theme.palette.mode === 'light' ? '#319795' : '#3182ce'

  const toggleSearchInput = () => {
    setShowInput(!showInput)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Fade in={showInput} style={{ flexGrow: 1, transition: 'width 0.3s' }}>
        <InputBase
          placeholder="Search..."
          sx={{
            borderRadius: 1,
            width: '100%',
            backgroundColor: textFieldBackgroundColor,
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingRight: '4.5rem',
            paddingLeft: '0.5rem',
            transition: theme.transitions.create(
              ['width', 'background-color'],
              {
                duration: theme.transitions.duration.short,
              }
            ),
            overflow: 'hidden',
          }}
        />
      </Fade>
      <Box sx={{ position: 'relative', width: '4.5rem', height: '100%' }}>
        <IconButton
          aria-label="Search"
          onClick={toggleSearchInput}
          sx={{
            borderRadius: 1,
            backgroundColor: '#1976d2',
            color: 'white',
            marginRight: '-2em',
            zIndex: 1,
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

const MemoizedSearchBar = React.memo(SearchBar)
export default MemoizedSearchBar
