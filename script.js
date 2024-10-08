/*---------------------------------------------------- */
const taskField = document.getElementById("taskField"); // Task input field
const invalidTask = document.getElementById("invalid-task"); // Invalid task msg

/*---------------------------------------------------- */
const priority = document.getElementById("priority"); // Priority drop-down
const invalidPriority = document.getElementById("invalid-priority"); // Invalid Priority message

/*---------------------------------------------------- */
const dateInput = document.getElementById('date'); // Deadline Field
const dateError = document.getElementById('dateError'); // Date select message

/*---------------------------------------------------- */
let btnClick = 0;
let tableBody = document.getElementById("table-body");

/*************************************************** */
function creatTaskHolder(tasknum, task, priority, deadline) {
    let trow = document.createElement("tr");

    let taskCount = document.createElement("th");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let CompleteBtn = document.createElement("button");

    taskCount.innerHTML = tasknum;
    taskCount.style.textAlign = "center";
    td1.innerHTML = task;
    td2.innerHTML = priority;
    td3.innerHTML = deadline;
    CompleteBtn.innerHTML = "Done";
    CompleteBtn.classList.add("btn", "btn-outline-success");
    CompleteBtn.setAttribute("type", "button"); // PREVENTS TO RELOAD PAGE

    // Add event listener to remove the row when 'Done' button is clicked
    CompleteBtn.addEventListener("click", function () {
        trow.remove(); // Remove the entire row

        // Check if all tasks are deleted, reset counter if the table is empty
        if (tableBody.rows.length === 0) {
            btnClick = 0;
        }
    });

    trow.append(taskCount, td1, td2, td3, CompleteBtn);

    if (td2.innerText == "High") {
        taskCount.classList.add("text-danger");
        td1.classList.add("text-danger");
        td2.classList.add("text-danger");
        td3.classList.add("text-danger");
    } else if (td2.innerText == "Medium") {
        taskCount.classList.add("text-warning");
        td1.classList.add("text-warning");
        td2.classList.add("text-warning");
        td3.classList.add("text-warning");
    }

    tableBody.appendChild(trow);

    // clear form
    taskField.value = "";
    priority.value = "";
    dateInput.value = "";
}

/*************************************************** */

document.getElementById("addTaskBtn").addEventListener("click", function () {

    let allValueAvailable = true; // flag

    if (taskField.value === "") {
        invalidTask.style.display = "block";
        allValueAvailable = false;
    } else {
        invalidTask.style.display = "none";
    }

    if (priority.value === "") {
        invalidPriority.style.display = "block";
        allValueAvailable = false;
    } else {
        invalidPriority.style.display = "none";
    }

    if (!dateInput.value) {
        dateError.style.display = "block";
        allValueAvailable = false;
    } else {
        dateError.style.display = "none";
    }

    if (allValueAvailable) {
        btnClick++; 
        creatTaskHolder(btnClick, taskField.value, priority.value, dateInput.value);
    }
});
