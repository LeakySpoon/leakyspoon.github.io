let openTasks = new Set(); // запоминаем открытые задачи

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  return await res.json();
}

async function toggleSubtask(taskId, subId) {
  const res = await fetch(`/api/tasks/${taskId}/subtasks/${subId}`, {method: "POST"});
  const data = await res.json();
  renderTasks(data.tasks);
}

async function addTask() {
  const input = document.getElementById("new-task-title");
  const title = input.value.trim();
  if (!title) return;
  await fetch("/api/tasks", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title})
  });
  input.value = "";
  renderTasks();
}

async function addSubtask(taskId, input) {
  const title = input.value.trim();
  if (!title) return;
  await fetch(`/api/tasks/${taskId}/subtasks`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title})
  });
  input.value = "";
  renderTasks();
}

// ==== РЕДАКТИРОВАНИЕ ====
async function editTask(taskId, titleEl) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = titleEl.textContent.replace(" ✅","").trim();
  input.style.width = "80%";
  titleEl.replaceWith(input);
  input.focus();

  const save = async () => {
    const newTitle = input.value.trim();
    if (newTitle) {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: newTitle})
      });
      renderTasks();
    }
  };

  input.onblur = save;
  input.onkeydown = e => { if(e.key==="Enter") save(); };
}

async function editSubtask(taskId, subId, labelEl) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = labelEl.textContent.replace(" ✅","").trim();
  input.style.width = "70%";
  labelEl.replaceWith(input);
  input.focus();

  const save = async () => {
    const newTitle = input.value.trim();
    if(newTitle){
      await fetch(`/api/tasks/${taskId}/subtasks/${subId}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: newTitle})
      });
      renderTasks();
    }
  };

  input.onblur = save;
  input.onkeydown = e => { if(e.key==="Enter") save(); };
}

// ==== ПРОГРЕСС ====
function updateProgress(tasks) {
  let total = 0, done = 0;
  tasks.forEach(task => {
    task.subtasks.forEach(sub => {
      total++;
      if (sub.done) done++;
    });
  });
  const percent = total ? Math.round((done / total) * 100) : 0;
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  bar.style.width = percent + "%";
  text.textContent = percent + "%";
}

// ==== РЕНДЕР ====
async function renderTasks(tasks = null) {
  if (!tasks) {
    const data = await fetchTasks();
    tasks = data.tasks;
  }
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    if (task.done) taskDiv.style.borderLeft = "5px solid #4caf50";
    if (openTasks.has(task.id)) taskDiv.classList.add("open");

    // Заголовок задачи
    const title = document.createElement("h3");
    title.textContent = task.title + (task.done ? " ✅" : "");
    title.ondblclick = () => editTask(task.id, title);
    title.onclick = () => {
      document.querySelectorAll(".task").forEach(el => {
        if (el !== taskDiv) {
          el.classList.remove("open");
          openTasks.delete(parseInt(el.dataset.id));
        }
      });
      taskDiv.classList.toggle("open");
      if (taskDiv.classList.contains("open")) openTasks.add(task.id);
      else openTasks.delete(task.id);
    };
    taskDiv.dataset.id = task.id;
    taskDiv.appendChild(title);

    // Подзадачи
    const subtaskContainer = document.createElement("div");
    subtaskContainer.className = "subtasks";

    task.subtasks.forEach(sub => {
      const label = document.createElement("label");
      label.className = "subtask";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = sub.done;
      checkbox.onchange = () => toggleSubtask(task.id, sub.id);

      label.appendChild(checkbox);
      label.append(" " + sub.title);
      label.ondblclick = () => editSubtask(task.id, sub.id, label);
      subtaskContainer.appendChild(label);
    });

    // Добавление подзадачи
    const addSubDiv = document.createElement("div");
    addSubDiv.className = "add-subtask";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Новая подзадача";
    const btn = document.createElement("button");
    btn.textContent = "Добавить";
    btn.onclick = () => addSubtask(task.id, input);
    addSubDiv.appendChild(input);
    addSubDiv.appendChild(btn);

    subtaskContainer.appendChild(addSubDiv);
    taskDiv.appendChild(subtaskContainer);
    container.appendChild(taskDiv);
  });

  updateProgress(tasks);
}

// ==== ТЁМНАЯ ТЕМА ====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  btn.onclick = () => {
    document.body.classList.toggle("dark");
    btn.textContent = document.body.classList.contains("dark")
      ? "☀️ Светлая тема"
      : "🌙 Тёмная тема";
  };
});

renderTasks();