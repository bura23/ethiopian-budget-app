import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(name, email, password);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to register",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10} data-oid="ti53l5l">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="z.4p04h"
      >
        <VStack spacing={8} data-oid="3vpz3_r">
          <Heading size="xl" data-oid="9:y-il4">
            Create an Account
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid="iwqkl20">
            <VStack spacing={4} data-oid="9fc97qy">
              <FormControl isRequired data-oid="ix2:6t5">
                <FormLabel data-oid="e4bsqvo">Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="05sxfcb"
                />
              </FormControl>

              <FormControl isRequired data-oid="q7o:rdr">
                <FormLabel data-oid="yjpn3e1">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="lcwekc3"
                />
              </FormControl>

              <FormControl isRequired data-oid="g06hinq">
                <FormLabel data-oid="nrui6h_">Password</FormLabel>
                <InputGroup data-oid="st3h-ql">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid="jzsqao6"
                  />

                  <InputRightElement h="full" data-oid="aq-u.cl">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="bv97uic" />
                        ) : (
                          <ViewIcon data-oid=":oesa.:" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="lhw0105"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                isLoading={isLoading}
                mt={4}
                data-oid="cjpirq5"
              >
                Register
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="ar3u98a">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/login"
              color="teal.500"
              fontWeight="semibold"
              data-oid="misp_9j"
            >
              Login here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Register;
