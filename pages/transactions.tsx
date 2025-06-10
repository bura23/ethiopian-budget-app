import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from '../src/components/Navigation';
import Transactions from '../src/pages/Transactions';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Footer from '../src/components/Footer';

const TransactionsPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navigation />
      <Box p={4} mt={16} flex="1">
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      </Box>
      <Footer />
    </Box>
  );
};

export default TransactionsPage; 