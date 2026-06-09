// DOM Elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterButtons = document.querySelectorAll('.filter-btn');
const yearElement = document.getElementById('year');

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Local Storage Key
const STORAGE_KEY = 'todo-tasks';

// Global Variables
let tasks = [];
let currentFilter = 'all';

// Load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        // Add shake animation to input
        taskInput.classList.add('shake');
        setTimeout(() => taskInput.classList.remove('shake'), 500);
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date()
    };
    
    tasks.unshift(newTask); // Add to beginning of array
    
    taskInput.value = '';
    saveTasks();
    renderTasks();
    
    // Focus back on input
    taskInput.focus();
}

// Toggle task completion status
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// Delete a task
function deleteTask(id) {
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    
    // Add fade-out animation
    taskElement.classList.add('fade-out');
    
    // Wait for animation to complete before removing
    setTimeout(() => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }, 300);
}

// Clear all completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// Filter tasks based on current filter
function getFilteredTasks() {
    switch(currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Set active filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active class on filter buttons
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

// Update task count
function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

// Create HTML for a task item
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));
    
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '<i class="bx bx-trash"></i>';
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    
    // Add a small random delay to each task for a staggered animation effect
    li.style.animationDelay = `${Math.random() * 0.3}s`;
    
    return li;
}

// Render tasks to the DOM
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    // Get filtered tasks
    const filteredTasks = getFilteredTasks();
    
    // Create and append task elements
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-message';
        
        if (tasks.length === 0) {
            emptyMessage.textContent = 'No tasks yet. Add a task to get started!';
        } else {
            emptyMessage.textContent = `No ${currentFilter} tasks found.`;
        }
        
        taskList.appendChild(emptyMessage);
    }
    
    // Update task count
    updateTaskCount();
}

// Event Listeners
addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Add some sample tasks if empty (for demo purposes)
function addSampleTasks() {
    if (tasks.length === 0) {
        tasks = [
            {
                id: Date.now() - 3000,
                text: 'Try out the new meditation app',
                completed: true,
                createdAt: new Date()
            },
            {
                id: Date.now() - 2000,
                text: 'Message Sarah about weekend plans',
                completed: false,
                createdAt: new Date()
            },
            {
                id: Date.now() - 1000,
                text: 'Buy ingredients for dinner party',
                completed: false,
                createdAt: new Date()
            },
            {
                id: Date.now() - 500,
                text: 'Research vacation destinations for summer',
                completed: false,
                createdAt: new Date()
            }
        ];
        saveTasks();
    }
}

// Add hover effect to tasks
function addTaskHoverEffects() {
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('.task-item');
        if (target) {
            const allTasks = document.querySelectorAll('.task-item');
            allTasks.forEach(task => {
                if (task !== target) {
                    task.style.opacity = '0.7';
                }
            });
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.task-item')) {
            const allTasks = document.querySelectorAll('.task-item');
            allTasks.forEach(task => {
                task.style.opacity = '1';
            });
        }
    });
}

// Initialize the app
function init() {
    loadTasks();
    addSampleTasks();
    renderTasks();
    addTaskHoverEffects();
    
    // Add subtle animation to the container
    const todoContainer = document.querySelector('.todo-container');
    if (todoContainer) {
        setTimeout(() => {
            todoContainer.style.transform = 'translateY(0)';
            todoContainer.style.opacity = '1';
        }, 100);
    }
}

// Add initial styles for container animation
document.addEventListener('DOMContentLoaded', () => {
    const todoContainer = document.querySelector('.todo-container');
    if (todoContainer) {
        todoContainer.style.transform = 'translateY(20px)';
        todoContainer.style.opacity = '0';
        todoContainer.style.transition = 'all 0.5s ease-out';
    }
});

// Start the app
init();

// Add screen size detection and responsive behaviors
document.addEventListener('DOMContentLoaded', function() {
    // Task management variables
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompleted = document.getElementById('clearCompleted');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Screen size tracking
    let isMobile = window.innerWidth < 768;
    let currentFilter = 'all';
    let tasks = [];
    
    // Load tasks from localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        } else {
            // Default sample tasks with staggered animations
            tasks = [
                { id: generateId(), text: "Try out the new meditation app", completed: false, delay: 0.1 },
                { id: generateId(), text: "Message Sarah about weekend plans", completed: true, delay: 0.2 },
                { id: generateId(), text: "Buy ingredients for dinner party", completed: false, delay: 0.3 },
                { id: generateId(), text: "Research vacation destinations for summer", completed: false, delay: 0.4 }
            ];
            saveTasks();
        }
        renderTasks();
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Generate random ID for tasks
    function generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    // Render tasks based on current filter
    function renderTasks() {
        // Clear current list
        taskList.innerHTML = '';
        
        // Filter tasks based on current filter
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // Show message if no tasks
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = `No ${currentFilter === 'all' ? '' : currentFilter} tasks found`;
            taskList.appendChild(emptyMessage);
        }
        
        // Create task elements
        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            // Apply staggered animation delay based on index
            const animationDelay = isMobile ? 0.1 : (task.delay || (index * 0.1));
            taskItem.style.animationDelay = `${animationDelay}s`;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn"><i class='bx bx-trash'></i></button>
            `;
            
            // Add task to list
            taskList.appendChild(taskItem);
            
            // Checkbox event listener
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                toggleTaskComplete(task.id);
            });
            
            // Delete button event listener
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(task.id);
            });
            
            // Add hover effect for better touch feedback
            if (isMobile) {
                taskItem.addEventListener('touchstart', function() {
                    this.style.opacity = '0.7';
                });
                taskItem.addEventListener('touchend', function() {
                    this.style.opacity = '1';
                });
            }
        });
        
        // Update remaining tasks count
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} left`;
    }
    
    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            // Create new task object
            const newTask = {
                id: generateId(),
                text: taskText,
                completed: false,
                delay: 0 // Immediate animation for new tasks
            };
            
            // Add to tasks array
            tasks.unshift(newTask); // Add to beginning for better UX
            
            // Save and render
            saveTasks();
            renderTasks();
            
            // Clear input
            taskInput.value = '';
            
            // Apply highlight animation to new task
            setTimeout(() => {
                const firstTask = taskList.querySelector('.task-item');
                if (firstTask) {
                    firstTask.classList.add('highlight');
                    setTimeout(() => {
                        firstTask.classList.remove('highlight');
                    }, 1000);
                }
            }, 100);
        } else {
            // Shake animation for empty input
            taskInput.classList.add('shake');
            setTimeout(() => {
                taskInput.classList.remove('shake');
            }, 500);
        }
    }
    
    // Toggle task complete status
    function toggleTaskComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
    }
    
    // Delete task
    function deleteTask(taskId) {
        // Get the task element
        const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`) ||
                          Array.from(document.querySelectorAll('.task-item'))
                              [tasks.findIndex(task => task.id === taskId)];
        
        // Apply fade-out animation before removing
        if (taskElement) {
            taskElement.classList.add('fade-out');
            // Wait for animation to complete
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== taskId);
                saveTasks();
                renderTasks();
            }, 300);
        } else {
            // Fallback if element not found
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
        }
    }
    
    // Set current filter
    function setFilter(filter) {
        currentFilter = filter;
        
        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });
        
        renderTasks();
    }
    
    // Clear completed tasks
    function clearCompletedTasks() {
        if (tasks.some(task => task.completed)) {
            const completedCount = tasks.filter(task => task.completed).length;
            
            tasks = tasks.filter(task => !task.completed);
            saveTasks();
            renderTasks();
            
            // Show notification
            showNotification(`Removed ${completedCount} completed task${completedCount !== 1 ? 's' : ''}`, 'success');
        } else {
            // Show notification if no completed tasks
            showNotification('No completed tasks to remove', 'info');
        }
    }
    
    // Create notification system for feedback
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set notification content and style
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after delay
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
    
    // Detect screen size changes
    function handleResize() {
        const wasIsMobile = isMobile;
        isMobile = window.innerWidth < 768;
        
        // Only re-render if mode changed
        if (wasIsMobile !== isMobile) {
            renderTasks();
        }
    }
    
    // Add dynamic particle effects based on screen size
    function setupParticles() {
        const particles = document.querySelector('.particles');
        if (particles) {
            // Clear existing particles
            particles.innerHTML = '';
            
            // Calculate number of particles based on screen width
            const particleCount = isMobile ? 4 : 8;
            
            // Create particles
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particles.appendChild(particle);
            }
        }
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Event listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    clearCompleted.addEventListener('click', clearCompletedTasks);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.getAttribute('data-filter'));
        });
    });
    
    window.addEventListener('resize', handleResize);
    
    // Initialize
    handleResize();
    setupParticles();
    loadTasks();
    
    // Add swipe gesture support for mobile
    if ('ontouchstart' in window) {
        let touchStartX = 0;
        let touchEndX = 0;
        let currentTouchElement = null;
        let touchStartTime = 0;
        
        taskList.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartTime = new Date().getTime();
            currentTouchElement = e.target.closest('.task-item');
            
            // Add active class for visual feedback
            if (currentTouchElement) {
                currentTouchElement.classList.add('swiping');
            }
        }, { passive: true });
        
        taskList.addEventListener('touchmove', (e) => {
            if (!currentTouchElement) return;
            
            const touchMoveX = e.changedTouches[0].screenX;
            const diff = touchMoveX - touchStartX;
            
            // Limit the drag distance
            const maxDrag = 100;
            const dragDistance = Math.max(Math.min(diff, maxDrag), -maxDrag);
            
            // Apply transform during swipe
            currentTouchElement.style.transform = `translateX(${dragDistance}px)`;
            
            // Change opacity based on direction
            if (diff < 0) {
                // Swiping left (delete) - add red tint
                currentTouchElement.style.backgroundColor = `rgba(255, 59, 59, ${Math.min(Math.abs(diff) / 100, 0.3)})`;
            } else if (diff > 0) {
                // Swiping right (complete) - add green tint
                currentTouchElement.style.backgroundColor = `rgba(76, 175, 80, ${Math.min(Math.abs(diff) / 100, 0.3)})`;
            }
        }, { passive: true });
        
        taskList.addEventListener('touchend', (e) => {
            if (!currentTouchElement) return;
            
            touchEndX = e.changedTouches[0].screenX;
            const touchEndTime = new Date().getTime();
            
            // Reset styles
            currentTouchElement.classList.remove('swiping');
            currentTouchElement.style.transform = '';
            currentTouchElement.style.backgroundColor = '';
            
            // Calculate swipe speed and distance
            const swipeTime = touchEndTime - touchStartTime;
            const swipeDistance = touchEndX - touchStartX;
            const swipeSpeed = Math.abs(swipeDistance) / swipeTime;
            
            // Handle swipe based on distance and speed
            handleSwipe(swipeDistance, swipeSpeed);
        }, { passive: true });
        
        function handleSwipe(distance, speed) {
            const swipeThreshold = 50;
            const speedThreshold = 0.3;
            
            if (currentTouchElement) {
                // Get task ID from the element or its index
                const taskId = currentTouchElement.dataset.id || 
                           tasks[Array.from(taskList.children).indexOf(currentTouchElement)]?.id;
                
                if (!taskId) return;
                
                // Fast swipe or sufficient distance
                const isSwipe = Math.abs(distance) > swipeThreshold || speed > speedThreshold;
                
                // Swipe left to delete
                if (distance < 0 && isSwipe) {
                    // Add sliding animation before delete
                    currentTouchElement.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
                    currentTouchElement.style.transform = 'translateX(-100%)';
                    currentTouchElement.style.opacity = '0';
                    
                    setTimeout(() => {
                        deleteTask(taskId);
                    }, 200);
                }
                
                // Swipe right to toggle completion
                if (distance > 0 && isSwipe) {
                    // Add bounce animation
                    currentTouchElement.style.transition = 'transform 0.3s ease';
                    currentTouchElement.style.transform = 'translateX(5px)';
                    
                    setTimeout(() => {
                        currentTouchElement.style.transform = '';
                        toggleTaskComplete(taskId);
                    }, 300);
                }
            }
        }
    }
    
    // Add a dynamic greeting message based on time of day
    function setupGreeting() {
        const tagline = document.querySelector('.tagline');
        if (tagline) {
            const hour = new Date().getHours();
            let greeting = '';
            
            if (hour < 12) {
                greeting = 'Good morning! Start your day with focus';
            } else if (hour < 18) {
                greeting = 'Good afternoon! Keep up the momentum';
            } else {
                greeting = 'Good evening! Wrap up your day';
            }
            
            tagline.textContent = greeting;
        }
    }
    
    // Add progress animation to the container based on completion percentage
    function updateProgressIndicator() {
        const todoContainer = document.querySelector('.todo-container');
        if (todoContainer && tasks.length > 0) {
            const completedPercentage = (tasks.filter(task => task.completed).length / tasks.length) * 100;
            
            // Update progress indicator with animation
            todoContainer.style.setProperty('--progress-percentage', `${completedPercentage}%`);
            
            // Add visual feedback when progress changes
            todoContainer.classList.add('progress-updated');
            setTimeout(() => {
                todoContainer.classList.remove('progress-updated');
            }, 1000);
        }
    }
    
    // Call these additional dynamic functions
    setupGreeting();
    
    // Update progress indicator when tasks change
    const originalRenderTasks = renderTasks;
    renderTasks = function() {
        originalRenderTasks();
        updateProgressIndicator();
    };
}); 