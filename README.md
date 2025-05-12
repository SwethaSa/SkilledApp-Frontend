# 🌟 Skill'ED - Microlearning Web App for Modern Learners

**Skill'ED** is a modern microlearning platform built to help learners acquire skills through focused, bite-sized content. Designed with simplicity and effectiveness in mind, the platform combines intuitive UI/UX, real-time learning progress, structured lesson plans, and direct learner-mentor interaction.

👉 [🔗 Visit the Live Website](https://skilledservice.netlify.app/)

---

## 🚀 Project Highlights

- 📚 **Topic-Based Learning**: Users can explore categorized topics such as **JavaScript**, **HTML**, **Finance**, and more.
- ✅ **Progress Tracker**: Track your learning journey at a modular level with completion status and visual progress bars.
- 🧑‍🏫 **Mentor Dashboard**: Exclusive interface for mentors to create, update, and manage courses, and respond to learner messages.
- 💬 **Discussion & Messaging**: Built-in learner-to-mentor chat interface with a WhatsApp-style design.
- 🔐 **Secure Auth Flow**: Signup/Login, Forgot/Reset Password features with protected routes.
- 🧠 **Course Management API**: Fully featured backend API with CRUD operations for topics, courses, modules, and user progress.
- 📄 **Markdown-Based Lessons**: Each module supports rich text formatting for enhanced reading experience.
- ⚙️ **Tech Stack**: React, Node.js, Express, MongoDB, Vite, TailwindCSS.


## 🔐 Auth & Routing

- Protected routes implemented for authenticated users.
- Mentor routes conditionally rendered based on stored email.
- JWT tokens stored in `localStorage` for session handling.
- Password reset via tokenized route: `/reset-password/:token`.

- ## 📈 Future Plans

- Quizzes, leaderboards, and certificates
- Gamified achievements and streak tracking
- Course rating and feedback system
- PDF Diary export for learners
