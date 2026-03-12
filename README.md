# Sales Sensei - AI Dashboard

Sales Sensei is a powerful dashboard built with **Angular** and the **Gemini Live API**, designed to provide intelligent insights and interactions.

## Core AI Features

The application leverages several key components for its AI capabilities, located in the `src/app/ai` folder:

- **`gemini-live.ts`**: The core integration with the Gemini Live API for real-time interactions.
- **`camera`**: Manages the camera feed for visual inputs.
- **`voice-recognition`**: Handles voice-to-text input (voice feed).
- **`category-service`**: Manages data storage and retrieval via **Firestore**.

---

## Getting Started: Step-by-Step Guide

Follow these steps to set up and use Sales Sensei:

### STEP 1: Install Dependencies

Open your terminal and run:

```bash
npm install --force
```

> [!NOTE]
> please `npm install --force` to force install dependencies.

### STEP 2: Configure Environment

Replace the content of `src/app/env.ts` with the file provided in your assets.

> [!IMPORTANT]
> You may update the **Gemini API Key**, but please **keep the Firebase configuration IDs** as they are necessary to access the pharmacy's real-time data.

### STEP 3: Prepare Your Chart

Prepare a chart to analyze. This can be a digital file or even a handwritten chart on a piece of paper that you can show to the camera.

### STEP 4: Start the Server

To start a local development server, run:

```bash
ng serve
```

The dashboard will be available at `http://localhost:4200/`. please open your upd to date CHROME browser and navigate to `http://localhost:4200/`.

### STEP 5: Login

Use the login and password credentials provided in your uploaded assets to access the dashboard.

### STEP 6: Test Gemini Live Integration

To test the AI integration:

1.  Navigate to the **SENSI** tab.
2.  Show your chart (digital or physical) to the camera.
3.  Give a voice or text request to the AI.

### STEP 7: Barge In

If you need to interrupt the AI or "barge in" during its response, simply click on the **STOP** button.

---

## Additional Information

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.
For more information on the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
