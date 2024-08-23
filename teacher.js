document.addEventListener('DOMContentLoaded', () => {
    loadTeachers();
    loadSchedules();
    loadAssignments();
});

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function saveTeacher() {
    showLoading(true);
    const teacherId = document.getElementById('teacherId').value;
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const subjects = document.getElementById('subjects').value;

    if (!name || !contact || !subjects) {
        showErrorModal('Please fill out all fields correctly.');
        showLoading(false);
        return;
    }

    const teacher = { id: teacherId || Date.now().toString(), name, contact, subjects };
    if (teacherId) {
        updateTeacher(teacher);
    } else {
        addTeacher(teacher);
    }
}

function saveSchedule() {
    showLoading(true);
    const scheduleId = document.getElementById('scheduleId').value;
    const teacherId = document.getElementById('teacher').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!teacherId || !date || !time) {
        showErrorModal('Please fill out all fields correctly.');
        showLoading(false);
        return;
    }

    const schedule = { id: scheduleId || Date.now().toString(), teacherId, date, time };
    if (scheduleId) {
        updateSchedule(schedule);
    } else {
        addSchedule(schedule);
    }
}

function saveAssignment() {
    showLoading(true);
    const assignmentId = document.getElementById('assignmentId').value;
    const teacherId = document.getElementById('teacherAssignment').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!teacherId || !title || !description) {
        showErrorModal('Please fill out all fields correctly.');
        showLoading(false);
        return;
    }

    const assignment = { id: assignmentId || Date.now().toString(), teacherId, title, description };
    if (assignmentId) {
        updateAssignment(assignment);
    } else {
        addAssignment(assignment);
    }
}

function addTeacher(teacher) {
    const teachers = getData('teachers');
    teachers.push(teacher);
    saveData('teachers', teachers);
    loadTeachers();
    showLoading(false);
}

function updateTeacher(updatedTeacher) {
    let teachers = getData('teachers');
    teachers = teachers.map(teacher => teacher.id === updatedTeacher.id ? updatedTeacher : teacher);
    saveData('teachers', teachers);
    loadTeachers();
    showLoading(false);
}

function deleteTeacher(id) {
    showConfirmationModal('Are you sure you want to delete this teacher?', () => {
        let teachers = getData('teachers');
        teachers = teachers.filter(teacher => teacher.id !== id);
        saveData('teachers', teachers);
        loadTeachers();
    });
}

function addSchedule(schedule) {
    const schedules = getData('schedules');
    schedules.push(schedule);
    saveData('schedules', schedules);
    loadSchedules();
    showLoading(false);
}

function updateSchedule(updatedSchedule) {
    let schedules = getData('schedules');
    schedules = schedules.map(schedule => schedule.id === updatedSchedule.id ? updatedSchedule : schedule);
    saveData('schedules', schedules);
    loadSchedules();
    showLoading(false);
}

function deleteSchedule(id) {
    showConfirmationModal('Are you sure you want to delete this schedule?', () => {
        let schedules = getData('schedules');
        schedules = schedules.filter(schedule => schedule.id !== id);
        saveData('schedules', schedules);
        loadSchedules();
    });
}

function addAssignment(assignment) {
    const assignments = getData('assignments');
    assignments.push(assignment);
    saveData('assignments', assignments);
    loadAssignments();
    showLoading(false);
}

function updateAssignment(updatedAssignment) {
    let assignments = getData('assignments');
    assignments = assignments.map(assignment => assignment.id === updatedAssignment.id ? updatedAssignment : assignment);
    saveData('assignments', assignments);
    loadAssignments();
    showLoading(false);
}

function deleteAssignment(id) {
    showConfirmationModal('Are you sure you want to delete this assignment?', () => {
        let assignments = getData('assignments');
        assignments = assignments.filter(assignment => assignment.id !== id);
        saveData('assignments', assignments);
        loadAssignments();
    });
}

function filterTeachers(query) {
    const teachers = getData('teachers');
    const filtered = teachers.filter(teacher => teacher.name.toLowerCase().includes(query.toLowerCase()));
    updateList('teacherList', filtered, 'name', 'viewTeacher', 'editTeacher', 'deleteTeacher');
}

function filterSchedules(query) {
    const schedules = getData('schedules');
    const filtered = schedules.filter(schedule => 
        schedule.teacherId.toLowerCase().includes(query.toLowerCase()) || 
        schedule.date.toLowerCase().includes(query.toLowerCase()) || 
        schedule.time.toLowerCase().includes(query.toLowerCase())
    );
    updateList('scheduleList', filtered, ['teacherId', 'date', 'time'], 'editSchedule', 'deleteSchedule');
}

function filterAssignments(query) {
    const assignments = getData('assignments');
    const filtered = assignments.filter(assignment => 
        assignment.teacherId.toLowerCase().includes(query.toLowerCase()) || 
        assignment.title.toLowerCase().includes(query.toLowerCase()) || 
        assignment.description.toLowerCase().includes(query.toLowerCase())
    );
    updateList('assignmentList', filtered, ['teacherId', 'title', 'description'], 'editAssignment', 'deleteAssignment');
}

function updateList(listId, items, fields, editFn, deleteFn) {
    const list = document.getElementById(listId);
    list.innerHTML = items.map(item => 
        `<li>${fields.map(field => item[field]).join(', ')} <button onclick="${editFn}('${item.id}')">Edit</button> <button onclick="${deleteFn}('${item.id}')">Delete</button></li>`
    ).join('');
}

function viewTeacher(id) {
    const teacher = getData('teachers').find(t => t.id === id);
    if (teacher) {
        alert(`Name: ${teacher.name}\nContact: ${teacher.contact}\nSubjects: ${teacher.subjects}`);
    }
}

function printContent(divId) {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = document.getElementById(divId).innerHTML;
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showModal(modalId, message) {
    const modal = document.getElementById(modalId);
    const messageElement = document.getElementById(modalId + 'Message');
    if (modal && messageElement) {
        messageElement.innerText = message;
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function showSuccessModal(message) {
    showModal('successModal', message);
}

function showErrorModal(message) {
    showModal('errorModal', message);
}

function showConfirmationModal(message, onConfirm) {
    const modal = document.getElementById('confirmationModal');
    const messageElement = document.getElementById('confirmationMessage');
    if (modal && messageElement) {
        messageElement.innerText = message;
        modal.style.display = 'block';
        modal.setAttribute('data-confirm', onConfirm.toString());
    }
}

function confirmAction() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        const action = modal.getAttribute('data-confirm');
        if (action) {
            eval(action);
        }
        closeModal('confirmationModal');
    }
}
