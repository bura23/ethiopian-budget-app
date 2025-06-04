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
      data-oid="2vc2mla"
    >
      {transactions.length === 0 ? (
        <Text p={6} textAlign="center" color="gray.500" data-oid="ao8u1rn">
          No transactions found
        </Text>
      ) : (
        <Table variant="simple" w="100%" data-oid="2nnyoao">
          <Thead data-oid="iq44xpa">
            <Tr data-oid="c6n058n">
              <Th data-oid="dke_wy.">Date</Th>
              <Th data-oid="ou-l91u">Description</Th>
              <Th data-oid="q3lfy:3">Category</Th>
              <Th data-oid="680r3kh">Type</Th>
              <Th isNumeric data-oid="o0h7z7b">
                Amount
              </Th>
              <Th data-oid="bjwcx1u">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="nn3ta37">
            {transactions.map((transaction) => (
              <Tr key={transaction.id} data-oid="uyqrl2h">
                <Td data-oid="40-yi.g">
                  {new Date(transaction.date).toLocaleDateString("am-ET")}
                </Td>
                <Td data-oid="69wp38q">{transaction.description}</Td>
                <Td data-oid="xo:2mp-">{transaction.categoryId}</Td>
                <Td data-oid="8jtb-mb">
                  <Badge
                    colorScheme={
                      transaction.type === "INCOME" ? "green" : "red"
                    }
                    borderRadius="full"
                    px={2}
                    data-oid="p17vsf6"
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td isNumeric data-oid="v3lu_v5">
                  <Text
                    color={
                      transaction.type === "INCOME" ? "green.500" : "red.500"
                    }
                    fontWeight="medium"
                    data-oid="-xnjk0d"
                  >
                    {formatETB(transaction.amount)}
                  </Text>
                </Td>
                <Td data-oid="u7q8wpy">
                  <IconButton
                    aria-label="Edit transaction"
                    icon={<FiEdit2 data-oid="zj:d:uv" />}
                    size="sm"
                    mr={2}
                    onClick={() => handleEdit(transaction)}
                    data-oid="3vez2od"
                  />

                  <IconButton
                    aria-label="Delete transaction"
                    icon={<FiTrash2 data-oid="bsyb2a9" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(transaction.id)}
                    data-oid="qneo905"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose} data-oid="q:sd.b9">
        <ModalOverlay data-oid="1rg5lx1" />
        <ModalContent data-oid="139jtng">
          <ModalHeader data-oid=":ftj93z">Edit Transaction</ModalHeader>
          <ModalCloseButton data-oid="x.x6c:m" />
          <ModalBody pb={6} data-oid="2abq7-k">
            {editingTransaction && (
              <form onSubmit={handleUpdate} data-oid=":dbo2-f">
                <VStack spacing={4} data-oid="94lcmlv">
                  <FormControl data-oid="ia9vjo-">
                    <FormLabel data-oid="9ppheqd">Amount (ETB)</FormLabel>
                    <NumberInput
                      value={editingTransaction.amount}
                      onChange={(value) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          amount: parseFloat(value) || 0,
                        })
                      }
                      data-oid="5z.mo7b"
                    >
                      <NumberInputField data-oid="wdvx.61" />
                    </NumberInput>
                  </FormControl>

                  <FormControl data-oid="jnbl-ho">
                    <FormLabel data-oid="kcm-369">Type</FormLabel>
                    <Select
                      value={editingTransaction.type}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          type: e.target.value as TransactionType,
                        })
                      }
                      data-oid="p__3s4s"
                    >
                      <option value="EXPENSE" data-oid="ii.k8ua">
                        Expense
                      </option>
                      <option value="INCOME" data-oid="ke.83hg">
                        Income
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="47zczz.">
                    <FormLabel data-oid="lb.n8tg">Category</FormLabel>
                    <Select
                      value={editingTransaction.categoryId}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          categoryId: e.target.value,
                        })
                      }
                      data-oid="o0zstp:"
                    >
                      <option value="groceries" data-oid="797c3co">
                        Groceries
                      </option>
                      <option value="transport" data-oid="r5ht8:7">
                        Transport
                      </option>
                      <option value="utilities" data-oid="6h6.k6t">
                        Utilities
                      </option>
                      <option value="entertainment" data-oid="rxhb40g">
                        Entertainment
                      </option>
                      <option value="salary" data-oid="24-gz5_">
                        Salary
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="3o001:s">
                    <FormLabel data-oid="f:j7qd9">Description</FormLabel>
                    <Input
                      value={editingTransaction.description}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          description: e.target.value,
                        })
                      }
                      data-oid="qh7bibx"
                    />
                  </FormControl>

                  <FormControl data-oid="2tnn_fx">
                    <FormLabel data-oid="pk_od:0">Date</FormLabel>
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
                      data-oid="9w-sd77"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    data-oid="vt.:mfo"
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
