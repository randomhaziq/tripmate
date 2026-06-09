<?php
$pageTitle = 'Itinerary';
include __DIR__ . '/includes/header.php';
?>
<section class="page-header">
  <div>
    <span class="eyebrow">Collaborative Itinerary</span>
    <h1>Activities and Group Voting</h1>
    <p>This page demonstrates collaborative task management, voting, commenting, and group decision-making.</p>
  </div>
</section>

<section class="card form-card">
  <h3>Propose Activity</h3>
  <form id="activity-form" class="stack-form">
    <div class="form-grid">
      <label><span>Activity name</span><input type="text" id="activity-name" required></label>
      <label><span>Location</span><input type="text" id="activity-location" required></label>
      <label><span>Estimated cost</span><input type="text" id="activity-cost" placeholder="RM30"></label>
<label>
  <span>Proposed by</span>
  <input type="text" id="activity-proposer" required>
</label>

<label>
  <span>Activity Picture</span>
  <input type="file" id="activity-image" accept="image/*">
</label>    </div>
    <button type="submit" class="btn btn-primary">Add Activity</button>
  </form>
</section>

<section id="activity-list" class="stack-grid">
  <article class="card activity-card" data-activity-id="cenang-beach">
    <div class="card-head">
      <div>
        <h3>Cenang Beach</h3>
        <p>Location: Pantai Cenang</p>
        <p>Estimated cost: Free</p>
        <p>Proposed by: Liyana</p>
      </div>
      <span class="status-badge popular">Popular</span>
    </div>
    <div class="vote-row">
      <button class="vote-btn" data-direction="up">👍 Upvote</button>
      <strong class="vote-count">8</strong>
      <button class="vote-btn" data-direction="down">👎 Downvote</button>
    </div>
    <div class="comments-block">
      <h4>Comments</h4>
      <ul class="comment-list">
        <li>Amirah: Great for sunset photos.</li>
        <li>Sara: Easy to fit into the first evening.</li>
      </ul>
      <form class="comment-form">
        <input type="text" class="comment-input" placeholder="Add a comment">
        <button type="submit" class="btn btn-secondary">Post</button>
      </form>
    </div>
  </article>

  <article class="card activity-card" data-activity-id="skycab">
    <div class="card-head">
      <div>
        <h3>Langkawi SkyCab</h3>
        <p>Location: Oriental Village</p>
        <p>Estimated cost: RM45</p>
        <p>Proposed by: Amirah</p>
      </div>
      <span class="status-badge approved">Approved</span>
    </div>
    <div class="vote-row">
      <button class="vote-btn" data-direction="up">👍 Upvote</button>
      <strong class="vote-count">10</strong>
      <button class="vote-btn" data-direction="down">👎 Downvote</button>
    </div>
    <div class="comments-block">
      <h4>Comments</h4>
      <ul class="comment-list">
        <li>Hafiz: Worth the price for the view.</li>
        <li>Daniel: Let’s book this early.</li>
      </ul>
      <form class="comment-form">
        <input type="text" class="comment-input" placeholder="Add a comment">
        <button type="submit" class="btn btn-secondary">Post</button>
      </form>
    </div>
  </article>

  <article class="card activity-card" data-activity-id="night-market">
    <div class="card-head">
      <div>
        <h3>Night Market</h3>
        <p>Location: Kuah</p>
        <p>Estimated cost: RM20</p>
        <p>Proposed by: Liyana</p>
      </div>
      <span class="status-badge pending">Proposed</span>
    </div>
    <div class="vote-row">
      <button class="vote-btn" data-direction="up">👍 Upvote</button>
      <strong class="vote-count">6</strong>
      <button class="vote-btn" data-direction="down">👎 Downvote</button>
    </div>
    <div class="comments-block">
      <h4>Comments</h4>
      <ul class="comment-list">
        <li>Amirah: Cheap dinner option for the group.</li>
      </ul>
      <form class="comment-form">
        <input type="text" class="comment-input" placeholder="Add a comment">
        <button type="submit" class="btn btn-secondary">Post</button>
      </form>
    </div>
  </article>

  <article class="card activity-card" data-activity-id="island-hopping">
    <div class="card-head">
      <div>
        <h3>Island Hopping</h3>
        <p>Location: Langkawi Jetty</p>
        <p>Estimated cost: RM50</p>
        <p>Proposed by: Hafiz</p>
      </div>
      <span class="status-badge popular">Popular</span>
    </div>
    <div class="vote-row">
      <button class="vote-btn" data-direction="up">👍 Upvote</button>
      <strong class="vote-count">7</strong>
      <button class="vote-btn" data-direction="down">👎 Downvote</button>
    </div>
    <div class="comments-block">
      <h4>Comments</h4>
      <ul class="comment-list">
        <li>Sara: Looks fun, but we should check the weather.</li>
      </ul>
      <form class="comment-form">
        <input type="text" class="comment-input" placeholder="Add a comment">
        <button type="submit" class="btn btn-secondary">Post</button>
      </form>
    </div>
  </article>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
