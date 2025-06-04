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
    <Box p={6} bg="white" borderRadius="lg" shadow="sm" data-oid="0yzowdq">
      <Text fontSize="2xl" fontWeight="bold" mb={6} data-oid="k:jfd.p">
        Budget Overview
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} data-oid="iub1vx7">
        <Stat data-oid="lnfk-ud">
          <StatLabel data-oid="uh7lbol">Total Budget</StatLabel>
          <StatNumber data-oid="d2b6.2b">{formatETB(totalBudget)}</StatNumber>
          <StatHelpText data-oid="lzc5euu">Monthly Budget</StatHelpText>
        </Stat>
        <Stat data-oid="md.x.pr">
          <StatLabel data-oid="6_5.gp1">Total Expenses</StatLabel>
          <StatNumber
            color={spentPercentage > 100 ? "red.500" : "gray.700"}
            data-oid="34phora"
          >
            {formatETB(totalExpenses)}
          </StatNumber>
          <StatHelpText data-oid="yv_fs.t">
            {spentPercentage.toFixed(1)}% spent
          </StatHelpText>
        </Stat>
        <Stat data-oid="puzsei:">
          <StatLabel data-oid="w29wdpr">Remaining</StatLabel>
          <StatNumber
            color={remaining < 0 ? "red.500" : "green.500"}
            data-oid="x8n-m3c"
          >
            {formatETB(remaining)}
          </StatNumber>
          <StatHelpText data-oid="k-1x_-z">
            {remaining < 0 ? "Over budget" : "Available to spend"}
          </StatHelpText>
        </Stat>
      </Grid>
      <Box mt={6} data-oid="oar3b_9">
        <Progress
          value={spentPercentage}
          colorScheme={spentPercentage > 100 ? "red" : "teal"}
          size="lg"
          borderRadius="full"
          data-oid="_klvd84"
        />
      </Box>
    </Box>
  );
};

export default BudgetOverview;
