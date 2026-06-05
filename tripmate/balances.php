<?php
$pageTitle = 'Balances';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Balance Dashboard</span>
    <h1>Who Owes Whom</h1>
    <p>This page demonstrates transparency, trust, and social accountability in shared expenses.</p>
  </div>
</section>

<section class="dashboard-grid">
  <article class="card metric-card">
    <h3>Total trip expenses</h3>
    <strong class="big-metric">RM670</strong>
  </article>
  <article class="card metric-card">
    <h3>Equal share per person</h3>
    <strong class="big-metric">RM134</strong>
  </article>
</section>

<section class="member-grid">
  <article class="card balance-card positive"><h3>Amirah</h3><p>is owed RM14</p></article>
  <article class="card balance-card positive"><h3>Hafiz</h3><p>is owed RM166</p></article>
  <article class="card balance-card positive"><h3>Liyana</h3><p>is owed RM116</p></article>
  <article class="card balance-card negative"><h3>Daniel</h3><p>owes RM134</p></article>
  <article class="card balance-card negative"><h3>Sara</h3><p>owes RM134</p></article>
</section>

<section class="card">
  <h3>Who owes who</h3>
  <div class="settlement-list">
    <div class="settlement-item">
      <p>Daniel owes Hafiz RM83</p>
      <button class="btn btn-secondary settle-btn">Mark as Settled</button>
      <span class="settlement-status">Pending</span>
    </div>
    <div class="settlement-item">
      <p>Sara owes Hafiz RM83</p>
      <button class="btn btn-secondary settle-btn">Mark as Settled</button>
      <span class="settlement-status">Pending</span>
    </div>
    <div class="settlement-item">
      <p>Daniel owes Liyana RM51</p>
      <button class="btn btn-secondary settle-btn">Mark as Settled</button>
      <span class="settlement-status">Pending</span>
    </div>
    <div class="settlement-item">
      <p>Sara owes Liyana RM51</p>
      <button class="btn btn-secondary settle-btn">Mark as Settled</button>
      <span class="settlement-status">Pending</span>
    </div>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
