<?php
$currentPage = basename($_SERVER['PHP_SELF']);
$mainNav = [
    'dashboard.php' => 'Dashboard',
    'trip_space.php' => 'Trip Space',
    'itinerary.php' => 'Itinerary',
    'expenses.php' => 'Expenses',
    'balances.php' => 'Balances',
    'activity_feed.php' => 'Activity Feed',
    'privacy.php' => 'Privacy/Settings',
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($pageTitle ?? 'TripMate'); ?> | TripMate</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-page="<?php echo htmlspecialchars($currentPage); ?>">
  <div class="site-shell">
    <header class="site-header">
      <a class="brand-mark" href="index.php">
        <span class="brand-icon">✈️</span>
        <div>
          <strong>TripMate</strong>
          <small>Collaborative Trip Planner</small>
        </div>
      </a>
      <?php if (empty($setupPage)) : ?>
        <nav class="main-nav" aria-label="Primary">
          <?php foreach ($mainNav as $file => $label) : ?>
            <a href="<?php echo $file; ?>" class="<?php echo $currentPage === $file ? 'active' : ''; ?>">
              <?php echo $label; ?>
            </a>
          <?php endforeach; ?>
        </nav>
      <?php endif; ?>
    </header>
    <main class="page-content">
