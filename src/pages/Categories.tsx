import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  useToast,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Divider,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FiTrash2, FiPlus, FiEdit2, FiSave, FiX } from "react-icons/fi";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";

interface Category {
  id: string;
  name: string;
  type: "expense" | "income";
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    type: "expense" as "expense" | "income",
  });
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = (await getCategories()) as ApiResponse<Category[]>;
      if (data && Array.isArray(data)) {
        setCategories(data);
      } else if (data.data && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const data = (await createCategory(newCategory)) as ApiResponse<Category>;
      if (data.data) {
        setCategories([...categories, data.data]);
        setNewCategory({ name: "", type: "expense" });
        toast({
          title: "Success",
          description: "Category created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCategory = async (
    id: string,
    updates: Partial<Category>,
  ) => {
    try {
      await updateCategory(id, updates);
      setCategories((cats) =>
        cats.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)),
      );
      setEditingId(null);
      toast({
        title: "Success",
        description: "Category updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((cats) => cats.filter((cat) => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const CategoryCard = ({ category }: { category: Category }) => {
    const [editData, setEditData] = useState({
      name: category.name,
    });
    const isEditing = editingId === category.id;
    return (
      <Box
        p={4}
        bg={bgColor}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        shadow="sm"
        data-oid="8a722z6"
      >
        <VStack spacing={3} align="stretch" data-oid="hsnehk6">
          <HStack justify="space-between" data-oid="rb47i9t">
            <Badge
              colorScheme={category.type === "income" ? "green" : "red"}
              size="sm"
              data-oid="9bhwirf"
            >
              {category.type}
            </Badge>
            <HStack data-oid="7jnuler">
              {!isEditing ? (
                <>
                  <IconButton
                    icon={<FiEdit2 data-oid="x.m8tv8" />}
                    aria-label="Edit category"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(category.id)}
                    data-oid="lhphsrt"
                  />
                  <IconButton
                    icon={<FiTrash2 data-oid=":ox5wm." />}
                    aria-label="Delete category"
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="z3kge03"
                  />
                </>
              ) : (
                <>
                  <IconButton
                    icon={<FiSave data-oid="0cr6_bb" />}
                    aria-label="Save changes"
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={() => handleUpdateCategory(category.id, editData)}
                    data-oid="p4c7.8r"
                  />
                  <IconButton
                    icon={<FiX data-oid="gr4oi34" />}
                    aria-label="Cancel editing"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                    data-oid="6d1-.sx"
                  />
                </>
              )}
            </HStack>
          </HStack>
          {isEditing ? (
            <VStack spacing={2} data-oid="wutsncx">
              <FormControl data-oid="g:cf:c8">
                <FormLabel size="sm" data-oid="1y4b_5:">
                  Name
                </FormLabel>
                <Input
                  size="sm"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  data-oid="cekt:4q"
                />
              </FormControl>
            </VStack>
          ) : (
            <VStack spacing={1} align="start" data-oid="1ko6su4">
              <Text fontWeight="medium" data-oid="djks:nc">
                {category.name}
              </Text>
            </VStack>
          )}
        </VStack>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8} data-oid="iqjen6e">
        <VStack spacing={8} align="stretch" data-oid="l3te9_9">
          <Heading data-oid="glniudp">Categories</Heading>
          <Box textAlign="center" py={10} data-oid="qgl20ak">
            <Text data-oid="8avye3h">Loading categories...</Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} data-oid="8gh8z0q">
      <VStack spacing={8} align="stretch" data-oid="ekzxput">
        <Heading data-oid=":ulinzv">Manage Categories</Heading>

        {/* Add New Category */}
        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
          data-oid="ncfohog"
        >
          <VStack spacing={4} align="stretch" data-oid="u0zuqyf">
            <Heading size="md" data-oid="oxp_uhe">
              Add New Category
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={4}
              data-oid="s_kn3wa"
            >
              <FormControl data-oid="q-a9z1.">
                <FormLabel data-oid="4npbwi8">Name</FormLabel>
                <Input
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category name"
                  data-oid="lkd.lxr"
                />
              </FormControl>
              <FormControl data-oid="3dex704">
                <FormLabel data-oid="_a9a.jh">Type</FormLabel>
                <select
                  value={newCategory.type}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      type: e.target.value as "expense" | "income",
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid",
                    borderColor: "inherit",
                    borderRadius: "6px",
                    backgroundColor: "inherit",
                  }}
                  data-oid="ktwgelx"
                >
                  <option value="expense" data-oid="-w-ou38">
                    Expense
                  </option>
                  <option value="income" data-oid="qo4hun7">
                    Income
                  </option>
                </select>
              </FormControl>
              <Button
                leftIcon={<FiPlus data-oid="pvrwlso" />}
                colorScheme="teal"
                onClick={handleCreateCategory}
                alignSelf="end"
                data-oid="cb3i6q1"
              >
                Add Category
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>

        <Divider data-oid="ug0mfpu" />

        {/* Categories Lists */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} data-oid=".uxpjc3">
          {/* Income Categories */}
          <Box data-oid="8zwvpxe">
            <Heading size="lg" mb={4} color="green.500" data-oid="005oxtz">
              Income Categories (
              {categories.filter((cat) => cat.type === "income").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="u44nemw">
              {categories
                .filter((cat) => cat.type === "income")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="h3zu51l"
                  />
                ))}
              {categories.filter((cat) => cat.type === "income").length ===
                0 && (
                <Box
                  p={8}
                  textAlign="center"
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor={borderColor}
                  borderRadius="lg"
                  data-oid="5g.t5gt"
                >
                  <Text color="gray.500" data-oid=":kkg09i">
                    No income categories yet
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>

          {/* Expense Categories */}
          <Box data-oid="ks0wff0">
            <Heading size="lg" mb={4} color="red.500" data-oid="j.xrrb3">
              Expense Categories (
              {categories.filter((cat) => cat.type === "expense").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="2dfbfsn">
              {categories
                .filter((cat) => cat.type === "expense")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="c9aux5z"
                  />
                ))}
              {categories.filter((cat) => cat.type === "expense").length ===
                0 && (
                <Box
                  p={8}
                  textAlign="center"
                  borderWidth="2px"
                  borderStyle="dashed"
                  borderColor={borderColor}
                  borderRadius="lg"
                  data-oid="4bees4s"
                >
                  <Text color="gray.500" data-oid="psk67be">
                    No expense categories yet
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Categories;
