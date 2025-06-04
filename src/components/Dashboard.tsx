import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box maxW="container.xl" mx="auto" py={8} data-oid="::tqld1">
      <VStack spacing={8} align="stretch" data-oid="zsy2fuj">
        <Heading data-oid="lvrt-kq">Welcome, {user?.name}!</Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="vj_ujh."
        >
          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="wpkx_76"
          >
            <Heading size="md" mb={4} data-oid="x56569q">
              Recent Transactions
            </Heading>
            <Text data-oid="pfo0s.0">No transactions yet.</Text>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="s5jlrw."
          >
            <Heading size="md" mb={4} data-oid="2oog08l">
              Budget Overview
            </Heading>
            <Text data-oid=":_oho8:">
              Start by adding your budget categories.
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
