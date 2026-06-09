<?php
$pageTitle = 'Activity Feed';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Activity Feed</span>
    <h1>Notifications and Group History</h1>
    <p>This page demonstrates social activity awareness and notifications.</p>
  </div>
</section>

<section class="stack-grid">
  <article class="card feed-item"><span class="feed-icon">🧭</span><div><h3>Daniel enabled location sharing <span class="notif-badge">Safety</span></h3><p>15 minutes ago</p></div></article>
  <article class="card feed-item"><span class="feed-icon">🖼️</span><div><h3>Liyana uploaded a photo for Night Market <span class="notif-badge">Photo</span></h3><p>32 minutes ago</p></div></article>
  <article class="card feed-item"><span class="feed-icon">🗳️</span><div><h3>Amirah approved Langkawi SkyCab <span class="notif-badge">Vote</span></h3><p>1 hour ago</p></div></article>
  <article class="card feed-item"><span class="feed-icon">👥</span><div><h3>Organizer assigned Hafiz as Budget Tracker <span class="notif-badge">Role</span></h3><p>2 hours ago</p></div></article>
  <article class="card feed-item"><span class="feed-icon">✅</span><div><h3>Daniel marked payment as settled <span class="notif-badge">Finance</span></h3><p>Yesterday</p></div></article>
  <article class="card feed-item"><span class="feed-icon">✈️</span><div><h3>Trip Space was created by Amirah <span class="notif-badge">System</span></h3><p>2 days ago</p></div></article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
