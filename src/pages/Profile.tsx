import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        name,
        photo_url: photoUrl,
      });

      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8} data-oid="-e87qst">
      <VStack spacing={8} align="stretch" data-oid="n_rp2_t">
        <Heading size="lg" data-oid="xvpk-3a">
          Profile Settings
        </Heading>

        <Box textAlign="center" data-oid="avv0-ox">
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.photo_url}
            mb={4}
            data-oid="gcb0j8x"
          />

          <Text fontSize="lg" fontWeight="medium" data-oid="hz9yvf5">
            {user?.email}
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit} data-oid="nccwro0">
          <VStack spacing={4} data-oid=":.feq05">
            <FormControl data-oid="iy1zq8b">
              <FormLabel data-oid="2d7k781">Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-oid="ytppl:s"
              />
            </FormControl>

            <FormControl data-oid="olifksh">
              <FormLabel data-oid="v25:.:2">Profile Photo URL</FormLabel>
              <Input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
                data-oid=".mv:z65"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              isLoading={isLoading}
              data-oid="ldskhzs"
            >
              Save Changes
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
