import { Box, Container, Heading, Text, VStack, Divider } from "@chakra-ui/react";

const About = () => (
  <Container maxW="container.md" py={10}>
    <VStack spacing={8} align="stretch">
      <Heading size="2xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">About Yene Birr</Heading>
      <Text fontSize="lg" color="gray.700">
        Yene Birr is a modern Ethiopian budget app designed to help you track your income, expenses, and savings with ease. Our mission is to empower Ethiopians to take control of their finances, make smarter decisions, and achieve their financial goals.
      </Text>
      <Divider />
      <Heading size="md">Our Mission</Heading>
      <Text color="gray.600">
        We believe everyone deserves financial clarity. Yene Birr provides intuitive tools, insightful reports, and a beautiful interface to make budgeting simple and accessible for all.
      </Text>
      <Divider />
      <Heading size="md">Meet the Team</Heading>
      <Text color="gray.600">
        Yene Birr was created by a passionate team of Ethiopian developers and designers who care deeply about financial literacy and technology for good. We are committed to continuous improvement and listening to our users.
      </Text>
    </VStack>
  </Container>
);

export default About; 