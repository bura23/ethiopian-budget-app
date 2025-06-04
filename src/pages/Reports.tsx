import {
  Theme,
  Container,
  Heading,
  Box,
  Text,
  Flex,
  Card,
} from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";
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
} from "chart.js";
import type { ChartData } from "chart.js";
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

interface StyledProps {
  isPositive: boolean;
}

const StyledCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--color-background);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatCard = styled(StyledCard)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
`;

const StatChange = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props: StyledProps) =>
    props.isPositive ? "var(--color-success)" : "var(--color-error)"};
  font-size: 0.875rem;

  &::before {
    content: "${(props: StyledProps) => (props.isPositive ? "↑" : "↓")}";
  }
`;

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
              borderColor: "rgb(34, 197, 94)",
              backgroundColor: "rgba(34, 197, 94, 0.5)",
            },
            {
              label: "Expenses",
              data: statsData.expenseData,
              borderColor: "rgb(239, 68, 68)",
              backgroundColor: "rgba(239, 68, 68, 0.5)",
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
                "rgba(34, 197, 94, 0.6)",
                "rgba(239, 68, 68, 0.6)",
                "rgba(59, 130, 246, 0.6)",
                "rgba(249, 115, 22, 0.6)",
                "rgba(168, 85, 247, 0.6)",
              ],

              borderColor: [
                "rgb(34, 197, 94)",
                "rgb(239, 68, 68)",
                "rgb(59, 130, 246)",
                "rgb(249, 115, 22)",
                "rgb(168, 85, 247)",
              ],

              borderWidth: 1,
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
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.4,
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

  if (isLoading) {
    return (
      <Theme data-oid="o5dw4gd">
        <Container size="4" data-oid="iv00cgk">
          <Flex direction="column" gap="4" py="6" data-oid="g42515s">
            <Heading data-oid="io.q:db">Financial Reports</Heading>
            <Flex justify="center" align="center" py="9" data-oid="3fyqro_">
              <Text data-oid="3-1.i:4">Loading reports...</Text>
            </Flex>
          </Flex>
        </Container>
      </Theme>
    );
  }

  if (error) {
    return (
      <Theme data-oid="83_51do">
        <Container size="4" data-oid="7136j2-">
          <Flex direction="column" gap="4" py="6" data-oid="1:5gsck">
            <Heading data-oid="532_2b9">Financial Reports</Heading>
            <Box
              style={{
                background: "var(--red-3)",
                padding: "1rem",
                borderRadius: "6px",
              }}
              data-oid="cmjf62l"
            >
              <Text color="red" data-oid=":f5p9ab">
                {error}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Theme>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <Theme data-oid="ix6bk0c">
      <Container size="4" data-oid="u0_e2y0">
        <Flex direction="column" gap="6" py="6" data-oid="1vq-nqp">
          <Flex justify="between" align="center" data-oid="wxu4ntr">
            <Heading data-oid="pq:t9nr">Financial Reports</Heading>
            <Select.Root
              value={timeRange}
              onValueChange={setTimeRange}
              data-oid=":7ads__"
            >
              <Select.Trigger data-oid="tsdl565">
                <Select.Value data-oid="4c2-p5o" />
              </Select.Trigger>
              <Select.Content data-oid="khe5wjd">
                <Select.Item value="week" data-oid="z_7nvmr">
                  This Week
                </Select.Item>
                <Select.Item value="month" data-oid="473o9s1">
                  This Month
                </Select.Item>
                <Select.Item value="year" data-oid="lmj.17p">
                  This Year
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="4" wrap="wrap" data-oid=":hozqo5">
            <StatCard style={{ flex: 1 }} data-oid="50ndsho">
              <Text size="2" color="gray" data-oid="o3ryhoy">
                Total Income
              </Text>
              <StatValue data-oid="36t2:yu">
                ETB {stats.totalIncome.toLocaleString()}
              </StatValue>
              <StatChange
                isPositive={stats.incomeChange >= 0}
                data-oid="n33vtrb"
              >
                {Math.abs(stats.incomeChange).toFixed(2)}%
              </StatChange>
            </StatCard>

            <StatCard style={{ flex: 1 }} data-oid="knn0ds2">
              <Text size="2" color="gray" data-oid="hap0h3f">
                Total Expenses
              </Text>
              <StatValue data-oid="trzy3ka">
                ETB {stats.totalExpenses.toLocaleString()}
              </StatValue>
              <StatChange
                isPositive={stats.expenseChange <= 0}
                data-oid="h-f1tpn"
              >
                {Math.abs(stats.expenseChange).toFixed(2)}%
              </StatChange>
            </StatCard>

            <StatCard style={{ flex: 1 }} data-oid="l0rtjam">
              <Text size="2" color="gray" data-oid="1g7x81b">
                Net Savings
              </Text>
              <StatValue data-oid="-unrebh">
                ETB {stats.netSavings.toLocaleString()}
              </StatValue>
              <StatChange
                isPositive={stats.savingsChange >= 0}
                data-oid="nm8m5es"
              >
                {Math.abs(stats.savingsChange).toFixed(2)}%
              </StatChange>
            </StatCard>
          </Flex>

          <Tabs.Root defaultValue="income-expenses" data-oid="1b.0zut">
            <Tabs.List data-oid="luktv41">
              <Tabs.Trigger value="income-expenses" data-oid="gtun2jo">
                Income vs Expenses
              </Tabs.Trigger>
              <Tabs.Trigger value="categories" data-oid="vx2w50:">
                Expense Categories
              </Tabs.Trigger>
              <Tabs.Trigger value="savings" data-oid="s1auvkt">
                Savings Trend
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="income-expenses" data-oid="klwy032">
              <StyledCard style={{ height: "400px" }} data-oid="htdoki-">
                <Bar
                  data={monthlyData}
                  options={chartOptions}
                  data-oid="6baw3j:"
                />
              </StyledCard>
            </Tabs.Content>

            <Tabs.Content value="categories" data-oid="sj.lr-1">
              <StyledCard style={{ height: "400px" }} data-oid="e43rw8o">
                <Doughnut
                  data={categoryData}
                  options={chartOptions}
                  data-oid="zvv.gw."
                />
              </StyledCard>
            </Tabs.Content>

            <Tabs.Content value="savings" data-oid="-i9ayuv">
              <StyledCard style={{ height: "400px" }} data-oid="6jkz_lg">
                <Line
                  data={savingsData}
                  options={chartOptions}
                  data-oid="vjye9a1"
                />
              </StyledCard>
            </Tabs.Content>
          </Tabs.Root>
        </Flex>
      </Container>
    </Theme>
  );
};

export default Reports;
