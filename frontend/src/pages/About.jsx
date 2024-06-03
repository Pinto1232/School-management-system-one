import React from 'react'
import { Container, Flex } from '@chakra-ui/react'
import MemoizedAboutUsTop from '../components/AboutUsTop/AboutUsTop'

const About = () => {

  return (
      <Flex>
        <MemoizedAboutUsTop />
      </Flex>
  )
}

const MemoizedAbout = React.memo(About)
export default MemoizedAbout;

