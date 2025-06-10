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
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import type { UserProfile } from "../config/oauth";
import { useEffect } from "react";

export default function Account() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    let userProfile: UserProfile | null = null;

    if (token) {
      try {
        userProfile = jwtDecode<UserProfile>(token);
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/login");
  };

  const token = localStorage.getItem("auth_token");
  let userProfile: UserProfile | null = null;

  if (token) {
    try {
      userProfile = jwtDecode<UserProfile>(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  if (!userProfile) {
    return null;
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>
            Account Settings
          </Heading>
          <Text color="gray.600">
            Manage your profile and account preferences
          </Text>
        </Box>

        <Divider />

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor="gray.100"
        >
          <VStack spacing={4} align="stretch">
            <HStack spacing={4}>
              <Avatar
                size="xl"
                name={userProfile.name}
                src={userProfile.picture}
              />

              <VStack align="start" spacing={1}>
                <Heading size="md">
                  {userProfile.name}
                </Heading>
                <Text color="gray.600">
                  {userProfile.email}
                </Text>
              </VStack>
            </HStack>

            <Divider />

            <Button
              colorScheme="red"
              variant="outline"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
