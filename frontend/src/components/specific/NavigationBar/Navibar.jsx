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
import NewsletterPopup from '../../common/NewsletterPopup';

const Navibar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const backgroundColor = useColorModeValue("#171923", "#2D3748");
    const textColor = useColorModeValue("gray.800", "white");;

    


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
            <Box display={{ base: 'none' }}>
                <IconButton
                    onClick={onToggle}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    variant="ghost"
                    size="md"
                    aria-label="Toggle Navigation"
                />
            </Box>


            <Box
                maxW={{ base: 'xs', md: 'sm' }}
                w={{ base: 'full', md: 'auto' }}
                textAlign={{ base: 'center', md: 'left' }}
                justify={{ base: 'space-around', md: 'space-between' }}
                mx={{ base: 'auto', md: 0 }}
                p={{ base: 1, md: 0 }}
                borderWidth={{ base: 1, md: 0 }}
                rounded={{ base: 'md', md: 'none' }}
                display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            >
                <NewsletterPopup
                    onSubmit={handleSubmitNewsletter}
                    placeholder="Enter your email"
                    buttonText="Subscribe for news"
                    
                />
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
                    {/* Social media component */}
                    <SocialMedia
                        display={{
                            base: 'none',
                            md: 'flex'
                        }}
                        size={20}
                        iconPadding={2}

                    />
                    {/* Drop menu component */}
                    <GridItem zIndex={1200}>
                        <DropdownMenu />
                    </GridItem>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Navibar;
