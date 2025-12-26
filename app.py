from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

TASK_FILE = "tasks.json"

def load_tasks():
    with open(TASK_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_tasks(data):
    with open(TASK_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())

@app.route("/api/tasks/<int:task_id>/subtasks/<int:sub_id>", methods=["POST"])
def toggle_subtask(task_id, sub_id):
    data = load_tasks()
    for task in data["tasks"]:
        if task["id"] == task_id:
            for sub in task["subtasks"]:
                if sub["id"] == sub_id:
                    sub["done"] = not sub["done"]
    save_tasks(data)
    return jsonify(data)

@app.route("/api/tasks", methods=["POST"])
def add_task():
    data = load_tasks()
    new_task = request.json
    new_id = max([t["id"] for t in data["tasks"]], default=0) + 1
    task = {
        "id": new_id,
        "title": new_task["title"],
        "done": False,
        "subtasks": []
    }
    data["tasks"].append(task)
    save_tasks(data)
    return jsonify(data)

@app.route("/api/tasks/<int:task_id>/subtasks", methods=["POST"])
def add_subtask(task_id):
    data = load_tasks()
    new_sub = request.json
    for task in data["tasks"]:
        if task["id"] == task_id:
            new_id = max([s["id"] for s in task["subtasks"]], default=task_id * 100) + 1
            subtask = {"id": new_id, "title": new_sub["title"], "done": False}
            task["subtasks"].append(subtask)
    save_tasks(data)
    return jsonify(data)

@app.route("/api/tasks/<int:task_id>", methods=["PUT"])
def edit_task(task_id):
    data = load_tasks()
    new_title = request.json.get("title")
    for task in data["tasks"]:
        if task["id"] == task_id:
            task["title"] = new_title
    save_tasks(data)
    return jsonify(data)

@app.route("/api/tasks/<int:task_id>/subtasks/<int:sub_id>/edit", methods=["PUT"])
def edit_subtask(task_id, sub_id):
    data = load_tasks()
    new_title = request.json.get("title")
    for task in data["tasks"]:
        if task["id"] == task_id:
            for sub in task["subtasks"]:
                if sub["id"] == sub_id:
                    sub["title"] = new_title
    save_tasks(data)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)