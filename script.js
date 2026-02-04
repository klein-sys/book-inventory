// script.js - External JavaScript for Tuy Senior High School Book Inventory System
// Shared functions and page-specific logic

// Shared Utility: Check if user is logged in (basic session check via localStorage or future PHP integration)
function isLoggedIn() {
    return localStorage.getItem('userRole') !== null;  // Placeholder; replace with PHP session check
}

// Shared Utility: Display error messages
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
    setTimeout(() => document.getElementById(elementId).textContent = '', 5000);  // Clear after 5 seconds
}

// Page-Specific: Login Page (for login.html)
if (document.getElementById('login-form')) {  // Check if login form exists
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');

        // Improved email validation on submit
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showError('login-error', 'Please enter a valid email address.');
            }
        });
    });
}

// Page-Specific: Register Page (for register.html)
if (document.getElementById('register-form')) {  // Check if register form exists
    document.addEventListener('DOMContentLoaded', function() {
        const registerForm = document.getElementById('register-form');
        const roleSelect = document.getElementById('role');
        const sectionField = document.getElementById('section-field');

        // Toggle section field based on role selection
        function toggleSection() {
            if (roleSelect.value === 'student') {
                sectionField.style.display = 'block';
            } else {
                sectionField.style.display = 'none';
            }
        }

        // Check on load
        toggleSection();

        // Listen for changes
        roleSelect.addEventListener('change', toggleSection);

        // Improved email validation on submit
        registerForm.addEventListener('submit', function(e) {
            const email = document.getElementById('reg-email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showError('register-error', 'Please enter a valid email address.');
            }
        });
    });
}

// Page-Specific: Dashboard Page (for dashboard.html)
if (document.getElementById('search-bar')) {  // Check for dashboard elements
    document.addEventListener('DOMContentLoaded', function() {
        // Role-based content (placeholder; integrate with PHP for real roles)
        const userRole = localStorage.getItem('userRole') || 'student';  // Simulate; replace with session
        if (userRole === 'admin') {
            document.getElementById('role-specific-content').textContent = 'Manage inventory and view reports.';
            document.getElementById('admin-link').style.display = 'inline';
            document.getElementById('reports-link').style.display = 'inline';
        } else {
            document.getElementById('role-specific-content').textContent = 'View your borrowed books.';
        }

        // Search functionality (basic; expand with AJAX to fetch books)
        document.getElementById('search-bar').addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Placeholder: Filter static results; replace with fetch('/api/search_books.php')
            console.log('Searching for:', query);  // Add real logic later
        });
    });
}

// Page-Specific: Borrow/Return Page (for borrow_return.html)
if (document.getElementById('search-books')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Search books (placeholder)
        document.getElementById('search-books').addEventListener('input', function() {
            // Fetch and display results via AJAX
            console.log('Searching books...');
        });

        // Borrow form toggle
        // Add event listeners for borrow/return buttons as needed
    });
}

// Page-Specific: Book Management Page (for admin_books.html)
if (document.getElementById('add-book-form')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Add book form submission (placeholder)
        document.getElementById('add-book-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('pdf-upload');
            const file = fileInput.files[0];
            if (file && file.type !== 'application/pdf') {
                alert('Please upload a PDF file only.');
                return;
            }
            // Send to PHP via fetch (include file in FormData)
            const formData = new FormData(this);
            console.log('Adding book with PDF...');
            // fetch('/api/add_book.php', { method: 'POST', body: formData });
        });
    });
}

// Page-Specific: Reports Page (for reports.html)
if (document.getElementById('report-filters')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Generate report (placeholder)
        document.getElementById('report-filters').addEventListener('submit', function(e) {
            e.preventDefault();
            // Fetch and display report data
            console.log('Generating report...');
        });
    });
}

// Page-Specific: Profile Page (for profile.html)
if (document.getElementById('edit-profile')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Edit profile (placeholder)
        document.getElementById('edit-profile').addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Updating profile...');
        });
    });
}

// Future Expansions: Add more page-specific code here (e.g., for User Management)
// Example: Real-time updates using fetch for all pages
// fetch('/api/check_notifications.php').then(response => response.json()).then(data => { /* Update UI */ });

