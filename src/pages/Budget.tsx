import {
  Box,
  Button,
  Grid,
  Heading,
  Progress,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
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
  IconButton,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
} from "@chakra-ui/react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface BudgetCategory {
  id: number;
  name: string;
  budget: number;
  spent: number;
  color: string;
}

const initialCategories: BudgetCategory[] = [
  {
    id: 1,
    name: "Food & Groceries",
    budget: 5000,
    spent: 3750,
    color: "green.400",
  },
  {
    id: 2,
    name: "Transportation",
    budget: 2000,
    spent: 1500,
    color: "blue.400",
  },
  { id: 3, name: "Utilities", budget: 3000, spent: 2800, color: "purple.400" },
  {
    id: 4,
    name: "Entertainment",
    budget: 2000,
    spent: 1200,
    color: "pink.400",
  },
  { id: 5, name: "Shopping", budget: 4000, spent: 3600, color: "orange.400" },
  { id: 6, name: "Healthcare", budget: 3000, spent: 1000, color: "red.400" },
];

const Budget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] =
    useState<BudgetCategory[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    budget: 0,
  });

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (category: BudgetCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      budget: category.budget,
    });
    onOpen();
  };

  const handleSubmit = () => {
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id
            ? { ...cat, name: formData.name, budget: formData.budget }
            : cat,
        ),
      );
    } else {
      // Add new category
      const newCategory: BudgetCategory = {
        id: Date.now(),
        name: formData.name,
        budget: formData.budget,
        spent: 0,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      };
      setCategories([...categories, newCategory]);
    }
    handleClose();
  };

  const handleClose = () => {
    setEditingCategory(null);
    setFormData({ name: "", budget: 0 });
    onClose();
  };

  return (
    <Box p={8} data-oid="zrf-sg8">
      <VStack spacing={6} align="stretch" data-oid="9_.60q2">
        <Flex justify="space-between" align="center" data-oid="eb4-weg">
          <Heading size="lg" data-oid="wlu1j4t">
            Budget Management
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid="ew9r_-3" />}
            colorScheme="teal"
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: "", budget: 0 });
              onOpen();
            }}
            data-oid="r11q-rs"
          >
            Add Category
          </Button>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={6}
          mb={6}
          data-oid="_txildv"
        >
          <Card bg="white" shadow="sm" data-oid="o42r-a4">
            <CardBody data-oid="abqr-8v">
              <Stat data-oid="k15ar0g">
                <StatLabel color="gray.500" data-oid="4nhejmb">
                  Total Budget
                </StatLabel>
                <StatNumber color="teal.500" data-oid="kln2le2">
                  ETB {totalBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="xpehww_">
                  Monthly allocation
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="6n94tqc">
            <CardBody data-oid="b.rm5pg">
              <Stat data-oid="wzatn5-">
                <StatLabel color="gray.500" data-oid="ifu3ogu">
                  Total Spent
                </StatLabel>
                <StatNumber color="blue.500" data-oid="lctmlgh">
                  ETB {totalSpent.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="56yho_0">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="98-xgu7">
            <CardBody data-oid="o.7nza7">
              <Stat data-oid="01me985">
                <StatLabel color="gray.500" data-oid="abv-sy0">
                  Remaining Budget
                </StatLabel>
                <StatNumber
                  color={remainingBudget >= 0 ? "green.500" : "red.500"}
                  data-oid="jwt2t-:"
                >
                  ETB {remainingBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="4a7-zf6">
                  Available to spend
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="q5xumd5"
        >
          {categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            return (
              <Card key={category.id} p={4} data-oid="fwg61b4">
                <CardBody data-oid="rolvrvf">
                  <VStack spacing={4} align="stretch" data-oid=".tefnpr">
                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid="u71bnrz"
                    >
                      <Heading size="md" data-oid="c8.mdt:">
                        {category.name}
                      </Heading>
                      <HStack data-oid="e8qieg8">
                        <IconButton
                          aria-label="Edit category"
                          icon={<FiEdit2 data-oid="54iwvn3" />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => handleEdit(category)}
                          data-oid="ivwpexd"
                        />

                        <IconButton
                          aria-label="Delete category"
                          icon={<FiTrash2 data-oid="rz0.07q" />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                          data-oid="e1qap4q"
                        />
                      </HStack>
                    </Flex>

                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid="il10ih_"
                    >
                      <Box flex="1" mr={4} data-oid="yp62pm8">
                        <Tooltip
                          label={`${percentage.toFixed(1)}% spent`}
                          data-oid="u7sza_k"
                        >
                          <Progress
                            value={percentage}
                            colorScheme={
                              percentage > 90
                                ? "red"
                                : percentage > 75
                                  ? "yellow"
                                  : "green"
                            }
                            height="8px"
                            rounded="full"
                            data-oid="6hk4wbk"
                          />
                        </Tooltip>
                      </Box>
                      <CircularProgress
                        value={percentage}
                        color={
                          percentage > 90
                            ? "red.400"
                            : percentage > 75
                              ? "yellow.400"
                              : "green.400"
                        }
                        size="50px"
                        data-oid="3rd3dyj"
                      >
                        <CircularProgressLabel data-oid=":r728_u">
                          {percentage.toFixed(0)}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Flex>

                    <Flex
                      justify="space-between"
                      color="gray.600"
                      data-oid="o_f1qs5"
                    >
                      <Text data-oid="0hpwx5f">
                        Spent: ETB {category.spent.toLocaleString()}
                      </Text>
                      <Text data-oid="rcpc8ze">
                        Budget: ETB {category.budget.toLocaleString()}
                      </Text>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            );
          })}
        </Grid>
      </VStack>

      <Modal isOpen={isOpen} onClose={handleClose} size="md" data-oid="0w530q:">
        <ModalOverlay data-oid="-yg89dy" />
        <ModalContent data-oid="l41.i.w">
          <ModalHeader data-oid="cnqp2:-">
            {editingCategory ? "Edit Category" : "Add Budget Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="xeh2..w" />
          <ModalBody pb={6} data-oid="z6e7hc3">
            <VStack spacing={4} data-oid="chgjvie">
              <FormControl data-oid="azi.37m">
                <FormLabel data-oid="uuhwjb_">Category Name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-oid="5z.aio_"
                />
              </FormControl>

              <FormControl data-oid="qrtihdi">
                <FormLabel data-oid="lb3k3k2">Budget Amount (ETB)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.budget}
                  onChange={(_, value) =>
                    setFormData({ ...formData, budget: value })
                  }
                  data-oid="v-mk5go"
                >
                  <NumberInputField
                    placeholder="Enter budget amount"
                    data-oid="las530d"
                  />
                </NumberInput>
              </FormControl>

              <Button
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
                data-oid="e22mrhi"
              >
                {editingCategory ? "Update Category" : "Save Category"}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Budget;
