# Drag & Drop Image Uploader

A clean, responsive image uploader built with vanilla HTML, CSS, and JavaScript no frameworks, no dependencies.

## Features
- 🖱️ Drag-and-drop or click-to-browse file selection
- 🖼️ Instant image preview using the FileReader API
- 📊 Simulated upload progress bar
- ✅ File type validation (JPG, PNG, GIF only)
- ⚠️ Clear error messages for invalid files
- 💾 Persists the uploaded image in `localStorage` — survives a page refresh
- 📱 Fully responsive layout

## Tech Stack
- HTML5 (Drag-and-Drop API, File API)
- CSS3 (custom properties, animations)
- Vanilla JavaScript (no libraries)

## How to Run
1. Clone this repository
2. Open `index.html` in your browser
3. Drag an image into the upload area, or click to browse

## Concepts Practiced
- HTML5 drag-and-drop events (`dragover`, `dragleave`, `drop`)
- FileReader API for client-side image preview
- Simulated async behavior with `setTimeout`
- Browser `localStorage` for persisting state across page reloads
