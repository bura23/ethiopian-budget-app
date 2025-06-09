<?php
// Set CORS headers
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get request path and method
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Health check
if ($uri === '/health' || $uri === '/' || $uri === '') {
    echo json_encode([
        'status' => 'OK',
        'message' => 'Ethiopian Budget App PHP API is running',
        'version' => '1.0.0',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit();
}

// API endpoints
if ($uri === '/api' || $uri === '/api/') {
    echo json_encode([
        'status' => 'OK', 
        'message' => 'Ethiopian Budget App API',
        'endpoints' => [
            '/auth/register' => 'User registration',
            '/auth/login' => 'User login',
            '/categories' => 'Category management',
            '/transactions' => 'Transaction management',
            '/reports/stats' => 'Financial reports'
        ]
    ]);
    exit();
}

// Mock responses for development
if (strpos($uri, '/api/auth/register') !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully',
        'token' => 'mock_jwt_token_' . time(),
        'user' => [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]
    ]);
    exit();
}

if (strpos($uri, '/api/auth/login') !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => 'mock_jwt_token_' . time(),
        'user' => [
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com'
        ]
    ]);
    exit();
}

if (strpos($uri, '/api/categories') !== false) {
    echo json_encode([
        'success' => true,
        'categories' => [
            ['id' => 1, 'name' => 'Food', 'type' => 'expense', 'color' => '#FF6B6B'],
            ['id' => 2, 'name' => 'Transportation', 'type' => 'expense', 'color' => '#4ECDC4'],
            ['id' => 3, 'name' => 'Salary', 'type' => 'income', 'color' => '#45B7D1']
        ]
    ]);
    exit();
}

if (strpos($uri, '/api/transactions') !== false) {
    echo json_encode([
        'success' => true,
        'transactions' => []
    ]);
    exit();
}

if (strpos($uri, '/api/reports') !== false) {
    echo json_encode([
        'success' => true,
        'stats' => [
            'total_income' => 50000,
            'total_expenses' => 35000,
            'net_income' => 15000,
            'categories' => []
        ]
    ]);
    exit();
}

// Default 404
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint not found',
    'requested_uri' => $uri
]);
?> 