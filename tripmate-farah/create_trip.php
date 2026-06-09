<?php
$pageTitle = 'Create Trip';
$setupPage = true;
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Setup Step 1</span>
    <h1>Create Trip Space</h1>
    <p>Set up the shared group travel space with the core trip details.</p>
  </div>
</section>

<section class="card form-card">
  <form class="stack-form" action="invite.php" method="get">
    <div class="form-grid">
      <label>
        <span>Trip name</span>
        <input type="text" name="trip_name" value="Langkawi June 2026">
      </label>
      <label>
        <span>Destination</span>
        <input type="text" name="destination" value="Langkawi">
      </label>
      <label>
        <span>Travel dates</span>
        <input type="text" name="dates" value="12 June 2026 - 14 June 2026">
      </label>
      <label>
        <span>Estimated budget</span>
        <input type="text" name="budget" value="RM800">
      </label>
      <label>
        <span>Number of members</span>
        <input type="number" name="members" value="5">
      </label>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Continue to Invite Friends</button>
    </div>
  </form>
</section>

<section class="info-grid two-column">
  <article class="card">
    <h3>Why this page matters</h3>
    <p>This setup page represents the creation of a shared trip space before collaboration begins.</p>
  </article>
  <article class="card">
    <h3>Prototype note</h3>
    <p>All values are pre-filled sample data for a university presentation prototype. No database is used.</p>
  </article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
