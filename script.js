let taskName = [];
let prioritiesList = [];
let deadlines = [];
/*----------------------TASK-------------------------- */
const taskField = document.getElementById("taskField"); // Task input field
const invalidTask = document.getElementById("invalid-task"); // Invalid task msg

/*------------------------PRIORITY----------------------- */
const priority = document.getElementById("priority"); // Priority drop-down
const invalidPriority = document.getElementById("invalid-priority"); // Invalid Priority message

/*-----------------------DATE----------------------- */
const dateInput = document.getElementById('date'); // Deadline Field
const dateError = document.getElementById('dateError'); // Date select message
/*---------------------------------------------------- */

let tableBody = document.getElementById("table-body");

/*************************************************** */
function creatTaskHolder() {

    tableBody.innerHTML = "";

    taskName.map((taskElement, index) => {
        let trow = document.createElement("tr");

        let taskCount = document.createElement("th");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let CompleteBtn = document.createElement("button");

        taskCount.innerHTML = index + 1;
        taskCount.style.textAlign = "center";
        td1.innerHTML = taskName;
        td2.innerHTML = prioritiesList[index];
        td3.innerHTML = deadlines[index];
        CompleteBtn.innerHTML = "Done";
        CompleteBtn.classList.add("btn", "btn-outline-success");
        CompleteBtn.setAttribute("type", "button"); // PREVENTS TO RELOAD PAGE

        // Add event listener to remove the row when 'Done' button is clicked
        CompleteBtn.addEventListener("click", function () {
            [taskName, prioritiesList, deadlines].forEach(arr => arr.splice(index, 1));
            creatTaskHolder();
        });

        trow.append(taskCount, td1, td2, td3, CompleteBtn);

        if (td2.innerText === "High") {
            [taskCount, td1, td2, td3].forEach(element => element.classList.add("text-danger"));
        } else if (td2.innerText === "Medium") {
            [taskCount, td1, td2, td3].forEach(element => element.classList.add("text-warning"));
        }

        tableBody.appendChild(trow);

        // clear form
        [taskField, priority, dateInput].forEach(element => element.value = "")
    });
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

        taskName.push(taskField.value);
        prioritiesList.push(priority.value);
        deadlines.push(dateInput.value);

        creatTaskHolder();
    }
});