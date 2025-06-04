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
    <Theme data-oid=".5wmclj">
      <Container size="4" data-oid="-pqq5gb">
        <Flex direction="column" gap="6" py="6" data-oid="189:yvt">
          <Heading data-oid="ll2rsed">Profile Settings</Heading>

          <StyledCard data-oid="6.t4um6">
            <Flex direction="column" gap="6" data-oid="t4be7vh">
              <Flex gap="6" align="start" data-oid="v:.8h8d">
                <PhotoUploadContainer data-oid="_ji0o_h">
                  <Avatar
                    size="8"
                    fallback={user?.name?.charAt(0) || "U"}
                    src={user?.photo_url}
                    data-oid="u9v4u5:"
                  />

                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="2"
                    variant="outline"
                    data-oid="96t0u0q"
                  >
                    <UploadIcon data-oid="rdyzj72" />
                    Upload Photo
                  </Button>
                  <HiddenFileInput
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    data-oid="0ry2--o"
                  />
                </PhotoUploadContainer>

                <Flex
                  direction="column"
                  gap="4"
                  style={{ flex: 1 }}
                  data-oid="2798gt3"
                >
                  <FormGroup data-oid="v0erf70">
                    <FormLabel htmlFor="name" data-oid="ic:i0lo">
                      Name
                    </FormLabel>
                    <FormInput
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      data-oid="b9.r.r-"
                    />
                  </FormGroup>

                  <FormGroup data-oid="lu41_e8">
                    <FormLabel htmlFor="email" data-oid="z7ctpgh">
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
                      data-oid="6r1xe-2"
                    />
                  </FormGroup>

                  <Button
                    onClick={handleProfileUpdate}
                    disabled={isLoading}
                    style={{ alignSelf: "flex-start" }}
                    data-oid="3991832"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>

                  {message && (
                    <Text
                      size="2"
                      color={message.includes("success") ? "green" : "red"}
                      data-oid="ybkd:zn"
                    >
                      {message}
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </StyledCard>

          <StyledCard data-oid="5nhv5c4">
            <Flex direction="column" gap="4" data-oid="l--gjmp">
              <Heading size="4" data-oid="e39_rz8">
                Preferences
              </Heading>
              <Text color="gray" data-oid="nh20_k9">
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
