# React + Vite

# Meeting Action Items Tracker (MERN Stack)

# Live Link : https://stately-cassata-87348e.netlify.app/

A professional workspace designed to streamline post-meeting workflows by converting raw transcripts into structured, manageable action items with real-time database synchronization.

## 🚀 How to Run

### 1. Backend Setup (Render Web Service)
1. Navigate to the server directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root of the backend folder.
4. Add your variables:
   ```env
   MONGOURL=your_mongodb_connection_string
   PORT = your_port_number


### 🤖 AI_NOTES.md
```markdown
# AI Usage Notes

### 🛠 How AI was utilized
* **Architectural Guidance:** Used AI to structure the Express.js middleware stack to ensure proper execution order for CORS and JSON parsing.
* **Troubleshooting:** Leveraged AI to diagnose the "Preflight request" failures caused by deploying the backend as a Static Site instead of a Web Service.
* **UI Components:** Used AI to generate Tailwind CSS layouts for the `TaskCard` and `Workspace` components to ensure a clean, modern aesthetic.
* **State Management:** Consulted AI for best practices on syncing React local state with MongoDB `findByIdAndUpdate` operations.

### ✅ What was checked manually
* **Database Integrity:** Manually verified MongoDB collections to ensure the `actionItems` array schema correctly stores sub-documents.
* **Deployment Flow:** Corrected the Render deployment settings after identifying that Static Sites cannot execute Node.js code.
* **API Testing:** Verified all CRUD endpoints (GET, POST, PUT, DELETE) using browser developer tools and console logging.

### 🧠 LLM Provider
* **Model:** Gemini 3 Flash
* **Provider:** Google
* **Reasoning:** This model was chosen for its high-speed context processing and superior ability to debug full-stack deployment issues in real-time.
