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
    <Box minH="100vh" bg="gray.50" py={20} data-oid="ij7dt85">
      <Container maxW="lg" data-oid="e5lshd7">
        <VStack spacing={8} data-oid="d2qx7:x">
          <Heading color="teal.600" data-oid="mn98xfn">
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
            data-oid="k:qfajh"
          >
            <VStack
              as="form"
              spacing={6}
              onSubmit={handleSubmit}
              data-oid="52q.ru_"
            >
              <FormControl isRequired data-oid="snowog2">
                <FormLabel data-oid="uy0ak0-">Name</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="3_677_i"
                />
              </FormControl>

              <FormControl isRequired data-oid="09xa1vz">
                <FormLabel data-oid="lfl7um1">Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="qi_gszg"
                />
              </FormControl>

              <FormControl isRequired data-oid="zf2phw4">
                <FormLabel data-oid="zp1os7b">Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  data-oid="l.0bql8"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                isLoading={isLoading}
                data-oid="br_bxmw"
              >
                Register
              </Button>
            </VStack>
          </Box>
          <Text textAlign="center" data-oid="7l:uo6j">
            Already have an account?{" "}
            <Link to="/login" data-oid="_cb0qm.">
              <Button variant="link" colorScheme="blue" data-oid="1180t6i">
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
