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
  Container,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" py={20} data-oid="fm6ajyx">
      <Container maxW="lg" data-oid="ys-664m">
        <VStack spacing={8} data-oid="h1suzu_">
          <Heading color="teal.600" data-oid="bsk7c7.">
            Create Account
          </Heading>
          <Box
            w="full"
            maxW="md"
            p={8}
            borderWidth={1}
            borderRadius="lg"
            boxShadow="lg"
            bg="white"
            data-oid="audbgto"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="4-slzzr"
            >
              <FormControl isRequired data-oid="xqsgl0m">
                <FormLabel data-oid="49gq_5.">Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="4kkgsw1"
                />
              </FormControl>

              <FormControl isRequired data-oid="xylo-ww">
                <FormLabel data-oid="i.0sehu">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="sqwukns"
                />
              </FormControl>

              <FormControl isRequired data-oid="9ey.xq0">
                <FormLabel data-oid="jt.hk2u">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid=":zs042k"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="rturck6"
              >
                Register
              </Button>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid=":qtw:k1">
            Already have an account?{" "}
            <Link to="/login" data-oid="t8jyemf">
              <Button variant="link" colorScheme="blue" data-oid="04vyv77">
                Login
              </Button>
            </Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Register;
