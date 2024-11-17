const apiUrl = 'http://localhost:5000/tasks';

// Carregar tarefas quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

// Pegar elementos do DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Adicionar nova tarefa
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = taskInput.value;

    fetch(apiUrl, {
        method: 'POST',
        // Remova o mode: 'no-cors'
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        // Processa a resposta como JSON
        return response.json();
    })
    .then(task => {
        addTaskToList(task);
        taskInput.value = ''; // Limpar o campo
    })
    .catch(error => console.error('Erro ao adicionar tarefa:', error));
});

// Função para carregar as tarefas da API
function fetchTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => addTaskToList(task));
        })
        .catch(error => console.error('Erro ao carregar tarefas:', error));
}

// Função para adicionar tarefa na lista do DOM
function addTaskToList(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.innerHTML = `
        <span class="${task.done ? 'done' : ''}">${task.title}</span>
        <button class="delete-btn">Excluir</button>
    `;
    
    // Marcar tarefa como concluída
    li.addEventListener('click', () => {
        fetch(`${apiUrl}/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ done: !task.done })
        })
        .then(response => response.json())
        .then(updatedTask => {
            li.querySelector('span').classList.toggle('done', updatedTask.done);
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
    });

    // Excluir tarefa
    li.querySelector('.delete-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        const taskId = li.dataset.id;
        fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' })
            .then(() => li.remove())
            .catch(error => console.error('Erro ao excluir tarefa:', error));
    });

    taskList.appendChild(li);
}
