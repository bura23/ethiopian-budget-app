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
    <Modal isOpen={isOpen} onClose={onClose} data-oid="wv7pucb">
      <ModalOverlay data-oid="d:occlc" />
      <ModalContent data-oid=":-mglq2">
        <ModalHeader data-oid="x55vx2c">
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
        <ModalCloseButton data-oid="9j953ng" />
        <form onSubmit={handleSubmit} data-oid="srf0rhf">
          <ModalBody data-oid="kmebty.">
            <VStack spacing={4} data-oid="r91t.ul">
              <FormControl isRequired data-oid="m.nmu22">
                <FormLabel data-oid="f69jx5f">Date</FormLabel>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  data-oid=":56-k.7"
                />
              </FormControl>

              <FormControl isRequired data-oid="llfruo0">
                <FormLabel data-oid="dsmgjxq">Description</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  data-oid="t7_23bj"
                />
              </FormControl>

              <FormControl isRequired data-oid="uterm56">
                <FormLabel data-oid="hgud63o">Amount (ETB)</FormLabel>
                <NumberInput min={0} data-oid="hmu_.kf">
                  <NumberInputField
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    data-oid="31mrxdd"
                  />
                </NumberInput>
              </FormControl>

              <FormControl isRequired data-oid="dmzb6yt">
                <FormLabel data-oid="o3f021b">Category</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Select category"
                  data-oid="w3dx.xf"
                >
                  <option value="Food" data-oid="yu2r_x8">
                    Food
                  </option>
                  <option value="Transport" data-oid="pa0s71v">
                    Transport
                  </option>
                  <option value="Utilities" data-oid="yavam4-">
                    Utilities
                  </option>
                  <option value="Entertainment" data-oid="qtq99c9">
                    Entertainment
                  </option>
                  <option value="Shopping" data-oid="sxthuhd">
                    Shopping
                  </option>
                  <option value="Others" data-oid="57coyd-">
                    Others
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="m0p5kog">
                <FormLabel data-oid="hxk-8wh">Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "income" | "expense",
                    })
                  }
                  data-oid="96r1myd"
                >
                  <option value="income" data-oid="8gmu083">
                    Income
                  </option>
                  <option value="expense" data-oid="f5.pdcv">
                    Expense
                  </option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid="l4vkzu1">
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              data-oid="vu:to7."
            >
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit" data-oid="iu_6ekb">
              {transaction ? "Save Changes" : "Add Transaction"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
