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
    <Box p={8} data-oid="tenhoa_">
      <VStack spacing={6} align="stretch" data-oid="ozdayvi">
        <Flex justify="space-between" align="center" data-oid="q2_ehv.">
          <Heading size="lg" data-oid="44khary">
            Budget Management
          </Heading>
          <Button
            leftIcon={<FiPlus data-oid="rux6j-_" />}
            colorScheme="teal"
            onClick={() => {
              setEditingCategory(null);
              setFormData({ name: "", budget: 0 });
              onOpen();
            }}
            data-oid="hld:poe"
          >
            Add Category
          </Button>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={6}
          mb={6}
          data-oid="qfkepc1"
        >
          <Card bg="white" shadow="sm" data-oid="k4tk-ca">
            <CardBody data-oid="4ndy22e">
              <Stat data-oid="st6miss">
                <StatLabel color="gray.500" data-oid="4f:y995">
                  Total Budget
                </StatLabel>
                <StatNumber color="teal.500" data-oid="hd3mssp">
                  ETB {totalBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="5gjvo:l">
                  Monthly allocation
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="s_95qn:">
            <CardBody data-oid="f8zwr.8">
              <Stat data-oid="kxdl06g">
                <StatLabel color="gray.500" data-oid="wxahuqn">
                  Total Spent
                </StatLabel>
                <StatNumber color="blue.500" data-oid=":wob_d9">
                  ETB {totalSpent.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid="vqp.r8i">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg="white" shadow="sm" data-oid="b.ef7bu">
            <CardBody data-oid="i-laxy3">
              <Stat data-oid="42ntpva">
                <StatLabel color="gray.500" data-oid="2e-1p4x">
                  Remaining Budget
                </StatLabel>
                <StatNumber
                  color={remainingBudget >= 0 ? "green.500" : "red.500"}
                  data-oid="d00qpst"
                >
                  ETB {remainingBudget.toLocaleString()}
                </StatNumber>
                <StatHelpText data-oid=".m0l5yn">
                  Available to spend
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          data-oid="b405n8h"
        >
          {categories.map((category) => {
            const percentage = (category.spent / category.budget) * 100;
            return (
              <Card key={category.id} p={4} data-oid="-p0_fx0">
                <CardBody data-oid="qrf0ht-">
                  <VStack spacing={4} align="stretch" data-oid="3p-:n.-">
                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid=".2s1scn"
                    >
                      <Heading size="md" data-oid="exjq0hp">
                        {category.name}
                      </Heading>
                      <HStack data-oid="fuo9xs0">
                        <IconButton
                          aria-label="Edit category"
                          icon={<FiEdit2 data-oid="dg_rj32" />}
                          size="sm"
                          colorScheme="blue"
                          variant="ghost"
                          onClick={() => handleEdit(category)}
                          data-oid="vbay6r6"
                        />

                        <IconButton
                          aria-label="Delete category"
                          icon={<FiTrash2 data-oid="kt38de7" />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDelete(category.id)}
                          data-oid="kq_j52s"
                        />
                      </HStack>
                    </Flex>

                    <Flex
                      justify="space-between"
                      align="center"
                      data-oid="6_fbc6b"
                    >
                      <Box flex="1" mr={4} data-oid="6ia.sye">
                        <Tooltip
                          label={`${percentage.toFixed(1)}% spent`}
                          data-oid=".nybfsp"
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
                            data-oid="8n58ygt"
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
                        data-oid="zlza0on"
                      >
                        <CircularProgressLabel data-oid="pal201p">
                          {percentage.toFixed(0)}%
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Flex>

                    <Flex
                      justify="space-between"
                      color="gray.600"
                      data-oid="dghgwbf"
                    >
                      <Text data-oid="nv5pvv-">
                        Spent: ETB {category.spent.toLocaleString()}
                      </Text>
                      <Text data-oid="u3sda0s">
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

      <Modal isOpen={isOpen} onClose={handleClose} size="md" data-oid="n_fvxae">
        <ModalOverlay data-oid="_ungy5-" />
        <ModalContent data-oid="smrj7ex">
          <ModalHeader data-oid="nm4ai4e">
            {editingCategory ? "Edit Category" : "Add Budget Category"}
          </ModalHeader>
          <ModalCloseButton data-oid="b:n9zkd" />
          <ModalBody pb={6} data-oid="gyd:q36">
            <VStack spacing={4} data-oid="pwdpo60">
              <FormControl data-oid="gdms_3a">
                <FormLabel data-oid="y6krta3">Category Name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-oid=".cnw1gm"
                />
              </FormControl>

              <FormControl data-oid=".md-p60">
                <FormLabel data-oid="8mkwi47">Budget Amount (ETB)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.budget}
                  onChange={(_, value) =>
                    setFormData({ ...formData, budget: value })
                  }
                  data-oid="nz2xnne"
                >
                  <NumberInputField
                    placeholder="Enter budget amount"
                    data-oid="x5w5kul"
                  />
                </NumberInput>
              </FormControl>

              <Button
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
                data-oid="om2e3pq"
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
