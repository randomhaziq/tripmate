# TripMate: A Collaborative Group Trip and Expense Planner

TripMate is a simple web-based university prototype for small closed groups of friends who are planning a trip together. It demonstrates how a private social computing system can support collaborative trip planning, activity voting, expense sharing, balance tracking, privacy controls, and simple role-based collaboration.

System type: closed-network social computing prototype

## How to run with XAMPP

1. Copy the `tripmate` folder into `htdocs`
2. Start Apache in XAMPP
3. Open `http://localhost/tripmate`

## Pages

- `index.php` - Welcome page that introduces TripMate and links to the setup flow
- `create_trip.php` - Create Trip Space form with sample trip details
- `invite.php` - Invite code, mock invite link, role assignment, and member list management
- `dashboard.php` - Main dashboard with trip summary, role visibility, activity, expenses, and quick actions
- `trip_space.php` - Closed group member space with roles, statuses, and a mock last-known-location tracker
- `itinerary.php` - Collaborative itinerary with activity proposals, mock photo attachments, capped voting, comments, and delete actions
- `expenses.php` - Shared expense tracker with add-expense form, ownership visibility, and delete actions
- `balances.php` - Balance dashboard showing clearer payer-to-receiver settlement groups
- `activity_feed.php` - Group activity feed and notification history
- `privacy.php` - Privacy and settings page with toggles and prototype data controls

## Social computing features included

- Group and community creation
- Mock organizer vs member role mode
- Closed Trip Space for invited members
- Member invitation flow
- Role assignment during invite
- Collaborative itinerary planning
- Posting and sharing trip ideas
- Mock photo attachments for activity proposals
- Voting on activities
- Commenting on proposals
- Delete actions for user-generated content
- Shared expense tracking
- Balance dashboard and settlement visibility
- Optional mock GPS/location-sharing tracker with last known locations
- Activity feed and notifications
- Privacy and social impact settings

## Prototype limitations

- No real login
- No real payment
- No real database
- Uses sample data
- Built only for demonstration
