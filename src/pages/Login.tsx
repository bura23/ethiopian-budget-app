import { useState } from "react";
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
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

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const from = (location.state as LocationState)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to login",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10} data-oid="w33ck85">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="xvaxp3."
      >
        <VStack spacing={8} data-oid="jlsvcjn">
          <Heading size="xl" data-oid="wv.fsit">
            Welcome Back
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid="3tk.pjg">
            <VStack spacing={4} data-oid="hwva78d">
              <FormControl isRequired data-oid="jdqjb1r">
                <FormLabel data-oid="m7wgzvy">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="ihnyp8k"
                />
              </FormControl>

              <FormControl isRequired data-oid="5l-0hsn">
                <FormLabel data-oid="d3.ry:o">Password</FormLabel>
                <InputGroup data-oid="yxhm:uv">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid="-3m7h5x"
                  />

                  <InputRightElement h="full" data-oid="yx-6lsu">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="vlhaul:" />
                        ) : (
                          <ViewIcon data-oid="xrwdtre" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="cf1-fg4"
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
                data-oid="b:h_.ta"
              >
                Login
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="iu3lvjj">
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="teal.500"
              fontWeight="semibold"
              data-oid="j:g5d3x"
            >
              Register here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
