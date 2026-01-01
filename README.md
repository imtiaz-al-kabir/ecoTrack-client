# 🌱 EcoTrack - Sustainable Living Comparison & Tracking

EcoTrack is a full-stack sustainable living application designed to help users track their eco-friendly activities, participate in green challenges, and discover local sustainability events. This project encourages users to adopt a more eco-conscious lifestyle through gamified tracking and community engagement.

🔗 **Live Demo:** [https://ecotrack-client.web.app](https://ecotrack-client.web.app)

---

## 🚀 Features

### 🌟 Core Details
-   **User Authentication**: Secure login and registration using Firebase Authentication.
-   **Responsive Design**: Fully responsive interface built with Tailwind CSS and DaisyUI.
-   **Interactive Dashboard**: Personalized dashboard for users to manage their activities and challenges.

### 🏆 Challenges & Events
-   **Browse Challenges**: Explore various eco-friendly challenges (e.g., "Meat-Free Week", "Zero Waste Day").
-   **Join & Track**: Participate in challenges and track your progress.
-   **Create Challenges**: Users can contribute by adding their own challenges to the platform.
-   **Events Integration**: Discover and sign up for upcoming environmental events.

### 📊 Dashboard Features
-   **Overview**: Quick stats on your joined challenges and activities.
-   **Activity Tracking**: Log and view your personal eco-friendly activities.
-   **Challenge Management**: View, update, or remove challenges you've created or joined.
-   **Profile Management**: Update user profile information.

### 💡 Additional Features
-   **Eco Tips**: Curated tips for living a greener life.
-   **Dark/Light Mode**: User preference support for theme toggling.
-   **Toast Notifications**: Real-time feedback using React Hot Toast.
-   **Sweet Alerts**: Beautiful confirmations for critical actions.

---

## 🛠️ Tech Stack

### Frontend
-   **React 19**: Latest React features for building user interfaces.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **React Router 7**: Robust client-side routing.
-   **Tailwind CSS v4** & **DaisyUI**: Utility-first CSS framework with pre-built components.
-   **Framer Motion**: Smooth animations and transitions.

### Integration & State
-   **Firebase**: Authentication and backend services.
-   **Axios**: Promise-based HTTP client for API requests.
-   **React Icons**: Comprehensive icon library.
-   **React Slick**: Carousel component for showcasing content.

---

## 📦 Installation & Getting Started

Follow these steps to set up the project locally.

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ecotrack-client.git
cd ecotrack-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your Firebase configuration keys:
```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📂 Project Structure

```bash
src/
├── Components/    # Reusable UI components
├── Context/       # Global state management (Auth)
├── Layouts/       # Main and Dashboard layouts
├── Pages/         # Application pages (Home, Dashboard, etc.)
├── Routes/        # Router configuration (Private routes, etc.)
└── main.jsx       # Entry point
```

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with 💚 to help save the planet.</p>
