<?php
$pageTitle = 'Expenses';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Expense Tracker</span>
    <h1>Shared Trip Expenses</h1>
    <p>This page demonstrates shared financial responsibility and collaborative expense tracking.</p>
  </div>
  <div class="summary-pill">Total Expenses: <strong id="expense-total">RM670</strong></div>
</section>

<section class="card form-card">
  <h3>Add Expense</h3>
  <form id="expense-form" class="stack-form">
    <div class="form-grid">
      <label><span>Expense title</span><input type="text" id="expense-title" required></label>
      <label><span>Amount</span><input type="number" id="expense-amount" min="0" step="0.01" required></label>
      <label><span>Paid by</span><input type="text" id="expense-paid-by" required></label>
      <label><span>Category</span><input type="text" id="expense-category" required></label>
      <label><span>Split method</span><input type="text" id="expense-split" value="Split equally among 5 members"></label>
    </div>
    <button type="submit" class="btn btn-primary">Add Expense</button>
  </form>
</section>

<section id="expense-list" class="stack-grid">
  <article class="card expense-card" data-amount="120">
    <div>
      <h3>Lunch</h3>
      <p>Amount: RM120</p>
      <p>Paid by: Amirah</p>
      <p>Category: Food</p>
      <p>Split equally among 5 members</p>
    </div>
    <button class="btn btn-secondary">Receipt Placeholder</button>
  </article>
  <article class="card expense-card" data-amount="300">
    <div>
      <h3>Homestay Deposit</h3>
      <p>Amount: RM300</p>
      <p>Paid by: Hafiz</p>
      <p>Category: Accommodation</p>
      <p>Split equally among 5 members</p>
    </div>
    <button class="btn btn-secondary">Receipt Placeholder</button>
  </article>
  <article class="card expense-card" data-amount="250">
    <div>
      <h3>Island Hopping</h3>
      <p>Amount: RM250</p>
      <p>Paid by: Liyana</p>
      <p>Category: Activity</p>
      <p>Split equally among 5 members</p>
    </div>
    <button class="btn btn-secondary">Receipt Placeholder</button>
  </article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
