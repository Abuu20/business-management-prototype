document.addEventListener('DOMContentLoaded', () => {
    loadClassSchedules();
    initializeCalendar();
});

function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = show ? 'block' : 'none';
}

function showNotification(type, message) {
    const notification = document.getElementById(`${type}Notification`);
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

function saveClassSchedule() {
    showLoading(true);

    const classId = document.getElementById('classId').value;
    const className = document.getElementById('className').value;
    const teacher = document.getElementById('teacher').value;
    const date = document.getElementById('scheduleDate').value;
    const time = document.getElementById('scheduleTime').value;

    if (!className || !teacher || !date || !time) {
        showLoading(false);
        showNotification('error', 'Please fill out all fields.');
        return;
    }

    const schedule = { id: classId || Date.now().toString(), className, teacher, date, time };

    if (classId) {
        updateClassSchedule(schedule);
    } else {
        addClassSchedule(schedule);
    }
}

function addClassSchedule(schedule) {
    const schedules = getData('classSchedules');
    schedules.push(schedule);
    saveData('classSchedules', schedules);
    loadClassSchedules();
    showLoading(false);
    showNotification('success', 'Class schedule added successfully.');
}

function updateClassSchedule(updatedSchedule) {
    let schedules = getData('classSchedules');
    schedules = schedules.map(schedule => schedule.id === updatedSchedule.id ? updatedSchedule : schedule);
    saveData('classSchedules', schedules);
    loadClassSchedules();
    showLoading(false);
    showNotification('success', 'Class schedule updated successfully.');
}

function deleteClassSchedule(id) {
    showLoading(true);

    let schedules = getData('classSchedules');
    schedules = schedules.filter(schedule => schedule.id !== id);
    saveData('classSchedules', schedules);
    loadClassSchedules();
    showLoading(false);
    showNotification('success', 'Class schedule deleted successfully.');
}

function loadClassSchedules() {
    const schedules = getData('classSchedules');
    updateClassList(schedules);
}

function updateClassList(schedules) {
    const classList = document.querySelector('#classList ul');
    classList.innerHTML = '';
    schedules.forEach(schedule => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${schedule.className} - ${schedule.teacher} <br>
            Date: ${schedule.date} <br>
            Time: ${schedule.time}
            <button class="edit" onclick="editClassSchedule('${schedule.id}')">Edit</button>
            <button class="delete" onclick="deleteClassSchedule('${schedule.id}')">Delete</button>
        `;
        classList.appendChild(li);
    });
    updateCalendar(schedules);
}

function editClassSchedule(id) {
    const schedules = getData('classSchedules');
    const schedule = schedules.find(schedule => schedule.id === id);
    document.getElementById('classId').value = schedule.id;
    document.getElementById('className').value = schedule.className;
    document.getElementById('teacher').value = schedule.teacher;
    document.getElementById('scheduleDate').value = schedule.date;
    document.getElementById('scheduleTime').value = schedule.time;
    document.querySelector('button[onclick="saveClassSchedule()"]').textContent = 'Update Schedule';
}

function filterClasses() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const schedules = getData('classSchedules');
    const filteredSchedules = schedules.filter(schedule => 
        schedule.className.toLowerCase().includes(query) || 
        schedule.teacher.toLowerCase().includes(query)
    );
    updateClassList(filteredSchedules);
}

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        events: getData('classSchedules').map(schedule => ({
            title: `${schedule.className} - ${schedule.teacher}`,
            start: `${schedule.date}T${schedule.time}`,
            end: `${schedule.date}T${new Date(new Date(`${schedule.date}T${schedule.time}`).getTime() + 60 * 60 * 1000).toISOString().split('T')[1]}`
        }))
    });
    calendar.render();
}

function updateCalendar(schedules) {
    const calendarEl = document.getElementById('calendar');
    const calendar = FullCalendar.getCalendar(calendarEl);
    calendar.removeAllEvents();
    calendar.addEventSource(schedules.map(schedule => ({
        title: `${schedule.className} - ${schedule.teacher}`,
        start: `${schedule.date}T${schedule.time}`,
        end: `${schedule.date}T${new Date(new Date(`${schedule.date}T${schedule.time}`).getTime() + 60 * 60 * 1000).toISOString().split('T')[1]}`
    })));
}

function printSchedules() {
    window.print();
}

function exportToCSV() {
    const schedules = getData('classSchedules');
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Class Name,Teacher,Date,Time\n";
    schedules.forEach(schedule => {
        csvContent += `${schedule.className},${schedule.teacher},${schedule.date},${schedule.time}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'class_schedules.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function setReminders() {
    const schedules = getData('classSchedules');
    schedules.forEach(schedule => {
        const classTime = new Date(`${schedule.date}T${schedule.time}`);
        const now = new Date();
        const timeDifference = classTime - now;
        if (timeDifference > 0 && timeDifference < 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                showNotification('info', `Reminder: ${schedule.className} with ${schedule.teacher} is scheduled for ${schedule.date} at ${schedule.time}`);
            }, timeDifference);
        }
    });
    showNotification('info', 'Reminders set for upcoming classes.');
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
