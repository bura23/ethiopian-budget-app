import {
  Box,
  Stack,
  Text,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
} from "@chakra-ui/react";

interface BudgetOverviewProps {
  totalBudget: number;
  totalExpenses: number;
  currency?: string;
}

const formatETB = (amount: number): string => {
  return new Intl.NumberFormat("am-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amount);
};

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  totalBudget,
  totalExpenses,
  currency = "ETB",
}) => {
  const remaining = totalBudget - totalExpenses;
  const spentPercentage = (totalExpenses / totalBudget) * 100;

  return (
    <Box p={6} bg="white" borderRadius="lg" shadow="sm" data-oid="e:c2yp9">
      <Text fontSize="2xl" fontWeight="bold" mb={6} data-oid="t:peyik">
        Budget Overview
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} data-oid="i1boz8m">
        <Stat data-oid="wcfi680">
          <StatLabel data-oid="4mm0.8g">Total Budget</StatLabel>
          <StatNumber data-oid="uoctjci">{formatETB(totalBudget)}</StatNumber>
          <StatHelpText data-oid="alhuou.">Monthly Budget</StatHelpText>
        </Stat>
        <Stat data-oid="m-kat3q">
          <StatLabel data-oid="r9z0gpd">Total Expenses</StatLabel>
          <StatNumber
            color={spentPercentage > 100 ? "red.500" : "gray.700"}
            data-oid="3je_zpm"
          >
            {formatETB(totalExpenses)}
          </StatNumber>
          <StatHelpText data-oid="l2xz3ym">
            {spentPercentage.toFixed(1)}% spent
          </StatHelpText>
        </Stat>
        <Stat data-oid="wtm99-y">
          <StatLabel data-oid="-s8a336">Remaining</StatLabel>
          <StatNumber
            color={remaining < 0 ? "red.500" : "green.500"}
            data-oid="a7jp0.p"
          >
            {formatETB(remaining)}
          </StatNumber>
          <StatHelpText data-oid="dufzphv">
            {remaining < 0 ? "Over budget" : "Available to spend"}
          </StatHelpText>
        </Stat>
      </Grid>
      <Box mt={6} data-oid=":9kh-zi">
        <Progress
          value={spentPercentage}
          colorScheme={spentPercentage > 100 ? "red" : "teal"}
          size="lg"
          borderRadius="full"
          data-oid="xri3rl7"
        />
      </Box>
    </Box>
  );
};

export default BudgetOverview;
