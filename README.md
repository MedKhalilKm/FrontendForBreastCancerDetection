# Embrace Health Scan - Breast Cancer Detection

A modern, AI-powered web application designed to assist in the early detection of breast cancer. This project leverages machine learning models to provide accurate predictions based on tumor features and medical images.

## 🚀 Features

### 1. Manual Analysis
For medical professionals who have the underlying data, the **Manual Analysis** tool allows entering 30 specific tumor features (such as radius, texture, perimeter/area, smoothness, compactness, etc.) to generate a prediction (Malignant or Benign).

- **Interactive Form**: Easy-to-use form with validation.
- **Real-time Feedback**: Instant prediction results after submission.
- **Visualizations**: (If applicable) Displays key metrics used in the analysis.

### 2. Image Analysis
The **Image Analysis** tool simplifies the process by allowing users to upload a tumor image. The system uses advanced image processing (OpenCV, Scikit-image) on the backend to extract features automatically and provide a diagnosis.

- **Drag & Drop Upload**: Simple interface to upload medical images.
- **Automatic Extraction**: Extracts features without manual input.
- **Secure Processing**: Images are processed securely for prediction.

### 3. Modern UI/UX
- **Responsive Design**: Fully responsive interface tailored for desktops, tablets, and mobile devices.
- **Fast Performance**: Built with **Vite** for lightning-fast loading and interactions.
- **Accessible Components**: Utilizes **Shadcn UI** for accessible and consistent design components.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management**: [React Query (TanStack Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Backend (Integration)
*Note: This repository contains the frontend code. The application requires a corresponding backend service to handle predictions.*
- **Framework**: FastAPI (Python)
- **ML Libraries**: Scikit-learn, OpenCV, Scikit-image

---

## 🏁 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- **Node.js**: Ensure you have Node.js (v18 or higher) installed. [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js.

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd embrace-health-scan
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the app**
   Open your browser and navigate to `http://localhost:8080` (or the port shown in your terminal).

---

## 📖 Usage

1. **Home Page**: Navigate to the landing page to see an overview of the tools.
2. **Start Analysis**: Click on "Start Analysis" to enter tumor metrics manually. Fill in the required fields and submit to see the prediction.
3. **Upload Image**: Go to the "Image Analysis" section to upload a slide/tumor image. The system will analyze it and return the result.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


This project is licensed under the MIT License. See the `LICENSE` file for details.
