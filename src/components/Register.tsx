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
    <Box minH="100vh" bg="gray.50" py={20} data-oid="1zqh6t_">
      <Container maxW="lg" data-oid="i1u_3y1">
        <VStack spacing={8} data-oid="dqq37bu">
          <Heading color="teal.600" data-oid="ni.2cgj">
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
            data-oid="eyz6vku"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="grmelec"
            >
              <FormControl isRequired data-oid="13jbv06">
                <FormLabel data-oid=":qk5.-u">Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="zqj:gw7"
                />
              </FormControl>

              <FormControl isRequired data-oid="ek6bves">
                <FormLabel data-oid="6-bgi99">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid=":f7iqqu"
                />
              </FormControl>

              <FormControl isRequired data-oid="g0b_tn4">
                <FormLabel data-oid="ogv43jg">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid="bmirwy0"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="u-rslfh"
              >
                Register
              </Button>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid="zjl_pke">
            Already have an account?{" "}
            <Link to="/login" data-oid="n2wwla.">
              <Button variant="link" colorScheme="blue" data-oid="zptau1d">
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
