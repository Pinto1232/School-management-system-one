import React from 'react'
import bgImage from '../assets/images/about-us.jpg';
import Jumbotron from '../components/specific/Jumbotron';
import { Box } from '@chakra-ui/react';
import FormMultiStep from '../components/specific/MultiStepForm/FormMultiStep';
import FormToogle from '../components/specific/FormToogle';
import MultiToggleForm from '../components/specific/MultiToggleForm';
import ReusableForm from '../components/specific/FormPanel/ReusableForm';
import DataTable from '../components/specific/DataTable';
import Slideshow from '../components/specific/Slideshow';
import PaginationTable from '../components/specific/PaginationTable';





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


const data = [
    { id: 1, name: 'John', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 40, email: 'bob@example.com' },
    { id: 4, name: 'Alice', age: 35, email: 'alice@example.com' },
    { id: 5, name: 'Tom', age: 28, email: 'tom@example.com' },
];

const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'email', title: 'Email' },
];
const About = () => {

    return (
        <Box>
            <Jumbotron
                title="About Us"
                subtitle="This is a simple Jumbotron-like component built using Chakra UI."
                buttonText="learn more"
                bgImage={bgImage}
            />

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
                <PaginationTable  data={data} columns={columns} rowsPerPage={2} />
            </Box>

        </Box>
    )
}

export default About
