// script.js - External JavaScript for Tuy Senior High School Book Inventory System
// Shared functions and page-specific logic

// Import Firebase modules from firebase.js
import { auth, db, storage } from './firebase/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';

// Shared Utility: Check if user is logged in
function isLoggedIn() {
    return auth.currentUser !== null;
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        localStorage.setItem('userRole', 'user'); // Placeholder, load from Firestore
    } else {
        // User is signed out
        localStorage.removeItem('userRole');
        if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('admin_books.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Logout function
function logout() {
    signOut(auth).then(() => {
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Logout error:', error);
    });
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

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('login-error', 'Please enter a valid email address.');
                return;
            }
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    showError('login-error', error.message);
                });
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

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const name = document.getElementById('name').value;
            const role = roleSelect.value;
            const section = role === 'student' ? document.getElementById('section').value : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('register-error', 'Please enter a valid email address.');
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    // Add user to Firestore
                    await addDoc(collection(db, 'users'), {
                        uid: user.uid,
                        email: email,
                        name: name,
                        role: role,
                        section: section
                    });
                    window.location.href = 'dashboard.html';
                })
                .catch((error) => {
                    showError('register-error', error.message);
                });
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
        document.getElementById('add-book-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const fileInput = document.getElementById('pdf-upload');
            const file = fileInput.files[0];
            if (file && file.type !== 'application/pdf') {
                alert('Please upload a PDF file only.');
                return;
            }

            let pdfUrl = '';
            if (file) {
                const storageRef = ref(storage, `books/${file.name}`);
                await uploadBytes(storageRef, file);
                pdfUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'books'), {
                title: title,
                author: author,
                pdfUrl: pdfUrl,
                available: true
            });

            alert('Book added successfully!');
            this.reset();
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

