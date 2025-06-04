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
    <Container maxW="container.md" py={8} data-oid="4a5dyg2">
      <VStack spacing={6} align="stretch" data-oid="xtiwmdu">
        <Box data-oid="6zsluav">
          <Heading size="lg" mb={2} data-oid="hvraayn">
            Account Settings
          </Heading>
          <Text color="gray.600" data-oid="b8z33-1">
            Manage your profile and account preferences
          </Text>
        </Box>

        <Divider data-oid="6w2tjxi" />

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
          data-oid="if7fk.f"
        >
          <VStack spacing={4} align="stretch" data-oid="32c-jd0">
            <HStack spacing={4} data-oid="ws63xwa">
              <Avatar
                size="xl"
                name={userProfile.name}
                src={userProfile.picture}
                data-oid="180b_zm"
              />

              <VStack align="start" spacing={1} data-oid="ucywqrz">
                <Heading size="md" data-oid="l46nuo:">
                  {userProfile.name}
                </Heading>
                <Text color="gray.600" data-oid="yqdfqoc">
                  {userProfile.email}
                </Text>
              </VStack>
            </HStack>

            <Divider data-oid="7wz5r.o" />

            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              data-oid="qsyu90:"
            >
              Sign Out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
