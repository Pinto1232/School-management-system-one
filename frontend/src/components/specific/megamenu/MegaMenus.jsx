import { Box, Button, Flex, Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MegaMenu } from "primereact/megamenu";
import megamenudata from '../../../data/MegamenuData'


const MegaMenus = ({ megamenudata, orientation, style }) => {
    const [visible, setVisible] = useState(false);
    console.log("Menu", megamenudata);

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <>
            <Box
                as="nav"
                bg="gray.900"
                px={{ base: 4, md: 8 }}
                py={{ base: 2, md: 4 }}
                shadow="md"
                color="white"
            >
                <Flex justify="space-between">
                    <Box>
                        <Menu>
                            <MenuButton
                                as={Button}
                                size="sm"
                                variant="ghost"
                                colorScheme="whiteAlpha"
                                onClick={handleClick}
                                _hover={{ bgColor: "transparent" }}
                                _focus={{ outline: "none" }}
                            >
                                <Icon color={'#fff'} as={FaBars} boxSize={6} />
                            </MenuButton>
                            <MenuList width={'600px'}>
                                {Array.isArray(megamenudata) && megamenudata.length > 0
                                    ? megamenudata.map((item) =>
                                        item && item.label ? (
                                            <MenuGroup title={item.label} key={item.label} fontWeight="bold">
                                                {item.items && Array.isArray(item.items)
                                                    ? item.items.map((subsubitem) =>
                                                        subsubitem && subsubitem.label ? (
                                                            <MenuItem key={subsubitem.label}>{subsubitem.label}</MenuItem>
                                                        ) : null
                                                    )
                                                    : null}
                                            </MenuGroup>
                                        ) : null
                                    )
                                    : null}
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton
                                as={Button}
                                size="sm"
                                variant="ghost"
                                colorScheme="whiteAlpha"
                                onClick={handleClick}
                                _hover={{ bgColor: "transparent" }}
                                _focus={{ outline: "none" }}
                                color={'#fff'}
                            >
                               About 
                            </MenuButton>
                            <MenuList width={'800px'}>
                                {Array.isArray(megamenudata) && megamenudata.length > 0
                                    ? megamenudata.map((item) =>
                                        item && item.label ? (
                                            <MenuGroup title={item.label} key={item.label} fontWeight="bold">
                                                {item.items && Array.isArray(item.items)
                                                    ? item.items.map((subsubitem) =>
                                                        subsubitem && subsubitem.label ? (
                                                            <MenuItem key={subsubitem.label}>{subsubitem.label}</MenuItem>
                                                        ) : null
                                                    )
                                                    : null}
                                            </MenuGroup>
                                        ) : null
                                    )
                                    : null}
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton
                                as={Button}
                                size="sm"
                                variant="ghost"
                                colorScheme="whiteAlpha"
                                onClick={handleClick}
                                _hover={{ bgColor: "transparent" }}
                                _focus={{ outline: "none" }}
                                color={'#fff'}
                            >
                               Shop
                            </MenuButton>
                            <MenuList width={'600px'}>
                                {Array.isArray(megamenudata) && megamenudata.length > 0
                                    ? megamenudata.map((item) =>
                                        item && item.label ? (
                                            <MenuGroup title={item.label} key={item.label} fontWeight="bold">
                                                {item.items && Array.isArray(item.items)
                                                    ? item.items.map((subsubitem) =>
                                                        subsubitem && subsubitem.label ? (
                                                            <MenuItem key={subsubitem.label}>{subsubitem.label}</MenuItem>
                                                        ) : null
                                                    )
                                                    : null}
                                            </MenuGroup>
                                        ) : null
                                    )
                                    : null}
                            </MenuList>
                        </Menu>

                        <Menu>
                            <MenuButton
                                as={Button}
                                size="sm"
                                variant="ghost"
                                colorScheme="whiteAlpha"
                                onClick={handleClick}
                                _hover={{ bgColor: "transparent" }}
                                _focus={{ outline: "none" }}
                                color={'#fff'}
                            >
                               FAqs
                            </MenuButton>
                            <MenuList width={'600px'}>
                                {Array.isArray(megamenudata) && megamenudata.length > 0
                                    ? megamenudata.map((item) =>
                                        item && item.label ? (
                                            <MenuGroup title={item.label} key={item.label} fontWeight="bold">
                                                {item.items && Array.isArray(item.items)
                                                    ? item.items.map((subsubitem) =>
                                                        subsubitem && subsubitem.label ? (
                                                            <MenuItem key={subsubitem.label}>{subsubitem.label}</MenuItem>
                                                        ) : null
                                                    )
                                                    : null}
                                            </MenuGroup>
                                        ) : null
                                    )
                                    : null}
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default MegaMenus;
