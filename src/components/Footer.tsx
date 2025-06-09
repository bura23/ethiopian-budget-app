// UI Redesign: Minimalist, modern Footer for Yene Birr. Responsive, neutral palette, Inter font, and subtle hover.
import { Box, Container, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => (
  <Box as="footer" py={6} bg="gray.50" borderTop="1px" borderColor="gray.200">
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center" wrap="wrap">
        <Text color="gray.500" fontSize="sm">&copy; {new Date().getFullYear()} Yene Birr. All rights reserved.</Text>
        <Flex gap={6}>
          <Link as={RouterLink} to="/about" color="teal.600" fontWeight="medium">About</Link>
          <Link as={RouterLink} to="/contact" color="teal.600" fontWeight="medium">Contact</Link>
          <Link as={RouterLink} to="/privacy" color="teal.600" fontWeight="medium">Privacy</Link>
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Footer; 