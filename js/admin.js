const session = JSON.parse(sessionStorage.getItem('portalSession') || 'null');

if (!session || session.role !== 'admin') {
  window.location.replace('index.html');
}

const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const displayName = document.getElementById('displayName');

displayName.textContent = session?.displayName || 'Administrator';

function openSection(id, label) {
  sections.forEach(section => section.classList.toggle('active', section.id === id));
  navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  pageTitle.textContent = label;
  sidebar.classList.remove('open');
}

navItems.forEach(item => item.addEventListener('click', () => {
  openSection(item.dataset.section, item.textContent.trim());
}));

menuBtn?.addEventListener('click', () => sidebar.classList.toggle('open'));
logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('portalSession');
  window.location.href = 'index.html';
});
