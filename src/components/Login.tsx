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
    <Box minH="100vh" bg="gray.50" py={20} data-oid="3x9:r._">
      <Container maxW="lg" data-oid=":4u1e1:">
        <VStack spacing={8} data-oid="tt2lnnl">
          <Heading color="teal.600" data-oid="hnf2cpb">
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
            data-oid="z8apz-n"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="eq4ae9t"
            >
              <FormControl isRequired data-oid="iicuo_t">
                <FormLabel data-oid="oj:y6ky">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid=".2qvzi1"
                />
              </FormControl>

              <FormControl isRequired data-oid="61t9hyo">
                <FormLabel data-oid="ljcxw0k">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid="ppg0nxa"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="ya2ywsa"
              >
                Sign In
              </Button>

              <Text fontSize="sm" color="gray.600" data-oid=".cyhzei">
                Default credentials: admin@example.com / admin123
              </Text>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid="yx7e0lq">
            Don't have an account?{" "}
            <Link to="/register" data-oid="t6l78qx">
              <Button variant="link" colorScheme="blue" data-oid="_te3bab">
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
