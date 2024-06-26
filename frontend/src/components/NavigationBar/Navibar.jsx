import React, { useState } from 'react'
import {
  Box,
  Flex,
  GridItem,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  EmailIcon,
  PhoneIcon,
} from '@chakra-ui/icons'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import SocialMedia from '../specific/socialIcons/SocialMediaIcons'
import NewsletterPopup from '../NewsletterPopup/NewsletterPopup'

const Navibar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const isMobileMenu = useBreakpointValue({ base: true, md: false })
  const backgroundColor = useColorModeValue('#171923', '#2D3748')
  const textColor = useColorModeValue('gray.800', 'white')
  const socialIconsBg = useColorModeValue('#fff', ' ')

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  const [activeItem, setActiveItem] = useState(menuItems[0].label)

  // Newsletter PopUp
  const [email, setEmail] = useState('')

  //Newsletter Popup
  const handleSubmitNewsletter = async (submittedEmail) => {
    // handle submitting the email to the server
    console.log(`Submitting email ${submittedEmail}`)
    // clear the email input
    setEmail('')
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      bg={backgroundColor}
      color="white"
      px={{ base: 4, md: 16 }}
      py={{ base: 2, md: 3 }}
    >
      {isMobileMenu && (
        <IconButton
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          size="md"
          aria-label="Toggle Navigation"
        />
      )}
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        maxW={{ base: 'xs', md: 'sm' }}
        w={{ base: 'full', md: 'auto' }}
        textAlign={{ base: 'center', md: 'left' }}
        justify={{ base: 'space-around', md: 'space-between' }}
        mx={{ base: 'auto', md: 0 }}
        p={{ base: 1, md: 0 }}
        borderWidth={{ base: 1, md: 0 }}
        rounded={{ base: 'md', md: 'none' }}
      >
        <Box display="flex" alignItems="center">
          <NewsletterPopup
            onSubmit={handleSubmitNewsletter}
            placeholder="Enter your email"
          >
            <Heading sx={{ base: 'md', md: 'lg', lg: 'xl' }}>
              Subscribe for news
            </Heading>
          </NewsletterPopup>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              ml: 4,
            }}
          >
            <PhoneIcon mr={2} />
            <Text fontSize="md" sx={{ color: 'white', mr: 4 }}>
              +1 (555) 123-4567
            </Text>
            <EmailIcon mr={2} />
            <Text fontSize="md" sx={{ color: 'white' }}>
              info@example.com
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 2, md: 0 }}
        ml={{ md: 4 }}
      >
        <Stack
          spacing={4}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={{ base: 'column', md: 'row' }}
          pt={[4, 4, 0, 0]}
        >
          {/* Social media component */}
          <SocialMedia
            color={socialIconsBg}
            display={{
              base: isOpen ? 'flex' : 'none',
              md: 'flex',
            }}
            size={{ base: 20, md: 23 }}
            iconPadding={2}
          />
          {/* Drop menu component */}
          <GridItem zIndex={1200}>
            <DropdownMenu />
          </GridItem>
        </Stack>
      </Box>
    </Flex>
  )
}

const MemoizedNavibar = React.memo(Navibar)
export default MemoizedNavibar
