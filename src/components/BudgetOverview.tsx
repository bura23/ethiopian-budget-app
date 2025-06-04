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
    <Box p={6} bg="white" borderRadius="lg" shadow="sm" data-oid="as7mq96">
      <Text fontSize="2xl" fontWeight="bold" mb={6} data-oid="m_j_aq.">
        Budget Overview
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} data-oid="_uxya8b">
        <Stat data-oid="f0avyyf">
          <StatLabel data-oid="kwpm136">Total Budget</StatLabel>
          <StatNumber data-oid=".8908v-">{formatETB(totalBudget)}</StatNumber>
          <StatHelpText data-oid="yq0s9-3">Monthly Budget</StatHelpText>
        </Stat>
        <Stat data-oid="1l05m9-">
          <StatLabel data-oid="nz9clfv">Total Expenses</StatLabel>
          <StatNumber
            color={spentPercentage > 100 ? "red.500" : "gray.700"}
            data-oid="dkt0lnr"
          >
            {formatETB(totalExpenses)}
          </StatNumber>
          <StatHelpText data-oid="r3ejobt">
            {spentPercentage.toFixed(1)}% spent
          </StatHelpText>
        </Stat>
        <Stat data-oid="qy_f2o.">
          <StatLabel data-oid="vnd:152">Remaining</StatLabel>
          <StatNumber
            color={remaining < 0 ? "red.500" : "green.500"}
            data-oid="phhbgwd"
          >
            {formatETB(remaining)}
          </StatNumber>
          <StatHelpText data-oid="gvz8kh7">
            {remaining < 0 ? "Over budget" : "Available to spend"}
          </StatHelpText>
        </Stat>
      </Grid>
      <Box mt={6} data-oid="upv.7a4">
        <Progress
          value={spentPercentage}
          colorScheme={spentPercentage > 100 ? "red" : "teal"}
          size="lg"
          borderRadius="full"
          data-oid="wwb622c"
        />
      </Box>
    </Box>
  );
};

export default BudgetOverview;
