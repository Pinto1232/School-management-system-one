import { useState } from "react";
import {
    Box,
    Flex,
    Text,
    Stack,
    Link,
    useDisclosure,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const MegaMenu = ({ menuItems, additionalLinks }) => {
    console.log("Menu iitems links", menuItems);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => {
        setIsMobile(!isMobile);
        isOpen ? onClose() : onOpen();
    };

    return (
        <Box>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={{ base: "1rem", md: "2rem" }}
                bg="blue.500"
                color="white"
            >
                <Flex align="center" mr={5}>
                    <Text fontSize="xl" fontWeight="bold">
                        Logo
                    </Text>
                </Flex>

                <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
                    {isOpen ? (
                        <IconButton
                            aria-label="Close menu"
                            icon={<CloseIcon />}
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                        />
                    ) : (
                        <IconButton
                            aria-label="Open menu"
                            icon={<HamburgerIcon />}
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                        />
                    )}
                </Box>

                {/* Block of code for other links are here */}
                {menuItems &&
                    menuItems.map((menuItem) => (
                        <Box
                            as="li"
                            key={menuItem.title}
                            px={4}
                            py={{ base: 2, md: 0 }}
                            _hover={{ bg: "blue.400" }}
                            mr={{ base: 0, md: 4 }}
                            mb={{ base: 4, md: 0 }}
                        >
                            <Link
                                href={menuItem.href}
                                fontSize={{ base: "md", md: "lg" }}
                                color="white"
                                _hover={{ color: "blue.300" }}
                            >
                                {menuItem.title}
                            </Link>
                            {menuItem.subMenu && (
                                <Box
                                    as="ul"
                                    listStyleType="none"
                                    ml={0}
                                    pl={4}
                                    mt={2}
                                    color="white"
                                >
                                    {menuItem.subMenu.map((subMenuItem) => (
                                        <Box as="li" key={subMenuItem.title}>
                                            <Link href="#" _hover={{ color: "blue.300" }}>
                                                {subMenuItem.title}
                                            </Link>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))}
                {/* Ends here */}

                <Box display={{ base: "none", md: "block" }}>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<CloseIcon />}
                            size="sm"
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                        >
                            More
                        </MenuButton>
                        <MenuList bg="blue.500" color="white">
                            {menuItems &&
                                menuItems.map((menuItem) => (
                                    <MenuItem key={menuItem.label} _hover={{ bg: "blue.400" }}>
                                        <Link href={menuItem.href}>{menuItem.title}</Link>
                                    </MenuItem>
                                ))}
                            {additionalLinks && (
                                <Box>
                                    <MenuDivider />
                                    {additionalLinks.map((link) => (
                                        <MenuItem key={link.label} _hover={{ bg: "blue.400" }}>
                                            {<Link href={link.href}>{link.title}</Link>}
                                        </MenuItem>
                                    ))}
                                </Box>
                            )}
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>

            {/* Additional links */}
            {additionalLinks && (
                <Flex
                    as="nav"
                    align="center"
                    justify="flex-end"
                    wrap="wrap"
                    padding={{ base: "1rem", md: "2rem" }}
                    bg="blue.500"
                    color="white"
                >
                    <Flex
                        as="ul"
                        listStyleType="none"
                        align="center"
                        justify="flex-end"
                        mt={{ base: 4, md: 0 }}
                        w={{ base: "full", md: "auto" }}
                    >
                        {additionalLinks.map((link) => (
                            <Box as="li" key={link.label} px={4}>
                                <Link href={link.href} fontSize={{ base: "md", md: "lg" }}>
                                    {link.label}
                                </Link>
                            </Box>
                        ))}
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};

export default MegaMenu;
