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
    <Container maxW="container.sm" py={10} data-oid="zv5km9s">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="l:nd2m5"
      >
        <VStack spacing={8} data-oid="xn:3r_3">
          <Heading size="xl" data-oid="5epa-gf">
            Create an Account
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid="urrw0tv">
            <VStack spacing={4} data-oid="-1gsfsh">
              <FormControl isRequired data-oid="wz:5:hh">
                <FormLabel data-oid=":qy3-i_">Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="t6p78c."
                />
              </FormControl>

              <FormControl isRequired data-oid="ye761-u">
                <FormLabel data-oid="b-73tt4">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="sdcw:s8"
                />
              </FormControl>

              <FormControl isRequired data-oid="_-cnp77">
                <FormLabel data-oid="h_mv53w">Password</FormLabel>
                <InputGroup data-oid="28kqahi">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid="fwf7_.y"
                  />

                  <InputRightElement h="full" data-oid="x874bw6">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="mf129nm" />
                        ) : (
                          <ViewIcon data-oid="10i4o5g" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="-pnb4io"
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
                data-oid="12-hc5k"
              >
                Register
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="9tb-:em">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/login"
              color="teal.500"
              fontWeight="semibold"
              data-oid="-t8qryv"
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
