/**
 * auth.js
 * Handles authentication for UMKM Gundih Digital
 */

// Global constant for admin credentials
const ADMIN_USERNAME = 'bbk8unair';
const ADMIN_PASSWORD = 'password';

/**
 * Handle login form submission
 */
function handleLogin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginErrorMsg');

  // Simple validation
  if (usernameInput === ADMIN_USERNAME && passwordInput === ADMIN_PASSWORD) {
    // Save session
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('username', 'admin');

    // Show toast if user.js is loaded
    if (typeof showToast === 'function') {
      showToast('Login berhasil! Mengalihkan...', 'success');
    }

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = 'admin/dashboard.html';
    }, 1000);
  } else {
    // Show error
    if (errorMsg) {
      errorMsg.textContent = 'Username atau password salah';
      errorMsg.classList.add('visible');
    }
    if (typeof showToast === 'function') {
      showToast('Username atau password salah', 'error');
    }
  }
}

/**
 * Check if user is authenticated. Use this on protected pages.
 */
function checkAuth() {
  const isLogin = localStorage.getItem('isLogin');
  if (!isLogin || isLogin !== 'true') {
    // Not logged in, redirect to login page.
    // Assuming checkAuth is called from admin/ pages, so going back one dir.
    window.location.href = '../login.html';
  }
}

/**
 * Handle logout
 */
function handleLogout() {
  localStorage.removeItem('isLogin');
  localStorage.removeItem('role');
  localStorage.removeItem('username');

  // Redirect to login page
  window.location.href = '../login.html';
}

// Bind events on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});
