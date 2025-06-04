import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useDisclosure,
  IconButton,
  Badge,
  Text,
  useToast,
  Spinner,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import { transactions } from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  category_name?: string;
}

const Transactions = () => {
  const { refreshReports } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await transactions.getAll();
      if (response.success) {
        setTransactionsList(response.data || []);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast({
        title: "Error",
        description: "Failed to load transactions",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactionsList.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddTransaction = async (transactionData: any) => {
    try {
      let response;
      if (selectedTransaction) {
        // Edit existing transaction
        response = await transactions.update(selectedTransaction.id, {
          categoryId: parseInt(transactionData.categoryId),
          amount: transactionData.amount,
          description: transactionData.description,
          date: transactionData.date,
          type: transactionData.type,
        });
        toast({
          title: "Transaction updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new transaction
        response = await transactions.create({
          categoryId: parseInt(transactionData.categoryId),
          amount: transactionData.amount,
          description: transactionData.description,
          date: transactionData.date,
          type: transactionData.type,
        });
        toast({
          title: "Transaction added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      if (response.success) {
        await loadTransactions();
        refreshReports(); // Refresh reports when transaction is added/updated
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast({
        title: "Error",
        description: "Failed to save transaction",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setSelectedTransaction(null);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await transactions.delete(parseInt(id));
      if (response.success) {
        await loadTransactions();
        refreshReports(); // Refresh reports when transaction is deleted
        toast({
          title: "Transaction deleted",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddNew = () => {
    setSelectedTransaction(null);
    onOpen();
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={6} data-oid="h3teepx">
        <VStack spacing={4} data-oid="j35aiv5">
          <Spinner size="xl" data-oid="hzy9rdv" />
          <Text data-oid="kq.r3y1">Loading transactions...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={6} data-oid="mffioy8">
      <Box mb={6} data-oid="._rlo6-">
        <HStack justify="space-between" mb={6} data-oid="0x5exvw">
          <Heading data-oid="d01_hca">Transactions</Heading>
          <Button
            leftIcon={<AddIcon data-oid="sjechje" />}
            colorScheme="teal"
            onClick={handleAddNew}
            data-oid="7-_7fqh"
          >
            Add Transaction
          </Button>
        </HStack>

        {/* Search and Filter */}
        <HStack spacing={4} mb={4} data-oid="75gs_0d">
          <Box flex="1" data-oid="l6qdrvv">
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<SearchIcon data-oid="p_jmlru" />}
              data-oid="7h13nco"
            />
          </Box>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            width="200px"
            data-oid="opc008-"
          >
            <option value="all" data-oid="ylh7z2o">
              All Types
            </option>
            <option value="income" data-oid="3a58fea">
              Income
            </option>
            <option value="expense" data-oid="udt:jjc">
              Expense
            </option>
          </Select>
        </HStack>
      </Box>

      <Box overflowX="auto" data-oid="3abxjqn">
        {filteredTransactions.length === 0 ? (
          <Text textAlign="center" py={8} color="gray.500" data-oid="51dlq-h">
            No transactions found
          </Text>
        ) : (
          <Table variant="simple" data-oid="taf_myp">
            <Thead data-oid="7110-:3">
              <Tr data-oid="jqi5py5">
                <Th data-oid="1e13hb:">Date</Th>
                <Th data-oid="tgrez5.">Description</Th>
                <Th data-oid="hqz_sd-">Category</Th>
                <Th isNumeric data-oid="3:0pifs">
                  Amount (ETB)
                </Th>
                <Th data-oid="7oi1fld">Type</Th>
                <Th data-oid="6kk-xc2">Actions</Th>
              </Tr>
            </Thead>
            <Tbody data-oid="8-_4ujk">
              {filteredTransactions.map((transaction) => (
                <Tr key={transaction.id} data-oid="1vk6g4j">
                  <Td data-oid="7_0wbis">
                    {new Date(transaction.date).toLocaleDateString()}
                  </Td>
                  <Td data-oid="lbr.m74">{transaction.description}</Td>
                  <Td data-oid="d3rbjod">
                    {transaction.category_name || transaction.category}
                  </Td>
                  <Td isNumeric data-oid="95rnubd">
                    <Text
                      color={
                        transaction.type === "income" ? "green.500" : "red.500"
                      }
                      fontWeight="medium"
                      data-oid="a2gux_2"
                    >
                      {transaction.amount.toLocaleString()}
                    </Text>
                  </Td>
                  <Td data-oid="aqwl3i3">
                    <Badge
                      colorScheme={
                        transaction.type === "income" ? "green" : "red"
                      }
                      data-oid="nps2gkf"
                    >
                      {transaction.type.toUpperCase()}
                    </Badge>
                  </Td>
                  <Td data-oid="tkcaqlx">
                    <HStack spacing={2} data-oid="b0t79m9">
                      <IconButton
                        icon={<EditIcon data-oid="vby5s53" />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEdit(transaction)}
                        aria-label="Edit transaction"
                        data-oid="5a_jg:1"
                      />

                      <IconButton
                        icon={<DeleteIcon data-oid="h6bl9jh" />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDelete(transaction.id)}
                        aria-label="Delete transaction"
                        data-oid="e_8o.i7"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      <TransactionForm
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onSubmit={handleAddTransaction}
        data-oid="6dapn20"
      />
    </Container>
  );
};

export default Transactions;
