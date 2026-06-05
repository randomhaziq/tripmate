<?php
$pageTitle = 'Privacy';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Privacy and Settings</span>
    <h1>Group Safety Controls</h1>
    <p>This page demonstrates privacy, digital memory, trust, and user safety.</p>
  </div>
</section>

<section class="settings-grid">
  <article class="card setting-card">
    <div><h3>Closed group only</h3><p>Only invited members can access the trip space.</p></div>
    <span class="toggle-label on">On</span>
  </article>
  <article class="card setting-card">
    <div><h3>Anonymous voting</h3><p>Hide who voted on each activity when enabled.</p></div>
    <button class="toggle-btn is-off" data-state="off">Off</button>
  </article>
  <article class="card setting-card">
    <div><h3>Archive trip after 30 days</h3><p>Preserve the trip as read-only after the event ends.</p></div>
    <span class="toggle-label on">On</span>
  </article>
  <article class="card setting-card">
    <div><h3>Delete trip data</h3><p>Clear locally stored prototype interactions for this browser.</p></div>
    <button class="btn btn-danger" id="clear-prototype-data">Delete Trip Data</button>
  </article>
  <article class="card setting-card">
    <div><h3>Receipt visibility</h3><p>Only members can view uploaded receipts and payment records.</p></div>
    <span class="toggle-label on">Members only</span>
  </article>
  <article class="card setting-card">
    <div><h3>Location sharing</h3><p>Optional live location sharing stays off by default.</p></div>
    <button class="toggle-btn is-off" data-state="off">Off</button>
  </article>
</section>

<section class="card">
  <p>TripMate is designed for closed friend groups. Only invited members can view trip details, expenses, votes, comments, and shared content.</p>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
