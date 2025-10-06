const API_URL = 'http://localhost:5000/api';
let authToken = localStorage.getItem('adminToken');
let currentEditId = null;

// Elements
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const loading = document.getElementById('loading');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const adminName = document.getElementById('adminName');
const portfolioTableBody = document.getElementById('portfolioTableBody');
const emptyState = document.getElementById('emptyState');
const addNewBtn = document.getElementById('addNewBtn');
const portfolioModal = document.getElementById('portfolioModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const portfolioForm = document.getElementById('portfolioForm');
const modalTitle = document.getElementById('modalTitle');
const formError = document.getElementById('formError');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        checkAuth();
    } else {
        showLogin();
    }
});

// Show/Hide
function showLogin() {
    loginPage.classList.remove('hidden');
    dashboard.classList.add('hidden');
    loading.classList.add('hidden');
}

function showDashboard() {
    loginPage.classList.add('hidden');
    dashboard.classList.remove('hidden');
    loadPortfolio();
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

// Auth
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            authToken = data.token;
            localStorage.setItem('adminToken', authToken);
            localStorage.setItem('adminName', data.admin.name);
            adminName.textContent = data.admin.name;
            showDashboard();
        } else {
            loginError.textContent = data.message;
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        loginError.textContent = 'Login failed. Please try again.';
        loginError.classList.remove('hidden');
    }
    
    hideLoading();
});

async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            adminName.textContent = data.data.name;
            showDashboard();
        } else {
            logout();
        }
    } catch (error) {
        logout();
    }
}

logoutBtn.addEventListener('click', () => {
    logout();
});

function logout() {
    authToken = null;
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    showLogin();
}

// Load Portfolio
async function loadPortfolio() {
    showLoading();
    
    try {
        const category = categoryFilter.value;
        const status = statusFilter.value;
        
        let url = `${API_URL}/portfolio?`;
        if (category !== 'all') url += `category=${encodeURIComponent(category)}&`;
        if (status !== 'all') url += `status=${status}`;
        
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            renderPortfolio(data.data);
        }
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
    
    hideLoading();
}

function renderPortfolio(items) {
    if (items.length === 0) {
        portfolioTableBody.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    portfolioTableBody.innerHTML = items.map(item => `
        <tr>
            <td><img src="${item.image?.url || '/placeholder.jpg'}" class="portfolio-img" alt="${item.title}"></td>
            <td><strong>${item.title}</strong></td>
            <td>${item.client}</td>
            <td>${item.category}</td>
            <td>${item.year}</td>
            <td><span class="badge badge-${item.status}">${item.status}</span></td>
            <td><span class="badge badge-${item.featured ? 'yes' : 'no'}">${item.featured ? 'Yes' : 'No'}</span></td>
            <td>
                <button onclick="editPortfolio('${item._id}')" class="btn btn-small btn-edit">Edit</button>
                <button onclick="deletePortfolio('${item._id}')" class="btn btn-small btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Filters
categoryFilter.addEventListener('change', loadPortfolio);
statusFilter.addEventListener('change', loadPortfolio);

// Modal
addNewBtn.addEventListener('click', () => {
    currentEditId = null;
    modalTitle.textContent = 'Add New Portfolio';
    portfolioForm.reset();
    document.getElementById('currentImage').classList.add('hidden');
    portfolioModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    portfolioModal.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
    portfolioModal.classList.add('hidden');
});

// Form Submit
portfolioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading();
    formError.classList.add('hidden');
    
    const formData = new FormData();
    formData.append('title', document.getElementById('formTitle').value);
    formData.append('client', document.getElementById('formClient').value);
    formData.append('category', document.getElementById('formCategory').value);
    formData.append('year', document.getElementById('formYear').value);
    formData.append('tags', document.getElementById('formTags').value);
    formData.append('description', document.getElementById('formDescription').value);
    formData.append('challenge', document.getElementById('formChallenge').value);
    formData.append('result', document.getElementById('formResult').value);
    formData.append('color', document.getElementById('formColor').value);
    formData.append('status', document.getElementById('formStatus').value);
    formData.append('featured', document.getElementById('formFeatured').checked);
    
    const imageFile = document.getElementById('formImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const url = currentEditId 
            ? `${API_URL}/portfolio/${currentEditId}`
            : `${API_URL}/portfolio`;
            
        const method = currentEditId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${authToken}` },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            portfolioModal.classList.add('hidden');
            loadPortfolio();
        } else {
            formError.textContent = data.message;
            formError.classList.remove('hidden');
        }
    } catch (error) {
        formError.textContent = 'Failed to save portfolio';
        formError.classList.remove('hidden');
    }
    
    hideLoading();
});

// Edit
async function editPortfolio(id) {
    showLoading();
    currentEditId = id;
    modalTitle.textContent = 'Edit Portfolio';
    
    try {
        const response = await fetch(`${API_URL}/portfolio/${id}`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const item = data.data;
            document.getElementById('formTitle').value = item.title;
            document.getElementById('formClient').value = item.client;
            document.getElementById('formCategory').value = item.category;
            document.getElementById('formYear').value = item.year;
            document.getElementById('formTags').value = item.tags.join(', ');
            document.getElementById('formDescription').value = item.description;
            document.getElementById('formChallenge').value = item.challenge || '';
            document.getElementById('formResult').value = item.result || '';
            document.getElementById('formColor').value = item.color || '';
            document.getElementById('formStatus').value = item.status;
            document.getElementById('formFeatured').checked = item.featured;
            
            if (item.image?.url) {
                document.getElementById('currentImagePreview').src = item.image.url;
                document.getElementById('currentImage').classList.remove('hidden');
            }
            
            portfolioModal.classList.remove('hidden');
        }
    } catch (error) {
        alert('Failed to load portfolio item');
    }
    
    hideLoading();
}

// Delete
async function deletePortfolio(id) {
    if (!confirm('Are you sure you want to delete this portfolio item?')) {
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}/portfolio/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            loadPortfolio();
        } else {
            alert('Failed to delete portfolio');
        }
    } catch (error) {
        alert('Failed to delete portfolio');
    }
    
    hideLoading();
}