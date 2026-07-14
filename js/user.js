/**
 * user.js
 * Handles public-facing interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // 2. Loading Animation (Remove loader when page is ready)
  const loader = document.getElementById('pageLoader');
  if (loader) {
    // Artificial small delay to show the animation
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }

  // 3. Password visibility toggle (for login page)
  const togglePasswordBtn = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      const icon = togglePasswordBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = type === 'password' ? 'visibility' : 'visibility_off';
      }
    });
  }
});

/**
 * Show a toast notification
 * @param {string} message 
 * @param {string} type 'success' | 'error' 
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = document.createElement('span');
  icon.className = 'material-symbols-outlined';
  icon.textContent = type === 'success' ? 'check_circle' : 'error';
  
  const text = document.createElement('span');
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300); // Wait for transition
  }, 3000);
}
