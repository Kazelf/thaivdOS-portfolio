# macOS Portfolio 💻

My personal portfolio stimulating macOS: https://thaivd.vercel.app.

Built with **Next.js**, **Tailwind CSS**, and **GSAP**.

<img width="1024" height="648" alt="thaivdOS Portfolio" src="https://github.com/user-attachments/assets/b88251fe-3c6b-4912-9777-d414315432fa" />

## ✨ Features

- 🖥️ macOS-style desktop interface
- 🪟 Draggable, focusable windows with z-index management
- 🎯 Dock system with app launching behavior
- 🌗 Dark / Light mode (system-aware)
- 🎞️ Smooth animations using GSAP
- 📱 Responsive & mobile-friendly
- ⚡ Optimized performance

## 🛠 Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Animation:** GSAP
- **State Management:** Zustand

## 📂 Project Structure

```bash
src/
├── app/
│   ├── components/     # UI components (Dock, Menu, Screen etc.)
│   ├── constants/      # App & system constants
│   ├── hoc/            # High Order Components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Pages: Login, Desktop
│   ├── store/          # Zustand stores
│   ├── styles/         # Styles with CSS and Tailwind
│   ├── windows/        # App windows content
│   ├── page.js         # Display pages
│   └── layout.js
├── lib/
│   └── gsapClient.js   # GSAP setup
public/
└── assets/             # Icons, images, mock files
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

## Credits

- [Javascript Mastery Youtube Channel](https://www.youtube.com/watch?v=j9ZD_hlyHOA&t=133s)
- [MitchIvin Portfolio](https://mitchivin.com/)
- [Figma macOS 26 Library - UI Kits](https://www.figma.com/community/file/1543337041090580818)
