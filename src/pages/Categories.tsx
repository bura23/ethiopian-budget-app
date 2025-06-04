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
  budget: number;
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
    budget: 0,
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
        setNewCategory({ name: "", type: "expense", budget: 0 });
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
      budget: category.budget,
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
        data-oid="3mru1nk"
      >
        <VStack spacing={3} align="stretch" data-oid="50vg-_k">
          <HStack justify="space-between" data-oid="b:rpoxf">
            <Badge
              colorScheme={category.type === "income" ? "green" : "red"}
              size="sm"
              data-oid="e8mvz7q"
            >
              {category.type}
            </Badge>
            <HStack data-oid="xz3tdzj">
              {!isEditing ? (
                <>
                  <IconButton
                    icon={<FiEdit2 data-oid="p9bmaih" />}
                    aria-label="Edit category"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(category.id)}
                    data-oid="laxrl8f"
                  />

                  <IconButton
                    icon={<FiTrash2 data-oid="t7pchux" />}
                    aria-label="Delete category"
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="v80tphe"
                  />
                </>
              ) : (
                <>
                  <IconButton
                    icon={<FiSave data-oid="p9o-0ce" />}
                    aria-label="Save changes"
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={() => handleUpdateCategory(category.id, editData)}
                    data-oid="i6oyqaj"
                  />

                  <IconButton
                    icon={<FiX data-oid="am_5hsk" />}
                    aria-label="Cancel editing"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                    data-oid="0k2lj_w"
                  />
                </>
              )}
            </HStack>
          </HStack>

          {isEditing ? (
            <VStack spacing={2} data-oid="d.uq2j:">
              <FormControl data-oid="-iwyc_2">
                <FormLabel size="sm" data-oid=".kpcm8v">
                  Name
                </FormLabel>
                <Input
                  size="sm"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  data-oid=".hz7p3v"
                />
              </FormControl>
              {category.type === "expense" && (
                <FormControl data-oid="4nr80v7">
                  <FormLabel size="sm" data-oid="rqbqf7c">
                    Budget (ETB)
                  </FormLabel>
                  <Input
                    size="sm"
                    type="number"
                    value={editData.budget}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        budget: Number(e.target.value),
                      })
                    }
                    data-oid="1a89ka-"
                  />
                </FormControl>
              )}
            </VStack>
          ) : (
            <VStack spacing={1} align="start" data-oid="kn4z-pf">
              <Text fontWeight="medium" data-oid="wu9:3ww">
                {category.name}
              </Text>
              {category.type === "expense" && category.budget > 0 && (
                <Text fontSize="sm" color="gray.500" data-oid="coa:.9d">
                  Budget: ETB {category.budget.toLocaleString()}
                </Text>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8} data-oid="wdk_g:g">
        <VStack spacing={8} align="stretch" data-oid="bdpuh7l">
          <Heading data-oid="ptbfbg0">Categories</Heading>
          <Box textAlign="center" py={10} data-oid="blaj59i">
            <Text data-oid=".zwxq6.">Loading categories...</Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} data-oid="a_c309m">
      <VStack spacing={8} align="stretch" data-oid="mclf.22">
        <Heading data-oid="ifmod9y">Manage Categories</Heading>

        {/* Add New Category */}
        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
          data-oid="vy6pyvm"
        >
          <VStack spacing={4} align="stretch" data-oid="jo6meqm">
            <Heading size="md" data-oid="m83_dq9">
              Add New Category
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={4}
              data-oid="p-qed3w"
            >
              <FormControl data-oid="71v.zm5">
                <FormLabel data-oid="y82fn_.">Name</FormLabel>
                <Input
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category name"
                  data-oid="0zly_qp"
                />
              </FormControl>
              <FormControl data-oid="56h3nwo">
                <FormLabel data-oid="g92cj9k">Type</FormLabel>
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
                  data-oid=":4jw6pm"
                >
                  <option value="expense" data-oid="pcv.xcf">
                    Expense
                  </option>
                  <option value="income" data-oid="di3q6a3">
                    Income
                  </option>
                </select>
              </FormControl>
              {newCategory.type === "expense" && (
                <FormControl data-oid="avai30l">
                  <FormLabel data-oid=":fxfd1:">Budget (ETB)</FormLabel>
                  <Input
                    type="number"
                    value={newCategory.budget}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        budget: Number(e.target.value),
                      })
                    }
                    placeholder="0"
                    data-oid="yu-re7:"
                  />
                </FormControl>
              )}
              <Button
                leftIcon={<FiPlus data-oid="f2on05f" />}
                colorScheme="teal"
                onClick={handleCreateCategory}
                alignSelf="end"
                data-oid="6kkjnnq"
              >
                Add Category
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>

        <Divider data-oid="kjlu:1w" />

        {/* Categories Lists */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} data-oid="4e_2zaq">
          {/* Income Categories */}
          <Box data-oid=":zwhozi">
            <Heading size="lg" mb={4} color="green.500" data-oid="vs8z1o5">
              Income Categories (
              {categories.filter((cat) => cat.type === "income").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="p.3a1sa">
              {categories
                .filter((cat) => cat.type === "income")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="331q.fr"
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
                  data-oid="zl4alov"
                >
                  <Text color="gray.500" data-oid="3xp4jy6">
                    No income categories yet
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>

          {/* Expense Categories */}
          <Box data-oid="t3ulc5j">
            <Heading size="lg" mb={4} color="red.500" data-oid="5j1n0lz">
              Expense Categories (
              {categories.filter((cat) => cat.type === "expense").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="94w4m:h">
              {categories
                .filter((cat) => cat.type === "expense")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="edpbwdn"
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
                  data-oid="m-kppr9"
                >
                  <Text color="gray.500" data-oid="1wcwgqn">
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
