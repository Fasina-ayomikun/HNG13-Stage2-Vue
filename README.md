# **HNG 13 – Stage 2: Multi-Framework Ticket Web App (Vue.js Implementation)**

This is the **Vue 3 version** of the Stage 2 challenge part of the multi-framework ticket management system built in **React**, **Vue.js**, and **Twig**.
It expands the Stage 1 app into a **complete, authenticated ticket management platform** with CRUD functionality, form validation, and a consistent responsive design.

---

## **Live Demo**

**Live Site:** [https://hng-stage2-vue-deeyah.netlify.app](https://hng-stage2-vue-deeyah.netlify.app)
**Repository:** [https://github.com/Fasina-ayomikun/HNG13-Stage2-Vue](https://github.com/Fasina-ayomikun/HNG13-Stage2-Vue)

---

## **Setup & Run Instructions**

### Clone the repo

```bash
git clone https://github.com/Fasina-ayomikun/HNG13-Stage2-Vue.git
cd HNG13-Stage2-Vue
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL shown in your terminal, e.g.
👉 **[http://localhost:5173](http://localhost:5173)**

---

## **Project Structure**

```
src/
│
├── assets/                # Shared assets (SVGs, images, icons)
├── components/
|── composables/         # Shared UI components (buttons, modals, nav, etc.)
│
├── pages/
│   ├── landing-page    # Landing page (hero, features, footer)
│   ├── auth              # Login & Signup views
│   ├── dashboard      # Summary dashboard
│   └── tickets        # Full CRUD interface
│
├── utils/
│   ├── useAuth.js         # Login/session composable (localStorage)
│   └── tickets.js         # Ticket store & CRUD logic (localStorage)
│
├── router/
│   └── index.js           # Vue Router setup + route guards
│
└── main.js / App.vue      # App entry point & global layout
```

---

## **Tech Stack & Tools**

| Category        | Tools Used                              |
| --------------- | --------------------------------------- |
| Framework       | Vue 3 (Composition API + Vite)          |
| Routing         | Vue Router 4                            |
| Styling         | Standard CSS (scoped per component)     |
| State/Storage   | LocalStorage for persistence            |
| Icons           | Inline SVGs                             |
| Auth Simulation | `localStorage` key: `ticketapp_session` |

---

## **Core Features (Vue.js Version)**

### **Landing Page**

- App name, hero section, and **“Login / Get Started”** CTAs
- **Wavy SVG background** + decorative circles
- Social proof row (“Trusted by…”) and feature boxes
- Fully **responsive** up to 1440 px max width

---

### **Authentication Pages**

- Login & Signup forms with:

  - Inline validation and accessible error messages
  - **Show/Hide password** toggle (keyboard focusable)
  - Simulated login via localStorage (`ticketapp_session`)
  - Redirect to Dashboard on success

- Logout clears session and redirects to `/auth/login`

---

### **Dashboard**

- Displays total, open, in-progress, and closed ticket counts
- “Create Ticket”, “View Tickets”, and “Logout” buttons
- Protected route (via Vue Router navigation guards)
- Consistent layout — centered and capped at 1440 px

---

### **Ticket Management (CRUD)**

- **Create, View, Edit, Delete** tickets
- Validation rules:

  - `title` and `status` are required
  - `status` must be one of: `open`, `in_progress`, `closed`
  - `description` limited to 1000 characters

- Inline + toast feedback for success/error
- Delete confirmation prompt
- Filter & search by status/title
- **Status color badges:**

  - 🟢 open
  - 🟠 in progress
  - ⚪ closed

- Accessible form modals (`aria-*` attributes, focus trapping)

---

## **Design & Responsiveness**

- Consistent **1440px max-width** layout
- Flexbox + Grid-based responsive design
- **Mobile-first** approach
- Semantic HTML via Vue templates: `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`
- Smooth focus outlines for keyboard users
- Soft card shadows, rounded corners, and vibrant accent colors

---

## **Accessibility Highlights**

- Forms include properly linked `<label>` and `for` attributes
- Errors referenced with `aria-describedby`
- All interactive elements (buttons, links) are keyboard navigable
- Modals include `aria-modal`, `role="dialog"`, and close buttons
- Color contrast meets **WCAG AA** standards

---

## **Example Test Credentials**

Use these for quick login:

```
Email: demo@deetickets.dev
Password: 123456
```

---

## **Vue Implementation Coverage**

| Section        | Requirement                                        | Status |
| -------------- | -------------------------------------------------- | ------ |
| Landing Page   | Hero + CTA + Footer                                | ✅     |
| Authentication | Validation + Session Storage + Toggle Password     | ✅     |
| Dashboard      | Stats + Nav + Logout                               | ✅     |
| Ticket CRUD    | Create, View, Edit, Delete + Validation + Feedback | ✅     |
| Responsiveness | Mobile, Tablet, Desktop                            | ✅     |
| Accessibility  | Semantic + Focus + ARIA                            | ✅     |
| Documentation  | This README section                                | ✅     |
