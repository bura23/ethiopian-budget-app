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
  Card,
  CardBody,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import TransactionForm from "../components/TransactionForm";
import AIInsights from "../components/AIInsights";
import { FiPlus, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { getFinancialStats, getCategoryBreakdown, getSavingsTrend } from "../services/api";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const StatCard = ({ label, value, trend, trendValue, icon: Icon }: any) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="lg"
      borderWidth={1}
      borderColor={borderColor}
      boxShadow="none"
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="flex-start"
      minH="120px"
      justifyContent="center"
      transition="border-color 0.2s"
      _hover={{ borderColor: "teal.400" }}
      data-oid="y56yzry"
    >
      <Stat w="full">
        <Flex align="center" gap={2} mb={1}>
          <Box color={trend === "increase" ? "teal.500" : "red.500"}>
            <Icon size={18} />
          </Box>
          <StatLabel fontSize="sm" color={textColor} fontWeight="medium">
            {label}
          </StatLabel>
        </Flex>
        <StatNumber fontSize="2xl" fontWeight="bold" color={textColor}>
          ETB {parseInt(value).toLocaleString()}
        </StatNumber>
        <StatHelpText fontSize="sm" color={trend === "increase" ? "teal.500" : "red.500"}>
          <StatArrow type={trend} />
          {trendValue}%
        </StatHelpText>
      </Stat>
    </Box>
  );
};

const BudgetProgressCard = ({ category, amount, total }: any) => {
  const percentage = (amount / total) * 100;
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  return (
    <Box
      p={5}
      bg={cardBg}
      borderRadius="lg"
      borderWidth={1}
      borderColor={borderColor}
      boxShadow="none"
      minH="100px"
      display="flex"
      flexDirection="column"
      gap={2}
      justifyContent="center"
      transition="border-color 0.2s"
      _hover={{ borderColor: "teal.400" }}
      data-oid=".v509nh"
    >
      <Flex justify="space-between" align="center" mb={1}>
        <Text fontSize="md" fontWeight="semibold" color={textColor}>
          {category}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color={percentage > 90 ? "red.500" : percentage > 70 ? "yellow.500" : "teal.500"}>
          {percentage.toFixed(1)}%
        </Text>
      </Flex>
      <Progress
        value={percentage}
        colorScheme={percentage > 90 ? "red" : percentage > 70 ? "yellow" : "teal"}
        borderRadius="full"
        size="sm"
        hasStripe
        isAnimated
      />
      <Text fontSize="xs" color={textColor}>
        ETB {amount.toLocaleString()} / {total.toLocaleString()}
      </Text>
    </Box>
  );
};

// Types for chart data (copied from Reports.tsx)
interface StatsData {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  incomeChange: number;
  expenseChange: number;
  savingsChange: number;
  timeline: string[];
  incomeData: number[];
  expenseData: number[];
}
interface CategoryData {
  name: string;
  percentage: number;
}
interface SavingsData {
  timeline: string[];
  data: number[];
}

const Dashboard = () => {
  const { refreshReports, reportsRefreshTrigger } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Use StatsData for stats
  const [stats, setStats] = useState<StatsData>({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    incomeChange: 0,
    expenseChange: 0,
    savingsChange: 0,
    timeline: [],
    incomeData: [],
    expenseData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chart state
  const [monthlyData, setMonthlyData] = useState<ChartData<"bar">>({ labels: [], datasets: [] });
  const [categoryData, setCategoryData] = useState<ChartData<"doughnut">>({ labels: [], datasets: [] });
  const [savingsData, setSavingsData] = useState<ChartData<"line">>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statsResponse = await getFinancialStats("month") as { success: boolean; data: StatsData; message?: string };
        const categoryResponse = await getCategoryBreakdown("month") as { success: boolean; data: CategoryData[] };
        const savingsTrendResponse = await getSavingsTrend("month") as { success: boolean; data: SavingsData };
        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
          // Bar chart data
          if (Array.isArray(statsResponse.data.timeline) && Array.isArray(statsResponse.data.incomeData) && Array.isArray(statsResponse.data.expenseData)) {
            setMonthlyData({
              labels: statsResponse.data.timeline,
              datasets: [
                {
                  label: "Income",
                  data: statsResponse.data.incomeData,
                  backgroundColor: "rgba(16, 185, 129, 0.8)",
                  borderColor: "#10b981",
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false,
                },
                {
                  label: "Expenses",
                  data: statsResponse.data.expenseData,
                  backgroundColor: "rgba(239, 68, 68, 0.8)",
                  borderColor: "#ef4444",
                  borderWidth: 2,
                  borderRadius: 8,
                  borderSkipped: false,
                },
              ],
            });
          }
        } else {
          setError(statsResponse.message || "Failed to load stats");
        }
        // Doughnut chart data
        if (Array.isArray(categoryResponse.data)) {
          const validCategories = categoryResponse.data.filter(
            (cat) => cat && typeof cat.name === "string" && typeof cat.percentage === "number"
          );
          setCategoryData({
            labels: validCategories.map((cat) => cat.name),
            datasets: [
              {
                data: validCategories.map((cat) => cat.percentage),
                backgroundColor: [
                  "#667eea",
                  "#764ba2",
                  "#f093fb",
                  "#f5576c",
                  "#4facfe",
                  "#00f2fe",
                  "#43e97b",
                  "#38f9d7",
                  "#ffecd2",
                  "#fcb69f",
                ],
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: "#ffffff",
              },
            ],
          });
        }
        // Line chart data
        if (savingsTrendResponse.data && Array.isArray(savingsTrendResponse.data.timeline) && Array.isArray(savingsTrendResponse.data.data)) {
          setSavingsData({
            labels: savingsTrendResponse.data.timeline,
            datasets: [
              {
                label: "Savings",
                data: savingsTrendResponse.data.data,
                borderColor: "#667eea",
                backgroundColor: "rgba(102, 126, 234, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#667eea",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
              },
            ],
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [reportsRefreshTrigger]);

  // Chart options (reuse from Reports)
  const chartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 12, weight: "normal" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || context.parsed;
            return `${label}: ETB ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          font: { size: 11 },
          color: "#64748b",
          callback: (value: any) => `ETB ${value}`,
        },
      },
    },
  };
  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: "normal" } },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: ${value.toFixed(1)}%`;
          },
        },
      },
    },
    cutout: "60%",
  };
  const lineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: "normal" } },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `Savings: ETB ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: {
          font: { size: 11 },
          color: "#64748b",
          callback: (value: any) => `ETB ${value}`,
        },
      },
    },
  };

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
      // Refresh reports when transaction is added
      refreshReports();
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

  const statCards = [
    {
      label: "Total Income",
      value: stats.totalIncome,
      trend: stats.incomeChange >= 0 ? "increase" : "decrease",
      trendValue: Math.abs(stats.incomeChange).toFixed(1),
      icon: FiTrendingUp,
    },
    {
      label: "Total Expenses",
      value: stats.totalExpenses,
      trend: stats.expenseChange >= 0 ? "increase" : "decrease",
      trendValue: Math.abs(stats.expenseChange).toFixed(1),
      icon: FiTrendingDown,
    },
    {
      label: "Net Savings",
      value: stats.netSavings,
      trend: stats.savingsChange >= 0 ? "increase" : "decrease",
      trendValue: Math.abs(stats.savingsChange).toFixed(1),
      icon: FiTrendingUp,
    },
  ];

  // Build dynamic expenses array from categoryData and stats
  const expenses = Array.isArray(categoryData.labels) && Array.isArray(categoryData.datasets) && categoryData.datasets[0] && Array.isArray(categoryData.datasets[0].data)
    ? categoryData.labels.map((label, idx) => ({
        category: String(label),
        amount: Math.round((Number(categoryData.datasets[0].data[idx]) || 0) * stats.totalExpenses / 100),
        total: stats.totalExpenses,
      }))
    : [];

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>Dashboard</Heading>
        <Button leftIcon={<FiPlus />} colorScheme="teal" variant="solid" onClick={onOpen}>
          Add Transaction
        </Button>
      </Flex>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mb={8} minChildWidth="220px">
            {statCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </SimpleGrid>
          {/* Report Charts */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <Box bg="white" borderRadius="xl" boxShadow="md" p={4} minH="300px">
              <Heading size="sm" mb={2} color="teal.600">Income vs Expenses</Heading>
              <Box h="220px" position="relative">
                <Bar data={monthlyData} options={chartOptions} />
              </Box>
            </Box>
            <Box bg="white" borderRadius="xl" boxShadow="md" p={4} minH="300px">
              <Heading size="sm" mb={2} color="teal.600">Expense Categories</Heading>
              <Box h="220px" position="relative">
                <Doughnut data={categoryData} options={doughnutOptions} />
              </Box>
            </Box>
            <Box bg="white" borderRadius="xl" boxShadow="md" p={4} minH="300px">
              <Heading size="sm" mb={2} color="teal.600">Savings Trend</Heading>
              <Box h="220px" position="relative">
                <Line data={savingsData} options={lineOptions} />
              </Box>
            </Box>
          </SimpleGrid>
        </>
      )}
      <Box mt={12}>
        <AIInsights
          financialData={{
            expenses,
            income: stats.totalIncome,
            savings: stats.netSavings,
          }}
          summaryOnly={false}
        />
      </Box>
      <TransactionForm isOpen={isOpen} onClose={onClose} onSubmit={handleTransactionSubmit} />
    </Container>
  );
};

export default Dashboard;
