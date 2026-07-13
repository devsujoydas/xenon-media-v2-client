
---

# 🧿 Xenly

**Xenly** is a modern, full-featured social media platform inspired by Facebook — where users can share posts, like, comment, manage friends, and even access an admin dashboard. Built with React, Firebase, and Tailwind CSS, Xenly delivers a smooth and responsive social experience.

🌐 **Live Demo**: [https://xenonmedia.netlify.app](https://xenonmedia.netlify.app)
📦 **GitHub Repo**: [github.com/devsujoydas/mini-social-app](https://github.com/devsujoydas/mini-social-app)

---

## 🚀 Features

### 👥 User Features

* 🔐 Firebase Authentication (Sign up / Sign in / Google Login)
* 📝 Create, update, and delete posts
* ❤️ Like posts and 💬 comment on posts
* 📤 Share posts
* 👥 Send and accept friend requests
* 🔍 Search users or posts
* 🧾 View and update user profile
* 🔐 Protected routes for authenticated users
* 🔃 Smooth scroll and responsive UI

### 🛠 Admin Features

* 📊 Dashboard with analytics (charts for users/posts)
* 🧑‍💻 Manage Users (view, delete)
* 🗑 Manage Posts (moderate or delete)
* 🔧 Admin-only route protection

---

## 🛠 Tech Stack

| Layer            | Tech Used                           |
| ---------------- | ----------------------------------- |
| Frontend         | React 19, Vite                      |
| Styling          | Tailwind CSS 4                      |
| Authentication   | Firebase Authentication             |
| Database/Storage | Firebase Firestore, localforage     |
| Routing          | React Router DOM v7                 |
| State Management | React Query, Context API            |
| Forms            | React Hook Form                     |
| Charts           | Chart.js, react-chartjs-2           |
| UI Components    | Swiper.js, SweetAlert2, React Icons |
| Notifications    | React Hot Toast, React Toastify     |
| UX Enhancements  | Lenis (smooth scroll), match-sorter |

---

## 📸 Screenshots

> You can include screenshots of the homepage, profile, admin dashboard, and mobile view here.

---

## ⚙️ Getting Started

### 🔄 Clone the Project

```bash
git clone https://github.com/devsujoydas/mini-social-app.git
cd mini-social-app
```

### 📦 Install Dependencies

```bash
npm install
```

### 🔐 Setup Environment Variables

Create a `.env` file in the root folder with your Firebase credentials:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

Or create a `.env.example` file and share with collaborators.

### ▶️ Run Development Server

```bash
npm run dev
```

---

## 📁 Folder Structure

```
/src
│
├── AuthProvider
├── Components
│   ├── FriendSuggested
│   ├── Loading
│   ├── Navbar
│   ├── PostForm
│   ├── Posts
│   ├── ProfileActivity
│   ├── ProfileSidebar
│   ├── SearchBar
│   ├── Sidebar
│   ├── SideNavbar
│   ├── Storybox
│   ├── UpcommingEvents
│   └── UsersPosts
├── Firebase
├── Layout
├── Pages
│   ├── Admin
│   │   ├── Carts
│   │   ├── ManagePosts
│   │   └── ManageUsers
│   ├── ChatBox
│   ├── ErrorPage
│   ├── EventsPage
│   ├── ForgotPassword
│   ├── Friends
│   │   └── FriendsCard
│   ├── Home
│   ├── Login
│   ├── Memories
│   ├── Profile
│   ├── ProfileImageUpload
│   ├── SavedPosts
│   ├── Signup
│   └── UpdateInfo
├── routes

```

---

## 🔐 Admin Access

> You may provide demo credentials here (optional) if you want others to explore the admin panel.

---

## 🙋‍♂️ Author

**Sujoy Das**
📧 [devsujoydas@gmail.com](mailto:devsujoydas@gmail.com)
🌐 [Facebook](https://facebook.com/desujoydas)
🐱 [GitHub](https://github.com/devsujoydas)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💬 Feedback & Contributions

Feel free to open [issues](https://github.com/devsujoydas/mini-social-app/issues) or create pull requests to improve the project. All feedback is welcome!

---

