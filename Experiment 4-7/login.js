// Store user data in localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Sign Up Form Handling
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const role = document.querySelector('input[name="role"]:checked').value;
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            alert('Email already registered!');
            return;
        }
        
        // Add new user
        users.push({ username, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please sign in.');
        window.location.href = 'login.html';
    });
}

// Sign In Form Handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailOrUsername = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Find user
        const user = users.find(u => 
            (u.email === emailOrUsername || u.username === emailOrUsername) && 
            u.password === password
        );
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            // Redirect to dashboard (you'll need to create this)
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials!');
        }
    });
}
// Add this to your existing login form handler
if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html'; // Redirect after successful login
} else {
    alert('Invalid credentials!');
}