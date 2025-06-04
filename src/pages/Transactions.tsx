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
    <Container maxW="container.xl" py={6} data-oid="ioc:455">
      <Box mb={6} data-oid="5hrco2a">
        <HStack justify="space-between" mb={6} data-oid="mijs7w5">
          <Heading data-oid="c1y6-8u">Transactions</Heading>
          <Button
            leftIcon={<AddIcon data-oid="ie1_-xw" />}
            colorScheme="teal"
            onClick={handleAddNew}
            data-oid="cthuc:_"
          >
            Add Transaction
          </Button>
        </HStack>
      </Box>

      <Box overflowX="auto" data-oid=":wmudpp">
        <Table variant="simple" data-oid="qhuri7p">
          <Thead data-oid="4s-myo9">
            <Tr data-oid="v1rrtzt">
              <Th data-oid="3_oy-s4">Date</Th>
              <Th data-oid="o7hg4im">Description</Th>
              <Th data-oid="nvwinbr">Category</Th>
              <Th isNumeric data-oid="s:5ik:h">
                Amount (ETB)
              </Th>
              <Th data-oid="r23d50m">Type</Th>
              <Th data-oid="faor2i6">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="bq9qgsf">
            {filteredTransactions.map((transaction) => (
              <Tr key={transaction.id} data-oid="d8g58-c">
                <Td data-oid="pbb7pr1">
                  {new Date(transaction.date).toLocaleDateString()}
                </Td>
                <Td data-oid="020j:kj">{transaction.description}</Td>
                <Td data-oid="9rlg10o">{transaction.category}</Td>
                <Td isNumeric data-oid="hsycdl_">
                  {transaction.amount.toLocaleString()}
                </Td>
                <Td data-oid="7e4sy11">
                  <Badge
                    colorScheme={
                      transaction.type === "income" ? "green" : "red"
                    }
                    data-oid="fhhjv5h"
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td data-oid="wccz-i9">
                  <HStack spacing={2} data-oid="_rvs_ed">
                    <IconButton
                      aria-label="Edit transaction"
                      icon={<EditIcon data-oid="0-_6py_" />}
                      size="sm"
                      onClick={() => handleEdit(transaction)}
                      data-oid="0or3yak"
                    />

                    <IconButton
                      aria-label="Delete transaction"
                      icon={<DeleteIcon data-oid="m:azbgt" />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(transaction.id)}
                      data-oid="g3ty3t9"
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
        data-oid="to22590"
      />
    </Container>
  );
};

export default Transactions;
