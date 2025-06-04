import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import type { Category } from "../types/budget";
import { formatETB } from "../utils/currency";
import {
  getCategories,
  saveCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/storageService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: editingCategory.name,
        color: editingCategory.color || "gray.500",
        budget: editingCategory.budget,
      };
      addCategory(newCategory);
      setCategories((prev) => [...prev, newCategory]);
      toast({
        title: "Category added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      setEditingCategory(null);
    }
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory);
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? editingCategory : c)),
      );
      toast({
        title: "Category updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast({
      title: "Category deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const openAddModal = () => {
    setEditingCategory({
      id: "",
      name: "",
      color: "gray.500",
      budget: 0,
    });
    onOpen();
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    onOpen();
  };

  return (
    <Box data-oid="gx0zej5">
      <VStack spacing={4} align="stretch" data-oid="xm7614-">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          data-oid="ozkwv83"
        >
          <Heading size="md" data-oid="2hlyh7a">
            Budget Categories
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid="we.ruwt" />}
            colorScheme="teal"
            onClick={openAddModal}
            data-oid="wco50g5"
          >
            Add Category
          </Button>
        </Box>

        <Table variant="simple" data-oid="y:_isi6">
          <Thead data-oid="vaq8wd0">
            <Tr data-oid="twm2ox7">
              <Th data-oid="xf6-v_y">Name</Th>
              <Th isNumeric data-oid="t-6rq40">
                Budget
              </Th>
              <Th data-oid="901ixeb">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="x59:u46">
            {categories.map((category) => (
              <Tr key={category.id} data-oid="3qktqk4">
                <Td data-oid="3us17zm">{category.name}</Td>
                <Td isNumeric data-oid="q3:92lf">
                  {formatETB(category.budget)}
                </Td>
                <Td data-oid="9csa70b">
                  <IconButton
                    aria-label="Edit category"
                    icon={<FiEdit2 data-oid="zywfd5-" />}
                    size="sm"
                    mr={2}
                    onClick={() => openEditModal(category)}
                    data-oid="5rcgol5"
                  />

                  <IconButton
                    aria-label="Delete category"
                    icon={<FiTrash2 data-oid="ort6ry2" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="ikohexl"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} data-oid="qsn23.6">
        <ModalOverlay data-oid="qcw90im" />
        <ModalContent data-oid="z4pz:4e">
          <ModalHeader data-oid="_e0zybv">
            {editingCategory?.id ? "Edit Category" : "Add Category"}
          </ModalHeader>
          <ModalCloseButton data-oid=":cnzvuo" />
          <ModalBody pb={6} data-oid="tshwkh6">
            <form
              onSubmit={
                editingCategory?.id ? handleUpdateCategory : handleAddCategory
              }
              data-oid="mvvbm95"
            >
              <VStack spacing={4} data-oid="1j7-hlk">
                <FormControl isRequired data-oid="tznr4.3">
                  <FormLabel data-oid="ff3jd-8">Name</FormLabel>
                  <Input
                    value={editingCategory?.name || ""}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                    data-oid=".60y7-a"
                  />
                </FormControl>

                <FormControl isRequired data-oid="o4iq_el">
                  <FormLabel data-oid="vtbqx70">Budget (ETB)</FormLabel>
                  <NumberInput
                    value={editingCategory?.budget || 0}
                    onChange={(value) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        budget: parseFloat(value) || 0,
                      }))
                    }
                    data-oid="pnwky8e"
                  >
                    <NumberInputField data-oid="zb1kd_s" />
                  </NumberInput>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  data-oid="6r9h6dv"
                >
                  {editingCategory?.id ? "Update Category" : "Add Category"}
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoryManagement;
