const taskInput = document.getElementById('task-input');
const mainBtn = document.getElementById('main-btn');
const taskList = document.getElementById('task-list');
const itemsLeft = document.getElementById('items-left');
const clearBtn = document.getElementById('clear-completed');
const dateDisplay = document.getElementById('date-display');

// Initialize State
let tasks = JSON.parse(localStorage.getItem('proFocusTasks')) || [];
let editIndex = null;

// Display Date
dateDisplay.innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
});

function render() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${index})">${task.text}</span>
            <div class="actions">
                <button class="edit-btn" onclick="startEdit(${index})">✎</button>
                <button class="delete-btn" onclick="deleteTask(${index})">×</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    updateStats();
    localStorage.setItem('proFocusTasks', JSON.stringify(tasks));
}

// Add or Update Task
function handleTask() {
    const text = taskInput.value.trim();
    if (!text) {
        alert("Please provide a task")
    }

    if (editIndex !== null) {
        tasks[editIndex].text = text;
        editIndex = null;
        mainBtn.innerText = "Add";
        mainBtn.style.background = "var(--primary)";
    } else {
        tasks.push({ text, completed: false });
    }

    taskInput.value = '';
    render();
}

// Delete Task
window.deleteTask = (index) => {
    tasks.splice(index, 1);
    render();
};

// Toggle Completion
window.toggleTask = (index) => {
    if (editIndex === null) { // Prevent toggling while editing
        tasks[index].completed = !tasks[index].completed;
        render();
    }
};

// Start Edit Mode
window.startEdit = (index) => {
    taskInput.value = tasks[index].text;
    taskInput.focus();
    editIndex = index;
    mainBtn.innerText = "Save";
    mainBtn.style.background = "var(--accent)";
};

// Update Counter
function updateStats() {
    const activeCount = tasks.filter(t => !t.completed).length;
    itemsLeft.innerText = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;
}

// Clear Completed
clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    render();
});

// Event Listeners
mainBtn.addEventListener('click', handleTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleTask();
});

// Initial Render
render();