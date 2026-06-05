<?php
$pageTitle = 'Invite Friends';
$setupPage = true;
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Setup Step 2</span>
    <h1>Invite Friends</h1>
    <p>This page demonstrates group/community creation where only invited members can join the trip space.</p>
  </div>
</section>

<section class="dashboard-grid">
  <article class="card invite-card">
    <h3>Trip Invite</h3>
    <div class="invite-block">
      <span class="label">Invite code</span>
      <strong>TRIP-LGK-2026</strong>
    </div>
    <div class="invite-block">
      <span class="label">Mock invite link</span>
      <p class="mock-link">http://localhost/tripmate/join/TRIP-LGK-2026</p>
    </div>
    <div class="button-row">
      <button class="btn btn-secondary copy-trigger" data-copy="http://localhost/tripmate/join/TRIP-LGK-2026">Copy Invite Link</button>
      <a class="btn btn-primary" href="dashboard.php">Go to Dashboard</a>
    </div>
  </article>

  <article class="card">
    <h3>Current Members</h3>
    <ul class="member-list">
      <li><strong>Amirah</strong><span>Organizer</span></li>
      <li><strong>Hafiz</strong><span>Budget Tracker</span></li>
      <li><strong>Liyana</strong><span>Activity Contributor</span></li>
      <li><strong>Daniel</strong><span>Member</span></li>
      <li><strong>Sara</strong><span>Member</span></li>
    </ul>
  </article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
