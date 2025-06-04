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
    <Container maxW="container.lg" py={8} data-oid="28xvq79">
      <VStack spacing={8} align="stretch" data-oid="dpjh_0o">
        <Heading data-oid="c54rvow">Profile Settings</Heading>

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="1v11u7g"
        >
          <VStack spacing={6} align="stretch" data-oid="3a6rxef">
            <Divider data-oid="q4zzxkj" />

            <HStack spacing={8} data-oid="yn.hdv3">
              <VStack data-oid="1vi1:rb">
                <Avatar
                  size="2xl"
                  name={user?.name}
                  src={user?.photo_url}
                  data-oid="4n0eqls"
                />

                <Button
                  leftIcon={<FiUpload data-oid="nu875-x" />}
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  data-oid="4rl3mud"
                >
                  Upload Photo
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  data-oid="l0-c3vc"
                />
              </VStack>

              <VStack spacing={4} flex={1} data-oid="aps2z08">
                <FormControl data-oid="z35:w20">
                  <FormLabel data-oid="eyctq18">Name</FormLabel>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    data-oid="1lnap4o"
                  />
                </FormControl>

                <FormControl data-oid="j4uq82m">
                  <FormLabel data-oid="aa5.0om">Email</FormLabel>
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    data-oid="oov_hd8"
                  />
                </FormControl>

                <Button
                  colorScheme="teal"
                  alignSelf="flex-start"
                  onClick={handleProfileUpdate}
                  isLoading={isLoading}
                  data-oid="03w48x4"
                >
                  Save Changes
                </Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Divider data-oid="._yabmn" />

        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          shadow="md"
          data-oid="b0w-1b5"
        >
          <VStack spacing={4} align="stretch" data-oid="z35.w3y">
            <Heading size="md" data-oid="m0_y2nl">
              Preferences
            </Heading>
            <Text color="gray.500" data-oid="wwj3wsx">
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
