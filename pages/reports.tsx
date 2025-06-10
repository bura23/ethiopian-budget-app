import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from '../src/components/Navigation';
import Reports from '../src/pages/Reports';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Footer from '../src/components/Footer';

const ReportsPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navigation />
      <Box p={4} mt={16} flex="1">
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      </Box>
      <Footer />
    </Box>
  );
};

export default ReportsPage; 