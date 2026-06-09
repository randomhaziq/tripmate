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

<section class="member-grid" id="trip-space-members"></section>

<section class="card">
  <div class="tracker-header">
    <div>
      <h3>Last Known Location</h3>
      <p>This mock GPS tracker helps the group check the latest shared location of each member during the trip.</p>
    </div>
    <div class="button-row">
      <span id="location-sharing-state" class="toggle-label">Checking...</span>
      <button class="btn btn-secondary" id="simulate-location-update">Simulate GPS Update</button>
    </div>
  </div>
  <div class="location-banner" id="location-banner">
    Live location sharing is off by default. Members can enable it in Privacy/Settings when they want to share trip safety updates.
  </div>
  <div id="location-tracker-list" class="tracker-grid"></div>
  <div class="mock-map-panel">
    <div class="mock-map-header">
      <div>
        <h3>Trip Map Snapshot</h3>
        <p>Mock member pins show where shared locations appear around Langkawi when location sharing is on.</p>
      </div>
    </div>
    <div id="mock-map" class="mock-map">
      <div class="mock-map-water"></div>
      <div class="mock-map-land land-a"></div>
      <div class="mock-map-land land-b"></div>
      <div class="mock-map-land land-c"></div>
      <div class="mock-map-label label-a">Pantai Cenang</div>
      <div class="mock-map-label label-b">Kuah</div>
      <div class="mock-map-label label-c">Oriental Village</div>
      <div class="map-pin is-live" style="top:34%;left:31%;">
        <span class="map-pin-dot"></span>
        <span class="map-pin-name">Amirah</span>
      </div>
      <div class="map-pin is-live" style="top:53%;left:60%;">
        <span class="map-pin-dot"></span>
        <span class="map-pin-name">Hafiz</span>
      </div>
      <div class="map-pin is-live" style="top:72%;left:39%;">
        <span class="map-pin-dot"></span>
        <span class="map-pin-name">Liyana</span>
      </div>
    </div>
    <div class="mock-map-legend">
      <div class="legend-item">
        <span class="legend-dot is-live"></span>
        <span>Location On members appear on the mock trip map</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot is-off"></span>
        <span>Location Off: Daniel, Sara</span>
      </div>
    </div>
  </div>
</section>

<section class="card">
  <div class="button-row">
    <a class="btn btn-primary organizer-only-action" href="invite.php">Invite Member</a>
    <button class="btn btn-secondary copy-trigger" data-copy="http://localhost/tripmate/join/TRIP-LGK-2026">Copy Invite Link</button>
  </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
