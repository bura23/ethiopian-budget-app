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
    <Modal isOpen={isOpen} onClose={onClose} data-oid="kq_akqa">
      <ModalOverlay data-oid="48hdgnr" />
      <ModalContent data-oid="gy6c1qv">
        <form onSubmit={handleSubmit} data-oid="a.0:foz">
          <ModalHeader data-oid="5byqdvq">
            {category ? "Edit Category" : "Create Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="jz21wcu" />

          <ModalBody data-oid="qtz5i:8">
            <VStack spacing={4} data-oid="qi6wy3u">
              <FormControl isRequired data-oid="ba58.0r">
                <FormLabel data-oid="ag69-ik">Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  data-oid="q:styvr"
                />
              </FormControl>

              <FormControl isRequired data-oid="z3a_j7z">
                <FormLabel data-oid="an-2hfi">Type</FormLabel>
                <Select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "income" | "expense")
                  }
                  data-oid="eh9rmvm"
                >
                  <option value="expense" data-oid="g.gto4u">
                    Expense
                  </option>
                  <option value="income" data-oid=":3vft_a">
                    Income
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="o3gyvs5">
                <FormLabel data-oid="do5m017">Budget</FormLabel>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Enter budget amount"
                  min="0"
                  step="0.01"
                  data-oid="j_:roox"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid="ws7-15.">
            <Button variant="ghost" mr={3} onClick={onClose} data-oid="5zmp_58">
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isLoading}
              data-oid="5r8e41y"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
