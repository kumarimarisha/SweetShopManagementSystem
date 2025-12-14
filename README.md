project:
  name: Sweet Shop Management System
  description: >
    A full-stack web application for managing a sweet shop's inventory,
    sales, and user management.

features:
  - User authentication (Login/Register)
  - Role-based access control (Admin/User)
  - Product management (Add/Edit/Delete sweets)
  - Inventory management
  - Shopping cart functionality
  - Responsive design

tech_stack:
  frontend:
    - React
    - Redux
    - Material-UI
  backend:
    - Node.js
    - Express
    - Firebase Firestore
    - Firebase Authentication
  testing:
    - Jest
    - Supertest
  version_control:
    - Git
    - GitHub

setup_instructions:
  prerequisites:
    - Node.js v14+
    - npm or yarn
    - Firebase project with Firestore and Authentication enabled

backend_setup:
  install_dependencies:
    command: npm install
  environment_variables:
    FIREBASE_PROJECT_ID: your-project-id
    FIREBASE_CLIENT_EMAIL: your-client-email
    FIREBASE_PRIVATE_KEY: your-private-key
  start_server:
    command: npm start

frontend_setup:
  navigate_to_directory:
    command: cd ../src
  install_dependencies:
    command: npm install
  environment_variables:
    REACT_APP_FIREBASE_API_KEY: your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN: your-project.firebaseapp.com
    REACT_APP_FIREBASE_PROJECT_ID: your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET: your-bucket.appspot.com
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: your-sender-id
    REACT_APP_FIREBASE_APP_ID: your-app-id
  start_server:
    command: npm start

tests:
  backend:
    command: npm test
  frontend:
    command: npm test

screenshots:
  dashboard: images/Dashboard.png
  admin_panel: images/AdminPanel.png
  login_form: images/LoginForm.png
  register_form: images/SignUpForm.png
  cart: images/Cart.png
  test_coverage_report: images/Test.png

ai_usage:
  tools_used:
    - GitHub Copilot
  how_ai_was_used:
    debugging_assistance:
      - Identified and fixed errors in the codebase
      - Suggested error-handling patterns and best practices
    test_development:
      - Generated unit tests for backend controllers
      - Created test cases for multiple scenarios including edge cases
    api_development:
      - Suggested RESTful endpoint structures
      - Assisted with authentication and authorization middleware
    code_optimization:
      - Suggested efficient algorithms and coding patterns
      - Recommended better code organization and structure
  impact_on_workflow:
    productivity: Reduced time spent on boilerplate code
    learning: Helped understand new patterns and best practices
    quality: Improved code quality through consistent patterns and error handling
    problem_solving: Provided alternative approaches to complex problems

author:
  name: Kumari Marisha
  role: Frontend & Full-Stack Developer

