import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
  Flex,
  Box,
  Link,
  Tooltip,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import menuItemsData from '../../data/menuItemsData'
import { useColorModeValue } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { css } from '@emotion/react'
import UserProfileInfo from './UserProfileInfo'
import { CloseButton } from '@chakra-ui/react'
import { useUserContext } from '../../contexts/UserContext'
import NextExamStart from '../../components/common/NextExamStart'

const thinScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 255);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const UserMenu = ({ onMenuToggle, changeView }) => {
  console.log('Change View', typeof changeView)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const iconsColor = useColorModeValue('#319795', '#3182ce')
  const btColor = useColorModeValue('#319795', '#3182ce')
  const textColor = useColorModeValue('#000', '#fff')
  const bgMenuColor = useColorModeValue('#171923', '#171923')
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { logout } = useUserContext()
  const examDate = new Date('2024-05-30T15:00:00Z')

  /*  console.log("User Image", user); */

  const handleLogout = async () => {
    setIsLoading(true)

    // Simulate an asynchronous action (like a server request)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Invoke the logout function from UserContext
    logout()
    // Display a toast notification
    toast({
      title: 'You have logged out!',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })

    // Redirect to the home page
    navigate('/')
  }

  const handleNavigation = (view) => {
    if (typeof changeView === 'function') {
      changeView(view)
    } else {
      console.error('changeView is not a function', changeView)
    }
    onMenuToggle(false)
    onClose()
  }

  const handleMenuToggle = () => {
    if (isOpen) {
      onClose()
      onMenuToggle(false) // Setting menu to close
    } else {
      onOpen()
      onMenuToggle(true) // Setting menu to open
    }
  }

  const handleOverlayClick = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <Box
        position="absolute"
        right="0"
        shadow="md"
        borderRadius="md"
        m={4}
        zIndex={999}
      >
        <Tooltip label="Open Sidebar" fontSize="xs">
          <IconButton
            color={'white'}
            ref={btnRef}
            onClick={handleMenuToggle}
            icon={<HamburgerIcon />}
            variant="outline"
            bg={'teal.500'}
            _hover={{ bg: '#000' }}
          />
        </Tooltip>
      </Box>
      <Drawer
        placement="left"
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        isCloseable={false}
        size="xs"
        closeOnOverlayClick={false}
        trapFocus={false}
      >
        <DrawerOverlay>
          <DrawerContent bg={'#fff'}>
            <DrawerHeader borderBottomWidth="">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderBottom={'solid 1px gray'}
              >
                <UserProfileInfo
                  user={user}
                  imageWidth="60px"
                  imageHeight="60px"
                />
                <CloseButton
                  onClick={() => {
                    onClose()
                    onMenuToggle(false)
                  }}
                  bg={'#319795'}
                  mr={'-72px!important'}
                  mt={'14'}
                  p={5}
                  color={'white'}
                  borderRadius="0px 15px 15px 0px"
                  w={'4em'}
                  _hover={{ bg: '#000' }}
                />
              </Flex>
            </DrawerHeader>
            <DrawerBody css={thinScrollbar}>
              <VStack spacing={4} align="stretch">
                {menuItemsData?.map((item, index) => (
                  <Flex
                    key={item.label}
                    fontSize="sm"
                    onClick={() => handleNavigation(item.label.toLowerCase())}
                    alignItems="center"
                    bg={index === 0 ? 'black' : ''}
                    px={index === 0 ? '5px' : ''}
                    py={index === 0 ? '7px' : ''}
                    w={index === 0 ? '20em' : ''}
                    borderRadius={index === 0 ? '40px' : ''}
                    _hover={index === 0 ? { bg: 'green.400' } : {}}
                    cursor={index === 0 ? 'pointer' : 'default'}
                  >
                    <Box
                      as="span"
                      display="inline-flex"
                      alignItems="center"
                      spacing="12"
                      gap={4}
                      color={'black'}
                    >
                      <Box
                        borderRadius="50%"
                        p="1"
                        bg={index === 0 ? 'teal' : ''}
                        border={index === 0 ? '' : '2px solid teal'}
                        boxShadow={index === 0 ? 'md' : 'md'}
                      >
                        <item.icon
                          boxsize="0"
                          fontSize={15}
                          color={index === 0 ? 'white' : 'black'}
                        />
                      </Box>
                      <Box
                        textDecoration="none"
                        _hover={index === 0 ? { color: 'white' } : {}}
                        fontWeight={index === 0 ? 'bold' : ''}
                        color={index === 0 ? 'white' : 'teal'}
                      >
                        <Link
                          textDecoration="none"
                          _hover={{
                            textDecoration: 'none',
                            paddingTop: '1',
                            paddingBottom: '1',
                            paddingLeft: '2',
                            paddingRight: '2',
                            transition:
                              'all 0.50s cubic-bezier(0.25, 0.1, 0.25, 1)',
                            width: '230px',
                            whiteSpace: 'nowrap',
                            borderRadius: '4',
                          }}
                        >
                          <span fontSize={index === 0 ? 'white' : 'normal'}>
                            {item.label}
                          </span>
                        </Link>
                      </Box>
                    </Box>
                  </Flex>
                ))}
                <NextExamStart
                  title="Next Exam Starts"
                  examDate={new Date('2024-05-30T15:00:00Z')}
                />

                <Button
                  bg={btColor}
                  color={textColor}
                  isLoading={isLoading}
                  onClick={handleLogout}
                  leftIcon={<IoLogOut />}
                >
                  Logout
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default UserMenu
