import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    IconButton,
    Icon,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const DropdownMenu = () => {
    const dropdownBg = useColorModeValue('#319795', '#3182ce')
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FaUser} />}
                variant="outline" 
                size="sm"
                bg={dropdownBg}
                zIndex={2000}
            />
            <MenuList bg={dropdownBg}>
                <MenuGroup bg={dropdownBg} title="Profile">
                    <MenuItem bg={dropdownBg}>
                        <Icon as={FaUser} mr="2" />
                        <Text>My Account</Text>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem bg={dropdownBg}>
                        <Icon as={FaCog} mr="2" />
                        <Text>Settings</Text>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem bg={dropdownBg}>
                    <Icon as={FaSignOutAlt} mr="2" />
                    <Text>Sign out</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default DropdownMenu;
