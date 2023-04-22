import { useState } from 'react';
import {
    Box,
    Flex,
    GridItem,
    IconButton,
    Stack,
    useColorModeValue,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DropdownMenu from '../DropdownMenu'
import SocialMedia from '../socialIcons/SocialMediaIcons';
import CTAButton from '../../common/CTAButton';
import NewsletterPopup from '../../common/NewsletterPopup';

const Navibar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.800');


    const menuItems = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Contact', href: '#' },
    ];

    const [activeItem, setActiveItem] = useState(menuItems[0].label);

    // Newsletter PopUp
    const [email, setEmail] = useState("");

    //Newsletter Popup
    const handleSubmitNewsletter = async (submittedEmail) => {
        // handle submitting the email to the server
        console.log(`Submitting email ${submittedEmail}`);
        // clear the email input
        setEmail("");
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            bg={backgroundColor}
            color="white"
            px={{ base: 4, md: 16 }}
            py={{ base: 2, md: 3 }}
        >
            <Box display={{ base: 'block', md: 'none' }}>
                <IconButton
                    onClick={onToggle}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    variant="ghost"
                    size="md"
                    aria-label="Toggle Navigation"
                />
            </Box>
            <Box display={{ base: 'none', md: 'block' }}>
                <Box maxW="xs" textAlign={'center'} justify="space-around" mx="auto" p={1} borderWidth={1} rounded="md">
                    <NewsletterPopup
                        onSubmit={handleSubmitNewsletter}
                        placeholder="Enter your email"
                        buttonText="Subscribe for news"
                    />
                </Box>
                {/* <Stack direction="row" spacing={4}>
                    {menuItems.map((item) => (
                        <Box
                            key={item.label}
                            as="button"
                            color={item.label === activeItem ? 'teal.500' : 'white'}
                            onClick={() => setActiveItem(item.label)}
                        >
                            {item.label}
                        </Box>
                    ))}
                </Stack> */}
            </Box>
            <Box
                display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
                mt={{ base: 2, md: 0 }}
                ml={{ md: 4 }}
            >
                <Stack
                    spacing={4}
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-end']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 0, 0]}
                >
                    {/* {menuItems.map((item) => (
                        <Box
                            key={item.label}
                            as="button"
                            color={item.label === activeItem ? 'teal.500' : 'gray.300'}
                            onClick={() => setActiveItem(item.label)}
                        >
                            {item.label}
                        </Box>
                    ))} */}
                    <SocialMedia />
                    <GridItem
                        zIndex={1200}
                    >
                        <DropdownMenu />
                    </GridItem>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Navibar;
