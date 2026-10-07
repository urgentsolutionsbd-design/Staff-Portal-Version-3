const SESSION_KEY = "staffPortalSession";

function readAdminSession() {
  const values = [
    sessionStorage.getItem(SESSION_KEY),
    localStorage.getItem(SESSION_KEY)
  ];

  for (const raw of values) {
    if (!raw) continue;

    try {
      const session = JSON.parse(raw);

      if (
        session &&
        session.username &&
        String(session.role || "")
          .trim()
          .toLowerCase() === "admin" &&
        String(session.status || "")
          .trim()
          .toLowerCase() === "active"
      ) {
        return session;
      }
    } catch (error) {}
  }

  return null;
}

const session =
  readAdminSession();

if (!session) {
  window.location.replace("index.html");
}

const sidebar =
  document.getElementById("sidebar");

const menuBtn =
  document.getElementById("menuBtn");

const logoutBtn =
  document.getElementById("logoutBtn");

const navItems =
  document.querySelectorAll(
    ".nav-item[data-section]"
  );

const sections =
  document.querySelectorAll(
    ".content-section"
  );

const pageTitle =
  document.getElementById("pageTitle");

const displayName =
  document.getElementById("displayName");

displayName.textContent =
  session?.staffName ||
  session?.username ||
  "Administrator";

function openSection(id, label) {
  sections.forEach(function (section) {
    section.classList.toggle(
      "active",
      section.id === id
    );
  });

  navItems.forEach(function (item) {
    item.classList.toggle(
      "active",
      item.dataset.section === id
    );
  });

  pageTitle.textContent =
    label;

  sidebar.classList.remove("open");
}

navItems.forEach(function (item) {
  item.addEventListener(
    "click",
    function () {
      openSection(
        item.dataset.section,
        item.textContent.trim()
      );
    }
  );
});

menuBtn?.addEventListener(
  "click",
  function () {
    sidebar.classList.toggle(
      "open"
    );
  }
);

logoutBtn?.addEventListener(
  "click",
  function () {
    sessionStorage.removeItem(
      SESSION_KEY
    );

    localStorage.removeItem(
      SESSION_KEY
    );

    window.location.href =
      "index.html";
  }
);
