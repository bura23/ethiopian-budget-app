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
    <Container maxW="container.sm" py={10} data-oid="lytvnpw">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="00.q4hg"
      >
        <VStack spacing={8} data-oid="8bywcgc">
          <Heading size="xl" data-oid="mrgstz8">
            Welcome Back
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid="s7tx2e6">
            <VStack spacing={4} data-oid="uwskncv">
              <FormControl isRequired data-oid="7u996fl">
                <FormLabel data-oid="3omigy_">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="csql_jw"
                />
              </FormControl>

              <FormControl isRequired data-oid="tk3fsaj">
                <FormLabel data-oid="pb94rfn">Password</FormLabel>
                <InputGroup data-oid="1_vj:be">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid="t_ctzkn"
                  />

                  <InputRightElement h="full" data-oid="3_w6zdo">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="e4mgtjf" />
                        ) : (
                          <ViewIcon data-oid="_1fbu9w" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="mvrc8y."
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Forgot Password Link */}
              <Box w="100%" textAlign="right" mb={-2}>
                <Link
                  as={RouterLink}
                  to="/forgot-password"
                  color="teal.500"
                  fontWeight="semibold"
                  fontSize="sm"
                  data-oid="forgot-pw-link"
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="100%"
                isLoading={isLoading}
                mt={4}
                data-oid=":3eptbd"
              >
                Login
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="n:p:km3">
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="teal.500"
              fontWeight="semibold"
              data-oid="qiiftjd"
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
