from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

tasks = []

def init_routes(app):
    @app.route("/tasks", methods=["GET"])
    @cross_origin()  # Adicionando o CORS na rota GET
    def get_tasks():
        return jsonify(tasks)

    @app.route("/tasks", methods=["POST"])
    @cross_origin()  # Adicionando o CORS na rota POST
    def add_task():
        data = request.json
        task = {"id": len(tasks) + 1, "title": data.get("title"), "done": False}
        tasks.append(task)
        return jsonify(task), 201

    @app.route("/tasks/<int:task_id>", methods=["PUT"])
    @cross_origin()  # Adicionando o CORS na rota PUT
    def update_task(task_id):
        for task in tasks:
            if task["id"] == task_id:
                task["done"] = request.json.get("done", task["done"])
                return jsonify(task)
        return {"error": "Task not found"}, 404

    @app.route("/tasks/<int:task_id>", methods=["DELETE"])
    @cross_origin()  # Adicionando o CORS na rota DELETE
    def delete_task(task_id):
        global tasks
        tasks = [task for task in tasks if task["id"] != task_id]
        return "", 204
