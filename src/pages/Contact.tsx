import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading size="2xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">Contact Us</Heading>
        <Text color="gray.700">Have a question, suggestion, or need support? Fill out the form below and our team will respond as soon as possible.</Text>
        <Box as="form" onSubmit={handleSubmit} bg="white" p={6} borderRadius="lg" shadow="md">
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={5} />
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={isLoading} w="full">Send Message</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Contact; 