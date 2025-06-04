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
    <Container maxW="container.sm" py={10} data-oid="ap:5k93">
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        data-oid="7.ooh4t"
      >
        <VStack spacing={8} data-oid="8vtim99">
          <Heading size="xl" data-oid="u4l6188">
            Create an Account
          </Heading>
          <Box w="100%" as="form" onSubmit={handleSubmit} data-oid="9hd-:wl">
            <VStack spacing={4} data-oid=":12:p3h">
              <FormControl isRequired data-oid="-.0b6n.">
                <FormLabel data-oid="gd.g-u7">Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  size="lg"
                  data-oid="vmku7rh"
                />
              </FormControl>

              <FormControl isRequired data-oid="u4d4pdf">
                <FormLabel data-oid="s-29nb8">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  data-oid="fdvozot"
                />
              </FormControl>

              <FormControl isRequired data-oid="tgxi8hj">
                <FormLabel data-oid="d::.lke">Password</FormLabel>
                <InputGroup data-oid="_u_0g7v">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    size="lg"
                    data-oid="z_v-x1:"
                  />

                  <InputRightElement h="full" data-oid="ml5514r">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      icon={
                        showPassword ? (
                          <ViewOffIcon data-oid="a39i20b" />
                        ) : (
                          <ViewIcon data-oid=".w5i4my" />
                        )
                      }
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      data-oid="ghqjbz:"
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
                data-oid="e:a-pey"
              >
                Register
              </Button>
            </VStack>
          </Box>

          <Text fontSize="md" data-oid="2s5upw9">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/login"
              color="teal.500"
              fontWeight="semibold"
              data-oid="66glyo2"
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
