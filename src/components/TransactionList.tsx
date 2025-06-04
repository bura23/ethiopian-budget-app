import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import type { Transaction, TransactionType } from "../types/budget";
import { formatETB } from "../utils/currency";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  onUpdate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    onOpen();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTransaction) {
      onUpdate(editingTransaction);
      onClose();
      setEditingTransaction(null);
    }
  };

  return (
    <Box
      overflowX="auto"
      bg="white"
      borderRadius="lg"
      shadow="sm"
      data-oid="wv1ieq-"
    >
      {transactions.length === 0 ? (
        <Text p={6} textAlign="center" color="gray.500" data-oid="_45n3v.">
          No transactions found
        </Text>
      ) : (
        <Table variant="simple" w="100%" data-oid="2uw-h1q">
          <Thead data-oid="ivwylwa">
            <Tr data-oid="qjyoh4t">
              <Th data-oid="qv8do_q">Date</Th>
              <Th data-oid="k0q950d">Description</Th>
              <Th data-oid="5c:9a0n">Category</Th>
              <Th data-oid=":v1x50x">Type</Th>
              <Th isNumeric data-oid=".g0qoej">
                Amount
              </Th>
              <Th data-oid="8ke85-4">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="6063498">
            {transactions.map((transaction) => (
              <Tr key={transaction.id} data-oid="hkx3lrp">
                <Td data-oid="j554p21">
                  {new Date(transaction.date).toLocaleDateString("am-ET")}
                </Td>
                <Td data-oid="yeingeq">{transaction.description}</Td>
                <Td data-oid="oyablx_">{transaction.categoryId}</Td>
                <Td data-oid="1oxduh4">
                  <Badge
                    colorScheme={
                      transaction.type === "INCOME" ? "green" : "red"
                    }
                    borderRadius="full"
                    px={2}
                    data-oid="vdj1ate"
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td isNumeric data-oid="co1:0lh">
                  <Text
                    color={
                      transaction.type === "INCOME" ? "green.500" : "red.500"
                    }
                    fontWeight="medium"
                    data-oid="u54i749"
                  >
                    {formatETB(transaction.amount)}
                  </Text>
                </Td>
                <Td data-oid="nsm7pl3">
                  <IconButton
                    aria-label="Edit transaction"
                    icon={<FiEdit2 data-oid="1w8526c" />}
                    size="sm"
                    mr={2}
                    onClick={() => handleEdit(transaction)}
                    data-oid="f8zjqly"
                  />

                  <IconButton
                    aria-label="Delete transaction"
                    icon={<FiTrash2 data-oid="mblgw5f" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(transaction.id)}
                    data-oid="b00teft"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose} data-oid="y05:42q">
        <ModalOverlay data-oid="udij3::" />
        <ModalContent data-oid="ru5tr2-">
          <ModalHeader data-oid="0vn1laa">Edit Transaction</ModalHeader>
          <ModalCloseButton data-oid="8vqiu.4" />
          <ModalBody pb={6} data-oid="p9wtqn8">
            {editingTransaction && (
              <form onSubmit={handleUpdate} data-oid="16ya1vh">
                <VStack spacing={4} data-oid="r6asdq3">
                  <FormControl data-oid="3dss5qk">
                    <FormLabel data-oid="hqbmrxb">Amount (ETB)</FormLabel>
                    <NumberInput
                      value={editingTransaction.amount}
                      onChange={(value) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          amount: parseFloat(value) || 0,
                        })
                      }
                      data-oid="jpv6aws"
                    >
                      <NumberInputField data-oid="iubht.s" />
                    </NumberInput>
                  </FormControl>

                  <FormControl data-oid="zcts542">
                    <FormLabel data-oid="3oe57ih">Type</FormLabel>
                    <Select
                      value={editingTransaction.type}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          type: e.target.value as TransactionType,
                        })
                      }
                      data-oid="g9ifbpl"
                    >
                      <option value="EXPENSE" data-oid="o0rhhf8">
                        Expense
                      </option>
                      <option value="INCOME" data-oid="3qbt78s">
                        Income
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="bk-hm8.">
                    <FormLabel data-oid="bk-b99n">Category</FormLabel>
                    <Select
                      value={editingTransaction.categoryId}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          categoryId: e.target.value,
                        })
                      }
                      data-oid="f409ejm"
                    >
                      <option value="groceries" data-oid="ab.6rkj">
                        Groceries
                      </option>
                      <option value="transport" data-oid="105ll.s">
                        Transport
                      </option>
                      <option value="utilities" data-oid="o8-90qe">
                        Utilities
                      </option>
                      <option value="entertainment" data-oid="gyo3hip">
                        Entertainment
                      </option>
                      <option value="salary" data-oid="3zsjx0y">
                        Salary
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="y-3key6">
                    <FormLabel data-oid="7-.yv8l">Description</FormLabel>
                    <Input
                      value={editingTransaction.description}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          description: e.target.value,
                        })
                      }
                      data-oid="cm6rcdj"
                    />
                  </FormControl>

                  <FormControl data-oid="576iygk">
                    <FormLabel data-oid="mx363tm">Date</FormLabel>
                    <Input
                      type="date"
                      value={
                        new Date(editingTransaction.date)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          date: new Date(e.target.value),
                        })
                      }
                      data-oid="1eb3ube"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    data-oid="46ob5wq"
                  >
                    Update Transaction
                  </Button>
                </VStack>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TransactionList;
