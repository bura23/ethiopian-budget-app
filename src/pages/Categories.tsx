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
        data-oid="3jrhy72"
      >
        <VStack spacing={3} align="stretch" data-oid="euo96mi">
          <HStack justify="space-between" data-oid="8zad5ml">
            <Badge
              colorScheme={category.type === "income" ? "green" : "red"}
              size="sm"
              data-oid="-5.ihd."
            >
              {category.type}
            </Badge>
            <HStack data-oid="mu5zcqx">
              {!isEditing ? (
                <>
                  <IconButton
                    icon={<FiEdit2 data-oid="qxeeomp" />}
                    aria-label="Edit category"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(category.id)}
                    data-oid="j7ixy4u"
                  />

                  <IconButton
                    icon={<FiTrash2 data-oid="t:s0esd" />}
                    aria-label="Delete category"
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDeleteCategory(category.id)}
                    data-oid="djxl93c"
                  />
                </>
              ) : (
                <>
                  <IconButton
                    icon={<FiSave data-oid="iuti0i0" />}
                    aria-label="Save changes"
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={() => handleUpdateCategory(category.id, editData)}
                    data-oid="rha33o1"
                  />

                  <IconButton
                    icon={<FiX data-oid=":5-1j3_" />}
                    aria-label="Cancel editing"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                    data-oid="znch1u3"
                  />
                </>
              )}
            </HStack>
          </HStack>

          {isEditing ? (
            <VStack spacing={2} data-oid="o.p0o4s">
              <FormControl data-oid="zmp8v-l">
                <FormLabel size="sm" data-oid="8vuf-.:">
                  Name
                </FormLabel>
                <Input
                  size="sm"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  data-oid="bcwj:oz"
                />
              </FormControl>
              {category.type === "expense" && (
                <FormControl data-oid="0-z3qko">
                  <FormLabel size="sm" data-oid="9-zldzw">
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
                    data-oid="hek4dzt"
                  />
                </FormControl>
              )}
            </VStack>
          ) : (
            <VStack spacing={1} align="start" data-oid="a1csamv">
              <Text fontWeight="medium" data-oid="d.bl1zb">
                {category.name}
              </Text>
              {category.type === "expense" && category.budget > 0 && (
                <Text fontSize="sm" color="gray.500" data-oid="l7bz6tt">
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
      <Container maxW="container.xl" py={8} data-oid="mk7hblp">
        <VStack spacing={8} align="stretch" data-oid="mn_cxx5">
          <Heading data-oid="e2n4b:i">Categories</Heading>
          <Box textAlign="center" py={10} data-oid="kj5fmql">
            <Text data-oid="8z-lj2f">Loading categories...</Text>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8} data-oid="of7cla2">
      <VStack spacing={8} align="stretch" data-oid="pt:pnoy">
        <Heading data-oid="9v.hsdm">Manage Categories</Heading>

        {/* Add New Category */}
        <Box
          p={6}
          bg={bgColor}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          shadow="sm"
          data-oid="u.vj.u_"
        >
          <VStack spacing={4} align="stretch" data-oid="tp3svdb">
            <Heading size="md" data-oid="vi45ubd">
              Add New Category
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={4}
              data-oid="cj2q90g"
            >
              <FormControl data-oid="hao3x0i">
                <FormLabel data-oid="ujd8ok1">Name</FormLabel>
                <Input
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category name"
                  data-oid="7e:trfp"
                />
              </FormControl>
              <FormControl data-oid="7fy-h7f">
                <FormLabel data-oid="3.16ish">Type</FormLabel>
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
                  data-oid="52q.4va"
                >
                  <option value="expense" data-oid="7gzfy7x">
                    Expense
                  </option>
                  <option value="income" data-oid="_0:qq9q">
                    Income
                  </option>
                </select>
              </FormControl>
              {newCategory.type === "expense" && (
                <FormControl data-oid="yd4nigb">
                  <FormLabel data-oid="74m109j">Budget (ETB)</FormLabel>
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
                    data-oid="8bz61gk"
                  />
                </FormControl>
              )}
              <Button
                leftIcon={<FiPlus data-oid="fa61_82" />}
                colorScheme="teal"
                onClick={handleCreateCategory}
                alignSelf="end"
                data-oid="gx211z."
              >
                Add Category
              </Button>
            </SimpleGrid>
          </VStack>
        </Box>

        <Divider data-oid="1d9_uak" />

        {/* Categories Lists */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} data-oid="k-lsyxk">
          {/* Income Categories */}
          <Box data-oid="4oy_5-_">
            <Heading size="lg" mb={4} color="green.500" data-oid="lqw2:g5">
              Income Categories (
              {categories.filter((cat) => cat.type === "income").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="bswxlrj">
              {categories
                .filter((cat) => cat.type === "income")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="t1yacai"
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
                  data-oid="_iuyojy"
                >
                  <Text color="gray.500" data-oid="pwq6bzm">
                    No income categories yet
                  </Text>
                </Box>
              )}
            </SimpleGrid>
          </Box>

          {/* Expense Categories */}
          <Box data-oid="-iltc1e">
            <Heading size="lg" mb={4} color="red.500" data-oid="fp4_sr9">
              Expense Categories (
              {categories.filter((cat) => cat.type === "expense").length})
            </Heading>
            <SimpleGrid columns={1} spacing={4} data-oid="st30.dz">
              {categories
                .filter((cat) => cat.type === "expense")
                .map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    data-oid="10jc7uc"
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
                  data-oid="ltnmv:z"
                >
                  <Text color="gray.500" data-oid="mthjuga">
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
