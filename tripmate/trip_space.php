<?php
$pageTitle = 'Trip Space';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Closed Group Space</span>
    <h1>Langkawi June 2026</h1>
    <p>This page represents the closed social group where members collaborate in one shared space.</p>
  </div>
  <div class="invite-chip">Invite code: <strong>TRIP-LGK-2026</strong></div>
</section>

<section class="member-grid">
  <article class="card member-card">
    <h3>Amirah</h3>
    <p>Organizer</p>
    <span class="status-badge approved">Active</span>
  </article>
  <article class="card member-card">
    <h3>Hafiz</h3>
    <p>Budget Tracker</p>
    <span class="status-badge approved">Active</span>
  </article>
  <article class="card member-card">
    <h3>Liyana</h3>
    <p>Activity Contributor</p>
    <span class="status-badge approved">Active</span>
  </article>
  <article class="card member-card">
    <h3>Daniel</h3>
    <p>Member</p>
    <span class="status-badge pending">Pending payment</span>
  </article>
  <article class="card member-card">
    <h3>Sara</h3>
    <p>Member</p>
    <span class="status-badge approved">Active</span>
  </article>
</section>

<section class="card">
  <div class="button-row">
    <a class="btn btn-primary" href="invite.php">Invite Member</a>
    <button class="btn btn-secondary copy-trigger" data-copy="http://localhost/tripmate/join/TRIP-LGK-2026">Copy Invite Link</button>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
