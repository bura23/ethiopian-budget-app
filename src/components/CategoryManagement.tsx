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
    <Box data-oid="ng2r_go">
      <VStack spacing={4} align="stretch" data-oid="3oqp817">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          data-oid="h.sfgee"
        >
          <Heading size="md" data-oid="cg1magi">
            Budget Categories
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid=":si6w6o" />}
            colorScheme="teal"
            onClick={openAddModal}
            data-oid="wpl2dcz"
          >
            Add Category
          </Button>
        </Box>

        <Table variant="simple" data-oid="4uk70_g">
          <Thead data-oid="84mvgg:">
            <Tr data-oid="v-.0aof">
              <Th data-oid="48h64t6">Name</Th>
              <Th isNumeric data-oid="3ipgh2k">
                Budget
              </Th>
              <Th data-oid="7dg6812">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="fr-2rve">
            {categories.map((category) => (
              <Tr key={category.id} data-oid="-4v25.8">
                <Td data-oid="hn5tqoj">{category.name}</Td>
                <Td isNumeric data-oid="1kkryfa">
                  {formatETB(category.budget)}
                </Td>
                <Td data-oid="otwo.nu">
                  <IconButton
                    aria-label="Edit category"
                    icon={<FiEdit2 data-oid="eqbej9x" />}
                    size="sm"
                    mr={2}
                    onClick={() => openEditModal(category)}
                    data-oid="_vd8uq-"
                  />

                  <IconButton
                    aria-label="Delete category"
                    icon={<FiTrash2 data-oid="70qufz9" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="5oa4_dj"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} data-oid="15ueqy0">
        <ModalOverlay data-oid="11lvwks" />
        <ModalContent data-oid="uwgoyre">
          <ModalHeader data-oid="vw6mhs:">
            {editingCategory?.id ? "Edit Category" : "Add Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="eghxmie" />
          <ModalBody pb={6} data-oid="s52dsbx">
            <form
              onSubmit={
                editingCategory?.id ? handleUpdateCategory : handleAddCategory
              }
              data-oid="s_140:1"
            >
              <VStack spacing={4} data-oid="25ypay4">
                <FormControl isRequired data-oid="ib602b_">
                  <FormLabel data-oid="k:wla2d">Name</FormLabel>
                  <Input
                    value={editingCategory?.name || ""}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                    data-oid="v1yx1c6"
                  />
                </FormControl>

                <FormControl isRequired data-oid="g-av_46">
                  <FormLabel data-oid="57scemg">Budget (ETB)</FormLabel>
                  <NumberInput
                    value={editingCategory?.budget || 0}
                    onChange={(value) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        budget: parseFloat(value) || 0,
                      }))
                    }
                    data-oid="8bn6s4x"
                  >
                    <NumberInputField data-oid="ukd4m.3" />
                  </NumberInput>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  data-oid=".s7cnho"
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
