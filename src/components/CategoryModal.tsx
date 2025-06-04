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
    <Modal isOpen={isOpen} onClose={onClose} data-oid="wjeuw1k">
      <ModalOverlay data-oid="-kxhl5p" />
      <ModalContent data-oid="6gu_qb8">
        <form onSubmit={handleSubmit} data-oid="c.ct5g7">
          <ModalHeader data-oid="h3ddn3-">
            {category ? "Edit Category" : "Create Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="nyb10w0" />

          <ModalBody data-oid="hywmc2p">
            <VStack spacing={4} data-oid="jy2if9j">
              <FormControl isRequired data-oid="mcfupit">
                <FormLabel data-oid="5lda7op">Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  data-oid="zmld3iy"
                />
              </FormControl>

              <FormControl isRequired data-oid="meyy-ol">
                <FormLabel data-oid="qnbdw_v">Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "income" | "expense")
                  }
                  data-oid="8l-xrun"
                >
                  <option value="expense" data-oid=":jdra1b">
                    Expense
                  </option>
                  <option value="income" data-oid="5d7s4b6">
                    Income
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="2g9ebyr">
                <FormLabel data-oid="i7km.:e">Budget</FormLabel>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                  data-oid="-vkv:p5"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid="xkdvjn0">
            <Button variant="ghost" mr={3} onClick={onClose} data-oid="76bpiz4">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              data-oid="vbtdk-o"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
