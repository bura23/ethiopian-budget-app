import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from '../src/components/Navigation';
import Register from '../src/pages/Register';
import Footer from '../src/components/Footer';

const RegisterPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navigation />
      <Box p={4} mt={16} flex="1">
        <Register />
      </Box>
      <Footer />
    </Box>
  );
};

export default RegisterPage; 