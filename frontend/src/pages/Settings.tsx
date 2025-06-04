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
    <Theme data-oid="dfb:zq.">
      <Container size="4" data-oid="lwczq80">
        <Flex direction="column" gap="6" py="6" data-oid="2_zzr.h">
          <Heading data-oid="daux31-">Profile Settings</Heading>

          <StyledCard data-oid="g259p5f">
            <Flex direction="column" gap="6" data-oid="5_mdd_8">
              <Flex gap="6" align="start" data-oid="hixi6wd">
                <PhotoUploadContainer data-oid="mg-uke5">
                  <Avatar
                    size="8"
                    fallback={user?.name?.charAt(0) || "U"}
                    src={user?.photo_url}
                    data-oid="7adfxnf"
                  />

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="2"
                    variant="outline"
                    data-oid="-k54lt3"
                  >
                    <UploadIcon data-oid="wyf5d8n" />
                    Upload Photo
                  </Button>
                  <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    data-oid="nh3a12q"
                  />
                </PhotoUploadContainer>

                <Flex
                  direction="column"
                  gap="4"
                  style={{ flex: 1 }}
                  data-oid="38x4-:."
                >
                  <FormGroup data-oid="l4h:fny">
                    <FormLabel htmlFor="name" data-oid="m7_dto9">
                      Name
                    </FormLabel>
                    <FormInput
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      data-oid="gy.pyet"
                    />
                  </FormGroup>

                  <FormGroup data-oid="zb.sspg">
                    <FormLabel htmlFor="email" data-oid="i16f3xd">
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
                      data-oid="-goexi-"
                    />
                  </FormGroup>

                  <Button
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                    style={{ alignSelf: "flex-start" }}
                    data-oid="8o6:q2y"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>

                  {message && (
                    <Text
                      size="2"
                      color={message.includes("success") ? "green" : "red"}
                      data-oid="lf622a2"
                    >
                      {message}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </StyledCard>

          <StyledCard data-oid="t-e3ii9">
            <Flex direction="column" gap="4" data-oid="7.d8uti">
              <Heading size="4" data-oid="-cygqih">
                Preferences
              </Heading>
              <Text color="gray" data-oid=":plba7h">
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
