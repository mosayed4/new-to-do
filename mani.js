let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // Append Button To Main Div
    div.appendChild(span);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}



/////====================================-====================================>

// //  Creates a working location event.
//   // See https://developers.google.com/calendar/api/v3/reference/events/insert
 
// function createWorkingLocationEvent() {
//   const calendarId = 'primary';

//   const requiredArgs = {
//     start: { date: "2023-06-01" },
//     end: { date: "2023-06-02" },
//     eventType: "workingLocation",
//     visibility: "public",
//     transparency: "transparent",
//     workingLocationProperties: {
//       type: 'customLocation',
//       customLocation: { label: "a custom location" }
//     }
//   }
//   try {
//     var event = Calendar.Events.insert(requiredArgs, calendarId);
//     console.log('%s: %s', event.start.date, parseWorkingLocation(event));
//   } catch (exception) {
//     console.log(exception.message);
//   }
// }

// /**
//  * Reads the working location event with the given eventId.
//  * See https://developers.google.com/calendar/api/v3/reference/events/get
//  */
// function readWorkingLocationEvent() {
//   const calendarId = 'primary';

//   // Replace with a valid eventId.
//   const eventId = "sample-event-id";

//   try {
//     const event = Calendar.Events.get(calendarId, eventId);
//     console.log('%s: %s', event.start.date, parseWorkingLocation(event));
//   } catch (exception) {
//     console.log(exception.message);
//   }
// }

// /**
//  * Lists working location events for given dates.
//  * See https://developers.google.com/calendar/api/v3/reference/events/list
//  */
// function listWorkingLocationEvents() {
//   const calendarId = 'primary'

//   // Query parameters for the list request.
//   const optionalArgs = {
//       eventTypes: ['workingLocation'],
//       showDeleted: false,
//       singleEvents: true,
//       timeMax: '2023-04-01T00:00:00+01:00',
//       timeMin: '2023-03-27T00:00:00+01:00',
//     }
//   try {
//   var response = Calendar.Events.list(calendarId, optionalArgs );
//   response.items.forEach(event =>
//       console.log('%s: %s', event.start.date, parseWorkingLocation(event)));
//   } catch (exception) {
//     console.log(exception.message);
//   }
// }

// /**
//  * Parses working location properties of an event into a string.
//  * See https://developers.google.com/calendar/api/v3/reference/events#resource
//  */
// function parseWorkingLocation(event) {
//   if(event.eventType != "workingLocation") {
//     throw new Error("'" +  event.summary +"' is not a working location event.");
//   }
//   const workingLocation = event.workingLocationProperties;
//   if (workingLocation) {
//     if (workingLocation.type === 'homeOffice') {
//       return 'Home';
//     }
//     if (workingLocation.type === 'officeLocation') {
//       return workingLocation.officeLocation.label;
//     }
//     if (workingLocation.type === 'customLocation') {
//       return workingLocation.customLocation.label;
//     }
//   }
//   return 'No Location';
// }
