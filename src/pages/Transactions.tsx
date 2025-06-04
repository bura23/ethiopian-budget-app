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
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import TransactionForm from "../components/TransactionForm";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-03-01",
    description: "Salary",
    amount: 15000,
    type: "income",
    category: "Salary",
  },
  {
    id: "2",
    date: "2024-03-02",
    description: "Groceries",
    amount: 1200,
    type: "expense",
    category: "Food",
  },
  {
    id: "3",
    date: "2024-03-03",
    description: "Freelance Work",
    amount: 5000,
    type: "income",
    category: "Other Income",
  },
  {
    id: "4",
    date: "2024-03-04",
    description: "Electricity Bill",
    amount: 800,
    type: "expense",
    category: "Utilities",
  },
  {
    id: "5",
    date: "2024-03-05",
    description: "Transport",
    amount: 500,
    type: "expense",
    category: "Transportation",
  },
];

const Transactions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const toast = useToast();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddTransaction = (transaction: any) => {
    if (selectedTransaction) {
      // Edit existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === selectedTransaction.id ? { ...transaction, id: t.id } : t,
        ),
      );
      toast({
        title: "Transaction updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Add new transaction
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(), // Simple ID generation
      };
      setTransactions([newTransaction, ...transactions]);
      toast({
        title: "Transaction added",
        status: "success",
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

  const handleDelete = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast({
      title: "Transaction deleted",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddNew = () => {
    setSelectedTransaction(null);
    onOpen();
  };

  return (
    <Container maxW="container.xl" py={6} data-oid="z..j1qo">
      <Box mb={6} data-oid="yswdm:o">
        <HStack justify="space-between" mb={6} data-oid="s.49oeh">
          <Heading data-oid="by93ijx">Transactions</Heading>
          <Button
            leftIcon={<AddIcon data-oid="5inw09x" />}
            colorScheme="teal"
            onClick={handleAddNew}
            data-oid="caq_zuc"
          >
            Add Transaction
          </Button>
        </HStack>
      </Box>

      <Box overflowX="auto" data-oid="kq8n6o5">
        <Table variant="simple" data-oid="v71kb2l">
          <Thead data-oid=":c39b.t">
            <Tr data-oid="nc7vule">
              <Th data-oid="bmevoia">Date</Th>
              <Th data-oid="8yyjrul">Description</Th>
              <Th data-oid="4o0e1c:">Category</Th>
              <Th isNumeric data-oid="84:drlf">
                Amount (ETB)
              </Th>
              <Th data-oid="n8o0q-s">Type</Th>
              <Th data-oid="soogep6">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="g0ism9-">
            {filteredTransactions.map((transaction) => (
              <Tr key={transaction.id} data-oid=".pu54yz">
                <Td data-oid="r0yh1yd">
                  {new Date(transaction.date).toLocaleDateString()}
                </Td>
                <Td data-oid=":vzqf7a">{transaction.description}</Td>
                <Td data-oid="mkk:09d">{transaction.category}</Td>
                <Td isNumeric data-oid="u7-1se7">
                  {transaction.amount.toLocaleString()}
                </Td>
                <Td data-oid="no3bnsd">
                  <Badge
                    colorScheme={
                      transaction.type === "income" ? "green" : "red"
                    }
                    data-oid="79j4oad"
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td data-oid="xeq1oph">
                  <HStack spacing={2} data-oid="nc_5p00">
                    <IconButton
                      aria-label="Edit transaction"
                      icon={<EditIcon data-oid="uhpar8y" />}
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                      data-oid="49mzy_9"
                    />

                    <IconButton
                      aria-label="Delete transaction"
                      icon={<DeleteIcon data-oid="6:1htl2" />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(transaction.id)}
                      data-oid="rgu.2mq"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <TransactionForm
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onSubmit={handleAddTransaction}
        data-oid="q580x4e"
      />
    </Container>
  );
};

export default Transactions;
