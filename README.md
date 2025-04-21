# 🎵 Mern-Spotify

**Mern-Spotify** is a full-stack music streaming application inspired by Spotify, built with the **MERN stack** (**MongoDB**, **Express**, **React**, **Node.js**) and enhanced with **TypeScript**. It also utilizes **Clerk** for authentication, enabling secure and seamless user login, signup, and session management.Additionally, the project incorporates **Cloudinary** for efficient image and audio asset storage, and **Socket.IO** to support real-time functionality such as live interactions or notifications.

It offers users the ability to browse, play, and manage music tracks within a sleek and responsive interface.

This project is one of the most comprehensive applications I’ve developed using the MERN stack. It played a significant role in reinforcing my knowledge of RESTful API design, authentication flows, component-driven frontend architecture, and scalable backend development — making it not only a product but also a deep hands-on learning experience.

While the current version covers core features such as login, streaming, and liking songs, the project is built with future scalability in mind. Potential improvements include playlist creation, social features, and real-time socket integration.

## 🚀 Features
- 🔐 Clerk-powered authentication for secure sign-up, login, and session management
- 🔐 JWT-based user authentication and protected routes  
- 🎷 Music streaming and player functionality  
- ❤️ Like and manage favorite tracks  
- 🔍 Search functionality for songs and artists  
- 🧑‍💻 Responsive UI with reusable React components  
- 🗂️ Modular and typed backend services  
- 🎨 Clean and minimalistic user interface  
- 🌐 RESTful API architecture
- ☁️ Cloudinary integration for efficient media storage and delivery
- 🔄 Real-time updates using Socket.IO for features like live notifications or collaborative playlists

## 🛠️ Technologies Used

### Frontend
- **React**  
- **TypeScript**  
- **Axios**  
- **React Router DOM**  
- **Context API**  
- **CSS / SCSS Modules**
- **Socket.IO Client**

### Backend
- **Node.js**  
- **Express**  
- **MongoDB**  
- **Mongoose**  
- **JWT (Authentication)**
- **Clerk – Authentication and user session management**
- **Cloudinary SDK – Media storage and management**

### Tools & Others
- **Postman** – API testing  
- **VS Code** – Development  
- **Git & GitHub** – Version control


## 📸 Screenshots

> *You can add screenshots by placing them in a `/screenshots` folder and referencing them like below:*

```markdown
![Home Page](./screenshots/home.png)
![Login Page](./screenshots/login.png)
```
## ⚙️ Getting Started

### Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [VS Code](https://code.visualstudio.com/)
- (Optional) Postman

## 🔧 Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/EkremL/Mern-Spotify.git
cd Mern-Spotify
```

2. Go to backend directory and install dependencies:
```bash
cd server
npm install
```

3. Create a `.env` file and add the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernspotify
ADMIN_EMAIL=youradmin@email.com

# Cloudinary
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name

# Clerk
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

## 💻 Frontend Setup

1. In the root directory:
```bash
cd client
npm install
```
2. Create a .env.local file in the /client directory and add:
```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

3. Run the frontend:
```bash
npm run dev
```

> The app will be available at: [http://localhost:3000](http://localhost:5173) (vite)

## 📁 Project Structure (Simplified)

```
Mern-Spotify/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.ts
```
## ✍️ Developer

**Ekrem Can Lale**

## 🤝 Contributing

Feel free to fork the repo, open issues, or submit pull requests. Contributions are always welcome!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
