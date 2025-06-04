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
    <Container maxW="container.lg" py={8} data-oid=".-fbt6t">
      <VStack spacing={8} align="stretch" data-oid=":-59:vl">
        <Heading data-oid="4h6jhqh">Profile Settings</Heading>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="l8ve9y_"
        >
          <VStack spacing={6} align="stretch" data-oid="vjn5dj9">
            <Divider data-oid=".nwqski" />

            <HStack spacing={8} data-oid="g4xpzvk">
              <VStack data-oid="i069ake">
                <Avatar
                  size="2xl"
                  name={user?.name}
                  src={user?.photo_url}
                  data-oid="qto5..."
                />

                <Button
                  leftIcon={<FiUpload data-oid="d9:8oj4" />}
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  data-oid="zfhmk1i"
                >
                  Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  data-oid="ic700-."
                />
              </VStack>

              <VStack spacing={4} flex={1} data-oid="i0g_v7x">
                <FormControl data-oid="or-fyih">
                  <FormLabel data-oid="sxs0n8s">Name</FormLabel>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    data-oid="0_pm4wn"
                  />
                </FormControl>

                <FormControl data-oid="m:0e_ya">
                  <FormLabel data-oid=":sju6_6">Email</FormLabel>
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    data-oid="ezq6mvz"
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  alignSelf="flex-start"
                  onClick={handleProfileUpdate}
                  isLoading={isLoading}
                  data-oid="1u9cla:"
                >
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Divider data-oid="xbovfq9" />

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="wb6r78."
        >
          <VStack spacing={4} align="stretch" data-oid="_evfzoq">
            <Heading size="md" data-oid="6:.-f2u">
              Preferences
            </Heading>
            <Text color="gray.500" data-oid="l3i7g1h">
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
