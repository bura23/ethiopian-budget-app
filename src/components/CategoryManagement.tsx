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
    <Box data-oid="dzzevms">
      <VStack spacing={4} align="stretch" data-oid="0ndkzcq">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          data-oid="c_mzhh8"
        >
          <Heading size="md" data-oid="ls1isgc">
            Budget Categories
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid=":h022-z" />}
            colorScheme="teal"
            onClick={openAddModal}
            data-oid="8-siaz4"
          >
            Add Category
          </Button>
        </Box>

        <Table variant="simple" data-oid="zfx4x3_">
          <Thead data-oid="z--ykri">
            <Tr data-oid="i05q_1_">
              <Th data-oid="g:iyg6o">Name</Th>
              <Th isNumeric data-oid="b4j9g_u">
                Budget
              </Th>
              <Th data-oid="5637j5p">Actions</Th>
            </Tr>
          </Thead>
          <Tbody data-oid="lsqz_09">
            {categories.map((category) => (
              <Tr key={category.id} data-oid="xrj9lg:">
                <Td data-oid="xfdcf5y">{category.name}</Td>
                <Td isNumeric data-oid="ejqjhuj">
                  {formatETB(category.budget)}
                </Td>
                <Td data-oid="g2tlktp">
                  <IconButton
                    aria-label="Edit category"
                    icon={<FiEdit2 data-oid=".xz-p3p" />}
                    size="sm"
                    mr={2}
                    onClick={() => openEditModal(category)}
                    data-oid="e23ye7g"
                  />

                  <IconButton
                    aria-label="Delete category"
                    icon={<FiTrash2 data-oid="gd9.d.o" />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="3kl1oek"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} data-oid="3hu4pn-">
        <ModalOverlay data-oid="5px5l:b" />
        <ModalContent data-oid="0_c2c_n">
          <ModalHeader data-oid="g4hj9e8">
            {editingCategory?.id ? "Edit Category" : "Add Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="i2n.a8y" />
          <ModalBody pb={6} data-oid="9qdyoon">
            <form
              onSubmit={
                editingCategory?.id ? handleUpdateCategory : handleAddCategory
              }
              data-oid="_yj..54"
            >
              <VStack spacing={4} data-oid="sydx-y-">
                <FormControl isRequired data-oid="b6srjcw">
                  <FormLabel data-oid="4v:a9mo">Name</FormLabel>
                  <Input
                    value={editingCategory?.name || ""}
                    onChange={(e) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        name: e.target.value,
                      }))
                    }
                    data-oid="nq_55lb"
                  />
                </FormControl>

                <FormControl isRequired data-oid="vxewpkq">
                  <FormLabel data-oid="g3heqt0">Budget (ETB)</FormLabel>
                  <NumberInput
                    value={editingCategory?.budget || 0}
                    onChange={(value) =>
                      setEditingCategory((prev) => ({
                        ...prev!,
                        budget: parseFloat(value) || 0,
                      }))
                    }
                    data-oid="i0sirc6"
                  >
                    <NumberInputField data-oid="98alnnl" />
                  </NumberInput>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  data-oid="nenrps-"
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
