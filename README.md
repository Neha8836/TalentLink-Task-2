# 🌐 TalentLink

TalentLink is a full-stack freelancing platform that connects top freelancers with great clients—securely and efficiently. Built with Django, React, and AWS, it offers real-time project management, proposal workflows, and role-based dashboards tailored to each user.

## 📦 Tech Stack

| Layer      |  Technology        |
|------------|--------------------|
| Frontend   | React (JavaScript) |
| Backend    | Django + DRF       |
| Database   | SQLite (dev)       |
| Auth       | JWT (Token-based)  |

## 📁 Project Structure

talentlink/ ├──
core/ # Django app (models, views, serializers) 
├── talentlink-frontend/ # React frontend │ 
├── src/ 
├── pages/ # Dashboard, Login, ProjectFeed, etc.  
├── components/ # Reusable UI components 
│ └── context/ # Auth and global state 
├── db.sqlite3 # Development database 
  └── manage.py # Django management script

## ✅ Completed Tasks

### Task 1: Backend Setup

- ✅ User Authentication (JWT-based login/register)
- ✅ Profile Model: role, portfolio, skills, hourly rate, availability
- ✅ Project Model: budget, duration, type, description
- ✅ Proposal Model: bid, timeline, message, status
- ✅ Serializers & ViewSets for all models
- ✅ Role-based API endpoints for clients and freelancers

### Task 2: Frontend Integration

- ✅ Landing Page with gradient theme and CTA buttons
- ✅ Login/Register Pages with form validation
- ✅ Profile Setup Page (redirected after first login)
- ✅ Role-aware Dashboard:
  - Freelancer: Proposal history, profile info
  - Client: Posted projects, proposal management
- ✅ Project Feed with filter UI (budget, duration, keyword)
- ✅ Project Detail Page with proposal submission form
- ✅ Proposal Management (accept/reject proposals)
- ✅ Responsive UI with Bootstrap grid and custom styling
- ✅ Toast Notifications for feedback and errors

  ## Features Overview

| Feature                     | Status |
|----------------------------|--------|
| Role-based routing         | ✅ Done
| Profile creation & editing | ✅ Done
| Project CRUD (client)      | ✅ Done
| Proposal submission        | ✅ Done
| Proposal review (client)   | ✅ Done
| Filter/search API          | ✅ Done
| Responsive design          | ✅ Done
