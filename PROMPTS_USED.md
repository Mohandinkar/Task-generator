
## 1. Backend API setup

**Prompt:**
Create a Node.js Express backend with a POST `/generate` endpoint that accepts `goal`, `users`, and `constraints` and uses an LLM to generate user stories, engineering tasks, and risks in JSON format. The response must be valid JSON and easy to parse.

---

## 2. Gemini integration

**Prompt:**
Write a prompt for Gemini that returns only valid JSON containing `userStories`, `tasks`, and `risks` for a given product idea. Ensure the response contains no markdown formatting and is safe to parse in JavaScript.

---

## 3. React frontend structure

**Prompt:**
Create a modular React frontend for a task generator tool with components for:
- Idea form
- Task list
- History panel
- Export buttons  
Use simple Tailwind styling and keep the code clean and readable.

---

## 4. Editable and reorderable tasks

**Prompt:**
Implement editable task items in React where each task can be updated, removed, and reordered with simple controls. Keep state in the parent component and avoid complex drag-and-drop libraries.

---

## 5. Task grouping feature

**Prompt:**
Add a simple grouping feature for tasks. Each task should include a `group` field and tasks should be displayed grouped by category such as General, Frontend, Backend, or Design. Keep the UI minimal and easy to use.

---

## 6. Markdown export

**Prompt:**
Add functionality to export generated user stories, tasks, and risks as markdown. Include copy-to-clipboard and download-as-file options. Ensure grouped tasks are exported under their group headings.


