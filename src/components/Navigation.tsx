import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useColorMode,
  Avatar,
  Link,
  Stack,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  SunIcon,
  MoonIcon,
  SettingsIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  FiHome,
  FiDollarSign,
  FiPieChart,
  FiSettings,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const activeColor = useColorModeValue("teal.500", "teal.200");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Tooltip label={item.name} placement="bottom" data-oid="-fr08:-">
      <Link
        as={RouterLink}
        to={item.path}
        p={2}
        px={4}
        rounded="full"
        display="flex"
        alignItems="center"
        bg={isActive ? bgColor : "transparent"}
        color={isActive ? activeColor : undefined}
        _hover={{
          textDecoration: "none",
          color: activeColor,
          bg: hoverBg,
          transform: "translateY(-2px)",
        }}
        transition="all 0.2s"
        data-oid=":fefh.v"
      >
        <Box as={item.icon} mr={2} data-oid="8twvdez" />
        {item.name}
      </Link>
    </Tooltip>
  );
};

const Navigation: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Move all useColorModeValue calls to the top
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const iconColor = useColorModeValue("gray.600", "gray.300");
  const navBgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)",
  );
  const logoColor = useColorModeValue("teal.600", "teal.200");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  // Don't show navigation on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", icon: FiHome, path: "/" },
    { name: "Transactions", icon: FiDollarSign, path: "/transactions" },
    { name: "Reports", icon: FiPieChart, path: "/reports" },
    { name: "Categories", icon: FiFileText, path: "/categories" },
  ];

  return (
    <Box
      bg={bgColor}
      px={6}
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="100%"
      zIndex={100}
      borderBottom="1px"
      borderColor={borderColor}
      h="16"
      backdropFilter="blur(10px)"
      backgroundColor={navBgColor}
      data-oid="940ygt5"
    >
      <Flex
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        data-oid="qmt7-fg"
      >
        <HStack spacing={8} alignItems="center" data-oid="ve:tyia">
          <Link
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
            data-oid="rn.64lm"
          >
            <Image
              src="/logo.svg"
              alt="Yene Birr"
              h="40px"
              mr={2}
              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23319795'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='white' font-family='Arial' font-size='16' font-weight='bold'%3EYB%3C/text%3E%3C/svg%3E"
              data-oid="yxadi7_"
            />

            <Box
              fontSize="xl"
              fontWeight="bold"
              color={logoColor}
              data-oid="hcd9-ho"
            >
              Yene Birr
            </Box>
          </Link>

          {isAuthenticated && (
            <HStack
              as="nav"
              spacing={2}
              display={{ base: "none", md: "flex" }}
              data-oid="4xaixf7"
            >
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  data-oid="8pnxajw"
                />
              ))}
            </HStack>
          )}
        </HStack>

        <HStack spacing={4} data-oid="qze:oum">
          <IconButton
            icon={
              colorMode === "light" ? (
                <MoonIcon data-oid="3w4ojsi" />
              ) : (
                <SunIcon data-oid="5cluzw7" />
              )
            }
            onClick={toggleColorMode}
            aria-label="Toggle Color Mode"
            variant="ghost"
            rounded="full"
            _hover={{
              transform: "translateY(-2px)",
              bg: hoverBg,
            }}
            transition="all 0.2s"
            data-oid="2nvi_p2"
          />

          {isAuthenticated && (
            <>
              <Tooltip label="Settings" data-oid="nwr0-:i">
                <IconButton
                  as={RouterLink}
                  to="/settings"
                  icon={<FiSettings data-oid="80bj6-w" />}
                  aria-label="Settings"
                  variant="ghost"
                  rounded="full"
                  _hover={{
                    transform: "translateY(-2px)",
                    bg: hoverBg,
                  }}
                  transition="all 0.2s"
                  data-oid="i1kbx.."
                />
              </Tooltip>

              <Menu data-oid="u_4_-b2">
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  _hover={{
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                  data-oid=":x.ks5f"
                >
                  <Avatar
                    size="sm"
                    name={user?.name}
                    src={user?.photo_url}
                    data-oid="mtue.f8"
                  />
                </MenuButton>
                <MenuList rounded="xl" shadow="lg" data-oid="yk7pqde">
                  <MenuItem
                    as={RouterLink}
                    to="/profile"
                    icon={<FiUser data-oid=".m:_nzi" />}
                    data-oid="dpl1_b0"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} data-oid="b_h8v_d">
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}

          {!isAuthenticated && (
            <HStack spacing={4} data-oid="i15lvo7">
              <Button
                as={RouterLink}
                to="/login"
                variant="ghost"
                rounded="full"
                _hover={{
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                data-oid="qyoky8p"
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="teal"
                rounded="full"
                _hover={{
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s"
                data-oid="so1hl_e"
              >
                Register
              </Button>
            </HStack>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navigation;
