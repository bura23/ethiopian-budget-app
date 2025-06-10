import React from 'react';
import { Box } from '@chakra-ui/react';
import Navigation from '../src/components/Navigation';
import Login from '../src/pages/Login';
import Footer from '../src/components/Footer';

const LoginPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navigation />
      <Box p={4} mt={16} flex="1">
        <Login />
      </Box>
      <Footer />
    </Box>
  );
};

export default LoginPage; 