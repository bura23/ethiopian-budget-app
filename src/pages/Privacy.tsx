import { Box, Container, Heading, Text, VStack, Divider } from "@chakra-ui/react";

const Privacy = () => (
  <Container maxW="container.md" py={10}>
    <VStack spacing={8} align="stretch">
      <Heading size="2xl" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">Privacy Policy</Heading>
      <Text fontSize="lg" color="gray.700">
        Your privacy is important to us. This policy explains what information Yene Birr collects, how we use it, and your rights as a user.
      </Text>
      <Divider />
      <Heading size="md">What We Collect</Heading>
      <Text color="gray.600">
        We collect information you provide when you register, use the app, or contact support. This includes your name, email, financial data, and usage analytics.
      </Text>
      <Divider />
      <Heading size="md">How We Use Your Data</Heading>
      <Text color="gray.600">
        Your data is used to provide and improve our services, personalize your experience, and ensure security. We never sell your data to third parties.
      </Text>
      <Divider />
      <Heading size="md">Your Rights</Heading>
      <Text color="gray.600">
        You can access, update, or delete your data at any time. Contact us if you have questions or concerns about your privacy.
      </Text>
      <Divider />
      <Text color="gray.500" fontSize="sm">
        This policy may be updated from time to time. Please review it regularly for changes.
      </Text>
    </VStack>
  </Container>
);

export default Privacy; 