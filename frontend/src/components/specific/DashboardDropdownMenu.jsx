import { useState } from 'react'
import { Box, Text, Flex, List, ListItem, ListIcon } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Transition } from 'react-transition-group'

const DashboardDropdown = ({ options }) => {
  const [subMenuIndex, setSubMenuIndex] = useState(-1)
  const [subSubMenuIndex, setSubSubMenuIndex] = useState(-1)

  const handleSubMenuClick = (index) => {
    if (subMenuIndex === index) {
      setSubMenuIndex(-1)
    } else {
      setSubMenuIndex(index)
      setSubSubMenuIndex(-1)
    }
  }

  const handleSubSubMenuClick = (index) => {
    if (subSubMenuIndex === index) {
      setSubSubMenuIndex(-1)
    } else {
      setSubSubMenuIndex(index)
    }
  }

  const duration = 200

  const defaultStyle = {
    transition: `height ${duration}ms ease-in-out`,
    height: '0',
    overflow: 'hidden',
  }

  const transitionStyles = {
    entering: { height: '0', overflow: 'hidden' },
    entered: { height: 'auto', overflow: 'visible' },
    exiting: { height: '0', overflow: 'hidden' },
    exited: { height: '0', overflow: 'hidden' },
  }

  return (
    <Box>
      {options.map((option, index) => (
        <Box key={index}>
          <Flex
            align="center"
            justify="space-between"
            cursor="pointer"
            p={2}
            /* _hover={{ bgColor: "gray.200" }} */
            onClick={() => handleSubMenuClick(index)}
            bg={'blue'}
          >
            <Text>{option.label}</Text>
            {/* <ChevronRightIcon
                            w={4}
                            h={4}
                            transform={subMenuIndex === index ? "rotate(90deg)" : ""}
                            transition="transform 0.2s ease-out"
                        /> */}
          </Flex>

          {option.subOptions && (
            <Transition in={subMenuIndex === index} timeout={duration}>
              {(state) => (
                <Box
                  ml={4}
                  mt={1}
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  <List>
                    {option.subOptions.map((subOption, subIndex) => (
                      <ListItem
                        key={subIndex}
                        cursor="pointer"
                        /* _hover={{ bgColor: "gray.200" }} */
                        onClick={() => handleSubSubMenuClick(subIndex)}
                      >
                        <Flex align="center" justify="space-between" w="100%">
                          <Text>{subOption.label}</Text>
                          {subOption.subSubOptions && (
                            <ChevronRightIcon
                              w={4}
                              h={4}
                              transform={
                                subSubMenuIndex === subIndex
                                  ? 'rotate(90deg)'
                                  : ''
                              }
                              transition="transform 0.2s ease-in-out"
                            />
                          )}
                        </Flex>
                        {subOption.subSubOptions && (
                          <Transition
                            in={subSubMenuIndex === subIndex}
                            timeout={duration}
                          >
                            {(state) => (
                              <List
                                ml={4}
                                mt={1}
                                style={{
                                  ...defaultStyle,
                                  ...transitionStyles[state],
                                }}
                              >
                                {subOption.subSubOptions.map(
                                  (subSubOption, subSubIndex) => (
                                    <ListItem
                                      key={subSubIndex}
                                      cursor="pointer"
                                      _hover={{ bgColor: 'blue.3200' }}
                                    >
                                      <Text>{subSubOption.label}</Text>
                                    </ListItem>
                                  )
                                )}
                              </List>
                            )}
                          </Transition>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Transition>
          )}
        </Box>
      ))}
    </Box>
  )
}
export default DashboardDropdown
