<?php
$pageTitle = 'Welcome';
$setupPage = true;
include __DIR__ . '/includes/header.php';
?>
<section class="hero-section">
  <div class="hero-copy">
    <span class="eyebrow">Collaborative Group Trip Planner</span>
    <h1>TripMate</h1>
    <p class="tagline">Plan together. Split fairly. Travel stress-free.</p>
    <p class="hero-description">A closed-group trip planning and expense sharing system for friends.</p>
    <div class="hero-actions">
      <a class="btn btn-primary btn-large" href="create_trip.php">Create Trip Space</a>
    </div>
  </div>
  <div class="hero-visual card">
    <div class="hero-frame">
      <div class="hero-frame-bar">
        <span></span><span></span><span></span>
      </div>
      <div class="hero-screen">
        <h2>Weekend Escape</h2>
        <p>Langkawi, Malaysia</p>
        <div class="hero-pills">
          <span>5 friends</span>
          <span>4 activities</span>
          <span>RM670 tracked</span>
        </div>
        <div class="postcard-grid">
          <div class="postcard-card">🏖️ Beach plans</div>
          <div class="postcard-card">🚠 SkyCab votes</div>
          <div class="postcard-card">💸 Fair splitting</div>
          <div class="postcard-card">🔒 Private trip space</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="info-grid">
  <article class="card feature-card">
    <h3>Closed Friend Group</h3>
    <p>Create a private trip space where only invited members can see discussions, expenses, votes, and shared plans.</p>
  </article>
  <article class="card feature-card">
    <h3>Collaborative Planning</h3>
    <p>Propose activities, compare options, comment on ideas, and turn group preferences into a clear itinerary.</p>
  </article>
  <article class="card feature-card">
    <h3>Transparent Expenses</h3>
    <p>Track shared costs, review balances, and keep social trust high with visible summaries for everyone.</p>
  </article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
