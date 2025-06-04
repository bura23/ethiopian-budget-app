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

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    loadData();
  }, [timeRange]);

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
      <Container maxW="container.xl" py={8} data-oid="ozmrted">
        <VStack spacing={8} align="stretch" data-oid="lcvet4:">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            textAlign="center"
            data-oid=".dgevou"
          >
            Financial Reports
          </Heading>
          <Flex justify="center" align="center" py={20} data-oid="g067teu">
            <Box
              p={8}
              borderRadius="lg"
              bg={cardBg}
              shadow="lg"
              textAlign="center"
              data-oid="u7qio_y"
            >
              <Text fontSize="lg" color="gray.500" data-oid="jsz8kim">
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
      <Container maxW="container.xl" py={8} data-oid="iadrgak">
        <VStack spacing={8} align="stretch" data-oid="vvmq4wk">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            textAlign="center"
            data-oid="bj9x10s"
          >
            Financial Reports
          </Heading>
          <Box
            p={6}
            borderRadius="lg"
            bg="red.50"
            border="1px"
            borderColor="red.200"
            data-oid="bz:6t7q"
          >
            <Text
              color="red.600"
              fontSize="lg"
              fontWeight="medium"
              data-oid="4hgv_ew"
            >
              {error}
            </Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} data-oid="juvns.4">
      <VStack spacing={8} align="stretch" data-oid="h0owzin">
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
          data-oid="006.r92"
        >
          <Heading
            size="2xl"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            data-oid="17gca2t"
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
            data-oid="6i6c01_"
          >
            <option value="week" data-oid="bftizgv">
              This Week
            </option>
            <option value="month" data-oid="2.759sm">
              This Month
            </option>
            <option value="year" data-oid="dm.-99u">
              This Year
            </option>
          </Select>
        </Flex>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}
          data-oid="h5loyad"
        >
          <Box
            p={6}
            borderRadius="2xl"
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            data-oid="we21ub-"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="pbjwi07"
            />

            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="wvb9_ep"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.800"
                fontWeight="medium"
                data-oid="29qrtco"
              >
                Total Income
              </Text>
              <Text fontSize="3xl" fontWeight="bold" data-oid="k52lif1">
                ETB {stats.totalIncome.toLocaleString()}
              </Text>
              <HStack data-oid="pqwpa.q">
                <Badge
                  colorScheme={stats.incomeChange >= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="q1l:frp"
                >
                  {stats.incomeChange >= 0 ? "↗" : "↘"}{" "}
                  {Math.abs(stats.incomeChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>

          <Box
            p={6}
            borderRadius="2xl"
            bg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            color="white"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            data-oid="qnyxa81"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="tac8unc"
            />

            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="1bbgj_s"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.800"
                fontWeight="medium"
                data-oid="zzwwfz_"
              >
                Total Expenses
              </Text>
              <Text fontSize="3xl" fontWeight="bold" data-oid="_5:t.ll">
                ETB {stats.totalExpenses.toLocaleString()}
              </Text>
              <HStack data-oid="19auk8n">
                <Badge
                  colorScheme={stats.expenseChange <= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="kpf.n-p"
                >
                  {stats.expenseChange <= 0 ? "↗" : "↘"}{" "}
                  {Math.abs(stats.expenseChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>

          <Box
            p={6}
            borderRadius="2xl"
            bg="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            color="white"
            shadow="xl"
            position="relative"
            overflow="hidden"
            _hover={{ transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
            data-oid="9xwe-m5"
          >
            <Box
              position="absolute"
              top="-10"
              right="-10"
              w="20"
              h="20"
              bg="whiteAlpha.200"
              borderRadius="full"
              data-oid="gr_dzhm"
            />

            <VStack
              align="start"
              spacing={3}
              position="relative"
              zIndex={1}
              data-oid="n9vjcp_"
            >
              <Text
                fontSize="sm"
                color="whiteAlpha.800"
                fontWeight="medium"
                data-oid="tu4-npv"
              >
                Net Savings
              </Text>
              <Text fontSize="3xl" fontWeight="bold" data-oid="7z-084h">
                ETB {stats.netSavings.toLocaleString()}
              </Text>
              <HStack data-oid="zg3ucvo">
                <Badge
                  colorScheme={stats.savingsChange >= 0 ? "green" : "red"}
                  fontSize="xs"
                  borderRadius="full"
                  px={2}
                  data-oid="bx.gw80"
                >
                  {stats.savingsChange >= 0 ? "↗" : "↘"}{" "}
                  {Math.abs(stats.savingsChange).toFixed(1)}%
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>

        <Box
          bg={cardBg}
          borderRadius="2xl"
          shadow="xl"
          overflow="hidden"
          border="1px"
          borderColor={borderColor}
          data-oid=":87toxi"
        >
          <Tabs colorScheme="teal" variant="enclosed" data-oid="lsahe7.">
            <TabList bg="gray.50" px={4} data-oid="5nfjbty">
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="xn3t1wf"
              >
                Income vs Expenses
              </Tab>
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="94hnop7"
              >
                Expense Categories
              </Tab>
              <Tab
                fontWeight="medium"
                _selected={{ bg: "teal.500", color: "white" }}
                data-oid="4iqfx.t"
              >
                Savings Trend
              </Tab>
            </TabList>

            <TabPanels data-oid="j1vm5ws">
              <TabPanel p={6} data-oid="e73d8_5">
                <Box h="400px" position="relative" data-oid="cfquouh">
                  <Bar
                    data={monthlyData}
                    options={chartOptions}
                    data-oid="dfyfg8j"
                  />
                </Box>
              </TabPanel>

              <TabPanel p={6} data-oid="w-eln-r">
                <Box h="400px" position="relative" data-oid="v0g.l0e">
                  <Doughnut
                    data={categoryData}
                    options={doughnutOptions}
                    data-oid="60ktf7d"
                  />
                </Box>
              </TabPanel>

              <TabPanel p={6} data-oid="3zu2bbt">
                <Box h="400px" position="relative" data-oid=".eeqlpb">
                  <Line
                    data={savingsData}
                    options={lineOptions}
                    data-oid="kbyqtdv"
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Container>
  );
};

export default Reports;
