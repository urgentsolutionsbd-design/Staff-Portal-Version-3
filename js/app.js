const staffTab = document.getElementById('staffTab');
const adminTab = document.getElementById('adminTab');
const loginTitle = document.getElementById('loginTitle');
const loginDescription = document.getElementById('loginDescription');
const identityLabel = document.getElementById('identityLabel');
const passwordField = document.getElementById('passwordField');
const loginForm = document.getElementById('loginForm');
const identityInput = document.getElementById('identity');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const rememberMe = document.getElementById('rememberMe');
const loginButton = document.getElementById('loginButton');
const loginMessage = document.getElementById('loginMessage');

let loginMode = 'staff';

function setMode(mode) {
  loginMode = mode;
  const isAdmin = mode === 'admin';

  staffTab.classList.toggle('active', !isAdmin);
  adminTab.classList.toggle('active', isAdmin);
  staffTab.setAttribute('aria-selected', String(!isAdmin));
  adminTab.setAttribute('aria-selected', String(isAdmin));

  loginTitle.textContent = isAdmin ? 'Admin Login' : 'Staff Login';
  loginDescription.textContent = isAdmin
    ? 'Enter your admin email and password to continue.'
    : 'Enter your Staff ID or email to continue.';
  identityLabel.textContent = isAdmin ? 'Admin Email' : 'Staff ID or Email';
  identityInput.placeholder = isAdmin ? 'admin@company.com' : 'e.g. ST-001 or name@company.com';
  passwordField.classList.toggle('hidden', !isAdmin);
  passwordInput.required = isAdmin;
  if (!isAdmin) passwordInput.value = '';
  loginButton.textContent = isAdmin ? 'Continue as Admin' : 'Continue as Staff';
  clearMessage();
}

function clearMessage() {
  loginMessage.hidden = true;
  loginMessage.textContent = '';
  loginMessage.className = 'alert';
}

function showMessage(message, type = 'error') {
  loginMessage.hidden = false;
  loginMessage.textContent = message;
  loginMessage.className = `alert ${type}`;
}

staffTab.addEventListener('click', () => setMode('staff'));
adminTab.addEventListener('click', () => setMode('admin'));

togglePassword.addEventListener('click', () => {
  const show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  togglePassword.textContent = show ? 'Hide' : 'Show';
  togglePassword.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessage();

  const identity = identityInput.value.trim();
  const password = passwordInput.value.trim();

  if (!identity) {
    showMessage(loginMode === 'admin' ? 'Please enter your admin email.' : 'Please enter your Staff ID or email.');
    identityInput.focus();
    return;
  }

  if (loginMode === 'admin' && !password) {
    showMessage('Please enter your admin password.');
    passwordInput.focus();
    return;
  }

  const session = {
    role: loginMode,
    identity,
    displayName: loginMode === 'admin' ? 'Administrator' : identity,
    createdAt: Date.now()
  };

  sessionStorage.setItem('portalSession', JSON.stringify(session));
  if (rememberMe.checked) localStorage.setItem('portalRememberedIdentity', identity);
  else localStorage.removeItem('portalRememberedIdentity');

  showMessage('Starter login successful. Opening dashboard…', 'success');
  loginButton.disabled = true;
  setTimeout(() => {
    window.location.href = loginMode === 'admin' ? 'admin.html' : 'staff.html';
  }, 450);
});

const remembered = localStorage.getItem('portalRememberedIdentity');
if (remembered) {
  identityInput.value = remembered;
  rememberMe.checked = true;
}

setMode('staff');
