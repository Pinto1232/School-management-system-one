import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const NavbarDropdown = () => {
  const [show, setShow] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "FAQs", href: "/faqs" },
  ];

  const dropdownMenuItems = [
    { label: "Dropdown Item 1", href: "#" },
    { label: "Dropdown Item 2", href: "#" },
    { label: "Dropdown Item 3", href: "#" },
  ];

  return (
    <Box bg="gray.900" colorScheme="whiteAlpha" py={4}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        maxW="1200px"
        mx="auto"
      >
        <Box>
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              onClick={() => setShow(!show)}
              variant="outline"
              colorScheme="whiteAlpha"
              aria-label="Toggle navigation"
              icon={<HamburgerIcon />}
            />
          </Box>
          <Box color={'white'} display={{ base: "none", md: "block" }}>
            {menuItems.map((item, index) => (
              <Box key={index} as="span" mx={4}>
                <a href={item.href}>{item.label}</a>
              </Box>
            ))}
          </Box>
        </Box>
        {isMobile && (
          <Menu isOpen={show} onClose={() => setShow(false)}>
            <MenuButton
              as={IconButton}
              variant="outline"
              colorScheme="whiteAlpha"
              aria-label="Options"
              icon={<HamburgerIcon />}
            />
            <MenuList>
              {dropdownMenuItems.map((item, index) => (
                <MenuItem key={index}>{item.label}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default NavbarDropdown;
