import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, InputGroup, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
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
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Accordion from '../components/specific/Accordion';
import ProductCardTwo from '../components/specific/productCardTwo/ProductCardTwo ';
import Navibar from '../components/specific/NavigationBar/Navibar';
import TableWithIcons from '../components/specific/tableImage/TableWithIcons';
import SearchBar from '../components/specific/searchbar/SearchBar';
import { EmailIcon, LockIcon, SearchIcon } from '@chakra-ui/icons';
import Calendar from '../components/specific/calendar/Calendar';
import SocialMedia from '../components/specific/socialIcons/SocialMediaIcons';
import FourColumnLayout from '../components/specific/fourcolumns/FourColumnLayout';
import AdjustableColumnLayout from '../components/specific/twocolumns/AdjustableColumnLayout';
import TodoList from '../components/specific/TodoListComponent/TodoList';
import CTAButton from '../components/common/CTAButton';
import InputFieldComponent from '../components/common/InputFieldComponent';
import Testimonials from '../components/common/Testimonials ';
import AboutUsSection from '../components/common/AboutUsSection';
import ServicesSection from '../components/common/ServicesSection';
import ProductsSection from '../components/common/ProductsSection';
import PricingTables from '../components/specific/pricingtable/PricingTable';
import FaqSection from '../components/specific/Faq/FaqSection';
import ContactForm from '../components/common/ContactForm';
import ImageGallery from '../components/specific/imagegallery/ImageGallery';
import VideoPlayer from '../components/common/VideoPlayer';
import AudioPlayer from '../components/common/AudioPlayer';
import BlogPost from '../components/common/BlogPost';
import NewsletterForm from '../components/common/NewsletterForm';
import { useForm } from "react-hook-form";
import CommentSection from '../components/common/CommentSection';
import BlogPostSection from '../components/common/BlogPostSection';
import UserProfilePage from '../components/common/UserProfilePage';
import ShoppingCart from '../components/common/ShoppingCart';
import ProgressBar from '../components/common/ProgressBar';
import { FaHome, FaHeart, FaEnvelope } from "react-icons/fa";
import EventsCalendar from '../components/common/EventCalendar';
import Timeline from '../components/common/Timeline';
import BigCalendar from '../components/common/BigCalendar';
import events from '../data/BigCalendarEventData'
import fullcalendarevent from '../data/FullCalendarData'
import FCalendar from '../components/common/FCalendar';
import ResponsiveCalendar from '../components/common/ReactCalendar';
import ResponsiveMultiStep from '../components/common/ResponsiveMultiStepForm';
import UserProfileForm from '../components/common/UserProfileForm';
import UserProfile from '../components/common/UserProfilePage';
import AccountSettings from '../components/common/AccountSettings';
import currentUser from '../data/AccountSettingData';
import itemsPaypalCheckout from '../data/PaypalCheckoutData'
import PaypalCheckout from '../components/common/PaypalCheckout';
import ProductCategory from '../components/common/ProductCategory';
import productCategoryData from '../data/productCategoryData'
import TeamMembersSection from '../components/common/TeamMembersSection';
import teamMembersData from '../data/teamMembersData'
import ServicesSections from '../components/common/ServicesSections';
import services from '../data/ServicesSectionsData'
import DashboardHeader from '../components/specific/DashboardHeader';
import breadcrumbs from '../data/breadcrumbsData'





/*const columns = ['Name', 'Age', 'Email'];
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

//Table with Icons
const productsImages = [
    {
        id: 1,
        image: "https://t3.ftcdn.net/jpg/01/97/11/64/360_F_197116416_hpfTtXSoJMvMqU99n6hGP4xX0ejYa4M7.jpg",
        name: "Product 1",
        idNumber: "123456",
        year: 2022,
        marks: 95,
        rank: 1,
    },
    {
        id: 2,
        image: "https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg",
        name: "Product 2",
        idNumber: "234567",
        year: 2022,
        marks: 90,
        rank: 2,
    },

    {
        id: 3,
        image: "https://media.istockphoto.com/id/1335941248/photo/shot-of-a-handsome-young-man-standing-against-a-grey-background.jpg?b=1&s=170667a&w=0&k=20&c=Dl9uxPY_Xn159JiazEj0bknMkLxFdY7f4tK1GtOGmis=",
        name: "Product 2",
        idNumber: "234567",
        year: 2022,
        marks: 90,
        rank: 2,
    },

    {
        id: 4,
        image: "https://media.istockphoto.com/id/1372641621/photo/portrait-of-a-businessman-on-gray-background.jpg?b=1&s=170667a&w=0&k=20&c=Yyi5slaeNpq_HPcfgy1305VpJSwerPm_s7mTz_bBk6c=",
        name: "Product 2",
        idNumber: "234567",
        year: 2022,
        marks: 90,
        rank: 2,
    },

    {
        id: 5,
        image: "https://img.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-14474.jpg",
        name: "Product 2",
        idNumber: "234567",
        year: 2022,
        marks: 90,
        rank: 2,
    },
];


//Product 2
const products = [
    {
        id: 1,
        name: "Product 1",
        description: "This is a description of product 1",
        price: 10.99,
        category: "Category 1",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },
    {
        id: 2,
        name: "Product 2",
        description: "This is a description of product 2",
        price: 15.99,
        category: "Category 2",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },

    {
        id: 3,
        name: "Product 2",
        description: "This is a description of product 2",
        price: 15.99,
        category: "Category 2",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },
    {
        id: 4,
        name: "Product 2",
        description: "This is a description of product 2",
        price: 15.99,
        category: "Category 2",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },
    {
        id: 5,
        name: "Product 2",
        description: "This is a description of product 2",
        price: 15.99,
        category: "Category 2",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },
    {
        id: 6,
        name: "Product 2",
        description: "This is a description of product 2",
        price: 15.99,
        category: "Category 2",
        image: "https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc=",
    },
];


const faqs = [
    {
        question: "What is Lorem Ipsum?",
        answer:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
        question: "Why do we use it?",
        answer:
            "It is a long established fact"
    }
]


// Testimonial
const testimonials = [
    {
        id: 1,
        name: "John Doe",
        text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel lorem vel felis pharetra cursus. Mauris consequat nibh mauris, id feugiat velit bibendum vitae.",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: 2,
        name: "Jane Smith",
        text:
            "Vestibulum eu felis eget nunc pulvinar pretium. Integer ut eros dui. Ut nec turpis tellus. Donec egestas consequat sem sit amet malesuada.",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: 3,
        name: "Bob Johnson",
        text:
            "Fusce vel consectetur arcu. Curabitur in bibendum nunc. Duis sed vestibulum risus. Donec viverra, nibh vitae luctus tincidunt, sem turpis porttitor ex, non congue justo magna vitae libero.",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
];


// Calendar data
const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];


// Image Gallary
const images = [
    {
        src: 'https://i0.wp.com/thatrandomagency.com/wp-content/uploads/2022/10/lauren_headshot2022.png?resize=640%2C640&ssl=1',
        alt: 'Image 1',
        caption: 'Caption 1',
    },
    {
        src: 'https://grid-is.imgix.net/hjalli/65af50e0-8b67-4422-81f2-fcd4c7fe2f70-HG-profile.jpg',
        alt: 'Image 2',
        caption: 'Caption 2',
    },
    {
        src: 'https://grid-is.imgix.net/hjalli/65af50e0-8b67-4422-81f2-fcd4c7fe2f70-HG-profile.jpg',
        alt: 'Image 3',
        caption: 'Caption 3',
    },
];



const blogPosts = [
    {
        title: "How to Build a React App",
        author: "John Doe",
        date: "April 15, 2023",
        imageSrc: "https://grid-is.imgix.net/hjalli/65af50e0-8b67-4422-81f2-fcd4c7fe2f70-HG-profile.jpg",
        excerpt: "Learn how to build a React app from scratch in this tutorial.",
        link: "https://example.com/blog/how-to-build-a-react-app",
    },
    {
        title: "10 Tips for Better Productivity",
        author: "Jane Smith",
        date: "April 10, 2023",
        imageSrc: "https://grid-is.imgix.net/hjalli/65af50e0-8b67-4422-81f2-fcd4c7fe2f70-HG-profile.jpg",
        excerpt: "Increase your productivity with these 10 tips and tricks.",
        link: "https://example.com/blog/10-tips-for-better-productivity",
    },
];


// User profile
const user = {
    username: "johndoe",
    fullName: "John Doe",
    profilePicture: "https://img.freepik.com/free-photo/worldface-ugandan-man-white-background_53876-14474.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};


// Shooping cart
const cartItems = [
    {
        id: 1,
        name: "Product 1",
        price: 10.0,
        quantity: 2,
    },
    {
        id: 2,
        name: "Product 2",
        price: 5.0,
        quantity: 1,
    },
    {
        id: 3,
        name: "Product 3",
        price: 15.0,
        quantity: 3,
    },
];

// Event calendar 2
const eventsCalendar = [
    { name: "Event 1", date: "2022-05-15" },
    { name: "Event 2", date: "2022-05-20" },
    { name: "Event 3", date: "2022-06-05" },
    { name: "Event 4", date: "2022-06-15" },
];

const TesPage = () => {
    //Data calendar
    const [selectedOption, setSelectedOption] = useState("");
    const [progress, setProgress] = useState(0);
    const audioSrc = "https://example.com/audio.mp3";

    //Dashboard header
    const toggleColorMode = () => {
        // functionality here
    }

    const isDarkMode = () => {
        // functinality here
    }


    // Function for paypal check
    const handlePayment = (payment) => {
        console.log("Payment successful!", payment);
    };

    const handleCheckoutCancel = (data) => {
        console.log("Payment cancelled!", data);
    };

    // Account settings
    const handleSave = (formData) => {
        // Handle saving form data here
    };

    const handleCancel = () => {
        // Handle cancelling changes here
    };


    // User profile
    const initialValuesProfile = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const handleSubmitProfile = (values) => {
        // Handle form submission
    };



    // React calendar
    const [value, onChange] = useState(new Date());




    const handleEventClick = (event) => {
        console.log(`Event ${event.name} clicked on ${event.date}`);
    };


    //User Profile
    const handleSubmitUserProfile = (values) => {
        // handle form submission here
    };

    //progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                const nextProgress = prevProgress + 10;
                if (nextProgress === 100) {
                    clearInterval(interval);
                }
                return nextProgress;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // reusable input
    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    // News letter form
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        // handle form submission
    };
    //end news letter form

    // Calendar
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Do something with the selected date
    };
    // Calendar

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


    // Comment section component
    const handleCommentSubmit = (data) => {
        console.log(data.comment); // do something with the comment data
    };


    //TodoList
    const [todos, setTodos] = useState([
        { id: 1, title: "Task 1", completed: false },
        { id: 2, title: "Task 2", completed: true },
        { id: 3, title: "Task 3", completed: false },
    ]);

    const handleAddTodo = () => {
        const newTodo = {
            id: Math.random(),
            title: "New Task",
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };


    const handleRemoveTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
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

            {/* <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Slideshow
                    slides={slides}
                    speed={5000}
                    stopOnHover={true}
                />
            </Box> */}

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


            {/* Accordion two rendering */}
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


            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <TableWithIcons
                    productsImages={productsImages}
                />
            </Box>

            <Box border={0} maxW="xs" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <SearchBar
                    placeholder="Search"
                    icon={<SearchIcon />}
                    style={{
                        borderRadius: '4px',
                    }}
                />
            </Box>


            <Box maxW="7xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Calendar
                    initialDate={new Date()}
                    onDateClick={handleDateClick}
                    monthOptions={monthOptions}
                    minYear={2010}
                    maxYear={2030}
                />
                <Box mt={4}>
                    Selected date: {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : "None"}
                </Box>
            </Box>

            {/* <Box maxW="xs" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <SocialMedia
                    size="lg"
                    color="gray.500"
                    align="center"
                />
            </Box> */}

            <Box maxW="7xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FourColumnLayout>
                    <Box p={4} bg="red.200">
                        Column 1
                    </Box>
                    <Box p={4} bg="blue.200">
                        Column 2
                    </Box>
                    <Box p={4} bg="green.200">
                        Column 3
                    </Box>
                    <Box p={4} bg="yellow.200">
                        Column 4
                    </Box>
                </FourColumnLayout>
            </Box>

            <Box maxW="7xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <AdjustableColumnLayout columns={5} >
                    <Box bg={'bisque'} color={'black'}>Column 1 content</Box>
                    <Box bg={'InfoText'} color={'black'}>Column 2 content</Box>
                    <Box bg={'aliceblue'} color={'black'}>Column 3 content</Box>
                    <Box bg={'InfoText'} color={'black'}>Column 2 content</Box>
                    <Box bg={'aliceblue'} color={'black'}>Column 3 content</Box>
                </AdjustableColumnLayout>
            </Box>

            <Box maxW="3xl" bg={'gray.700'} border={0} textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Button onClick={handleAddTodo}>Add Todo</Button>
                <TodoList todos={todos} onChange={handleRemoveTodo} />
            </Box>

            <Box maxW="xs" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <CTAButton
                    label="Click me!"
                    colorScheme="blue"
                    onClick={() => console.log('Button clicked!')}
                    text="CTAButton"
                />
            </Box>

            <Box maxW="4xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Grid gap={3}>
                    <InputFieldComponent
                        type="text"
                        placeholder="Name"
                        icon={EmailIcon}
                    />
                    <InputFieldComponent
                        type="text"
                        placeholder="Surname"
                        icon={LockIcon}
                    />
                    <InputFieldComponent
                        type="email"
                        placeholder="Email"
                        icon={EmailIcon}
                    />
                    <InputFieldComponent
                        type="password"
                        placeholder="Password"
                        icon={LockIcon}
                    />
                </Grid>
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Testimonials
                    testimonials={testimonials}
                />
            </Box>

            <Box maxW="7xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <AboutUsSection
                    heading="Our Story"
                    subheading="Learn more about our company and mission"
                    image="https://media.istockphoto.com/id/1402604850/photo/the-word-about-us-on-wooden-cubes-business-communication-and-information.jpg?b=1&s=170667a&w=0&k=20&c=M1zgL2pGwZ_g3cwmOvdMtzz92PlTLdihv6_wgaW1QZc="
                    altText="About us image"
                >
                    <Grid>
                        <Text fontSize="lg" mb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod aliquam commodo.
                            Vestibulum pharetra semper urna, ac dapibus felis ultricies ut. Duis pharetra
                            sapien non magna ullamcorper, ut scelerisque enim sagittis.
                        </Text>
                        <Text fontSize="lg">
                            Nullam at ipsum quis nibh posuere ultrices. Nam posuere, purus sed finibus venenatis,
                            enim urna commodo mauris, at aliquet metus lorem vitae mauris.
                        </Text>
                    </Grid>
                </AboutUsSection>
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ServicesSection />
            </Box>

            <Grid maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ProductsSection
                    heading="Our Products"
                    subheading="Check out our latest offerings"
                    products={products}
                />
            </Grid>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <PricingTables />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FaqSection
                    faqs={faqs}
                />
            </Box>

            <Box maxW="4xl" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ContactForm />
            </Box>

            <Box maxW="7xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ImageGallery
                    images={images}
                />
            </Box>


            <Box maxW="7xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ImageGallery
                    images={[
                        {
                            id: 1,
                            src: "https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg",
                            alt: "Image 1",
                        },
                        {
                            id: 2,
                            src: "https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg",
                            alt: "Image 2",
                        },
                        {
                            id: 3,
                            src: "https://i1.wp.com/img.phonandroid.com/2021/11/comment-reduire-taille-poids-image.jpg",
                            alt: "Image 3",
                        },
                        // add more images here...
                    ]}
                />
            </Box>

            {/* 
            <Box maxW="4xl" mx="auto" border={0} mt={10} p={6} borderWidth={1} rounded="md">
                <VideoPlayer
                    videoUrl="https://www.youtube.com/watch?v=u1y17E4mYgc"
                    title="Ninja Turtle"
                    description="This is a brief description"
                />

                <VideoPlayer
                    videoUrl="https://www.youtube.com/watch?v=u1y17E4mYgc"
                    title="Ninja Turtle"
                    description="This is a brief description"
                />
            </Box> */}


            {/*  <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <AudioPlayer
                    src={audioSrc}
                />
            </Box> */}

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4}>
                    {blogPosts.map((post) => (
                        <BlogPost key={post.title} {...post} />
                    ))}
                </Grid>
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <NewsletterForm
                    namePlaceholder="Enter your name"
                    emailPlaceholder="Enter your email"
                    buttonText="Subscribe"
                    onSubmit={handleSubmit(onSubmit)}
                />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Stack spacing={4} direction="column">
                    <CommentSection
                        onSubmit={handleCommentSubmit}
                    />
                </Stack>
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <BlogPostSection
                    title="My First Blog Post"
                    author="John Doe"
                    date="April 20, 2023"
                    excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit justo eget sem blandit, in rutrum purus interdum. Fusce aliquam, est sit amet dapibus pellentesque, lorem neque dictum mi, vel rutrum nisi urna in lectus."
                    imageUrl="https://picsum.photos/600/400"
                />
                <BlogPostSection
                    title="My First Blog Post"
                    author="John Doe"
                    date="April 20, 2023"
                    excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit justo eget sem blandit, in rutrum purus interdum. Fusce aliquam, est sit amet dapibus pellentesque, lorem neque dictum mi, vel rutrum nisi urna in lectus."
                    imageUrl="https://picsum.photos/600/400"
                />
            </Box>

            <Box maxW="xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <UserProfilePage
                    username={user.username}
                    fullName={user.fullName}
                    profilePicture={user.profilePicture}
                    bio={user.bio}
                />
            </Box>

            <Box maxW="xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <UserProfilePage
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    fullName="Pinto Manuel"
                    username="Pinto"
                    bio="Pinto is Software dev for more then 5 years of expirience"
                />
            </Box>

            <Box maxW="xl" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ShoppingCart
                    cartItems={cartItems}
                    src={FaShoppingCart}
                />
            </Box>

            <Box maxW="xl" mx="auto" p={6} borderWidth={1} rounded="md">
                <h1>My Progress Bar</h1>
                <ProgressBar
                    value={progress}
                    color="blue"
                />
            </Box>

            <Box maxW="4xl" textAlign={"center"} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <EventsCalendar eventsCalendar={eventsCalendar} onEventClick={handleEventClick} />
            </Box>

            <Box maxW="4xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Timeline />
            </Box>

            <Box maxW="6xl" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <BigCalendar
                    events={events}
                />
            </Box>

            <Box maxW="6xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FCalendar
                    fullcalendarevent={fullcalendarevent}
                    initialView="dayGridMonth"
                />
            </Box>

            <Box maxW="4xl" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ResponsiveCalendar value={value} onChange={onChange} />
            </Box>

            <Box maxW="4xl" mx="auto" p={6} borderWidth={2} rounded="md" shadow={'lg'}>
                <ResponsiveMultiStep
                    steps={[
                        {
                            component: () => (
                                <Flex gap={4}>
                                    <InputFieldComponent
                                        type="text"
                                        placeholder="Name"
                                        icon={EmailIcon}
                                    />
                                    <InputFieldComponent
                                        type="email"
                                        placeholder="Email"
                                        icon={EmailIcon}
                                    />

                                    <InputFieldComponent
                                        type="email"
                                        placeholder="Email"
                                        icon={EmailIcon}
                                    />
                                </Flex>
                            ),
                            description: "This is step 1",
                        },
                        {
                            component: () => (
                                <Flex gap={4}>
                                    <InputFieldComponent
                                        type="text"
                                        placeholder="Name"
                                        icon={EmailIcon}
                                    />
                                    <InputFieldComponent
                                        type="email"
                                        placeholder="Email"
                                        icon={EmailIcon}
                                    />

                                    <InputFieldComponent
                                        type="email"
                                        placeholder="Email"
                                        icon={EmailIcon}
                                    />
                                </Flex>
                            ),
                            description: "This is step 2",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },

                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                        {
                            component: () => <div>Step 3</div>,
                            description: "This is step 3",
                        },
                    ]}
                    title={"My Multi-Step Form"}
                    style={{
                        bgColor: "white",
                        textColor: "gray.800",
                        buttonBgColor: "gray.100",
                        buttonTextColor: "gray.800",
                        buttonBorderColor: "gray.300",
                    }}
                    showTitles={true}
                    showNavigation={true}
                    prevButton="Prev"
                    nextButton="Next"
                    direction="horizontal"
                    activeStep={0}
                />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <UserProfileForm
                    onSubmit={handleSubmitProfile}
                    initialValuesProfile={initialValuesProfile}
                />
            </Box>


            <Flex shadow={'md'} maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <UserProfile
                    name="John Doe"
                    username="johndoe"
                    email="johndoe@example.com"
                    avatarSrc="https://example.com/avatar.png"
                />
                <UserProfile
                    name="Pinto Manuel"
                    username="johndoe"
                    email="johndoe@example.com"
                    avatarSrc="https://example.com/avatar.png"
                />
            </Flex>

            <Box shadow={'md'} maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Heading as="h2">Add to Cart</Heading>
                <ShoppingCart title="My Shopping Cart" emptyMessage="Your cart is empty." />
            </Box>

            <Box maxW="7xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Heading as="h2">Paypal checkout</Heading>
                <PaypalCheckout
                    items={itemsPaypalCheckout}
                    total={items.reduce((total, item) => total + item.price * item.quantity, 0)}
                    onSuccess={handlePayment}
                    onCancel={handleCheckoutCancel}
                />
            </Box>

            <Box maxW="5xl" textAlign="start" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ProductCategory
                    title="Featured Products"
                    productCategoryData={productCategoryData}
                />
            </Box>

            <Box maxW="2xl" shadow="lg" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <TeamMembersSection
                    title="Team Member"
                    teamMembersData={teamMembersData}
                />
            </Box>

            <Box maxW="6xl" shadow="lg" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ServicesSections
                    title="Our Services"
                    services={services}
                />
            </Box>


            <Box  border={0}  mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <DashboardHeader
                    title="My Dashboard"
                    subtitle="Welcome to my dashboard"
                    breadcrumbItems={breadcrumbs}
                    actionButtonLabel="Create New Item"
                    isDarkMode={isDarkMode}
                    onToggle={toggleColorMode}
                />
            </Box>
        </Box>
    )
}

export default TesPage
