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
import cartItemsData from '../data/cartItemsData';
import eventsCalendarData from '../data/eventsCalendarData';
import blogPostsData from '../data/blogPostsData';
import productsImagesData from '../data/productsImagesData';
import userData from '../data/userData';
import monthOptionsData from '../data/monthOptionsData';
import productsTwoData from '../data/productsTwoData';
import testimonialsData from '../data/testimonialsData';
import imagesData from '../data/imagesData';
import slidesData from '../data/slidesData';
import productsData from '../data/productsData';
import faqsData from '../data/faqsData';
import HeroSection from '../components/common/HeroSection';
import TablePagination from '../components/specific/TablePagination';





/*const columns = ['Name', 'Age', 'Email'];
const data = [
    { id: 1, Name: 'John', Age: 25, Email: 'john@example.com' },
    { id: 2, Name: 'Jane', Age: 30, Email: 'jane@example.com' },
    { id: 3, Name: 'Bob', Age: 40, Email: 'bob@example.com' },
]; */

// Pagination table
const data = [
    { id: 1, name: 'John', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 40, email: 'bob@example.com' },
    { id: 4, name: 'Alice', age: 35, email: 'alice@example.com' },
    { id: 5, name: 'Tom', age: 28, email: 'tom@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
];

// Pagination table
const datas = [
    { id: 1, name: 'John', age: 25, email: 'john@example.com' },
    { id: 2, name: 'Jane', age: 30, email: 'jane@example.com' },
    { id: 3, name: 'Bob', age: 40, email: 'bob@example.com' },
    { id: 4, name: 'Alice', age: 35, email: 'alice@example.com' },
    { id: 5, name: 'Tom', age: 28, email: 'tom@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
    { id: 6, name: 'Tom', age: 28, email: 'pinto@example.com' },
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




const columnsPagination = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
];

const dataPagination = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 4, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 5, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 6, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 7, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 8, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 9, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 10, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 11, name: 'Bob Smith', email: 'bob.smith@example.com' },
    // more data...
];


const TesPage = () => {
    //Data calendar
    const [selectedOption, setSelectedOption] = useState("");
    const [progress, setProgress] = useState(0);
    const audioSrc = "https://example.com/audio.mp3";

    //Dashboard header
    const toggleColorMode = () => {
        // functionality here
        console.log("Is Dark mode");
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

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <DataTable
                    columns={columns}
                    datas={datas}
                    borderColor="gray.500"
                    headerColor="gray.200"
                    headerTextColor="#fff"
                    rowColor="gray.100"
                    rowTextColor="gray.800"
                    evenRowColor="gray.50"
                    oddRowColor="white"
                />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Slideshow
                    slides={slidesData}
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


            {/* Accordion two rendering */}
            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Accordion
                    items={items}
                />
            </Box>

            <Box border={0} maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <Box p={4}>
                    <Grid templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={4}>
                        {productsTwoData.map((product, index) => (
                            <ProductCardTwo key={index} product={product} onImageClick={() => handleImageClick(product)} />
                        ))}
                    </Grid>
                    {showModal && <ProductModal product={selectedProduct} onClose={() => setShowModal(false)} />}
                </Box>
            </Box>


            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <TableWithIcons
                    productsImages={productsImagesData}
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
                    monthOptions={monthOptionsData}
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
                    testimonials={testimonialsData}
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
                    products={productsData}
                />
            </Grid>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <PricingTables />
            </Box>

            <Box maxW="4xl" mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <FaqSection
                    faqs={faqsData}
                />
            </Box>

            <Box maxW="4xl" border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ContactForm />
            </Box>

            <Box maxW="7xl" textAlign={'center'} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <ImageGallery
                    images={imagesData}
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
                    {blogPostsData.map((post) => (
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
                    username={userData.username}
                    fullName={userData.fullName}
                    profilePicture={userData.profilePicture}
                    bio={userData.bio}
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
                    cartItems={cartItemsData}
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
                <EventsCalendar
                    eventsCalendar={eventsCalendarData}
                    onEventClick={handleEventClick}
                />
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


            <Box border={0} mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <DashboardHeader
                    title="My Dashboard"
                    subtitle="Welcome to my dashboard"
                    breadcrumbItems={breadcrumbs}
                    actionButtonLabel="Create New Item"
                    isDarkMode={isDarkMode}
                    onToggle={toggleColorMode}
                />
            </Box>

            <HeroSection
                title="Welcome to My Website"
                subtitle="Explore the world with us"
                backgroundImageUrl="https://example.com/background-image.jpg"
            />


            <Box maxW="7xl" shadow="lg"  mx="auto" mt={10} p={6} borderWidth={1} rounded="md">
                <TablePagination
                    columnsPagination={columnsPagination}
                    dataPagination={dataPagination}
                    itemsPerPage={8}
                    borderColor="gray.200"
                    headerColor="gray.200"
                    headerTextColor="black"
                    rowColor="white"
                    rowTextColor="black"
                    evenRowColor="gray.100"
                    oddRowColor="white"
                    paginationBgColor="#fff"
                    paginationActiveColor="blue.500"
                    paginationInactiveColor="gray.500"
                    paginationHoverColor="blue.100"
                    paginationSize="md"
                />
            </Box>
        </Box>
    )
}

export default TesPage
