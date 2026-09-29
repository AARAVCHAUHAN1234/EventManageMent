# NexClub — College Club Event Management Web Application

> A complete, modern, responsive frontend-only College Club Event Management Platform built with React, Vite, Tailwind CSS, Lucide Icons, and browser `localStorage`.

---

## 🚀 Live Demo & Presentation Notes

> [!NOTE]
> **Architecture Notice:** This is a **frontend-only demonstration application**. All data (events, student registrations, admin session) is stored in the browser's `localStorage` and persists through page refreshes. Data is local to your browser session and does not require an external database or backend server.

---

## 🔑 Admin Credentials

| Role | Email | Password |
|---|---|---|
| **Club Administrator** | `admin@collegeclub.com` | `admin123` |

*A 1-click **"Auto-fill Demo"** button is also built directly into the `/admin/login` page for easy presentation.*

---

## ✨ Features

### 🎓 Student Experience
1. **Interactive Home Page (`/`)**:
   - Hero banner with engaging CTAs & student badges.
   - **Featured Event of the Month** spotlight with capacity status.
   - Upcoming Events grid with dynamic date badges.
   - About Club section with mission, vision, and dynamic statistics (Active Members, Events Organized, Workshops, Years Active).
   - Club Secretariat contact info & category links.
2. **Event Catalog & Filtering (`/events`)**:
   - Instant real-time search across event titles, topics, and venues.
   - Category filtering (*Workshop, Hackathon, Seminar, Competition, Cultural, Sports, Technical, Other*).
   - Event status filter (*All, Upcoming, Past*).
   - Animated empty state when no events match the search.
3. **Event Details (`/events/:id`)**:
   - High-resolution event imagery with fallback placeholder protection.
   - Dynamic real-time capacity progress meter (e.g. `12 / 50 spots filled`).
   - Registration deadline countdown banner (`⏳ 4 days left to register`).
   - Detailed agenda, prerequisites, and student guidelines.
   - Direct button to register or notification if registration has closed.
4. **Student Registration (`/register/:eventId`)**:
   - Form fields: Full Name, Email, College/University, Academic Year, Phone Number, Department, and Student ID.
   - Comprehensive client-side form validation.
   - **Duplicate Registration Prevention**: Rejects duplicate signups matching `eventId + email` with *"You are already registered for this event."*
   - **Capacity Cap & Deadline Enforcement**: Blocks registrations if maximum participants reached or deadline expired.
5. **Digital Event Pass & Confetti (`RegistrationTicket`)**:
   - Celebratory confetti animation on registration.
   - Clean printable entry pass with attendee details, Pass ID, and verified QR code graphics.
   - 1-click **Print Ticket** action.

---

### 🛡️ Admin Management Console
1. **Secure Frontend Session Guard (`/admin/login`)**:
   - Protected routes (`/admin/*`) redirecting unauthenticated visitors to `/admin/login`.
   - Show/hide password toggle, loading spinner, and input validation.
2. **Real-time KPI Dashboard (`/admin`)**:
   - **Total Events** counter.
   - **Total Verified Registrations** counter.
   - **Upcoming vs Past Events** breakdown.
   - **Overall Capacity Fill Rate (%)** utilization gauge.
   - Featured event spotlight card with quick edit access.
   - Category distribution progress bars.
   - Recent registrations table.
3. **Event Management (`/admin/events`)**:
   - Data table with thumbnails, categories, dates, venues, registration progress, and statuses.
   - Create new event (`/admin/events/new`) with image URL preview and category presets.
   - **Single Featured Event Logic**: Selecting an event as "Featured" automatically un-features other events to maintain a clean highlight banner.
   - Edit existing event properties with instant UI synchronization (`/admin/events/edit/:id`).
   - Delete event with a confirmation modal (automatically removes associated registrations).
4. **Student Registrations Table (`/admin/registrations`)**:
   - Instant search by student name, email, or college.
   - Filter by specific event or academic year.
   - View complete student details in an interactive modal.
   - Remove/cancel individual student registrations with confirmation modal.
   - **Export to CSV**: 1-click download of all filtered registrations.
5. **Reset Demo Data**:
   - Admin tool to quickly restore the initial 8 sample events and seed registrations at any point during demonstrations.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler / Dev Server**: Vite 6
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Celebrations**: Canvas-Confetti
- **Storage**: Browser `localStorage` with a safe abstraction layer

---

## 📂 Project Structure

```text
codechef/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── context/
│   │   ├── AuthContext.jsx          # Admin authentication session state
│   │   ├── ToastContext.jsx         # Global animated toast notifications
│   │   └── EventContext.jsx        # Synchronized events & registrations state
│   ├── data/
│   │   └── initialEvents.js         # 8 rich initial college events & seed signups
│   ├── utils/
│   │   ├── storage.js               # Centralized localStorage helper functions
│   │   ├── validation.js            # Client-side form validators
│   │   └── dateUtils.js             # Date formatting, deadline checks, relative time
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx           # Responsive navbar with mobile drawer
│   │   │   ├── Footer.jsx           # Footer with links, club info, social icons
│   │   │   ├── Modal.jsx            # Accessible reusable modal dialog
│   │   │   ├── Toast.jsx            # Toast notifications container
│   │   │   ├── Badge.jsx            # Category & status badges
│   │   │   ├── CapacityBar.jsx      # Progress bar for event capacity
│   │   │   └── ProtectedRoute.jsx   # Admin route guard
│   │   ├── student/
│   │   │   ├── EventCard.jsx        # Interactive event card with image fallback
│   │   │   ├── FeaturedEvent.jsx    # Hero spotlight section for featured event
│   │   │   ├── SearchAndFilters.jsx # Live search, category chips, status selector
│   │   │   └── RegistrationTicket.jsx # Digital student ticket pass
│   │   └── admin/
│   │       ├── AdminLayout.jsx      # Admin sidebar navigation & topbar
│   │       ├── StatCard.jsx         # KPI metric card
│   │       └── DeleteConfirmModal.jsx # Reusable delete confirmation
│   └── pages/
│       ├── student/
│       │   ├── Home.jsx             # Hero, stats, featured event, upcoming cards, about
│       │   ├── Events.jsx           # Full event catalog with live filters & search
│       │   ├── EventDetails.jsx     # Full event page, registration count, countdown
│       │   └── Register.jsx         # Student registration form & ticket generator
│       └── admin/
│           ├── AdminLogin.jsx       # Demo credentials helper, validation
│           ├── AdminDashboard.jsx   # KPI stats, recent registrations, quick actions
│           ├── AdminEvents.jsx      # Event table with search, status filters, actions
│           ├── AddEvent.jsx         # Create event form with image preview
│           ├── EditEvent.jsx        # Edit existing event form
│           └── AdminRegistrations.jsx # Registration table, search, event filter, export CSV
```

---

## 💾 LocalStorage Architecture

All interactions with `localStorage` are centralized in [`src/utils/storage.js`](file:///c:/Users/chauh/OneDrive/Desktop/project/codechef/src/utils/storage.js):

| Key | Purpose |
|---|---|
| `club_events` | Stores array of event objects |
| `club_registrations` | Stores array of student registration objects |
| `club_admin_logged_in` | Stores boolean flag (`"true"`) indicating admin login session |

### Sample Event Object Structure
```json
{
  "id": "evt-hackathon-2026",
  "title": "InnovateX 2026: 36-Hour National Hackathon",
  "category": "Hackathon",
  "date": "2026-10-15",
  "time": "09:00 AM - 09:00 PM",
  "venue": "Main Auditorium & Computing Center",
  "shortDescription": "Build game-changing web, AI, and hardware prototypes.",
  "description": "Full description of event agenda and perks...",
  "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  "registrationDeadline": "2026-10-10",
  "maxParticipants": 120,
  "isFeatured": true,
  "createdAt": "2026-09-29T16:00:00.000Z"
}
```

### Sample Registration Object Structure
```json
{
  "id": "reg-1727629200000",
  "eventId": "evt-hackathon-2026",
  "name": "Aarav Sharma",
  "email": "aarav.sharma@college.edu",
  "college": "Institute of Engineering & Technology",
  "year": "3rd Year (Junior)",
  "phone": "+91 98765 43210",
  "department": "Computer Science & Engineering",
  "studentId": "CSE-2023-042",
  "registeredAt": "2026-09-29T16:15:00.000Z"
}
```

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### Steps
1. Clone or open the project folder:
   ```bash
   cd codechef
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the printed local URL (typically `http://localhost:5173`).

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push the code to a GitHub repository.
2. Import the project on [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

### Deploy to Netlify
Create a `_redirects` file in your `public/` directory with:
```text
/*    /index.html   200
```
Then drag and drop the `dist/` folder into Netlify Drop, or connect via GitHub.

---

## 📱 Responsive Testing Matrix

The web application is styled with responsive Tailwind CSS utilities and tested across all viewport dimensions:
- **Mobile**: 360px, 375px (iPhone SE), 390px (iPhone 14/15), 414px, 430px (iPhone Pro Max)
- **Tablet**: 768px (iPad Mini), 820px (iPad Air), 912px (Surface Pro)
- **Desktop / Laptop**: 1024px, 1366px, 1440px, 1920px (Full HD)

Zero horizontal scrolling on mobile viewports.
