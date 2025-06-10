import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Container,
  Heading,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { auth } from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await auth.forgotPassword({ email });
      if (response.success) {
        setIsSuccess(true);
        toast({
          title: "Reset email sent",
          description: "Please check your email for password reset instructions",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(response.message || "Failed to send reset email");
      }
    } catch (err) {
      setError(err.message || "Failed to send reset email");
      toast({
        title: "Error",
        description: err.message || "Failed to send reset email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <Stack spacing="8">
          <Stack spacing="6" textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Check your email</Heading>
            <Text color="fg.muted">
              We've sent password reset instructions to your email address.
            </Text>
            <Link href="/login">
              <Text as="span" color="teal.500" cursor="pointer">
                Back to login
              </Text>
            </Link>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Forgot your password?</Heading>
            <Text color="fg.muted">
              Enter your email address and we'll send you instructions to reset your password.
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing="6">
              <FormControl isInvalid={!!error}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                >
                  Send reset instructions
                </Button>
                <Link href="/login">
                  <Text color="teal.500" align="center" cursor="pointer">
                    Back to login
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
} 