import { useState, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile, uploadProfilePhoto } from "../services/api";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  photo_url?: string;
  message?: string;
}

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      await updateUserProfile(profileData);
      toast({
        title: "Profile Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = (await uploadProfilePhoto(file)) as ApiResponse;
        // Update user context with new photo URL
        if (updateProfile && data.photo_url) {
          updateProfile({ photo_url: data.photo_url });
        }
        toast({
          title: "Photo uploaded",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to upload photo",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW="container.lg" py={8} data-oid="5g5gqxy">
      <VStack spacing={8} align="stretch" data-oid="3hyd7_a">
        <Heading data-oid="jog1a9w">Profile Settings</Heading>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="n:.5bao"
        >
          <VStack spacing={6} align="stretch" data-oid="1hqyr2i">
            <Divider data-oid="h_-kjt0" />

            <HStack spacing={8} data-oid="ak1joab">
              <VStack data-oid="5fdgksg">
                <Avatar
                  size="2xl"
                  name={user?.name}
                  src={user?.photo_url}
                  data-oid="b-_eyn7"
                />

                <Button
                  leftIcon={<FiUpload data-oid="sgeo-nn" />}
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  data-oid="esa5m8n"
                >
                  Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  data-oid="afugpq_"
                />
              </VStack>

              <VStack spacing={4} flex={1} data-oid="n:yqz4x">
                <FormControl data-oid="lvl6ot4">
                  <FormLabel data-oid="8wksloe">Name</FormLabel>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    data-oid="su7py.:"
                  />
                </FormControl>

                <FormControl data-oid="raql4fz">
                  <FormLabel data-oid="aaxnqo_">Email</FormLabel>
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    data-oid="o8zmajh"
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  alignSelf="flex-start"
                  onClick={handleProfileUpdate}
                  isLoading={isLoading}
                  data-oid="9y0i_m1"
                >
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Divider data-oid="qaegqe:" />

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="f_iu6sf"
        >
          <VStack spacing={4} align="stretch" data-oid="wiwpes:">
            <Heading size="md" data-oid="zn3ub_u">
              Preferences
            </Heading>
            <Text color="gray.500" data-oid="u2x-5t.">
              Additional preferences and settings can be configured here in
              future updates.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Settings;
