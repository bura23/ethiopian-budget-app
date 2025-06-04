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
    <Box data-oid="wx7uz7t">
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8} data-oid="gp5kovf">
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="-bqbcr:">
          <StatLabel data-oid="58ghlbq">Total Income</StatLabel>
          <StatNumber color="green.500" data-oid="bra6dbg">
            {formatETB(totalIncome)}
          </StatNumber>
          <StatHelpText data-oid="z1wgik:">All time income</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="8r1v.wv">
          <StatLabel data-oid="sb4mkxl">Total Expenses</StatLabel>
          <StatNumber color="red.500" data-oid="7nlbivf">
            {formatETB(totalExpenses)}
          </StatNumber>
          <StatHelpText data-oid="t1geraz">All time expenses</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} borderRadius="lg" shadow="sm" data-oid="tddxoqu">
          <StatLabel data-oid="j50b8r_">Current Balance</StatLabel>
          <StatNumber
            color={balance >= 0 ? "green.500" : "red.500"}
            data-oid="d2vso.4"
          >
            {formatETB(balance)}
          </StatNumber>
          <StatHelpText data-oid="tv9cmam">Net balance</StatHelpText>
        </Stat>
      </Grid>
      <Box bg="white" p={6} borderRadius="lg" shadow="sm" data-oid="51aavvo">
        <Line options={chartOptions} data={chartData} data-oid="_-x8lyc" />
      </Box>
    </Box>
  );
};

export default TransactionAnalytics;
