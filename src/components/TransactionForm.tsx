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
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCategories } from "../services/api";

interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
}

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: {
    id?: string;
    date: string;
    description: string;
    amount: number;
    category_id?: number;
    categoryId?: number;
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
    categoryId: transaction?.category_id || transaction?.categoryId || "",
    type: transaction?.type || "expense",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: transaction.date || new Date().toISOString().split("T")[0],
        description: transaction.description || "",
        amount: transaction.amount || "",
        categoryId: transaction.category_id || transaction.categoryId || "",
        type: transaction.type || "expense",
      });
    } else {
      setFormData({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        categoryId: "",
        type: "expense",
      });
    }
  }, [transaction]);

  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await getCategories() as { success: boolean; data?: Category[] };
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.categoryId) {
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
      categoryId: Number(formData.categoryId),
    });
    onClose();
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    setFormData({ 
      ...formData, 
      type: newType,
      categoryId: "" // Reset category when type changes
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} data-oid="-bmh3fp">
      <ModalOverlay data-oid="ru3h3g2" />
      <ModalContent data-oid="pd_fxsl">
        <ModalHeader data-oid="gwew9js">
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
        <ModalCloseButton data-oid="scyn9as" />
        <form onSubmit={handleSubmit} data-oid="pryj.l8">
          <ModalBody data-oid="mppjav7">
            <VStack spacing={4} data-oid="0hwooa8">
              <FormControl isRequired data-oid="b2c-1q2">
                <FormLabel data-oid="h7fmnzq">Date</FormLabel>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  data-oid="v50zsc1"
                />
              </FormControl>

              <FormControl isRequired data-oid="hoe8my_">
                <FormLabel data-oid="hatp438">Type</FormLabel>
                <Select
                  value={formData.type}
                  onChange={(e) =>
                    handleTypeChange(e.target.value as "income" | "expense")
                  }
                  data-oid="gtz8be-"
                >
                  <option value="income" data-oid="4lzcbwl">
                    Income
                  </option>
                  <option value="expense" data-oid="kx9t1kn">
                    Expense
                  </option>
                </Select>
              </FormControl>

              <FormControl isRequired data-oid="88:9vk:">
                <FormLabel data-oid="5obn5ac">Category</FormLabel>
                <Select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  placeholder="Select category"
                  data-oid="l7j70uf"
                  disabled={isLoadingCategories}
                >
                  {isLoadingCategories ? (
                    <option>Loading categories...</option>
                  ) : (
                    filteredCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </Select>
                {isLoadingCategories && <Spinner size="sm" mt={2} />}
              </FormControl>

              <FormControl isRequired data-oid="vr92_.w">
                <FormLabel data-oid="n-rd:m0">Description</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  data-oid="us1vs0_"
                />
              </FormControl>

              <FormControl isRequired data-oid="ne36imo">
                <FormLabel data-oid="ufat_f6">Amount (ETB)</FormLabel>
                <NumberInput min={0} data-oid="n2e20st">
                  <NumberInputField
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="Enter amount"
                    data-oid="z4ra.8t"
                  />
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter data-oid="etroe2l">
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              data-oid="vvbwtm2"
            >
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit" data-oid="u227zbb">
              {transaction ? "Save Changes" : "Add Transaction"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
