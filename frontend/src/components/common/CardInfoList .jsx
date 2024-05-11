import React from 'react'
import CardInfo from '../common/CardInfo'
import cardInfoData from '../../data/cardInfoData'
import { Flex } from '@chakra-ui/react'

const CardInfoList = () => {
  return (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={4}
    >
      {cardInfoData.map((card, index) => (
        <CardInfo key={index} {...card} />
      ))}
    </Flex>
  )
}

export default CardInfoList
