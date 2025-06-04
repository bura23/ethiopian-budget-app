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
    <Container maxW="container.sm" py={10} data-oid="i-5-d.i">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="eovw.hh"
      >
        <VStack spacing={8} data-oid="4pdwdl3">
          <Heading size="xl" data-oid="49b32qg">
            Welcome Back
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid=":qt93nt">
            <VStack spacing={4} data-oid="s5:0vh4">
              <FormControl isRequired data-oid="-fw:uml">
                <FormLabel data-oid="9-_jjk-">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="g3u961a"
                />
              </FormControl>

              <FormControl isRequired data-oid="2_8_v_z">
                <FormLabel data-oid="0n.u3mz">Password</FormLabel>
                <InputGroup data-oid="cq0-bxk">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid=":gsn35a"
                  />

                  <InputRightElement h="full" data-oid="rsmjf_4">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="865qf:c" />
                        ) : (
                          <ViewIcon data-oid="i1ytnor" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="y91g:29"
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
                data-oid="k-g4h50"
              >
                Login
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="9h-o_3e">
            Don't have an account?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="teal.500"
              fontWeight="semibold"
              data-oid="z:8wkl_"
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
