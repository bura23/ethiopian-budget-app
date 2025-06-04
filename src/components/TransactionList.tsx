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
      data-oid="al5ks33"
    >
      {transactions.length === 0 ? (
        <Text p={6} textAlign="center" color="gray.500" data-oid="3928lx-">
          No transactions found
        </Text>
      ) : (
        <Table variant="simple" w="100%" data-oid="e-sb65g">
          <Thead data-oid="h59lyh0">
            <Tr data-oid="y9r2j:x">
              <Th data-oid="4yo:6_b">Date</Th>
              <Th data-oid="xtm.yp4">Description</Th>
              <Th data-oid="ff31avm">Category</Th>
              <Th data-oid="9j7hqr.">Type</Th>
              <Th isNumeric data-oid="iq2kl7o">
                Amount
              </Th>
              <Th data-oid="ih6jzgp">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="c49ajwo">
            {transactions.map((transaction) => (
              <Tr key={transaction.id} data-oid="j449dl-">
                <Td data-oid="m1wvznu">
                  {new Date(transaction.date).toLocaleDateString("am-ET")}
                </Td>
                <Td data-oid="amx4k2l">{transaction.description}</Td>
                <Td data-oid="68.58q5">{transaction.categoryId}</Td>
                <Td data-oid="ogcl5hu">
                  <Badge
                    colorScheme={
                      transaction.type === "INCOME" ? "green" : "red"
                    }
                    borderRadius="full"
                    px={2}
                    data-oid=".02riv_"
                  >
                    {transaction.type}
                  </Badge>
                </Td>
                <Td isNumeric data-oid="j.z4gvg">
                  <Text
                    color={
                      transaction.type === "INCOME" ? "green.500" : "red.500"
                    }
                    fontWeight="medium"
                    data-oid="qv7d9g1"
                  >
                    {formatETB(transaction.amount)}
                  </Text>
                </Td>
                <Td data-oid=".:rc27r">
                  <IconButton
                    aria-label="Edit transaction"
                    icon={<FiEdit2 data-oid="0:h_a85" />}
                    size="sm"
                    mr={2}
                    onClick={() => handleEdit(transaction)}
                    data-oid="qpgo2_0"
                  />

                  <IconButton
                    aria-label="Delete transaction"
                    icon={<FiTrash2 data-oid="9p3_eez" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(transaction.id)}
                    data-oid="kyuzr5a"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose} data-oid="ntexihk">
        <ModalOverlay data-oid="l3jac1j" />
        <ModalContent data-oid="gm_7r97">
          <ModalHeader data-oid="ir5-9i8">Edit Transaction</ModalHeader>
          <ModalCloseButton data-oid="1e-vu4x" />
          <ModalBody pb={6} data-oid="0ze2xa6">
            {editingTransaction && (
              <form onSubmit={handleUpdate} data-oid="xwpcvd3">
                <VStack spacing={4} data-oid="cffa5n6">
                  <FormControl data-oid="-o0w-c-">
                    <FormLabel data-oid="g25jr-k">Amount (ETB)</FormLabel>
                    <NumberInput
                      value={editingTransaction.amount}
                      onChange={(value) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          amount: parseFloat(value) || 0,
                        })
                      }
                      data-oid="w1wn4ee"
                    >
                      <NumberInputField data-oid="jem3grc" />
                    </NumberInput>
                  </FormControl>

                  <FormControl data-oid="xv..xb3">
                    <FormLabel data-oid="9yhj9zt">Type</FormLabel>
                    <Select
                      value={editingTransaction.type}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          type: e.target.value as TransactionType,
                        })
                      }
                      data-oid="mgut0p6"
                    >
                      <option value="EXPENSE" data-oid="rnm0vkf">
                        Expense
                      </option>
                      <option value="INCOME" data-oid="b8mt8ak">
                        Income
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="2don7nw">
                    <FormLabel data-oid="2ftok6r">Category</FormLabel>
                    <Select
                      value={editingTransaction.categoryId}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          categoryId: e.target.value,
                        })
                      }
                      data-oid="_uwr.si"
                    >
                      <option value="groceries" data-oid="ue8mhck">
                        Groceries
                      </option>
                      <option value="transport" data-oid="opjef1o">
                        Transport
                      </option>
                      <option value="utilities" data-oid="70xlxja">
                        Utilities
                      </option>
                      <option value="entertainment" data-oid="8n.n3zg">
                        Entertainment
                      </option>
                      <option value="salary" data-oid="bx4f3y2">
                        Salary
                      </option>
                    </Select>
                  </FormControl>

                  <FormControl data-oid="loi921_">
                    <FormLabel data-oid="t9vodxu">Description</FormLabel>
                    <Input
                      value={editingTransaction.description}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...editingTransaction,
                          description: e.target.value,
                        })
                      }
                      data-oid="eo5-y8d"
                    />
                  </FormControl>

                  <FormControl data-oid="hwa3r3j">
                    <FormLabel data-oid="cktw81h">Date</FormLabel>
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
                      data-oid="rfrdxq3"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="full"
                    data-oid="w7lm.pu"
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
