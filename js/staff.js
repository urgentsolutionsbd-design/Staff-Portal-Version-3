const session = JSON.parse(sessionStorage.getItem('portalSession') || 'null');

if (!session || session.role !== 'staff') {
  window.location.replace('index.html');
}

const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item[data-section]');
const sections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const displayName = document.getElementById('displayName');
const displayId = document.getElementById('displayId');
const welcomeName = document.getElementById('welcomeName');
const avatar = document.getElementById('avatar');

const name = session?.displayName || 'Staff Member';
displayName.textContent = name;
displayId.textContent = session?.identity || 'Starter account';
welcomeName.textContent = name;
avatar.textContent = name.charAt(0).toUpperCase();

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

const attendanceStatus = document.getElementById('attendanceStatus');
const attendanceNote = document.getElementById('attendanceNote');
const checkInBtn = document.getElementById('checkInBtn');
const breakBtn = document.getElementById('breakBtn');
const checkOutBtn = document.getElementById('checkOutBtn');
let attendanceState = 'out';

function updateAttendance(state) {
  attendanceState = state;
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const map = {
    in: ['Checked in', `Demo check-in recorded at ${now}.`],
    break: ['On break', `Demo break started at ${now}.`],
    out: ['Checked out', `Demo check-out recorded at ${now}.`]
  };
  attendanceStatus.textContent = map[state][0];
  attendanceStatus.classList.toggle('online', state === 'in');
  attendanceNote.textContent = map[state][1];
}

checkInBtn?.addEventListener('click', () => updateAttendance('in'));
breakBtn?.addEventListener('click', () => {
  if (attendanceState !== 'in') {
    attendanceNote.textContent = 'Check in first before starting a demo break.';
    return;
  }
  updateAttendance('break');
});
checkOutBtn?.addEventListener('click', () => updateAttendance('out'));
