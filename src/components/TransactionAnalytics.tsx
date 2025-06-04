import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
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
import { Transaction } from "../types/budget";
import { formatETB } from "../utils/currency";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface TransactionAnalyticsProps {
  transactions: Transaction[];
}

const TransactionAnalytics: React.FC<TransactionAnalyticsProps> = ({
  transactions,
}) => {
  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Group transactions by month for the chart
  const monthlyData = transactions.reduce(
    (acc: Record<string, { income: number; expenses: number }>, t) => {
      const monthKey = new Date(t.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      if (!acc[monthKey]) {
        acc[monthKey] = { income: 0, expenses: 0 };
      }
      if (t.type === "INCOME") {
        acc[monthKey].income += t.amount;
      } else {
        acc[monthKey].expenses += t.amount;
      }
      return acc;
    },
    {},
  );

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Income",
        data: Object.values(monthlyData).map((d) => d.income),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
      },
      {
        label: "Expenses",
        data: Object.values(monthlyData).map((d) => d.expenses),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Income vs Expenses (ETB)",
      },
    },
  };

  return (
    <Box data-oid="8fsb537">
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8} data-oid="q681ixz">
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="njjn3zd">
          <StatLabel data-oid="0-vx9n5">Total Income</StatLabel>
          <StatNumber color="green.500" data-oid="q8ogvtc">
            {formatETB(totalIncome)}
          </StatNumber>
          <StatHelpText data-oid="jnk049q">All time income</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="4ru_sx5">
          <StatLabel data-oid="203::2j">Total Expenses</StatLabel>
          <StatNumber color="red.500" data-oid="8kdui64">
            {formatETB(totalExpenses)}
          </StatNumber>
          <StatHelpText data-oid="w-vb3g0">All time expenses</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="t7zfynn">
          <StatLabel data-oid="1:z5m_o">Current Balance</StatLabel>
          <StatNumber
            color={balance >= 0 ? "green.500" : "red.500"}
            data-oid="98s3_sh"
          >
            {formatETB(balance)}
          </StatNumber>
          <StatHelpText data-oid="us1xcn1">Net balance</StatHelpText>
        </Stat>
      </Grid>
      <Box bg="white" p={6} borderRadius="lg" shadow="sm" data-oid="hzv-m0c">
        <Line options={chartOptions} data={chartData} data-oid="54f53ax" />
      </Box>
    </Box>
  );
};

export default TransactionAnalytics;
