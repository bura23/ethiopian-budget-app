import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { UserProfile } from "../config/oauth";

export default function Account() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  let userProfile: UserProfile | null = null;

  if (token) {
    try {
      userProfile = jwtDecode<UserProfile>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  if (!userProfile) {
    navigate("/login");
    return null;
  }

  return (
    <Container maxW="container.md" py={8} data-oid="v::xwbi">
      <VStack spacing={6} align="stretch" data-oid=".cg9_6:">
        <Box data-oid="6-ehaxk">
          <Heading size="lg" mb={2} data-oid="ljjymu3">
            Account Settings
          </Heading>
          <Text color="gray.600" data-oid="z4.vrh.">
            Manage your profile and account preferences
          </Text>
        </Box>

        <Divider data-oid="jaftzgs" />

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
          data-oid="h0x8vsn"
        >
          <VStack spacing={4} align="stretch" data-oid="5rc-ecb">
            <HStack spacing={4} data-oid="m0:dkyu">
              <Avatar
                size="xl"
                name={userProfile.name}
                src={userProfile.picture}
                data-oid="4m4gvin"
              />

              <VStack align="start" spacing={1} data-oid="02-lx6_">
                <Heading size="md" data-oid="0iz.9k-">
                  {userProfile.name}
                </Heading>
                <Text color="gray.600" data-oid="d056o7h">
                  {userProfile.email}
                </Text>
              </VStack>
            </HStack>

            <Divider data-oid="4:22yoh" />

            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              data-oid="pt43fkb"
            >
              Sign Out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
