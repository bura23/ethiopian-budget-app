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
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  budget: number;
  spent: number;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, "id" | "spent">) => Promise<void>;
  category: Category | null;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
}: CategoryModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [budget, setBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type);
      setBudget(category.budget.toString());
    } else {
      setName("");
      setType("expense");
      setBudget("");
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave({
        name,
        type,
        budget: parseFloat(budget),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-oid="lujdvy0">
      <ModalOverlay data-oid="8vpe66a" />
      <ModalContent data-oid="ajfthb-">
        <form onSubmit={handleSubmit} data-oid="2zrz___">
          <ModalHeader data-oid="_7t9_y5">
            {category ? "Edit Category" : "Create Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="sjp8num" />

          <ModalBody data-oid="7ozonbz">
            <VStack spacing={4} data-oid="icca:t_">
              <FormControl isRequired data-oid="jot4q5r">
                <FormLabel data-oid="y0nsgl3">Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  data-oid="60n6ozc"
                />
              </FormControl>

              <FormControl isRequired data-oid="--a:4pz">
                <FormLabel data-oid="w_zdpnp">Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "income" | "expense")
                  }
                  data-oid=":yalkcp"
                >
                  <option value="expense" data-oid="k:ek6ww">
                    Expense
                  </option>
                  <option value="income" data-oid="ysgxqr0">
                    Income
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="s3e.kqg">
                <FormLabel data-oid="lqmxhqw">Budget</FormLabel>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                  data-oid="qi:xeek"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid="y40_wck">
            <Button variant="ghost" mr={3} onClick={onClose} data-oid="5-pdl_0">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              data-oid="guef5kj"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
