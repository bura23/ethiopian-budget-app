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
    <Box maxW="container.xl" mx="auto" py={8} data-oid="_mjq69s">
      <VStack spacing={8} align="stretch" data-oid="1y34mad">
        <Heading data-oid="_28y55h">Welcome, {user?.name}!</Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="s5nouh7"
        >
          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="mxmy.4e"
          >
            <Heading size="md" mb={4} data-oid=".wqt0m7">
              Recent Transactions
            </Heading>
            <Text data-oid="dkcp4.o">No transactions yet.</Text>
          </Box>

          <Box
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth={1}
            borderColor={borderColor}
            data-oid="8-h62cn"
          >
            <Heading size="md" mb={4} data-oid="nj.ppl9">
              Budget Overview
            </Heading>
            <Text data-oid="f4jx2nx">
              Start by adding your budget categories.
            </Text>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Dashboard;
