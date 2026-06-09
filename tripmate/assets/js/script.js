const STORAGE_KEYS = {
  role: "tripmateRole",
  members: "tripmateMembers",
  activities: "tripmateActivities",
  expenses: "tripmateExpenses",
  settings: "tripmateSettings",
  locations: "tripmateLocations",
  settlements: "tripmateSettlements"
};

const MAX_VOTES = 5;

const defaultMembers = [
  { name: "Amirah", role: "Organizer", memberStatus: "Active" },
  { name: "Hafiz", role: "Budget Tracker", memberStatus: "Active" },
  { name: "Liyana", role: "Activity Contributor", memberStatus: "Active" },
  { name: "Daniel", role: "Member", memberStatus: "Pending payment" },
  { name: "Sara", role: "Member", memberStatus: "Active" }
];

const defaultActivities = [
  {
    id: "cenang-beach",
    name: "Cenang Beach",
    location: "Pantai Cenang",
    cost: "Free",
    proposer: "Liyana",
    votes: 4,
    status: "Popular",
    photoName: "cenang-sunset.jpg",
    photoLabel: "Beach sunset preview",
    comments: [
      { author: "Amirah", text: "Great for sunset photos." },
      { author: "Sara", text: "Easy to fit into the first evening." }
    ]
  },
  {
    id: "skycab",
    name: "Langkawi SkyCab",
    location: "Oriental Village",
    cost: "RM45",
    proposer: "Amirah",
    votes: 5,
    status: "Approved",
    photoName: "skycab-view.png",
    photoLabel: "Cable car view mock photo",
    comments: [
      { author: "Hafiz", text: "Worth the price for the view." },
      { author: "Daniel", text: "Let's book this early." }
    ]
  },
  {
    id: "night-market",
    name: "Night Market",
    location: "Kuah",
    cost: "RM20",
    proposer: "Liyana",
    votes: 2,
    status: "New",
    photoName: "night-market-stalls.jpg",
    photoLabel: "Street food idea board",
    comments: [{ author: "Amirah", text: "Cheap dinner option for the group." }]
  },
  {
    id: "island-hopping",
    name: "Island Hopping",
    location: "Langkawi Jetty",
    cost: "RM50",
    proposer: "Hafiz",
    votes: 3,
    status: "Popular",
    photoName: "island-hopping-boat.jpg",
    photoLabel: "Island tour mock upload",
    comments: [{ author: "Sara", text: "Looks fun, but we should check the weather." }]
  }
];

const defaultExpenses = [
  { id: "expense-lunch", title: "Lunch", amount: 120, paidBy: "Amirah", category: "Food", split: "Split equally among 5 members", owner: "Amirah" },
  { id: "expense-homestay", title: "Homestay Deposit", amount: 300, paidBy: "Hafiz", category: "Accommodation", split: "Split equally among 5 members", owner: "Hafiz" },
  { id: "expense-island", title: "Island Hopping", amount: 250, paidBy: "Liyana", category: "Activity", split: "Split equally among 5 members", owner: "Liyana" }
];

const defaultLocations = [
  { name: "Amirah", place: "Pantai Cenang", time: "2:15 PM", sharing: true },
  { name: "Hafiz", place: "Kuah Town", time: "2:08 PM", sharing: true },
  { name: "Liyana", place: "Oriental Village", time: "1:57 PM", sharing: true },
  { name: "Daniel", place: "Homestay Lobby", time: "1:20 PM", sharing: false },
  { name: "Sara", place: "Sharing disabled", time: "Off", sharing: false }
];

const defaultSettlements = [
  { id: "settlement-1", payer: "Daniel", payee: "Hafiz", amount: 83, settled: false },
  { id: "settlement-2", payer: "Daniel", payee: "Liyana", amount: 51, settled: false },
  { id: "settlement-3", payer: "Sara", payee: "Hafiz", amount: 83, settled: false },
  { id: "settlement-4", payer: "Sara", payee: "Liyana", amount: 51, settled: false }
];

document.addEventListener("DOMContentLoaded", () => {
  initRoleMode();
  initCopyButtons();
  initInvitePage();
  initTripSpace();
  initItinerary();
  initExpenses();
  initBalances();
  initPrivacy();
});

function initRoleMode() {
  const rolePickers = document.querySelectorAll(".role-picker");
  rolePickers.forEach((link) => {
    link.addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEYS.role, link.dataset.setRole || "organizer");
    });
  });

  if (!localStorage.getItem(STORAGE_KEYS.role)) {
    localStorage.setItem(STORAGE_KEYS.role, "organizer");
  }

  const role = getCurrentRole();
  document.body.dataset.role = role;

  const badge = document.getElementById("role-badge");
  if (badge) {
    badge.textContent = role === "organizer" ? "Organizer View" : "Member View";
  }

  applyRoleRestrictions(role);
  applyDashboardRole(role);
}

function applyRoleRestrictions(role) {
  const isOrganizer = role === "organizer";

  const createNote = document.getElementById("create-trip-member-note");
  const createForm = document.getElementById("create-trip-form");
  if (createForm) {
    setFormDisabled(createForm, !isOrganizer);
    toggleHidden(createNote, isOrganizer);
  }

  const inviteNote = document.getElementById("invite-member-note");
  const inviteForm = document.getElementById("invite-form");
  if (inviteForm) {
    setFormDisabled(inviteForm, !isOrganizer);
    toggleHidden(inviteNote, isOrganizer);
  }

  document.querySelectorAll(".organizer-only-action").forEach((element) => {
    if (!isOrganizer) {
      element.classList.add("is-hidden");
    } else {
      element.classList.remove("is-hidden");
    }
  });

  const gpsButton = document.getElementById("simulate-location-update");
  if (gpsButton) {
    gpsButton.disabled = !isOrganizer;
    gpsButton.classList.toggle("is-disabled", !isOrganizer);
    gpsButton.textContent = isOrganizer ? "Simulate GPS Update" : "Organizer Only";
  }

  const anonymousVoting = document.querySelector('[data-setting="anonymousVoting"]');
  if (anonymousVoting && !isOrganizer) {
    anonymousVoting.disabled = true;
    anonymousVoting.classList.add("is-disabled");
  }

  const deleteData = document.getElementById("clear-prototype-data");
  if (deleteData && !isOrganizer) {
    deleteData.disabled = true;
    deleteData.classList.add("is-disabled");
  }
}

function applyDashboardRole(role) {
  const roleLabel = document.getElementById("dashboard-role-label");
  const userLabel = document.getElementById("dashboard-user-label");
  const permissionLabel = document.getElementById("dashboard-permission-label");
  const permissionCopy = document.getElementById("role-permission-copy");

  if (!roleLabel || !userLabel || !permissionLabel || !permissionCopy) return;

  if (role === "organizer") {
    roleLabel.textContent = "Organizer";
    userLabel.textContent = "Amirah";
    permissionLabel.textContent = "Manage trip";
    permissionCopy.textContent = "Organizer can invite members, assign roles, approve plans, manage trip settings, and remove any shared content.";
  } else {
    roleLabel.textContent = "Member";
    userLabel.textContent = "Daniel";
    permissionLabel.textContent = "Contribute";
    permissionCopy.textContent = "Member can suggest activities, vote, comment, add expenses, and manage only their own shared items in this prototype.";
  }
}

function initCopyButtons() {
  document.querySelectorAll(".copy-trigger").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.dataset.copy || "";
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        }
        showToast("Invite link copied");
      } catch (error) {
        showToast("Copy action simulated");
      }
    });
  });
}

function initInvitePage() {
  const list = document.getElementById("invite-member-list");
  const form = document.getElementById("invite-form");
  if (!list || !form) return;

  const members = normalizeMembers(readStorage(STORAGE_KEYS.members, defaultMembers));
  renderInviteMembers(list, members);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (getCurrentRole() !== "organizer") return;

    const nameInput = document.getElementById("invite-member-name");
    const roleInput = document.getElementById("invite-member-role");
    const name = nameInput.value.trim();
    const role = roleInput.value || "Member";
    if (!name) return;

    members.push({ name, role, memberStatus: "Invited" });
    writeStorage(STORAGE_KEYS.members, members);
    renderInviteMembers(list, members);
    form.reset();
    showToast("Mock member invited");
  });
}

function renderInviteMembers(container, members) {
  const isOrganizer = getCurrentRole() === "organizer";
  container.innerHTML = members.map((member, index) => `
    <li class="member-row">
      <div>
        <strong>${escapeHtml(member.name)}</strong>
        <span>${escapeHtml(member.role)} • ${escapeHtml(member.memberStatus)}</span>
      </div>
      ${isOrganizer && member.role !== "Organizer" ? `<button class="text-btn remove-member-btn" data-index="${index}">Remove</button>` : ""}
    </li>
  `).join("");

  container.querySelectorAll(".remove-member-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const members = normalizeMembers(readStorage(STORAGE_KEYS.members, defaultMembers));
      members.splice(Number(button.dataset.index), 1);
      writeStorage(STORAGE_KEYS.members, members);
      renderInviteMembers(container, members);
      showToast("Member removed");
    });
  });
}

function initTripSpace() {
  const membersContainer = document.getElementById("trip-space-members");
  if (membersContainer) {
    const members = normalizeMembers(readStorage(STORAGE_KEYS.members, defaultMembers));
    membersContainer.innerHTML = members.map((member) => `
      <article class="card member-card">
        <h3>${escapeHtml(member.name)}</h3>
        <p>${escapeHtml(member.role)}</p>
        <span class="status-badge ${memberStatusClass(member.memberStatus)}">${escapeHtml(member.memberStatus)}</span>
      </article>
    `).join("");
  }

  initLocationTracker();
}

function initLocationTracker() {
  const list = document.getElementById("location-tracker-list");
  const banner = document.getElementById("location-banner");
  const stateLabel = document.getElementById("location-sharing-state");
  const updateButton = document.getElementById("simulate-location-update");
  if (!list || !banner || !stateLabel || !updateButton) return;

  renderLocations(list, banner, stateLabel, normalizeLocations(readStorage(STORAGE_KEYS.locations, defaultLocations)));

  updateButton.addEventListener("click", () => {
    if (getCurrentRole() !== "organizer") return;

    const places = ["Pantai Cenang", "Kuah Jetty", "SkyBridge Gate", "Underwater World", "Homestay Lobby"];
    const times = ["2:32 PM", "2:36 PM", "2:41 PM", "2:45 PM", "2:49 PM"];
    const locations = normalizeLocations(readStorage(STORAGE_KEYS.locations, defaultLocations)).map((item, index) => {
      if (!item.sharing) return item;
      return {
        ...item,
        place: places[index % places.length],
        time: times[index % times.length]
      };
    });

    writeStorage(STORAGE_KEYS.locations, locations);
    renderLocations(list, banner, stateLabel, locations);
    showToast("Mock GPS locations updated");
  });
}

function renderLocations(container, banner, stateLabel, locations) {
  const currentUser = getCurrentUserName();
  const currentUserLocation = locations.find((item) => item.name === currentUser);
  const isOn = currentUserLocation ? currentUserLocation.sharing : false;

  stateLabel.textContent = isOn ? "My Location On" : "My Location Off";
  stateLabel.classList.toggle("on", isOn);
  stateLabel.classList.toggle("off", !isOn);

  banner.textContent = isOn
    ? "Members with location sharing enabled appear here with their latest trip check-in."
    : "Location sharing is optional and off by default. Members can turn it on in Privacy/Settings when they want the group to see their latest location.";
  banner.classList.toggle("active", isOn);

  container.innerHTML = locations.map((item) => `
    <article class="tracker-card">
      <div class="tracker-top">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(resolveMemberRole(item.name))}</p>
        </div>
        <span class="status-badge ${item.sharing ? "approved" : "pending"}">${item.sharing ? "Location On" : "Location Off"}</span>
      </div>
      <p class="tracker-place">Last seen: ${escapeHtml(item.sharing ? item.place : "Sharing disabled")}</p>
      <p class="tracker-time">Updated: ${escapeHtml(item.sharing ? item.time : "Off")}</p>
    </article>
  `).join("");

  renderMockMap(locations);
}

function initItinerary() {
  const list = document.getElementById("activity-list");
  const form = document.getElementById("activity-form");
  if (!list || !form) return;

  const activities = normalizeActivities(readStorage(STORAGE_KEYS.activities, defaultActivities));
  renderActivities(list, activities);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("activity-name").value.trim();
    const location = document.getElementById("activity-location").value.trim();
    const cost = document.getElementById("activity-cost").value.trim() || "Free";
    const proposer = document.getElementById("activity-proposer").value.trim() || getCurrentUserName();
    const photoInput = document.getElementById("activity-photo");
    const photoFile = photoInput && photoInput.files && photoInput.files[0] ? photoInput.files[0] : null;

    if (!name || !location || !proposer) return;

    activities.unshift({
      id: slugify(`${name}-${Date.now()}`),
      name,
      location,
      cost,
      proposer,
      votes: 0,
      status: "New",
      photoName: photoFile ? photoFile.name : "group-idea-placeholder.jpg",
      photoLabel: photoFile ? `Mock upload: ${photoFile.name}` : "No image selected - using default mock preview",
      comments: []
    });

    writeStorage(STORAGE_KEYS.activities, activities);
    renderActivities(list, activities);
    form.reset();
    showToast("New activity added");
  });
}

function renderActivities(container, activities) {
  const currentUser = getCurrentUserName();
  const isOrganizer = getCurrentRole() === "organizer";

  container.innerHTML = activities.map((activity) => `
    <article class="card activity-card" data-activity-id="${escapeHtml(activity.id)}">
      <div class="photo-preview media-top">
        <div class="photo-art">
          <span class="photo-chip">Mock Photo</span>
          <strong>${escapeHtml(activity.name)}</strong>
        </div>
        <div class="photo-meta">
          <strong>${escapeHtml(activity.photoName || "group-idea-placeholder.jpg")}</strong>
          <span>${escapeHtml(activity.photoLabel || "Photo attachment preview")}</span>
        </div>
      </div>
      <div class="card-head">
        <div>
          <h3>${escapeHtml(activity.name)}</h3>
          <p>Location: ${escapeHtml(activity.location)}</p>
          <p>Estimated cost: ${escapeHtml(activity.cost)}</p>
          <p>Proposed by: ${escapeHtml(activity.proposer)}</p>
        </div>
        <div class="card-actions">
          <span class="status-badge ${statusClass(activity.status)}">${escapeHtml(activity.status)}</span>
          ${(isOrganizer || activity.proposer === currentUser) ? `<button class="text-btn delete-activity-btn" data-id="${escapeHtml(activity.id)}">Delete</button>` : ""}
        </div>
      </div>
      <div class="vote-row">
        <button class="vote-btn" data-id="${escapeHtml(activity.id)}" data-direction="down" ${activity.votes <= 0 ? "disabled" : ""}>Downvote</button>
        <strong class="vote-count">${activity.votes}</strong>
        <button class="vote-btn" data-id="${escapeHtml(activity.id)}" data-direction="up" ${activity.votes >= MAX_VOTES ? "disabled" : ""}>Upvote</button>
        <span class="vote-note">${activity.votes} / ${MAX_VOTES} group members voted</span>
      </div>
      <div class="comments-block">
        <h4>Comments</h4>
        <ul class="comment-list comment-rich-list">
          ${renderCommentItems(activity.comments, activity.id, isOrganizer, currentUser)}
        </ul>
        <form class="comment-form" data-id="${escapeHtml(activity.id)}">
          <input type="text" class="comment-input" placeholder="Add a comment">
          <button type="submit" class="btn btn-secondary">Post</button>
        </form>
      </div>
    </article>
  `).join("");

  container.querySelectorAll(".vote-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const activities = normalizeActivities(readStorage(STORAGE_KEYS.activities, defaultActivities));
      const item = activities.find((activity) => activity.id === button.dataset.id);
      if (!item) return;
      item.votes += button.dataset.direction === "up" ? 1 : -1;
      item.votes = Math.max(0, Math.min(MAX_VOTES, item.votes));
      item.status = deriveActivityStatus(item.votes);
      writeStorage(STORAGE_KEYS.activities, activities);
      renderActivities(container, activities);
    });
  });

  container.querySelectorAll(".delete-activity-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const activities = normalizeActivities(readStorage(STORAGE_KEYS.activities, defaultActivities))
        .filter((activity) => activity.id !== button.dataset.id);
      writeStorage(STORAGE_KEYS.activities, activities);
      renderActivities(container, activities);
      showToast("Activity deleted");
    });
  });

  container.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector(".comment-input");
      const text = input.value.trim();
      if (!text) return;
      const activities = normalizeActivities(readStorage(STORAGE_KEYS.activities, defaultActivities));
      const item = activities.find((activity) => activity.id === form.dataset.id);
      if (!item) return;
      item.comments.push({ author: getCurrentUserName(), text });
      writeStorage(STORAGE_KEYS.activities, activities);
      renderActivities(container, activities);
      showToast("Comment added");
    });
  });

  container.querySelectorAll(".delete-comment-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const activities = normalizeActivities(readStorage(STORAGE_KEYS.activities, defaultActivities));
      const activity = activities.find((item) => item.id === button.dataset.activityId);
      if (!activity) return;
      activity.comments.splice(Number(button.dataset.commentIndex), 1);
      writeStorage(STORAGE_KEYS.activities, activities);
      renderActivities(container, activities);
      showToast("Comment deleted");
    });
  });
}

function renderCommentItems(comments, activityId, isOrganizer, currentUser) {
  if (!comments.length) {
    return "<li>No comments yet.</li>";
  }

  return comments.map((comment, index) => {
    const canDelete = isOrganizer || comment.author === currentUser;
    return `
      <li class="comment-item">
        <span>${escapeHtml(comment.author)}: ${escapeHtml(comment.text)}</span>
        ${canDelete ? `<button class="text-btn delete-comment-btn" data-activity-id="${escapeHtml(activityId)}" data-comment-index="${index}">Delete</button>` : ""}
      </li>
    `;
  }).join("");
}

function initExpenses() {
  const list = document.getElementById("expense-list");
  const form = document.getElementById("expense-form");
  const totalLabel = document.getElementById("expense-total");
  if (!list || !form || !totalLabel) return;

  const expenses = normalizeExpenses(readStorage(STORAGE_KEYS.expenses, defaultExpenses));
  renderExpenses(list, expenses, totalLabel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("expense-title").value.trim();
    const amount = Number(document.getElementById("expense-amount").value);
    const paidBy = document.getElementById("expense-paid-by").value.trim();
    const category = document.getElementById("expense-category").value.trim();
    const split = document.getElementById("expense-split").value.trim() || "Split equally among 5 members";
    if (!title || !amount || !paidBy || !category) return;

    expenses.unshift({
      id: slugify(`${title}-${Date.now()}`),
      title,
      amount,
      paidBy,
      category,
      split,
      owner: getCurrentUserName()
    });

    writeStorage(STORAGE_KEYS.expenses, expenses);
    renderExpenses(list, expenses, totalLabel);
    form.reset();
    document.getElementById("expense-split").value = "Split equally among 5 members";
    showToast("Expense added");
  });
}

function renderExpenses(container, expenses, totalLabel) {
  const isOrganizer = getCurrentRole() === "organizer";
  const currentUser = getCurrentUserName();

  container.innerHTML = expenses.map((expense) => `
    <article class="card expense-card" data-amount="${expense.amount}">
      <div>
        <h3>${escapeHtml(expense.title)}</h3>
        <p>Amount: RM${formatAmount(expense.amount)}</p>
        <p>Paid by: ${escapeHtml(expense.paidBy)}</p>
        <p>Category: ${escapeHtml(expense.category)}</p>
        <p>${escapeHtml(expense.split)}</p>
        <p>Submitted by: ${escapeHtml(expense.owner)}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-secondary">Receipt Placeholder</button>
        ${(isOrganizer || expense.owner === currentUser) ? `<button class="text-btn delete-expense-btn" data-id="${escapeHtml(expense.id)}">Delete</button>` : ""}
      </div>
    </article>
  `).join("");

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalLabel.textContent = `RM${formatAmount(total)}`;

  container.querySelectorAll(".delete-expense-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const expenses = normalizeExpenses(readStorage(STORAGE_KEYS.expenses, defaultExpenses))
        .filter((expense) => expense.id !== button.dataset.id);
      writeStorage(STORAGE_KEYS.expenses, expenses);
      renderExpenses(container, expenses, totalLabel);
      showToast("Expense deleted");
    });
  });
}

function initBalances() {
  const container = document.getElementById("balance-groups");
  if (!container) return;

  const settlements = normalizeSettlements(readStorage(STORAGE_KEYS.settlements, defaultSettlements));
  renderSettlementGroups(container, settlements);
}

function renderSettlementGroups(container, settlements) {
  const grouped = settlements.reduce((acc, item) => {
    if (!acc[item.payer]) acc[item.payer] = [];
    acc[item.payer].push(item);
    return acc;
  }, {});

  container.innerHTML = Object.entries(grouped).map(([payer, rows]) => `
    <article class="payment-group card">
      <h4>${escapeHtml(payer)} needs to pay</h4>
      <div class="payment-list">
        ${rows.map((row) => `
          <div class="payment-row">
            <div class="payment-meta">
              <strong>${escapeHtml(row.payee)}</strong>
              <span>RM${formatAmount(row.amount)}</span>
            </div>
            <button class="btn btn-secondary settle-btn" data-id="${escapeHtml(row.id)}" ${row.settled ? "disabled" : ""}>${row.settled ? "Settled" : "Mark as Settled"}</button>
            <span class="settlement-status ${row.settled ? "done" : ""}">${row.settled ? "Settled" : "Pending"}</span>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

  container.querySelectorAll(".settle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const settlements = normalizeSettlements(readStorage(STORAGE_KEYS.settlements, defaultSettlements));
      const item = settlements.find((entry) => entry.id === button.dataset.id);
      if (!item) return;
      item.settled = true;
      writeStorage(STORAGE_KEYS.settlements, settlements);
      renderSettlementGroups(container, settlements);
      showToast("Settlement marked as settled");
    });
  });
}

function initPrivacy() {
  const settings = readStorage(STORAGE_KEYS.settings, { anonymousVoting: false });
  const anonymousToggle = document.querySelector('[data-setting="anonymousVoting"]');
  if (anonymousToggle && !anonymousToggle.disabled) {
    applyToggleState(anonymousToggle, !!settings.anonymousVoting);
    anonymousToggle.addEventListener("click", () => {
      settings.anonymousVoting = !settings.anonymousVoting;
      writeStorage(STORAGE_KEYS.settings, settings);
      applyToggleState(anonymousToggle, settings.anonymousVoting);
    });
  }

  const locationToggle = document.querySelector('[data-setting="locationSharing"]');
  if (locationToggle) {
    const location = getCurrentUserLocation();
    applyToggleState(locationToggle, !!location.sharing);
    locationToggle.addEventListener("click", () => {
      const locations = normalizeLocations(readStorage(STORAGE_KEYS.locations, defaultLocations));
      const item = locations.find((entry) => entry.name === getCurrentUserName());
      if (!item) return;
      item.sharing = !item.sharing;
      if (!item.sharing) {
        item.place = "Sharing disabled";
        item.time = "Off";
      } else {
        item.place = "Pantai Cenang";
        item.time = "Just now";
      }
      writeStorage(STORAGE_KEYS.locations, locations);
      applyToggleState(locationToggle, item.sharing);
      showToast(item.sharing ? "Location sharing enabled" : "Location sharing disabled");
    });
  }

  const clearButton = document.getElementById("clear-prototype-data");
  if (!clearButton || clearButton.disabled) return;
  clearButton.addEventListener("click", () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    localStorage.setItem(STORAGE_KEYS.role, getCurrentRole());
    showToast("Prototype data cleared");
  });
}

function setFormDisabled(form, disabled) {
  form.querySelectorAll("input, button, select, textarea").forEach((field) => {
    if (disabled) {
      field.setAttribute("disabled", "disabled");
      field.classList.add("is-disabled");
    } else {
      field.removeAttribute("disabled");
      field.classList.remove("is-disabled");
    }
  });
}

function toggleHidden(element, hide) {
  if (!element) return;
  element.classList.toggle("is-hidden", hide);
}

function getCurrentRole() {
  return localStorage.getItem(STORAGE_KEYS.role) || "organizer";
}

function getCurrentUserName() {
  return getCurrentRole() === "organizer" ? "Amirah" : "Daniel";
}

function getCurrentUserLocation() {
  const locations = normalizeLocations(readStorage(STORAGE_KEYS.locations, defaultLocations));
  return locations.find((item) => item.name === getCurrentUserName()) || { sharing: false };
}

function deriveActivityStatus(votes) {
  if (votes >= MAX_VOTES) return "Approved";
  if (votes >= 3) return "Popular";
  return "New";
}

function statusClass(status) {
  switch (status) {
    case "Approved":
      return "approved";
    case "Popular":
      return "popular";
    default:
      return "pending";
  }
}

function memberStatusClass(status) {
  return /active/i.test(status) ? "approved" : "pending";
}

function resolveMemberRole(name) {
  const members = normalizeMembers(readStorage(STORAGE_KEYS.members, defaultMembers));
  const member = members.find((item) => item.name === name);
  return member ? member.role : "Member";
}

function normalizeMembers(rawMembers) {
  return rawMembers.map((member) => ({
    name: member.name,
    role: member.role || "Member",
    memberStatus: member.memberStatus || "Active"
  }));
}

function normalizeActivities(rawActivities) {
  return rawActivities.map((activity) => ({
    ...activity,
    status: deriveActivityStatus(Number(activity.votes || 0)),
    comments: (activity.comments || []).map((comment) => {
      if (typeof comment === "string") {
        const parts = comment.split(":");
        return { author: parts.shift() || "Member", text: parts.join(":").trim() };
      }
      return { author: comment.author || "Member", text: comment.text || "" };
    })
  }));
}

function normalizeExpenses(rawExpenses) {
  return rawExpenses.map((expense) => ({
    ...expense,
    id: expense.id || slugify(`${expense.title}-${expense.paidBy}`),
    owner: expense.owner || expense.paidBy
  }));
}

function normalizeLocations(rawLocations) {
  return rawLocations.map((item) => ({
    name: item.name,
    place: item.place || "Sharing disabled",
    time: item.time || "Off",
    sharing: typeof item.sharing === "boolean" ? item.sharing : !/off/i.test(item.state || "")
  }));
}

function normalizeSettlements(rawSettlements) {
  return rawSettlements.map((item) => ({
    ...item,
    settled: !!item.settled
  }));
}

function renderMockMap(locations) {
  const map = document.getElementById("mock-map");
  if (!map) return;
  const legend = document.querySelector(".mock-map-legend");

  const points = [
    { name: "Amirah", top: "34%", left: "31%" },
    { name: "Hafiz", top: "53%", left: "60%" },
    { name: "Liyana", top: "72%", left: "39%" }
  ];

  const offMembers = locations.filter((item) => !item.sharing).map((item) => item.name);

  map.innerHTML = `
    <div class="mock-map-water"></div>
    <div class="mock-map-land land-a"></div>
    <div class="mock-map-land land-b"></div>
    <div class="mock-map-land land-c"></div>
    <div class="mock-map-label label-a">Pantai Cenang</div>
    <div class="mock-map-label label-b">Kuah</div>
    <div class="mock-map-label label-c">Oriental Village</div>
    ${points.map((point) => {
      const member = locations.find((item) => item.name === point.name);
      const sharing = member ? member.sharing : false;
      return `
        <div class="map-pin ${sharing ? "is-live" : "is-off"}" style="top:${point.top};left:${point.left};">
          <span class="map-pin-dot"></span>
          <span class="map-pin-name">${escapeHtml(point.name)}</span>
        </div>
      `;
    }).join("")}
  `;

  if (legend) {
    legend.innerHTML = `
      <div class="legend-item">
        <span class="legend-dot is-live"></span>
        <span>Location On members appear on the mock trip map</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot is-off"></span>
        <span>Location Off: ${offMembers.length ? offMembers.map(escapeHtml).join(", ") : "None"}</span>
      </div>
    `;
  }
}

function applyToggleState(button, isOn) {
  button.dataset.state = isOn ? "on" : "off";
  button.textContent = isOn ? "On" : "Off";
  button.classList.toggle("is-on", isOn);
  button.classList.toggle("is-off", !isOn);
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(fallback));
  } catch (error) {
    return JSON.parse(JSON.stringify(fallback));
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatAmount(value) {
  return Number(value).toFixed(0);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 1800);
}
