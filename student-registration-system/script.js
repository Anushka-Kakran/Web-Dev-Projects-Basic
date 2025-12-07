// Global DOM elements
const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');
const recordsContainer = document.querySelector('.records-container');
const submitBtn = document.getElementById('submit-btn');
const noRecordsMessage = document.getElementById('no-records-message');

// State variable to track if we are editing an existing student (null when adding)
let editingStudentID = null;

// ===================================
// I. Local Storage Functions 
// ===================================

/**
 * Loads student records from Local Storage.
 * @returns {Array} An array of student objects, or an empty array if none exist.
 */
const getStudentsFromStorage = () => {
    // Retrieve data and parse it from JSON.
    const students = localStorage.getItem('students');
    return students ? JSON.parse(students) : [];
};

/**
 * Saves the current array of student records to Local Storage.
 * @param {Array} students The array of student objects to save.
 */
const saveStudentsToStorage = (students) => {
    // Stringify the array and save it
    localStorage.setItem('students', JSON.stringify(students));
};

// ===================================
// II. Validation Functions
// ===================================

// Regex definitions based on assignment requirements
const nameRegex = /^[a-zA-Z\s]+$/; // Student name accepts only characters
const idContactRegex = /^\d+$/; // Student ID and Contact Number accept only numbers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email accepts only valid email addresses
const minContactLength = 10; // Contact Number accepts at least 10 digits

/**
 * Performs all form input validations.
 * @param {object} studentData The data object containing student details.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
const validateForm = (studentData) => {
    let isValid = true;
    
    // Check 1: Prevent adding empty row 
    if (!studentData.studentName || !studentData.studentID || !studentData.emailID || !studentData.contactNo) {
        alert("All fields are required. Please fill in all details.");
        return false;
    }

    // Clear previous errors before running new validation
    document.getElementById('name-error').textContent = '';
    document.getElementById('id-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('contact-error').textContent = '';

    // 2. Student Name Validation 
    if (!nameRegex.test(studentData.studentName)) {
        document.getElementById('name-error').textContent = 'Name accepts only characters and spaces.';
        isValid = false;
    }
    
    // 3. Student ID Validation 
    if (!idContactRegex.test(studentData.studentID)) {
        document.getElementById('id-error').textContent = 'Student ID accepts only numbers.';
        isValid = false;
    }

    // 4. Email ID Validation 
    if (!emailRegex.test(studentData.emailID)) {
        document.getElementById('email-error').textContent = 'Enter a valid email address.';
        isValid = false;
    }

    // 5. Contact Number Validation 
    if (!idContactRegex.test(studentData.contactNo)) {
        document.getElementById('contact-error').textContent = 'Contact Number accepts only numbers.';
        isValid = false;
    } else if (studentData.contactNo.length < minContactLength) {
        document.getElementById('contact-error').textContent = `Contact Number must be at least ${minContactLength} digits.`;
        isValid = false;
    }

    return isValid;
};

// ===================================
// III. DOM Manipulation and Rendering 
// ===================================

/**
 * @param {object} student The student object.
 * @returns {HTMLElement} The created <tr> element.
 */
const createStudentRow = (student) => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', student.studentID);
    
    row.innerHTML = `
        <td data-label="Student Name">${student.studentName}</td>
        <td data-label="Student ID">${student.studentID}</td>
        <td data-label="Email ID">${student.emailID}</td>
        <td data-label="Contact No.">${student.contactNo}</td>
        <td data-label="Actions" class="action-col">
            <button class="btn edit-btn" data-id="${student.studentID}">EDIT</button>
            <button class="btn delete-btn" data-id="${student.studentID}">DELETE</button>
        </td>
    `;
    
    return row;
};

/**
 * Renders all student records from the Local Storage to the table body.
 */
const renderStudentList = () => {
    const students = getStudentsFromStorage();
    studentList.innerHTML = ''; // Clear current table content

    if (students.length === 0) {
        noRecordsMessage.style.display = 'block';
    } else {
        noRecordsMessage.style.display = 'none';
        
        students.forEach(student => {
            const row = createStudentRow(student);
            studentList.appendChild(row);
        });
    }
    
    // Task 6: Add a vertical scrollbar dynamically using JavaScript
    // Check if the content height exceeds the container's max-height
    if (studentList.scrollHeight > recordsContainer.clientHeight) {
        recordsContainer.style.overflowY = 'auto';
    } else {
        recordsContainer.style.overflowY = 'visible';
    }
};

// ===================================
// IV. CRUD Functionality 
// ===================================

/**
 * Adds a new student record to Local Storage.
 * @param {object} studentData The student data to add.
 */
const addStudent = (studentData) => {
    const students = getStudentsFromStorage();
    
    // Check for Student ID uniqueness
    if (students.some(s => s.studentID === studentData.studentID)) {
        alert(`A student with ID ${studentData.studentID} already exists! Please use a unique ID.`);
        return;
    }
    
    students.push(studentData);
    saveStudentsToStorage(students); // Save the new data
    renderStudentList(); // Re-render the list
    form.reset(); // Clear form inputs
};

/**
 * Updates an existing student record in Local Storage
 * @param {string} id The student ID of the record to update.
 * @param {object} updatedData The new data for the student.
 */
const updateStudent = (id, updatedData) => {
    let students = getStudentsFromStorage();
    
    const index = students.findIndex(s => s.studentID === id);
    
    if (index !== -1) {
        // Update the record using the existing ID
        students[index] = { ...updatedData, studentID: id }; 
        saveStudentsToStorage(students);
        renderStudentList();
        
        // Reset form state after update
        form.reset();
        document.getElementById('studentID').disabled = false; // Re-enable ID field
        submitBtn.textContent = 'Register Student'; // Change button text back
        editingStudentID = null;
    }
};

/**
 * Deletes a student record from Local Storage 
 * @param {string} id The student ID of the record to delete.
 */

const deleteStudent = (id) => {
    if (!confirm('Are you sure you want to delete this student record?')) {
        return;
    }
    
    let students = getStudentsFromStorage();
    // Filter out the student with the matching ID
    students = students.filter(student => student.studentID !== id);
    
    saveStudentsToStorage(students);
    renderStudentList();
};

/**
 * Handles the click of the Edit button. Populates the form with existing data.
 * @param {string} id The student ID to edit.
 */
const prepareEdit = (id) => {
    const students = getStudentsFromStorage();
    const studentToEdit = students.find(s => s.studentID === id);
    
    if (studentToEdit) {
        // Populate the form fields with current data
        document.getElementById('studentName').value = studentToEdit.studentName;
        document.getElementById('studentID').value = studentToEdit.studentID;
        document.getElementById('emailID').value = studentToEdit.emailID;
        document.getElementById('contactNo').value = studentToEdit.contactNo;
        
        // Disable the Student ID field during edit to prevent ID changes
        document.getElementById('studentID').disabled = true;

        // Update the global state and button text
        editingStudentID = id;
        submitBtn.textContent = 'Update Record';

        // Clear any previous validation errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Scroll to the form for easy editing
        form.scrollIntoView({ behavior: 'smooth' });
    }
};

// ===================================
// V. Event Listeners
// ===================================

/**
 * Handles the form submission for both adding and updating.
 */
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    const studentData = {
        studentName: document.getElementById('studentName').value.trim(),
        studentID: document.getElementById('studentID').value.trim(), 
        emailID: document.getElementById('emailID').value.trim(),
        contactNo: document.getElementById('contactNo').value.trim(),
    };
    
    // Step 1: Validate input fields
    if (!validateForm(studentData)) {
        return; 
    }
    
    // Step 2: Determine if adding or updating
    if (editingStudentID) {
        updateStudent(editingStudentID, studentData);
    } else {
        addStudent(studentData);
    }
});

/**
 * Handles Edit and Delete button clicks via event delegation on the table.
 */
studentList.addEventListener('click', (e) => {
    const target = e.target;
    const studentID = target.getAttribute('data-id');

    if (!studentID) return; 

    if (target.classList.contains('edit-btn')) {
        prepareEdit(studentID); 
    } else if (target.classList.contains('delete-btn')) {
        deleteStudent(studentID); 
    }
});

// ===================================
// VI. Initialization
// ===================================

// Load and render records when the page loads 
document.addEventListener('DOMContentLoaded', renderStudentList);