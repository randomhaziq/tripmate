<?php
$pageTitle = 'Dashboard';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Main Dashboard</span>
    <h1>Langkawi June 2026</h1>
    <p>Langkawi • 12 June 2026 - 14 June 2026</p>
  </div>
  <p class="page-note">The dashboard shows social activity visibility and group awareness.</p>
</section>

<section class="dashboard-grid">
  <article class="card metric-card">
    <h3>Trip Overview</h3>
    <div class="metric-list">
      <div><span>Total members</span><strong>5</strong></div>
      <div><span>Estimated budget</span><strong>RM800</strong></div>
      <div><span>Trip duration</span><strong>3 days</strong></div>
    </div>
  </article>
  <article class="card metric-card">
    <h3>Group Activity</h3>
    <div class="metric-list">
      <div><span>Recent actions</span><strong>12</strong></div>
      <div><span>New comments</span><strong>4</strong></div>
      <div><span>Notifications</span><strong>6</strong></div>
    </div>
  </article>
  <article class="card metric-card">
    <h3>Expense Summary</h3>
    <div class="metric-list">
      <div><span>Total expenses</span><strong>RM670</strong></div>
      <div><span>Equal share</span><strong>RM134</strong></div>
      <div><span>Open settlements</span><strong>4</strong></div>
    </div>
  </article>
  <article class="card metric-card">
    <h3>Pending Decisions</h3>
    <div class="metric-list">
      <div><span>Pending votes</span><strong>3</strong></div>
      <div><span>Popular ideas</span><strong>2</strong></div>
      <div><span>Approved plans</span><strong>1</strong></div>
    </div>
  </article>
</section>

<section class="dashboard-grid">
  <article class="card">
    <h3>Balance Summary</h3>
    <p>Amirah is owed RM14, Hafiz is owed RM166, and Liyana is owed RM116. Daniel and Sara still need to settle their shares.</p>
    <a class="text-link" href="balances.php">Open balance dashboard</a>
  </article>
  <article class="card">
    <h3>Recent Activity Preview</h3>
    <ul class="feed-preview">
      <li>🗳️ Amirah voted for Cenang Beach</li>
      <li>💸 Hafiz added Homestay Deposit</li>
      <li>💬 Sara commented on Island Hopping</li>
    </ul>
    <a class="text-link" href="activity_feed.php">View full feed</a>
  </article>
</section>

<section class="card">
  <h3>Quick Actions</h3>
  <div class="button-row">
    <a class="btn btn-secondary" href="itinerary.php">Add Activity</a>
    <a class="btn btn-secondary" href="expenses.php">Add Expense</a>
    <a class="btn btn-primary" href="balances.php">View Balances</a>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
