import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  List,
  ListItem,
  ListIcon,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiTrendingUp, FiAlertCircle, FiInfo } from "react-icons/fi";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface FinancialData {
  expenses: Array<{
    category: string;
    amount: number;
    total: number;
  }>;
  income: number;
  savings: number;
}

interface AiInsightsProps {
  financialData: FinancialData;
}

export default function AiInsights({ financialData }: AiInsightsProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Move all useColorModeValue calls to the top
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const listItemBg = useColorModeValue("gray.50", "gray.700");
  const listItemHoverBg = useColorModeValue("gray.100", "gray.600");

  const generateInsights = async () => {
    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === "your_gemini_api_key_here") {
        throw new Error("Gemini API key not configured");
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Prepare the financial data for analysis
      const prompt = `
        As a financial advisor, analyze this financial data and provide 3-4 key insights and recommendations:
        
        Monthly Income: ETB ${financialData.income}
        Total Savings: ETB ${financialData.savings}
        
        Expenses by Category:
        ${financialData.expenses
          .map(
            (exp) =>
              `${exp.category}: ETB ${exp.amount} of ${exp.total} (${
                (exp.amount / exp.total) * 100
              }%)`,
          )
          .join("\n")}
        
        Please provide specific, actionable insights about:
        1. Spending patterns and potential areas of concern
        2. Savings rate and recommendations
        3. Budget allocation suggestions
        4. Opportunities for financial improvement
        
        Format each insight as a concise, actionable statement.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Split the response into individual insights
      const insightsList = text
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .slice(0, 4);

      setInsights(insightsList);
    } catch (error) {
      console.error("Error generating insights:", error);
      // Provide fallback insights based on financial data
      const savingsRate = (financialData.savings / financialData.income) * 100;
      const topExpense = financialData.expenses.reduce(
        (max, exp) => (exp.amount > max.amount ? exp : max),
        financialData.expenses[0],
      );

      const fallbackInsights = [
        savingsRate > 20
          ? `Excellent savings rate of ${savingsRate.toFixed(1)}%! You're on track for financial security.`
          : `Consider increasing your savings rate from ${savingsRate.toFixed(1)}% to at least 20% of income.`,
        topExpense
          ? `Your highest expense category is ${topExpense.category} at ETB ${topExpense.amount}. Review if this aligns with your priorities.`
          : "Review your expense categories to identify potential savings opportunities.",
        "Build an emergency fund covering 3-6 months of essential expenses for financial security.",
        "Consider tracking your daily expenses to identify small spending patterns that add up over time.",
      ];

      setInsights(fallbackInsights);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateInsights();
  }, [financialData]);

  return (
    <Box
      p={{ base: 4, md: 6 }}
      bg={bgColor}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      h="100%"
      data-oid="4:jpnmq"
    >
      <Heading size="lg" mb={4} data-oid="_34ec2m">
        AI Financial Insights
      </Heading>
      <Text color={textColor} mb={6} data-oid="w-33xo1">
        Personalized recommendations based on your financial patterns
      </Text>

      {loading ? (
        <Box textAlign="center" py={8} data-oid="80w30k5">
          <Spinner
            size="xl"
            color="teal.500"
            thickness="3px"
            data-oid="oqqnzo0"
          />
          <Text mt={4} color={textColor} data-oid="xri8dt_">
            Analyzing your financial data...
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" spacing={4} data-oid="1322u69">
          <List spacing={4} data-oid="sp:_ke4">
            {insights.map((insight, index) => (
              <ListItem
                key={index}
                display="flex"
                alignItems="flex-start"
                p={3}
                borderRadius="md"
                bg={listItemBg}
                _hover={{ bg: listItemHoverBg }}
                data-oid="ka9jc0z"
              >
                <ListIcon
                  as={
                    index % 3 === 0
                      ? FiTrendingUp
                      : index % 3 === 1
                        ? FiAlertCircle
                        : FiInfo
                  }
                  color="teal.500"
                  boxSize={5}
                  mt={1}
                  data-oid="x6yq_go"
                />

                <Text ml={2} data-oid="q4-w6ci">
                  {insight}
                </Text>
              </ListItem>
            ))}
          </List>
        </VStack>
      )}
    </Box>
  );
}
