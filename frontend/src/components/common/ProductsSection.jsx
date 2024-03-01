import React, { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Image,
  UnorderedList,
  ListItem,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import CustomButton from './CustomButton'
import MultiStepForm from '../specific/MultiStepForm/MultiStepPaymentForm'

const ProductsSection = ({
  heading,
  subheading,
  products,
  imageMaxWidth,
  cardShadow,
  gridCard,
}) => {
  const bottomBgColor = useColorModeValue('#319795', '#3182ce')
  const textColor = useColorModeValue('#fff', '#fff')
  const btnTextColor = useColorModeValue('#fff', '#fff')
  const textFontSize = useBreakpointValue({
    base: '10px',
    sm: '12px',
    md: '13px',
  })
  const bgReadMore = useColorModeValue('#171923', '#2D3748')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  console.log('Original products:', products)

  // Ensure unique products by using a Set (if there are duplicates in the original array)
  const uniqueProducts = products
    .filter(
      (product, index, self) =>
        index === self.findIndex((p) => p._id === product._id)
    )
    .slice(0, 3)

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  console.log('Unique products:', uniqueProducts)

  return (
    <Box py={12} minW={gridCard} mx="auto">
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          {heading}
        </Heading>
        <Text fontSize="xl">{subheading}</Text>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={3}>
        {uniqueProducts.map((product) => (
          <Flex
            key={product._id}
            direction="column"
            bg={bottomBgColor}
            shadow={cardShadow}
            borderRadius="lg"
            color={textColor}
            overflow="hidden"
            boxShadow="2xl"
            transition="transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
            cursor={'pointer'}
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '3xl',
            }}
          >
            {product.images.map((image, id) => (
              <Image
                key={`image-${id}`}
                width="100%"
                src={image.url}
                mx="auto"
                backgroundSize="cover"
                backgroundPosition="center"
                loading="lazy"
              />
            ))}

            <Flex direction="column" p={{ base: 2, sm: 4, md: 6 }} flex="1">
              <Heading as="h3" size="md" mb={2}>
                <Text fontWeight="bold">{product.name}</Text>
              </Heading>
              <Text fontSize={textFontSize} mb={4}>
                ${product.price}
              </Text>
              <UnorderedList styleType="disc" marginLeft={4}>
                {product.features.slice(0, 2).map((feature, index) => (
                  <ListItem key={`feature-${index}`}>{feature}</ListItem>
                ))}
              </UnorderedList>
            </Flex>

            <Box mt="auto" p={{ base: 4, md: 8 }}>
              <CustomButton
                textColor={btnTextColor}
                fontSize={textFontSize}
                width="full"
                bgColor={bgReadMore}
                onClick={() => openModal(product)}
              >
                Read more...
              </CustomButton>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent h={{ sm: 780 }} bg={{ md: 'gray.900' }} mt={{ sm: 40 }}>
          <ModalHeader textAlign={{ sm: 'center' }} pl={{ sm:14}} fontSize={{ sm: 22 }} >
            {selectedProduct?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody w={450}>
            <MultiStepForm />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProductsSection
