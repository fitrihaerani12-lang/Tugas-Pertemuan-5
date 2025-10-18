// Ambil elemen-elemen
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const errorMessage = document.getElementById('errorMessage');
const todoList = document.getElementById('todoList');
// Load tugas dari localStorage saat halaman load
document.addEventListener('DOMContentLoaded', loadTodos);
// Fitur 1: Tambah tugas baru
todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const task = todoInput.value.trim();
    if (task === '') {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';
    addTodo(task);
    todoInput.value = '';
    saveTodos(); // Simpan ke localStorage
});
// Fungsi tambah tugas
function addTodo(task, completed = false) {
    const li = document.createElement('li');
    li.textContent = task;
    if (completed) li.classList.add('completed');
    // Tombol edit
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => editTodo(li));
    // Tombol hapus
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    // Fitur 2: Klik item untuk tandai selesai
    li.addEventListener('click', (e) => {
        if (e.target !== editBtn && e.target !== deleteBtn) {
            li.classList.toggle('completed');
            saveTodos();
        }
    });
    todoList.appendChild(li);
}
// Fitur edit tugas
function editTodo(li) {
    const currentText = li.firstChild.textContent;
    const newText = prompt('Edit tugas:', currentText);
    if (newText && newText.trim() !== '') {
        li.firstChild.textContent = newText.trim();
        saveTodos();
    }
}
// Fitur penyimpanan otomatis dengan localStorage
function saveTodos() {
    const todos = [];
    document.querySelectorAll('#todoList li').forEach(li => {
        todos.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodo(todo.text, todo.completed));
}