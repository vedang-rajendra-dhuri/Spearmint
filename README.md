<div align="center">

# 🛍️ AI Product Recommendation System
### *Personalized E-Commerce Discovery Powered by Google Gemini AI & React*

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![AI Engine](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Status-Active_%26_Operational-10B981?style=for-the-badge)]()

</div>

---

## 💡 About The Project

The **AI Product Recommendation System** is a modern, React-based web application designed to completely transform the e-commerce product discovery experience. By blending natural language processing with real-time product catalogs, it allows users to search for items using conversational prompts (e.g., *"I need a lightweight laptop for college under a budget"*). 

Powered by **Google Gemini AI** and the **DummyJSON API**, the system intelligently analyzes user requirements against available catalog inventories to deliver hyper-personalized, context-aware suggestions seamlessly.

---

## ⚡ Key Highlights & Features

| Feature Module | Technical Capability | Description |
| :--- | :--- | :--- |
| **🧠 AI-Driven Analysis** | *Natural Language Processing* | Understands open-ended user preferences and maps them directly to matching catalog categories. |
| **🔗 Gemini AI Integration** | *Intelligent Filtering* | Leverages Google Gemini API to analyze requirements and score/rank the best-suited products. |
| **🔄 Dynamic Data Fetching** | *External API Sync* | Fetches live product catalogs on demand from the DummyJSON API with robust state management. |
| **💻 Responsive UI/UX** | *Interactive Design* | Built with React 18 and CSS3 to ensure a clean, modern, and fluid layout across all devices. |
| **🛡️ Resilient Error Handling** | *API Guardrails* | Efficient error handling and loading indicators to ensure smooth user feedback during network operations. |

---

## 📊 System Architecture & Data Flow

```mermaid
graph TD
    User([👤 User / Shopper]) -->|Enters Natural Language Query| UI[⚛️ React 18 Frontend UI]
    UI -->|Requests Product Catalog| DummyAPI[(📦 DummyJSON API)]
    DummyAPI -->|Returns Product List| UI
    UI -->|Sends Catalog & User Query| Gemini[🧠 Google Gemini AI API]
    Gemini -->|Analyzes & Ranks Matches| UI
    UI -->|Renders Personalized Recommendations| User
