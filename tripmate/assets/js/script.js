const STORAGE_KEYS = {
  activities: "tripmateActivities",
  expenses: "tripmateExpenses",
  settings: "tripmateSettings"
};

const defaultActivities = [
  {
    id: "cenang-beach",
    name: "Cenang Beach",
    location: "Pantai Cenang",
    cost: "Free",
    proposer: "Liyana",
    votes: 8,
    status: "Popular",
    comments: ["Amirah: Great for sunset photos.", "Sara: Easy to fit into the first evening."]
  },
  {
    id: "skycab",
    name: "Langkawi SkyCab",
    location: "Oriental Village",
    cost: "RM45",
    proposer: "Amirah",
    votes: 10,
    status: "Approved",
    comments: ["Hafiz: Worth the price for the view.", "Daniel: Let’s book this early."]
  },
  {
    id: "night-market",
    name: "Night Market",
    location: "Kuah",
    cost: "RM20",
    proposer: "Liyana",
    votes: 6,
    status: "Proposed",
    comments: ["Amirah: Cheap dinner option for the group."]
  },
  {
    id: "island-hopping",
    name: "Island Hopping",
    location: "Langkawi Jetty",
    cost: "RM50",
    proposer: "Hafiz",
    votes: 7,
    status: "Popular",
    comments: ["Sara: Looks fun, but we should check the weather."]
  }
];

const defaultExpenses = [
  { title: "Lunch", amount: 120, paidBy: "Amirah", category: "Food", split: "Split equally among 5 members" },
  { title: "Homestay Deposit", amount: 300, paidBy: "Hafiz", category: "Accommodation", split: "Split equally among 5 members" },
  { title: "Island Hopping", amount: 250, paidBy: "Liyana", category: "Activity", split: "Split equally among 5 members" }
];

document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
  initItinerary();
  initExpenses();
  initBalances();
  initPrivacy();
});

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

function initItinerary() {
  const list = document.getElementById("activity-list");
  const form = document.getElementById("activity-form");
  if (!list || !form) return;

  const stored = readStorage(STORAGE_KEYS.activities, defaultActivities);
  renderActivities(list, stored);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("activity-name").value.trim();
    const location = document.getElementById("activity-location").value.trim();
    const cost = document.getElementById("activity-cost").value.trim() || "Free";
    const proposer = document.getElementById("activity-proposer").value.trim();
    if (!name || !location || !proposer) return;

    stored.unshift({
      id: slugify(name),
      name,
      location,
      cost,
      proposer,
      votes: 0,
      status: "Proposed",
      comments: []
    });

    writeStorage(STORAGE_KEYS.activities, stored);
    renderActivities(list, stored);
    form.reset();
    showToast("New activity added");
  });
}

function renderActivities(container, activities) {
  container.innerHTML = activities.map((activity) => `
    <article class="card activity-card" data-activity-id="${escapeHtml(activity.id)}">
      <div class="card-head">
        <div>
          <h3>${escapeHtml(activity.name)}</h3>
          <p>Location: ${escapeHtml(activity.location)}</p>
          <p>Estimated cost: ${escapeHtml(activity.cost)}</p>
          <p>Proposed by: ${escapeHtml(activity.proposer)}</p>
        </div>
        <span class="status-badge ${statusClass(activity.status)}">${escapeHtml(activity.status)}</span>
      </div>
      <div class="vote-row">
        <button class="vote-btn" data-direction="up">👍 Upvote</button>
        <strong class="vote-count">${activity.votes}</strong>
        <button class="vote-btn" data-direction="down">👎 Downvote</button>
      </div>
      <div class="comments-block">
        <h4>Comments</h4>
        <ul class="comment-list">
          ${activity.comments.map((comment) => `<li>${escapeHtml(comment)}</li>`).join("") || "<li>No comments yet.</li>"}
        </ul>
        <form class="comment-form">
          <input type="text" class="comment-input" placeholder="Add a comment">
          <button type="submit" class="btn btn-secondary">Post</button>
        </form>
      </div>
    </article>
  `).join("");

  container.querySelectorAll(".activity-card").forEach((card) => {
    const activityId = card.dataset.activityId;
    card.querySelectorAll(".vote-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.direction;
        const item = activities.find((activity) => activity.id === activityId);
        if (!item) return;
        item.votes += direction === "up" ? 1 : -1;
        item.status = deriveStatus(item.votes);
        writeStorage(STORAGE_KEYS.activities, activities);
        renderActivities(container, activities);
      });
    });

    const commentForm = card.querySelector(".comment-form");
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = commentForm.querySelector(".comment-input");
      const text = input.value.trim();
      if (!text) return;
      const item = activities.find((activity) => activity.id === activityId);
      if (!item) return;
      item.comments.push(`You: ${text}`);
      writeStorage(STORAGE_KEYS.activities, activities);
      renderActivities(container, activities);
      showToast("Comment added");
    });
  });
}

function initExpenses() {
  const list = document.getElementById("expense-list");
  const form = document.getElementById("expense-form");
  const totalLabel = document.getElementById("expense-total");
  if (!list || !form || !totalLabel) return;

  const expenses = readStorage(STORAGE_KEYS.expenses, defaultExpenses);
  renderExpenses(list, expenses, totalLabel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("expense-title").value.trim();
    const amount = Number(document.getElementById("expense-amount").value);
    const paidBy = document.getElementById("expense-paid-by").value.trim();
    const category = document.getElementById("expense-category").value.trim();
    const split = document.getElementById("expense-split").value.trim() || "Split equally among 5 members";
    if (!title || !amount || !paidBy || !category) return;

    expenses.unshift({ title, amount, paidBy, category, split });
    writeStorage(STORAGE_KEYS.expenses, expenses);
    renderExpenses(list, expenses, totalLabel);
    form.reset();
    document.getElementById("expense-split").value = "Split equally among 5 members";
    showToast("Expense added");
  });
}

function renderExpenses(container, expenses, totalLabel) {
  container.innerHTML = expenses.map((expense) => `
    <article class="card expense-card" data-amount="${expense.amount}">
      <div>
        <h3>${escapeHtml(expense.title)}</h3>
        <p>Amount: RM${formatAmount(expense.amount)}</p>
        <p>Paid by: ${escapeHtml(expense.paidBy)}</p>
        <p>Category: ${escapeHtml(expense.category)}</p>
        <p>${escapeHtml(expense.split)}</p>
      </div>
      <button class="btn btn-secondary">Receipt Placeholder</button>
    </article>
  `).join("");

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  totalLabel.textContent = `RM${formatAmount(total)}`;
}

function initBalances() {
  document.querySelectorAll(".settle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.parentElement.querySelector(".settlement-status");
      status.textContent = "Settled";
      status.classList.add("done");
      button.disabled = true;
      button.textContent = "Settled";
      showToast("Settlement marked as settled");
    });
  });
}

function initPrivacy() {
  const settings = readStorage(STORAGE_KEYS.settings, {
    anonymousVoting: false,
    locationSharing: false
  });

  const toggles = document.querySelectorAll(".toggle-btn");
  toggles.forEach((toggle, index) => {
    const key = index === 0 ? "anonymousVoting" : "locationSharing";
    applyToggleState(toggle, settings[key]);
    toggle.addEventListener("click", () => {
      settings[key] = !settings[key];
      applyToggleState(toggle, settings[key]);
      writeStorage(STORAGE_KEYS.settings, settings);
    });
  });

  const clearButton = document.getElementById("clear-prototype-data");
  if (!clearButton) return;
  clearButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.activities);
    localStorage.removeItem(STORAGE_KEYS.expenses);
    localStorage.removeItem(STORAGE_KEYS.settings);
    showToast("Prototype data cleared");
  });
}

function applyToggleState(button, isOn) {
  button.dataset.state = isOn ? "on" : "off";
  button.textContent = isOn ? "On" : "Off";
  button.classList.toggle("is-on", isOn);
  button.classList.toggle("is-off", !isOn);
}

function deriveStatus(votes) {
  if (votes >= 9) return "Approved";
  if (votes >= 7) return "Popular";
  return "Proposed";
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
