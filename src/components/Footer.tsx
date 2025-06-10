// UI Redesign: Minimalist, modern Footer for Yene Birr. Responsive, neutral palette, Inter font, and subtle hover.
import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt="auto"
      py={4}
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text>© 2024 Yene Birr. All rights reserved.</Text>
          <Stack direction="row" spacing={6}>
            <Link href="/about">
              <Text color="teal.500" cursor="pointer">About</Text>
            </Link>
            <Link href="/contact">
              <Text color="teal.500" cursor="pointer">Contact</Text>
            </Link>
            <Link href="/privacy">
              <Text color="teal.500" cursor="pointer">Privacy</Text>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 