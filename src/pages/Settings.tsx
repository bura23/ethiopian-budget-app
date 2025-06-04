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
    <Container maxW="container.lg" py={8} data-oid="d.b1qjv">
      <VStack spacing={8} align="stretch" data-oid="s9knsk6">
        <Heading data-oid="1iwp.i-">Profile Settings</Heading>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="povw2su"
        >
          <VStack spacing={6} align="stretch" data-oid="g8hc.by">
            <Divider data-oid="7kpo_5:" />

            <HStack spacing={8} data-oid="jf.wmrz">
              <VStack data-oid="8oneur6">
                <Avatar
                  size="2xl"
                  name={user?.name}
                  src={user?.photo_url}
                  data-oid="xuq_jyn"
                />

                <Button
                  leftIcon={<FiUpload data-oid="w5z0c49" />}
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  data-oid="e_0ho9k"
                >
                  Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  data-oid="c57ctb:"
                />
              </VStack>

              <VStack spacing={4} flex={1} data-oid="j23j93v">
                <FormControl data-oid="8swh463">
                  <FormLabel data-oid="g6:-j3a">Name</FormLabel>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    data-oid="d2d6b3j"
                  />
                </FormControl>

                <FormControl data-oid="8yw-18e">
                  <FormLabel data-oid="va1k:g1">Email</FormLabel>
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    data-oid="70d1t4-"
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  alignSelf="flex-start"
                  onClick={handleProfileUpdate}
                  isLoading={isLoading}
                  data-oid="h4nftia"
                >
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Divider data-oid="weonf3-" />

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="qqzly2f"
        >
          <VStack spacing={4} align="stretch" data-oid="nd_:p4g">
            <Heading size="md" data-oid="03w-4-x">
              Preferences
            </Heading>
            <Text color="gray.500" data-oid="8e:tk4h">
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
