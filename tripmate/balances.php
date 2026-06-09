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
  <article class="card balance-card"><h3>Amirah</h3><p>Should receive RM14</p></article>
  <article class="card balance-card"><h3>Hafiz</h3><p>Should receive RM166</p></article>
  <article class="card balance-card"><h3>Liyana</h3><p>Should receive RM116</p></article>
  <article class="card balance-card"><h3>Daniel</h3><p>Needs to pay RM134</p></article>
  <article class="card balance-card"><h3>Sara</h3><p>Needs to pay RM134</p></article>
</section>

<section class="card">
  <h3>Who needs to pay</h3>
  <p class="form-note">Grouped by payer so the settlement path is easier to understand at a glance.</p>
  <div id="balance-groups" class="stack-grid"></div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
