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
import { Link as RouterLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send reset email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email",
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
          <Heading size="lg">Forgot Password</Heading>
          {success ? (
            <Text color="teal.500" fontWeight="semibold" textAlign="center">
              If an account with that email exists, a reset link has been sent.<br />
              Please check your email.
            </Text>
          ) : (
            <Box w="100%" as="form" onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
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
                  Send Reset Link
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

export default ForgotPassword; 