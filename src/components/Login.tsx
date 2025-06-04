import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Center,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" py={20} data-oid="xmk9q:e">
      <Container maxW="lg" data-oid=":ar_h1r">
        <VStack spacing={8} data-oid="srw5s_z">
          <Heading color="teal.600" data-oid="8k7l5s7">
            Ethiopian Budget App
          </Heading>
          <Box
            w="full"
            maxW="md"
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            data-oid="gdgs:rw"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="t8nw42p"
            >
              <FormControl isRequired data-oid="74i:enn">
                <FormLabel data-oid="rr.-cd-">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="x4w9x.z"
                />
              </FormControl>

              <FormControl isRequired data-oid=".2ss43:">
                <FormLabel data-oid=".h1qu:4">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid="npi:930"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="tl9183-"
              >
                Sign In
              </Button>

              <Text fontSize="sm" color="gray.600" data-oid="uhceo2l">
                Default credentials: admin@example.com / admin123
              </Text>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid="7wrs:-v">
            Don't have an account?{" "}
            <Link to="/register" data-oid="3y9yj_i">
              <Button variant="link" colorScheme="blue" data-oid="-g87t:l">
                Register
              </Button>
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Login;
