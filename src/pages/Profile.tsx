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
    <Container maxW="container.sm" py={8} data-oid="t0kzhr3">
      <VStack spacing={8} align="stretch" data-oid="r--v-wi">
        <Heading size="lg" data-oid="ashgsom">
          Profile Settings
        </Heading>

        <Box textAlign="center" data-oid="4fzk4ys">
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.photo_url}
            mb={4}
            data-oid="ol39a6h"
          />

          <Text fontSize="lg" fontWeight="medium" data-oid="ejnvzw-">
            {user?.email}
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit} data-oid="tpodqe-">
          <VStack spacing={4} data-oid="ple7avp">
            <FormControl data-oid="ts_49eo">
              <FormLabel data-oid="u_9q7gq">Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-oid="2ylxf:g"
              />
            </FormControl>

            <FormControl data-oid="lx5nes_">
              <FormLabel data-oid="dsgqj8a">Profile Photo URL</FormLabel>
              <Input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
                data-oid="9cz2mxs"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              isLoading={isLoading}
              data-oid="mlsbooc"
            >
              Save Changes
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
