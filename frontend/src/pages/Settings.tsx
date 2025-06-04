import React, { useState, useRef } from "react";
import {
  Theme,
  Container,
  Heading,
  Box,
  Text,
  Button,
  Avatar,
  Flex,
  Card,
} from "@radix-ui/themes";
import styled from "styled-components";
import { UploadIcon } from "@radix-ui/react-icons";
import { useAuth } from "../context/AuthContext";

// Mock API functions for now - these should be defined in the actual API service
const updateUserProfile = async (data: any) => {
  // TODO: Implement actual API call
  console.log("Updating profile:", data);
  return { success: true };
};

const uploadProfilePhoto = async (file: File) => {
  // TODO: Implement actual API call
  console.log("Uploading photo:", file);
  return { success: true, photo_url: "/mock-photo-url" };
};

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  photo_url?: string;
  message?: string;
}

const StyledCard = styled(Card)`
  background: var(--color-background);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-12);
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--gray-7);
  border-radius: 4px;
  font-size: 0.875rem;
  background: var(--color-background);
  color: var(--gray-12);

  &:focus {
    outline: none;
    border-color: var(--accent-8);
    box-shadow: 0 0 0 2px var(--accent-4);
  }
`;

const PhotoUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      await updateUserProfile(profileData);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage("Failed to update profile");
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
        setMessage("Photo uploaded successfully");
      } catch (error) {
        setMessage("Failed to upload photo");
      }
    }
  };

  return (
    <Theme data-oid="n4-o-sd">
      <Container size="4" data-oid="s6n9v3t">
        <Flex direction="column" gap="6" py="6" data-oid="zvvqhuk">
          <Heading data-oid="ziajlwm">Profile Settings</Heading>

          <StyledCard data-oid="9x:130v">
            <Flex direction="column" gap="6" data-oid="zpu4wby">
              <Flex gap="6" align="start" data-oid="zuty09d">
                <PhotoUploadContainer data-oid="pk3r9ia">
                  <Avatar
                    size="8"
                    fallback={user?.name?.charAt(0) || "U"}
                    src={user?.photo_url}
                    data-oid="4udltf0"
                  />

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="2"
                    variant="outline"
                    data-oid="d8h1lsa"
                  >
                    <UploadIcon data-oid="pq6:z33" />
                    Upload Photo
                  </Button>
                  <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    data-oid="4s278mf"
                  />
                </PhotoUploadContainer>

                <Flex
                  direction="column"
                  gap="4"
                  style={{ flex: 1 }}
                  data-oid="bslykxs"
                >
                  <FormGroup data-oid="02q8h-j">
                    <FormLabel htmlFor="name" data-oid="9hfz1s5">
                      Name
                    </FormLabel>
                    <FormInput
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      data-oid="phw:zfo"
                    />
                  </FormGroup>

                  <FormGroup data-oid="t-97_w4">
                    <FormLabel htmlFor="email" data-oid="smij95f">
                      Email
                    </FormLabel>
                    <FormInput
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      data-oid="qrtchbm"
                    />
                  </FormGroup>

                  <Button
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                    style={{ alignSelf: "flex-start" }}
                    data-oid="wn-hk9z"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>

                  {message && (
                    <Text
                      size="2"
                      color={message.includes("success") ? "green" : "red"}
                      data-oid="qi4955x"
                    >
                      {message}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </StyledCard>

          <StyledCard data-oid="mcp74-3">
            <Flex direction="column" gap="4" data-oid="rnln21r">
              <Heading size="4" data-oid="3f-f-:r">
                Preferences
              </Heading>
              <Text color="gray" data-oid="0rm5xuz">
                Additional preferences and settings can be configured here in
                future updates.
              </Text>
            </Flex>
          </StyledCard>
        </Flex>
      </Container>
    </Theme>
  );
};

export default Settings;
