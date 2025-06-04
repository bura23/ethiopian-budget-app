import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Container,
  SimpleGrid,
  Progress,
  Text,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import TransactionForm from "../components/TransactionForm";
import AIInsights from "../components/AIInsights";
import { FiPlus, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const StatCard = ({ label, value, trend, trendValue, icon: Icon }: any) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <MotionBox
      p={6}
      bg={cardBg}
      borderRadius="2xl"
      boxShadow="lg"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      position="relative"
      overflow="hidden"
      data-oid="y56yzry"
    >
      <Flex justify="space-between" align="start" data-oid="9ndafyt">
        <Stat data-oid="_5xjiql">
          <StatLabel fontSize="sm" color={textColor} mb={1} data-oid="plcjusr">
            {label}
          </StatLabel>
          <StatNumber
            fontSize="3xl"
            fontWeight="bold"
            mb={2}
            data-oid="s3cty3v"
          >
            ETB {parseInt(value).toLocaleString()}
          </StatNumber>
          <StatHelpText mb={0} data-oid="yhqal_q">
            <StatArrow type={trend} data-oid="kfm8jcb" />
            {trendValue}%
          </StatHelpText>
        </Stat>
        <Box
          p={3}
          borderRadius="xl"
          bg={trend === "increase" ? "green.100" : "red.100"}
          color={trend === "increase" ? "green.500" : "red.500"}
          data-oid="lp_am7c"
        >
          <Icon size={24} data-oid="lu-ck8a" />
        </Box>
      </Flex>
    </MotionBox>
  );
};

const BudgetProgressCard = ({ category, amount, total }: any) => {
  const percentage = (amount / total) * 100;
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <MotionBox
      p={6}
      bg={cardBg}
      borderRadius="2xl"
      boxShadow="lg"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      data-oid=".v509nh"
    >
      <Flex justify="space-between" mb={2} data-oid="r_7n.5r">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={textColor}
          data-oid="-s_qg79"
        >
          {category}
        </Text>
        <Text
          fontWeight="bold"
          color={
            percentage > 90
              ? "red.500"
              : percentage > 70
                ? "yellow.500"
                : "teal.500"
          }
          data-oid="-g8mj5m"
        >
          {((amount / total) * 100).toFixed(1)}%
        </Text>
      </Flex>
      <Text fontSize="sm" color={textColor} mb={2} data-oid="xd923d1">
        ETB {amount.toLocaleString()} spent of ETB {total.toLocaleString()}
      </Text>
      <Progress
        value={percentage}
        colorScheme={
          percentage > 90 ? "red" : percentage > 70 ? "yellow" : "teal"
        }
        borderRadius="full"
        size="sm"
        hasStripe
        isAnimated
        data-oid="yd3eeht"
      />

      <Text fontSize="xs" color={textColor} mt={2} data-oid="pymjvfl">
        ETB {(total - amount).toLocaleString()} remaining
      </Text>
    </MotionBox>
  );
};

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleTransactionSubmit = async (transaction: any) => {
    try {
      // TODO: Implement API call to save transaction
      console.log("Saving transaction:", transaction);
      toast({
        title: "Success",
        description: "Transaction added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // TODO: Refresh dashboard data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Sample data - replace with actual data from your API
  const stats = [
    {
      label: "Total Income",
      value: 50000,
      trend: "increase",
      trendValue: 12,
      icon: FiTrendingUp,
    },
    {
      label: "Total Expenses",
      value: 30000,
      trend: "decrease",
      trendValue: 8,
      icon: FiTrendingDown,
    },
  ];

  const budgets = [
    {
      category: "Housing",
      amount: 8000,
      total: 10000,
    },
    {
      category: "Food",
      amount: 3500,
      total: 5000,
    },
    {
      category: "Transportation",
      amount: 2000,
      total: 3000,
    },
  ];

  return (
    <Container maxW="container.xl" py={6} data-oid="afzo8m7">
      <Flex justify="space-between" align="center" mb={8} data-oid="cnhgx52">
        <Heading data-oid="viqaj8h">Dashboard</Heading>
        <Button
          leftIcon={<FiPlus data-oid=".fmm:f." />}
          colorScheme="teal"
          onClick={onOpen}
          data-oid="wis5byn"
        >
          Add Transaction
        </Button>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={6}
        mb={8}
        data-oid="_u_a.xa"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} data-oid="8.zz9km" />
        ))}
      </SimpleGrid>

      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        gap={6}
        data-oid="1ut6_sk"
      >
        <GridItem data-oid="1x79xzv">
          <Heading size="md" mb={6} data-oid="7t:j-xv">
            Budget Overview
          </Heading>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            data-oid="tj.frpy"
          >
            {budgets.map((budget, index) => (
              <BudgetProgressCard key={index} {...budget} data-oid="v1icx.j" />
            ))}
          </SimpleGrid>
        </GridItem>
        <GridItem data-oid="byf_7u1">
          <AIInsights
            financialData={{
              expenses: budgets,
              income: stats[0].value,
              savings: stats[0].value - stats[1].value,
            }}
            data-oid="hlkmld."
          />
        </GridItem>
      </Grid>

      <TransactionForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleTransactionSubmit}
        data-oid="biw8j_a"
      />
    </Container>
  );
};

export default Dashboard;
