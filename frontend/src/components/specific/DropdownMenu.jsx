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
} from "@chakra-ui/react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

const DropdownMenu = () => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Icon as={FaUser} />}
                variant="outline"
                size="sm"
            />
            <MenuList>
                <MenuGroup title="Profile">
                    <MenuItem>
                        <Icon as={FaUser} mr="2" />
                        <Text>My Account</Text>
                    </MenuItem>
                    <MenuItem>
                        <Icon as={FaCog} mr="2" />
                        <Text>Settings</Text>
                    </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem>
                    <Icon as={FaSignOutAlt} mr="2" />
                    <Text>Sign out</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default DropdownMenu;
