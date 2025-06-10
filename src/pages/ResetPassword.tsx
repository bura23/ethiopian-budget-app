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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setIsLoading(true);

    try {
      const response = await auth.resetPassword({
        token: token as string,
        password,
      });

      if (response.success) {
        toast({
          title: "Password reset successful",
          description: "You can now log in with your new password",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/login");
      } else {
        throw new Error(response.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.message || "Failed to reset password");
      toast({
        title: "Error",
        description: err.message || "Failed to reset password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Reset your password</Heading>
            <Text color="fg.muted">
              Enter your new password below
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
              <Stack spacing="5">
                <FormControl isInvalid={!!error}>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl isInvalid={!!error}>
                  <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                >
                  Reset Password
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