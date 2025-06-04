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
    <Container maxW="container.sm" py={8} data-oid="5mmda6g">
      <VStack spacing={8} align="stretch" data-oid="1mo2v:6">
        <Heading size="lg" data-oid="okdaglo">
          Profile Settings
        </Heading>

        <Box textAlign="center" data-oid="6:wbobx">
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.photo_url}
            mb={4}
            data-oid="29aphdr"
          />

          <Text fontSize="lg" fontWeight="medium" data-oid="az.qx4w">
            {user?.email}
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit} data-oid="52krxby">
          <VStack spacing={4} data-oid="k:sc5wk">
            <FormControl data-oid="kcsn6vt">
              <FormLabel data-oid="8nd:pjx">Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                data-oid="u_z7dve"
              />
            </FormControl>

            <FormControl data-oid="dey5y8k">
              <FormLabel data-oid="oak:jyd">Profile Photo URL</FormLabel>
              <Input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter photo URL"
                data-oid="ravnnut"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              width="100%"
              isLoading={isLoading}
              data-oid="_umw6f-"
            >
              Save Changes
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
