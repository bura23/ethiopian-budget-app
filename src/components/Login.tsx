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
    <Box minH="100vh" bg="gray.50" py={20} data-oid="xq5calk">
      <Container maxW="lg" data-oid="f2.f3f8">
        <VStack spacing={8} data-oid="t3iic1a">
          <Heading color="teal.600" data-oid="9lxxsk_">
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
            data-oid="esntyq8"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="2122bjb"
            >
              <FormControl isRequired data-oid="qqqmecu">
                <FormLabel data-oid="7qm.eo4">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="ta379qn"
                />
              </FormControl>

              <FormControl isRequired data-oid="mklx0ur">
                <FormLabel data-oid="hy-lg_f">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid="1c6.jb."
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="l-e8q7u"
              >
                Sign In
              </Button>

              <Text fontSize="sm" color="gray.600" data-oid="3hgo_65">
                Default credentials: admin@example.com / admin123
              </Text>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid="ty8381l">
            Don't have an account?{" "}
            <Link to="/register" data-oid="wcm:m:f">
              <Button variant="link" colorScheme="blue" data-oid="yldkplj">
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
