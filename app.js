let tasks = [];

// Add Task
const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};

// Update Task List
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="editing.png" onclick="editTask(${index})"/>
                <img src="delete.png" onclick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        taskList.append(listItem);
    });

    updateProgress();
};

// Toggle Task Completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

// Delete Task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

// Edit Task
const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateTasksList();
    }
};

// Update Progress & Check for Celebration
const updateProgress = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    document.getElementById("numbers").innerText = `${completedTasks}/${totalTasks}`;
    
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    document.getElementById("progress").style.width = `${progressPercentage}%`;

    if (totalTasks > 0 && completedTasks === totalTasks) {
        triggerCelebration();
    }
};

// Celebration Effect
const triggerCelebration = () => {
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 }
        });
    }, 500);
};

// Prevent Form Refresh on Submit
document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});
