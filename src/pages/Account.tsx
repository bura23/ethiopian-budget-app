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
    <Container maxW="container.md" py={8} data-oid="6a1oyio">
      <VStack spacing={6} align="stretch" data-oid="n.aoe0j">
        <Box data-oid="u77b17:">
          <Heading size="lg" mb={2} data-oid="n_5329f">
            Account Settings
          </Heading>
          <Text color="gray.600" data-oid="v47g9xb">
            Manage your profile and account preferences
          </Text>
        </Box>

        <Divider data-oid="t0.4ufx" />

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
          data-oid="lssk-hp"
        >
          <VStack spacing={4} align="stretch" data-oid="ia2ma5v">
            <HStack spacing={4} data-oid="dsjo-g8">
              <Avatar
                size="xl"
                name={userProfile.name}
                src={userProfile.picture}
                data-oid="pwbf:4d"
              />

              <VStack align="start" spacing={1} data-oid="34kgtu:">
                <Heading size="md" data-oid="agtlj1o">
                  {userProfile.name}
                </Heading>
                <Text color="gray.600" data-oid=".ka96tb">
                  {userProfile.email}
                </Text>
              </VStack>
            </HStack>

            <Divider data-oid="4jzfqmg" />

            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
              data-oid="kgc5:tr"
            >
              Sign Out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
