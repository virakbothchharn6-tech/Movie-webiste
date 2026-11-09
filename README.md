# 🎬 Ousa Movie

A movie and TV streaming website with a **React** frontend and a **FastAPI** backend. It supports **Khmer** and **English**, user accounts, and movie data from the **TMDB API**.

![Home page](docs/screenshots/home.png)

## ✨ Features

- 🎞️ Hero slideshow with autoplay and a **Watch Now** button
- 📂 Categories: **Home, Movies, Anime, TV Shows, Trending**
- 🔍 Search movies and TV shows
- 🌐 Language switcher: **Khmer (KH)** and **English (EN)** with flag icons
- ▶️ Movie player modal with multiple streaming servers (VidSrc, MultiEmbed, EmbedSu)
- ⭐ Ratings and release year on every movie card
- 🔐 User authentication: register, login, logout (FastAPI)
- 📱 Responsive design for desktop and mobile
- 🔤 Khmer font support (Kantumruy Pro) alongside Inter

## 🛠️ Tech Stack

| Part | Technology |
| --- | --- |
| Frontend | React (Create React App), Tailwind CSS v3 |
| Backend | Python, FastAPI, Uvicorn |
| Movie data | [TMDB API](https://www.themoviedb.org/documentation/api) |
| Fonts | Inter, Kantumruy Pro (Google Fonts) |

## 📁 Project Structure

```
Movie Frontend and backend/
├── frontend-user/        # React app
│   ├── public/
│   └── src/
│       ├── components/   # Header, Slideshow, translations, ...
│       ├── App.js
│       └── index.js
├── backend/              # FastAPI app
│   └── ...
└── .gitignore
```

## 🚀 Getting Started

### Requirements

- [Node.js](https://nodejs.org/) 18 or newer
- [Python](https://www.python.org/) 3.10 or newer
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/virakbothchharn6-tech/Movie-webiste.git
cd Movie-webiste
```

### 2. Run the backend (FastAPI)

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`.
Interactive API docs (Swagger): `http://localhost:8000/docs`

> If your entry file or app name is different, change `main:app` to match it.

### 3. Run the frontend (React)

Open a second terminal:

```bash
cd frontend-user
npm install
npm start
```

The website runs at `http://localhost:3000`.

## 🔑 Environment Variables

Never commit real keys. `.env` files are listed in `.gitignore`.

**frontend-user/.env**

```env
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_API_URL=http://localhost:8000
```

**backend/.env**

```env
SECRET_KEY=your_secret_key
# Add your database settings here
```

After you change a `.env` file, restart `npm start` or `uvicorn`.

## 🔌 API Endpoints (backend)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | Create a new account |
| POST | `/login` | Log in and get a token |
| POST | `/logout` | Log out |

> Update this table to match your real routes. The full list is available at `/docs`.

## 📸 Screenshots

| Home | Player | Khmer UI |
| --- | --- | --- |
| ![Home](docs/screenshots/home.png) | ![Player](docs/screenshots/player.png) | ![Khmer](docs/screenshots/khmer.png) |

## 🗺️ Roadmap

- [ ] My List (save favorite movies)
- [ ] Movie detail page
- [ ] Watch history
- [ ] Admin dashboard
- [ ] Deploy frontend and backend

## ⚠️ Disclaimer

This project is for **learning purposes only**. Movie information and images come from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB. The video player uses third-party embed servers, and this project does not host any video files.

## 👤 Author

**Virakboth Chharn**
GitHub: [@virakbothchharn6-tech](https://github.com/virakbothchharn6-tech)

## 📄 License

This project is licensed under the MIT License. Add a `LICENSE` file if you want to use this license.