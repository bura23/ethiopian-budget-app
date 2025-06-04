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
    <Box maxW="container.xl" mx="auto" py={8} data-oid="yy19cu_">
      <VStack spacing={8} align="stretch" data-oid="augd4xh">
        <Heading data-oid="evv94d6">Welcome, {user?.name}!</Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="e98r:hb"
        >
          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="jdas_4w"
          >
            <Heading size="md" mb={4} data-oid="rz5eezr">
              Recent Transactions
            </Heading>
            <Text data-oid="h_iuds3">No transactions yet.</Text>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="57j1vky"
          >
            <Heading size="md" mb={4} data-oid="::2912g">
              Budget Overview
            </Heading>
            <Text data-oid="6uje8i7">
              Start by adding your budget categories.
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
