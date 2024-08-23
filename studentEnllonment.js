// Function to add a new student to localStorage
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const studentRecord = document.getElementById('studentRecord').value;

    const students = JSON.parse(localStorage.getItem('students')) || [];
    
    students.push({ name: studentName, class: studentClass, record: studentRecord });
    localStorage.setItem('students', JSON.stringify(students));

    document.getElementById('studentForm').reset();
    displaySuccessMessage();
    renderStudentList();
});

// Function to render the student list
function renderStudentList() {
    const studentList = document.getElementById('studentList');
    const students = JSON.parse(localStorage.getItem('students')) || [];

    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML = `
            ${student.name} (Class: ${student.class}, Record: ${student.record})
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </div>
        `;
        studentList.appendChild(li);
    });
}

// Function to edit a student record
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentClass').value = student.class;
    document.getElementById('studentRecord').value = student.record;

    deleteStudent(index); // Remove the student to avoid duplication on save
}

// Function to delete a student record
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudentList();
}

// Function to search students by name, class, or record
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const students = JSON.parse(localStorage.getItem('students')) || [];

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.class.toLowerCase().includes(searchTerm) ||
        student.record.toLowerCase().includes(searchTerm)
    );

    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    filteredStudents.forEach((student, index) => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML = `
            ${student.name} (Class: ${student.class}, Record: ${student.record})
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </div>
        `;
        studentList.appendChild(li);
    });
});

// Function to add a new class and subject to localStorage
document.getElementById('classForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const className = document.getElementById('className').value;
    const subjectName = document.getElementById('subjectName').value;

    const classes = JSON.parse(localStorage.getItem('classes')) || [];
    
    classes.push({ className, subjectName });
    localStorage.setItem('classes', JSON.stringify(classes));

    document.getElementById('classForm').reset();
    renderClassList();
});

// Function to render the class list
function renderClassList() {
    const classList = document.getElementById('classList');
    const classes = JSON.parse(localStorage.getItem('classes')) || [];

    classList.innerHTML = '';
    classes.forEach(cls => {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.textContent = `Class: ${cls.className}, Subject: ${cls.subjectName}`;
        classList.appendChild(li);
    });
}

// Display success message
function displaySuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success';
    successMessage.textContent = 'Action completed successfully!';
    document.body.appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
}

// Initialize the student and class lists on page load
renderStudentList();
renderClassList();
