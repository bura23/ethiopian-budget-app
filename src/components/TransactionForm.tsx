import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: {
    id?: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    type: "income" | "expense";
  } | null;
  onSubmit: (transaction: any) => void;
}

export default function TransactionForm({
  isOpen,
  onClose,
  transaction,
  onSubmit,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split("T")[0],
    description: transaction?.description || "",
    amount: transaction?.amount || "",
    category: transaction?.category || "",
    type: transaction?.type || "expense",
  });

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onSubmit({
      ...formData,
      id: transaction?.id,
      amount: Number(formData.amount),
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-oid="4zx08p2">
      <ModalOverlay data-oid="kz8-b_y" />
      <ModalContent data-oid="0ypvwt:">
        <ModalHeader data-oid="xzakjnr">
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
        <ModalCloseButton data-oid="3c8ne4u" />
        <form onSubmit={handleSubmit} data-oid="e9f.3i7">
          <ModalBody data-oid="w08619c">
            <VStack spacing={4} data-oid="ofepgv9">
              <FormControl isRequired data-oid="xq8lkz2">
                <FormLabel data-oid="y03f1ih">Date</FormLabel>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  data-oid="zvwng:c"
                />
              </FormControl>

              <FormControl isRequired data-oid="lu3oqbd">
                <FormLabel data-oid="5qmb4qj">Description</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  data-oid="zrpft0u"
                />
              </FormControl>

              <FormControl isRequired data-oid="lr_72a0">
                <FormLabel data-oid="6vwcmf7">Amount (ETB)</FormLabel>
                <NumberInput min={0} data-oid="2jerlk1">
                  <NumberInputField
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    data-oid="nnfcx51"
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired data-oid="q4af0xk">
                <FormLabel data-oid="l5h9v7u">Category</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Select category"
                  data-oid="hh8mxgf"
                >
                  <option value="Food" data-oid="afktodv">
                    Food
                  </option>
                  <option value="Transport" data-oid="np01h64">
                    Transport
                  </option>
                  <option value="Utilities" data-oid="thg1s7r">
                    Utilities
                  </option>
                  <option value="Entertainment" data-oid="xcvv2n_">
                    Entertainment
                  </option>
                  <option value="Shopping" data-oid="-.s5e9w">
                    Shopping
                  </option>
                  <option value="Others" data-oid="68z5go9">
                    Others
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="5_ql:fi">
                <FormLabel data-oid="ihsr3a4">Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "income" | "expense",
                    })
                  }
                  data-oid="l76dl6a"
                >
                  <option value="income" data-oid="wdfz2ms">
                    Income
                  </option>
                  <option value="expense" data-oid="y5vk-ls">
                    Expense
                  </option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid=".1c7.xa">
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              data-oid="odfy7s1"
            >
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit" data-oid="0f78h80">
              {transaction ? "Save Changes" : "Add Transaction"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
