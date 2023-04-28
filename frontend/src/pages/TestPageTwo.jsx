import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import MegaMenus from '../components/specific/megamenu/MegaMenus'
import MegamenuData from '../data/MegamenuData'
import ProgressIndicator from '../components/specific/ProgressIndicator'
import LoadingAnimation from '../components/specific/LoadingAnimation'
import LoadingAnimationTwo from '../components/specific/LoadingAnimationTwo'
import PageTransition from '../components/specific/pagetransition/PageTransition'
import Parallax from '../components/specific/Parallax'
import parallaxImage from '../assets/images/pro.jpg'
import StickyHeader from '../components/common/StickyHeader'
import StickyFooter from '../components/common/StickyFooter'
import UpsellSection from "../components/specific/ProductCards/UpsellSection";
import ProductCard from "../components/specific/ProductCards/ProductCard";
import products from "../data/useSelectionData"
import ProductComparisonTable from '../components/specific/ProductComparisonTable'
import ProductsCustom from '../data/ProductComparisonTableData'
import ProductRatingData from '../data/ProductRatingData'
import ProductRatingsAndReviews from '../components/specific/ProductRatingsAndReviews'
import ProductReviews from '../components/specific/ProductReviews'
import ProductFilters from '../components/specific/ProductFilters'
import ProductFiltersData from '../data/ProductFiltersData'
import ProductSortingOptionsData from '../data/ProductSortingOptionsData'
import ProductSorting from '../components/specific/ProductSorting'
import BreadcumberData from '../data/BreadcumberData'
import Breadcrumbs from '../components/specific/Breadcrumbs'
import PaginationNew from '../components/specific/PaginationNew'
import BackToTopButton from '../components/specific/BackToTopButton'
import SocialProofSection from '../components/specific/SocialProofSection'
import socialProofData from '../data/socialProofData'
import filtersData from '../data/filtersData'
import TrustBadges from '../components/specific/TrustBadges'
import TrustBadgesData from '../data/TrustBadgesData'
import ShippingAndPaymentIcons from '../components/specific/ShippingAndPaymentIcons'
import shippingAndPaymentData from '../data/ShippingAndPaymentData'
import VerticalSliderCardOne from '../components/specific/cards/VerticalSliderCardOne'
import VerticalSliderCardOneData from '../data/VerticalSliderCardOneData'
import VerticalSliderCardTwo from '../components/specific/cards/VerticalSliderCardTwo'
import CardVerticalTwoData from '../data/CardVerticalTwoData'
import VerticalSliderCardThreeData from '../data/VerticalSliderCardThreeData'
import VerticalSliderCardThree from '../components/specific/cards/VerticalSliderCardThree'
import HorizontalCardData from '../data/HorizontalCardData'
import HorizontalSliderCard from '../components/specific/cards/HorizontalSliderCard'


const TestPageTwo = () => {
    const orientation = "horizontal";


    // Product Filter
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (checked, option) => {
        if (checked) {
            setSelectedFilters([...selectedFilters, option]);
        } else {
            setSelectedFilters(selectedFilters.filter((item) => item !== option));
        }
    };

    // New Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Loading two
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Do some async operation here...
        setIsLoading(false);
    }, []);


    // Product comparison
    const features = ["feature1", "feature2", "feature3"];

    //product rating reviews
    const reviews = [
        {
            id: 1,
            author: "John Doe",
            rating: 4,
            text: "This product is great!",
        },
        {
            id: 2,
            author: "Jane Smith",
            rating: 3,
            text: "It's okay, but could be better.",
        },
    ];

    // Product sorting
    const [selectedOption, setSelectedOption] = useState("price-low-to-high");

    const handleSortingChange = (value) => {
        setSelectedOption(value);
        // Do something else, like update the product list with the new sorting option
    };



    return (
        <Box>
            {/*  Sticky header */}
            <StickyHeader bg="gray.800" color="white" boxShadow="md">
                <h1>Sticky header</h1>
            </StickyHeader>

            <Grid mt={'20px'}>
                {/* Mega menu */}
                <MegaMenus
                    megamenudata={MegamenuData}
                    orientation={orientation}
                />
            </Grid>

            <Box border={0} maxW="3xl" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                <Flex gap={'5'}>
                    <ProgressIndicator value={50} maxValue={100} />
                    <ProgressIndicator value={75} maxValue={100} color="red.500" />
                    <ProgressIndicator value={25} maxValue={50} height="16px" color="orange.500" />
                </Flex>
            </Box>

            {/* Laoding one */}
            <Box border={0} maxW="sm" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                <LoadingAnimation size="50px" color="red" thickness="6px" speed="1s" />
                <p>Loading...</p>
            </Box>

            {/* Loading two */}
            <Box border={0} maxW="3xl" textAlign={'center'} mx="auto" mt={'20px'} p={6} borderWidth={1} rounded="md">
                {isLoading ? <LoadingAnimationTwo /> : <Box>This is the content that loaded.</Box>}
            </Box>

            {/* Page transition */}
            <Box maxW="7xl" textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <PageTransition duration={6000} direction="up" easing="cubic-bezier(.17,.67,.83,.67)">
                    {/* Your page content goes here */}
                    <Text textAlign={'center'}>
                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset

                        sheets containing Lorem Ipsum passages, and more
                        recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    </Text>
                </PageTransition>
            </Box>

            {/* Parallax */}
            <Box
                position="relative"
            >
                <Box
                    backgroundImage={`url(${parallaxImage})`}
                    backgroundSize="cover"
                    backgroundPosition="center center"
                    height="400px"
                    position="relative"
                >
                    <Parallax height="400px" />
                </Box>
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    maxW='7xl'
                    mx="auto"
                    textAlign={'center'}
                >
                    <Text color={'#fff'} fontSize={'x-large'} as="h1" maxW='7xl' mx="auto" textAlign={'center'} >
                        in the middle of text. All the Lorem Ipsum generators on the
                        Internet tend to repeat predefined chunks as necessary,
                        making this the first true generator on the Internet.
                        It uses a dictionary of over 200 Latin words, combined with
                    </Text>
                </Box>
            </Box>


            {/* Upsell Section */}
            <UpsellSection
                title="Product card/specify how many 
                      number of card to show and the columns"
                products={products}
                columns={[3, 3, 3]}
                numOfProductsToShow={4}
            />



            {/* Comparison table */}
            <Box
                maxW="7xl"
                textAlign={'center'}
                mx="auto"
                p={1}
                borderWidth={1}
                rounded="md"
                color={"white"}
                shadow={'lg'}
                mt={10}
            >
                <ProductComparisonTable
                    products={ProductsCustom}
                    features={features}
                />
            </Box>


            {/* Product rating data */}
            <Box maxW="xl" mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <ProductRatingsAndReviews
                    product={ProductRatingData}
                    reviews={reviews}
                />
            </Box>

            {/* Product review */}
            <Box
                maxW="xl" mt={10}
                textAlign={'center'}
                mx="auto"
                p={6}
                borderWidth={1}
                rounded="md"
                shadow={'lg'}
            >
                <ProductReviews />
            </Box>


            {/* Product filter */}
            <Box>
                <ProductFilters
                    products={ProductFiltersData}
                    categories={["All", "Category A", "Category B", "Category C"]}
                    onCategoryChange={(category) => console.log(`Selected category: ${category}`)}
                    onPriceChange={(priceRange) => console.log(`Selected price range: ${priceRange}`)}
                />
                {/* Display product list here */}
            </Box>


            {/* Product sorting data */}
            <Box shadow={'lg'} maxW="xl" mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <ProductSorting
                    options={ProductSortingOptionsData}
                    selectedOption={selectedOption}
                    onChange={handleSortingChange}
                />
                {/* Render your product list here */}
            </Box>


            {/* Breadcumbers */}
            <Box shadow={'lg'} maxW="4xl" mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <Breadcrumbs
                    items={BreadcumberData}
                />
            </Box>


            {/* Pagination */}
            <Box>
                {/* Render content for the current page */}
                {/* ... */}

                {/* Render the Pagination component */}
                <PaginationNew currentPage={currentPage} totalPages={10} onPageChange={handlePageChange} />
            </Box>


            {/* Back Top */}
            <BackToTopButton />

            {/* Social Proof section */}
            <Box
                p={8}
                shadow={'lg'}
                maxW="4xl"
                mt={10}
                textAlign={'center'}
                mx="auto"
                borderWidth={1}
                rounded="md"
            >
                {socialProofData.map((data, index) => (
                    <SocialProofSection
                        key={index}
                        heading={`${data.name}, ${data.title}`}
                        text={data.quote}
                        imageSrc={data.image}
                    />
                ))}
            </Box>


            {/* Product Filter */}
            <Box
                p={8}
                shadow={'lg'}
                maxW="2xl"
                mt={10}
                textAlign={'center'}
                mx="auto"
                borderWidth={1}
                rounded="md"
            >
                <Heading>Product Filter</Heading>
                {filtersData.map((Filterdata, index) => (
                    <ProductFilters filters={filtersData} selectedFilters={selectedFilters} onChange={handleFilterChange} />
                ))}
            </Box>


            {/* Trust Badges */}
            <Box maxW="2xl" shadow={'lg'} mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                {TrustBadgesData.slice(0, 3).map((trusData, index) => (
                    <TrustBadges
                        key={index}
                        badges={TrustBadgesData}
                    />
                ))}
            </Box>

            {/* Shipping and Payment */}
            <Box maxW="xl" shadow={'lg'} mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <ShippingAndPaymentIcons
                    icons={shippingAndPaymentData}
                />
            </Box>

            {/* Vertical Slider Card One */}
            <Box maxW="4xl" mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <VerticalSliderCardOne
                    cards={VerticalSliderCardOneData}
                />
            </Box>



            {/* Vertical Slider Card two */}
            <Box maxW="4xl" mt={10} textAlign={'center'} mx="auto" p={6} borderWidth={1} rounded="md">
                <VerticalSliderCardTwo
                    data={CardVerticalTwoData}
                    slides={CardVerticalTwoData}
                    slidesToShow={2}
                    slidesToScroll={1}
                    autoplaySpeed={3000}
                />
            </Box>


            {/* Vertical Slider Card three */}
            <Box maxW="2xl" mt={10} mx="auto" borderWidth={1} rounded="md">
                <VerticalSliderCardThree
                    data={VerticalSliderCardThreeData}
                    slidesToShow={2}
                    slidesToScroll={1}
                    autoplaySpeed={5000}
                />
            </Box>

            {/* Horizontal card  */}
            <Box maxW="7xl" mt={10} mx="auto" p={6} borderWidth={1} rounded="md">
                <HorizontalSliderCard
                    data={HorizontalCardData}
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplaySpeed={5000}
                />
            </Box>

            {/* Sticky footer */}
            <StickyFooter
                bgColor={'black'}
                fontSize={14}
                bgTextColor={'white'}
            >
                {/* Content goes here */}
                Sticky footer
            </StickyFooter>
        </Box>
    )
}

export default TestPageTwo
