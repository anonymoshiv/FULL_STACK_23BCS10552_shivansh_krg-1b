// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Set welcome message
    document.getElementById('welcome-message').textContent = 
        `Welcome, ${currentUser.username || currentUser.email}`;

    // Show appropriate dashboard
    showRoleDashboard(currentUser.role);

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});

function showRoleDashboard(role) {
    // Hide all views first
    document.querySelectorAll('.role-view').forEach(view => {
        view.style.display = 'none';
    });

    // Show the correct view
    const roleView = document.getElementById(`${role}-view`);
    if (roleView) {
        roleView.style.display = 'block';
        loadRoleContent(role);
    } else {
        alert('Invalid user role detected!');
        logout();
    }
}

function loadRoleContent(role) {
    switch(role) {
        case 'owner':
            document.getElementById('owner-properties').innerHTML = `
                <div class="property-card">
                    <h3>Sample Property</h3>
                    <p>Status: Active</p>
                </div>
            `;
            break;
            
        case 'tenant':
            document.getElementById('tenant-info').innerHTML = `
                <p>Your current rental: Sample Apartment</p>
                <p>Next payment due: ₹15,000</p>
            `;
            break;
            
        case 'manager':
            document.getElementById('manager-tasks').innerHTML = `
                <div class="task-card">
                    <h3>Pending Approval</h3>
                    <p>Tenant Application: John Doe</p>
                </div>
            `;
            break;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}