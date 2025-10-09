# DM 5 - Specs & Creatives

An advanced web application designed to assist in the automated development and validation of creative materials (graphics, ad copy, video scripts) for multi-channel digital advertising campaigns. Powered by Google's Gemini API, it provides a streamlined workflow for creating compliant and optimized ad assets.

The application features a modern, responsive, and dark-themed UI built with React and Tailwind CSS, providing an intuitive and aesthetically pleasing experience for the user.

## Key Features

- **Creative Generation**: Generate ad assets based on user-provided ideas and campaign objectives.
  - **Text Generation**: Creates ad copy, headlines, and descriptions using `gemini-2.5-flash`.
  - **Image Generation**: Produces high-quality visual ads with `imagen-4.0-generate-001`.
  - **Script Generation**: Develops detailed video and audio scripts suitable for production.
- **Creative Validator**: Upload or paste existing creatives to validate them against the technical specifications of the selected ad format (e.g., file size, dimensions, aspect ratio, character count).
- **Comprehensive Ad Specs Database**: Includes detailed specifications and best practices for dozens of ad formats across major platforms like Meta, Google/YouTube, TikTok, LinkedIn, Amazon, Spotify, and more.
- **Multi-language Support**: Fully internationalized with support for English and Spanish using `i18next`, with translations bundled for robust offline-first support.
- **Dynamic & Intuitive UI**: The interface progressively discloses options as the user makes selections, providing a clean and focused workflow.
- **Built-in Help & Feedback**: Features a modal-based help center explaining app functionality and a one-click mailto link for sending feedback.
- **Responsive Design**: A modern, responsive UI/UX designed for various screen sizes.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI / LLM**: Google Gemini API (`@google/genai`)
- **Internationalization**: `i18next` with `react-i18next`
- **Module Loading**: Uses modern ES Modules with an `importmap` in `index.html`, loading dependencies directly from `esm.sh`. This removes the need for a local bundling step (like Webpack or Vite) for development.

## Setup and Running Locally

#### Prerequisites

- A modern web browser that supports ES Modules and `importmap`.
- A simple local web server to serve the project files. This is necessary because ES Modules have security restrictions and won't work correctly if you open `index.html` directly from the filesystem (`file://` protocol).

#### Environment Variables

This project requires a Google Gemini API key to function.

1.  The application is designed to fetch the API key from an environment variable named `API_KEY` in its execution environment (e.g., `process.env.API_KEY`).
2.  You must ensure this variable is properly configured in the environment where you deploy or run the application. The code **does not** read a `.env` file directly, as this is a client-side application. The environment variable must be injected by the serving platform or a build tool.

#### Installation

Since this project uses an `importmap` to load dependencies directly from a CDN (`esm.sh`), there are no `npm` packages to install. You can run the project without `npm install`.

#### Running the App

You need to serve the project root directory using a simple local web server. Here are two common ways to do this:

1.  **Using Python:**
    If you have Python 3 installed, navigate to the project's root directory in your terminal and run:
    ```bash
    python -m http.server
    ```
    Then, open your browser to `http://localhost:8000`.

2.  **Using Node.js (`serve` package):**
    First, install the `serve` package globally if you don't have it:
    ```bash
    npm install -g serve
    ```
    Then, navigate to the project's root directory in your terminal and run:
    ```bash
    serve .
    ```
    Then, open your browser to the local address provided by the `serve` command (e.g., `http://localhost:3000`).

## Project Structure

```
.
├── index.html                # Main HTML file with importmap
├── index.tsx                 # React entry point
├── src/
│   ├── components/           # Reusable React components (Buttons, Inputs, etc.)
│   ├── features/             # Components for major app sections
│   │   ├── generator/        # Components for the Creative Generator tab
│   │   └── validator/        # Components for the Creative Validator tab
│   ├── services/             # Business logic and external API communication
│   │   ├── geminiService.ts  # Logic for interacting with the Gemini API
│   │   └── validationService.ts # Logic for validating creative assets
│   ├── App.tsx               # Main app component, handles layout and routing
│   ├── constants.ts          # App-wide constants (platform data, ad specs)
│   ├── i18n.ts               # i18next configuration with bundled translations
│   └── types.ts              # TypeScript type definitions
└── README.md                 # This file
```

## How It Works

### Creative Generator
The user selects an advertising platform and a specific ad format. This selection loads an `AdFormatSpec` object from `src/constants.ts`, which contains all the technical details and best practices for that format. The user's creative idea and optional campaign objective are combined with this spec data to construct a highly detailed and context-aware prompt. The `geminiService.ts` module sends this prompt to the appropriate Gemini model (`gemini-2.5-flash` for text/scripts, `imagen-4.0-generate-001` for images) to generate the final creative asset.

### Creative Validator
The user selects a platform/format and provides an asset (either by uploading a file or pasting text). The `validationService.ts` module uses the corresponding `AdFormatSpec` to run a series of checks. For files, it validates the file type, size, and (for images) dimensions and aspect ratio using browser APIs. For text, it checks character or word count. The results are then displayed in a clear, compliant/non-compliant format.

---
*This project was developed to streamline the creative advertising workflow using the power of generative AI.*