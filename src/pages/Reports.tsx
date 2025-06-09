import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Badge,
} from "@chakra-ui/react";
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
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  getFinancialStats,
  getCategoryBreakdown,
  getSavingsTrend,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import React from "react";

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

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

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

const Reports = () => {
  const { reportsRefreshTrigger } = useAuth();
  const [timeRange, setTimeRange] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    incomeChange: 0,
    expenseChange: 0,
    savingsChange: 0,
  });
  const [monthlyData, setMonthlyData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [categoryData, setCategoryData] = useState<ChartData<"doughnut">>({
    labels: [],
    datasets: [],
  });
  const [savingsData, setSavingsData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [lastMonthStats, setLastMonthStats] = useState<StatsData | null>(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    loadData();
    loadLastMonthStats();
  }, [timeRange, reportsRefreshTrigger]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const statsPromise = getFinancialStats(timeRange) as Promise<
        ApiResponse<StatsData>
      >;

      const categoryPromise = getCategoryBreakdown(timeRange) as Promise<
        ApiResponse<CategoryData[]>
      >;

      const savingsTrendPromise = getSavingsTrend(timeRange) as Promise<
        ApiResponse<SavingsData>
      >;

      const [statsResponse, categoryResponse, savingsTrendResponse] =
        await Promise.all([statsPromise, categoryPromise, savingsTrendPromise]);

      const statsData = statsResponse.data;
      const categoryBreakdown = categoryResponse.data;
      const savingsTrend = savingsTrendResponse.data;

      if (!statsData || typeof statsData.totalIncome !== "number") {
        throw new Error("Invalid stats data received from server");
      }

      setStats({
        totalIncome: statsData.totalIncome || 0,
        totalExpenses: statsData.totalExpenses || 0,
        netSavings: statsData.netSavings || 0,
        incomeChange: statsData.incomeChange || 0,
        expenseChange: statsData.expenseChange || 0,
        savingsChange: statsData.savingsChange || 0,
      });

      if (
        Array.isArray(statsData.timeline) &&
        Array.isArray(statsData.incomeData) &&
        Array.isArray(statsData.expenseData)
      ) {
        setMonthlyData({
          labels: statsData.timeline,
          datasets: [
            {
              label: "Income",
              data: statsData.incomeData,
              backgroundColor: "rgba(16, 185, 129, 0.8)",
              borderColor: "#10b981",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
            {
              label: "Expenses",
              data: statsData.expenseData,
              backgroundColor: "rgba(239, 68, 68, 0.8)",
              borderColor: "#ef4444",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        });
      }

      if (Array.isArray(categoryBreakdown)) {
        const validCategories = categoryBreakdown.filter(
          (cat) =>
            cat &&
            typeof cat.name === "string" &&
            typeof cat.percentage === "number",
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

      if (
        savingsTrend &&
        Array.isArray(savingsTrend.timeline) &&
        Array.isArray(savingsTrend.data)
      ) {
        setSavingsData({
          labels: savingsTrend.timeline,
          datasets: [
            {
              label: "Savings",
              data: savingsTrend.data,
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
    } catch (error) {
      console.error("Error loading report data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load report data",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadLastMonthStats = async () => {
    try {
      // Always fetch last month's stats for comparison
      const lastMonthResponse = await getFinancialStats("lastMonth") as ApiResponse<StatsData>;
      if (lastMonthResponse.success && lastMonthResponse.data) {
        setLastMonthStats(lastMonthResponse.data);
      } else {
        setLastMonthStats(null);
      }
    } catch (e) {
      setLastMonthStats(null);
    }
  };

  const chartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "normal",
          },
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
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#64748b",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
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
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "normal",
          },
        },
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
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "normal",
          },
        },
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
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#64748b",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#64748b",
          callback: (value: any) => `ETB ${value}`,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8} data-oid="lg:h5k3">
        <VStack spacing={8} align="stretch" data-oid="wpfnrqu">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            textAlign="center"
            data-oid="s983_a2"
          >
            Financial Reports
          </Heading>
          <Flex justify="center" align="center" py={20} data-oid="25uovul">
            <Box
              p={8}
              borderRadius="lg"
              bg={cardBg}
              shadow="lg"
              textAlign="center"
              data-oid="8tygaop"
            >
              <Text fontSize="lg" color="gray.500" data-oid="h0_eed.">
                Loading reports...
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8} data-oid="f_jtdq3">
        <VStack spacing={8} align="stretch" data-oid="rxtanq8">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            textAlign="center"
            data-oid="hb52jfz"
          >
            Financial Reports
          </Heading>
          <Box
            p={6}
            borderRadius="lg"
            bg="red.50"
            border="1px"
            borderColor="red.200"
            data-oid="lujvbhi"
          >
            <Text
              color="red.600"
              fontSize="lg"
              fontWeight="medium"
              data-oid="ep9w60l"
            >
              {error}
            </Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} data-oid="g1a1-7e">
      <VStack spacing={8} align="stretch" data-oid="tf7vbx1">
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
          data-oid="mled47p"
        >
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            data-oid="ga1l6n4"
          >
            Financial Reports
          </Heading>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            width="200px"
            bg={cardBg}
            borderColor={borderColor}
            _hover={{ borderColor: "teal.400" }}
            data-oid="rhj-cf7"
          >
            <option value="week" data-oid="g1ajoro">
              This Week
            </option>
            <option value="month" data-oid="3xjw0i-">
              This Month
            </option>
            <option value="year" data-oid="zv_.j5o">
              This Year
            </option>
          </Select>
        </Flex>

        {/* Stat Cards at the Top */}
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={6}
          data-oid="nge_zxm"
        >
          <Box
            p={6}
            borderRadius="2xl"
            bg="white"
            color="gray.800"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            border="1px"
            borderColor="gray.200"
            data-oid="dof8u_u"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="ms90v5k"
            />
            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="toh5.xd"
            >
              <Text
                fontSize="sm"
                color="black"
                fontWeight="medium"
                data-oid="o45ymw6"
              >
                Total Income
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="black" data-oid="g..2:ow">
                ETB {stats.totalIncome.toLocaleString()}
              </Text>
              <HStack data-oid="xoi66qg">
                <Badge
                  colorScheme={stats.incomeChange >= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="_e54gxq"
                >
                  {stats.incomeChange >= 0 ? "↗" : "↘"} {Math.abs(stats.incomeChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>
          <Box
            p={6}
            borderRadius="2xl"
            bg="white"
            color="gray.800"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            border="1px"
            borderColor="gray.200"
            data-oid="a5irfnq"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="lyw4u7l"
            />
            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="x80.eyb"
            >
              <Text
                fontSize="sm"
                color="black"
                fontWeight="medium"
                data-oid="1ez1:v6"
              >
                Total Expenses
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="black" data-oid="tc58jro">
                ETB {stats.totalExpenses.toLocaleString()}
              </Text>
              <HStack data-oid="p4ulzn2">
                <Badge
                  colorScheme={stats.expenseChange <= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="kem7u1v"
                >
                  {stats.expenseChange <= 0 ? "↗" : "↘"} {Math.abs(stats.expenseChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>
          <Box
            p={6}
            borderRadius="2xl"
            bg="white"
            color="gray.800"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            border="1px"
            borderColor="gray.200"
            data-oid="67dzn6c"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="k-paaxg"
            />
            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="1t9-v9j"
            >
              <Text
                fontSize="sm"
                color="black"
                fontWeight="medium"
                data-oid="l8..xbc"
              >
                Net Savings
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color="black" data-oid="bppi7ay">
                ETB {stats.netSavings.toLocaleString()}
              </Text>
              <HStack data-oid="vn7plii">
                <Badge
                  colorScheme={stats.savingsChange >= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="g1d-tu8"
                >
                  {stats.savingsChange >= 0 ? "↗" : "↘"} {Math.abs(stats.savingsChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Main Charts Section */}
        <Box
          bg={cardBg}
          borderRadius="2xl"
          shadow="xl"
          overflow="hidden"
          border="1px"
          borderColor={borderColor}
          data-oid="x:g4vsz"
        >
          <Tabs colorScheme="teal" variant="enclosed" data-oid="qxh5_ra">
            <TabList bg="gray.50" px={4} data-oid="jvejc4c">
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="cs_15te"
              >
                Income vs Expenses
              </Tab>
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="k2g26.2"
              >
                Expense Categories
              </Tab>
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="uogffum"
              >
                Savings Trend
              </Tab>
            </TabList>
            <TabPanels data-oid="v9_0usc">
              <TabPanel p={6} data-oid="brpxhhy">
                <Box h="400px" position="relative" data-oid="zi70fau">
                  <Bar
                    data={monthlyData}
                    options={chartOptions}
                    data-oid="sg7y.ov"
                  />
                </Box>
              </TabPanel>
              <TabPanel p={6} data-oid="4f8lo21">
                <Box h="400px" position="relative" data-oid="bsaelbk">
                  <Doughnut
                    data={categoryData}
                    options={doughnutOptions}
                    data-oid="n5l8arg"
                  />
                </Box>
              </TabPanel>
              <TabPanel p={6} data-oid="fsiinwd">
                <Box h="400px" position="relative" data-oid="6wsz0lo">
                  <Line
                    data={savingsData}
                    options={lineOptions}
                    data-oid="gkildyv"
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Comparison Chart Section moved to the bottom */}
        {lastMonthStats && (
          <Box bg="white" borderRadius="2xl" shadow="md" border="1px" borderColor="gray.200" p={6} mt={8}>
            <Heading size="sm" mb={4} color="teal.600">This Month vs Last Month (Income, Expenses, Savings)</Heading>
            <Box h="260px" position="relative">
              <Bar
                data={{
                  labels: ["Income", "Expenses", "Savings"],
                  datasets: [
                    {
                      label: "This Month",
                      data: [stats.totalIncome, stats.totalExpenses, stats.netSavings],
                      backgroundColor: "rgba(49, 151, 149, 0.8)",
                      borderRadius: 8,
                      barPercentage: 0.5,
                    },
                    {
                      label: "Last Month",
                      data: [lastMonthStats.totalIncome, lastMonthStats.totalExpenses, lastMonthStats.netSavings],
                      backgroundColor: "rgba(160, 174, 192, 0.7)",
                      borderRadius: 8,
                      barPercentage: 0.5,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top", labels: { usePointStyle: true, font: { size: 12 } } },
                    tooltip: {
                      callbacks: {
                        label: (context) => `ETB ${context.parsed.y.toLocaleString()}`,
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 13 } } },
                    y: { grid: { color: "rgba(0,0,0,0.05)" }, ticks: { font: { size: 12 }, callback: (v) => `ETB ${v}` } },
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Reports;
