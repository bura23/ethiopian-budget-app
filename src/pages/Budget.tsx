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
    <Box p={8} data-oid="-30o23n">
      <VStack spacing={6} align="stretch" data-oid="7cian-5">
        <Flex justify="space-between" align="center" data-oid="_m04pzw">
          <Heading size="lg" data-oid="vwoiibr">
            Budget Management
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid="u2j9_em" />}
            colorScheme="teal"
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: "", budget: 0 });
              onOpen();
            }}
            data-oid="qqohruo"
          >
            Add Category
          </Button>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={6}
          mb={6}
          data-oid=":k1_dqf"
        >
          <Card bg="white" shadow="sm" data-oid="57h09mq">
            <CardBody data-oid="mgyh568">
              <Stat data-oid="nvkbi9i">
                <StatLabel color="gray.500" data-oid=".4qllw7">
                  Total Budget
                </StatLabel>
                <StatNumber color="teal.500" data-oid=":x_33sg">
                  ETB {totalBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="u4pz1.h">
                  Monthly allocation
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="d.me.:1">
            <CardBody data-oid="0xx9.i5">
              <Stat data-oid="zwbl4j5">
                <StatLabel color="gray.500" data-oid="c653_bi">
                  Total Spent
                </StatLabel>
                <StatNumber color="blue.500" data-oid="nw.4ux7">
                  ETB {totalSpent.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="sgptqc1">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="40nwe3s">
            <CardBody data-oid="i:nz.3w">
              <Stat data-oid="rg13ga0">
                <StatLabel color="gray.500" data-oid="rkrpst:">
                  Remaining Budget
                </StatLabel>
                <StatNumber
                  color={remainingBudget >= 0 ? "green.500" : "red.500"}
                  data-oid="8yh72uw"
                >
                  ETB {remainingBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="-zfoe2-">
                  Available to spend
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="6pry.i:"
        >
          {categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            return (
              <Card key={category.id} p={4} data-oid="fj8ctci">
                <CardBody data-oid="w7vcya7">
                  <VStack spacing={4} align="stretch" data-oid="cx21m6q">
                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid="k.1063u"
                    >
                      <Heading size="md" data-oid="fd5h9er">
                        {category.name}
                      </Heading>
                      <HStack data-oid="ptfp_4y">
                        <IconButton
                          aria-label="Edit category"
                          icon={<FiEdit2 data-oid="vzo-wn0" />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => handleEdit(category)}
                          data-oid="1e4yhow"
                        />

                        <IconButton
                          aria-label="Delete category"
                          icon={<FiTrash2 data-oid="._g58ig" />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                          data-oid="4ztc.mu"
                        />
                      </HStack>
                    </Flex>

                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid="d-b9qer"
                    >
                      <Box flex="1" mr={4} data-oid="9_9i37v">
                        <Tooltip
                          label={`${percentage.toFixed(1)}% spent`}
                          data-oid="e6.n3fb"
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
                            data-oid="jz9h0h4"
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
                        data-oid="2fjvuo4"
                      >
                        <CircularProgressLabel data-oid="s2:n522">
                          {percentage.toFixed(0)}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Flex>

                    <Flex
                      justify="space-between"
                      color="gray.600"
                      data-oid="fs5lht-"
                    >
                      <Text data-oid="yl8:y13">
                        Spent: ETB {category.spent.toLocaleString()}
                      </Text>
                      <Text data-oid="1qq.17:">
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

      <Modal isOpen={isOpen} onClose={handleClose} size="md" data-oid="_n6w6rl">
        <ModalOverlay data-oid="wzllvt_" />
        <ModalContent data-oid="y:.jmk9">
          <ModalHeader data-oid="amdcopq">
            {editingCategory ? "Edit Category" : "Add Budget Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="faw2chk" />
          <ModalBody pb={6} data-oid="lf0pa7s">
            <VStack spacing={4} data-oid="id.me5o">
              <FormControl data-oid="2496bxg">
                <FormLabel data-oid="olixiw5">Category Name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-oid="x4dovy3"
                />
              </FormControl>

              <FormControl data-oid="x._plpr">
                <FormLabel data-oid="1:ojyj7">Budget Amount (ETB)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.budget}
                  onChange={(_, value) =>
                    setFormData({ ...formData, budget: value })
                  }
                  data-oid=".o0vmy8"
                >
                  <NumberInputField
                    placeholder="Enter budget amount"
                    data-oid="hlk-hye"
                  />
                </NumberInput>
              </FormControl>

              <Button
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
                data-oid="idj0zoa"
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
