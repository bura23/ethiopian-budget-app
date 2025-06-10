import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from '../src/components/Navigation';
import Settings from '../src/pages/Settings';
import ProtectedRoute from '../src/components/ProtectedRoute';
import Footer from '../src/components/Footer';

const SettingsPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navigation />
      <Box p={4} mt={16} flex="1">
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Box>
      <Footer />
    </Box>
  );
};

export default SettingsPage; 