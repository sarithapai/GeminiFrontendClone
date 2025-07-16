# GeminiFrontendClone

GeminiFrontendClone is a Next.js-based web application that replicates the Gemini AI chat interface.

## 🚀 Live Demo

https://gemini-frontend-clone-orpin.vercel.app/

---

## 📦 Project Overview

This project is a frontend clone of the Gemini AI chat interface, built with Next.js and React. It features a chat UI, OTP-based authentication, and state management with Redux. The app is responsive and styled with custom CSS.

---

## 🛠️ Setup & Run Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sarithapai/GeminiFrontendClone.git
   cd GeminiFrontendClone
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Run the development server:**
   ```sh
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```sh
   yarn build
   yarn start
   ```

---

## 📁 Folder & Component Structure

- **app/**  
  Next.js app directory (routing, layouts, pages)
  - `globals.css` – Global styles
  - `layout.tsx` – Root layout
  - `page.tsx` – Main landing page
  - `signin/` – Sign-in and OTP authentication

- **components/**  
  Reusable React components
  - `ChatComponent.tsx` – Main chat UI
  - `Header.tsx` – App header
  - `Sidebar.tsx` – Navigation/sidebar
  - `OtpForm.tsx` – OTP input form
  - `commonViews/` – Shared UI components

- **lib/**  
  Utility functions and schemas
  - `getCountries.ts` – Country data fetcher
  - `schemas.ts` – Validation schemas

- **redux/**  
  Redux store and slices

- **utils/**  
  Helper utilities

- **public/**  
  Static assets (images, icons, etc.)

---

## 📄 License

This project is for educational purposes only.