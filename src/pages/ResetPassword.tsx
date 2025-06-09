import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to reset password",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
      >
        <VStack spacing={8}>
          <Heading size="lg">Reset Password</Heading>
          {success ? (
            <Text color="teal.500" fontWeight="semibold" textAlign="center">
              Password reset successful!<br />Redirecting to login...
            </Text>
          ) : (
            <Box w="100%" as="form" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    size="lg"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    size="lg"
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  width="100%"
                  isLoading={isLoading}
                >
                  Reset Password
                </Button>
              </VStack>
            </Box>
          )}
          <Text fontSize="md">
            <RouterLink to="/login" style={{ color: "#319795", fontWeight: 600 }}>
              Back to Login
            </RouterLink>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPassword; 