import React, { useState } from 'react'
import { Box, Flex, Grid } from '@chakra-ui/react';
import FormMultiStep from '../components/specific/MultiStepForm/FormMultiStep';
import FormToogle from '../components/specific/FormToogle';
import MultiToggleForm from '../components/specific/MultiToggleForm';
import ReusableForm from '../components/specific/FormPanel/ReusableForm';
import DataTable from '../components/specific/DataTable';
import Slideshow from '../components/specific/Slideshow';
import PaginationTable from '../components/specific/PaginationTable';
import ProductCard from '../components/specific/ProductCard';
import DropdownMenu from '../components/specific/DropdownMenu';
import ReusableModal from '../components/specific/ReusableModal';
import CustomSelect from '../components/specific/customSelect/CustomSelect';
import { Select, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Accordion from '../components/specific/Accordion';
import ProductCardTwo from '../components/specific/productCardTwo/ProductCardTwo ';
import Navibar from '../components/specific/NavigationBar/Navibar';




/* const columns = ['Name', 'Age', 'Email'];
const data = [
    { id: 1, Name: 'John', Age: 25, Email: 'john@example.com' },
    { id: 2, Name: 'Jane', Age: 30, Email: 'jane@example.com' },
    { id: 3, Name: 'Bob', Age: 40, Email: 'bob@example.com' },
]; */



const slides = [
    {
        imageUrl: 'https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg',
        altText: 'Slide 1',
        title: 'Slide 1 Title',
        description: 'Slide 1 Description',
    },
    {
        imageUrl: 'https://www.igeeksblog.com/wp-content/uploads/2021/03/How-to-Do-a-Reverse-Image-Search-on-iPhone-and-iPad.jpg',
        altText: 'Slide 2',
        title: 'Slide 2 Title',
        description: 'Slide 2 Description',
    },
    {
        imageUrl: 'https://i.pcmag.com/imagery/articles/00Cx7vFIetxCuKxQeqPf8mi-23.fit_lim.v1643131202.jpg',
        altText: 'Slide 3',
        title: 'Slide 3 Title',
        description: 'Slide 3 Description',
    },
];


// Pagination table
const data = [
    { id: 1, name: 'John', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 40, email: 'bob@example.com' },
    { id: 4, name: 'Alice', age: 35, email: 'alice@example.com' },
    { id: 5, name: 'Tom', age: 28, email: 'tom@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
];

const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'email', title: 'Email' },
];

const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
];


//Accordion data
const items = [
    {
        title: 'Section 1',
        content: 'Content for section 1',
    },
    {
        title: 'Section 2',
        content: 'Content for section 2',
    },
    {
        title: 'Section 3',
        content: 'Content for section 3',
    },
];


// Product card two
const productsTwo = [
    {
        title: 'Product 1',
        imageUrl: 'https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg',
        price: '20',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        title: 'Product 2',
        imageUrl: 'https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg',
        price: '203',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        title: 'Product 3',
        imageUrl: 'https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg',
        price: '30',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
];


const TesPage = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };


    // product card two
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };
    return (
        <Box>
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FormMultiStep />
            </Box>
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FormToogle />
            </Box>
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <MultiToggleForm />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ReusableForm />
            </Box>

            {/* <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <DataTable
                    columns={columns}
                    data={data}
                    borderColor="gray.500"
                    headerColor="gray.200"
                    headerTextColor="#fff"
                    rowColor="gray.100"
                    rowTextColor="gray.800"
                    evenRowColor="gray.50"
                    oddRowColor="white"
                />
            </Box> */}

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Slideshow
                    slides={slides}
                    speed={5000}
                    stopOnHover={true}
                />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <PaginationTable
                    data={data}
                    columns={columns}
                    rowsPerPage={2}
                />
            </Box>


            <Box maxW="5xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Flex gap={4}>
                    <ProductCard
                        imageUrl="https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg"
                        title="Product Title"
                        price="$19.99"
                        badgeText="Sale"
                        badgeColor="green"
                    />
                    <ProductCard
                        imageUrl="https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg"
                        title="Product Title"
                        price="$19.99"
                        badgeText="Sale"
                        badgeColor="green"
                    />
                    <ProductCard
                        imageUrl="https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg"
                        title="Product Title"
                        price="$19.99"
                        badgeText="Sale"
                        badgeColor="green"
                    />
                </Flex>
            </Box>

            <Box maxW="xs" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <DropdownMenu />
            </Box>

            <Box maxW="7xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Navibar />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ReusableModal
                    buttonText="Open Modal"
                    modalTitle="Example Modal Title"
                    modalContent="Example Modal Content"
                />
            </Box>

            <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <CustomSelect
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                />

                <Select
                    options={options}
                    label="Select an option"
                    placeholder="Choose an option"
                    icon={<Icon as={FaSearch} />}
                />
            </Box>


            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Accordion
                    items={items}
                />
            </Box>

            <Box border={0} maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Box p={4}>
                    <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={4}>
                        {productsTwo.map((product, index) => (
                            <ProductCardTwo key={index} product={product} onImageClick={() => handleImageClick(product)} />
                        ))}
                    </Grid>
                    {showModal && <ProductModal product={selectedProduct} onClose={() => setShowModal(false)} />}
                </Box>
            </Box>
        </Box>
    )
}

export default TesPage
