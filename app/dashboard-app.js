// Element queries
const lessonCards = document.querySelectorAll('.lesson-card');
const materialCards = document.querySelectorAll('.material-card');
const todoForm = document.querySelector('#todo-form');
const todoCheckButtons = document.querySelectorAll('.todo-right');
const homeworkCards = document.querySelectorAll('.homework');

// Event registrations
lessonCards.forEach((element) => {
  element.addEventListener('click', showLessonModal);
});

materialCards.forEach((element) => {
  element.addEventListener('click', showMaterialModal);
});

todoForm.addEventListener('submit', submitTodo);

todoCheckButtons.forEach((button) => {
  button.addEventListener('click', removeTodo);
});

homeworkCards.forEach((element) => {
  element.addEventListener('click', showHomeworkModal);
});

// Functions
function showLessonModal(selectedElement) {
  // Create a modal
  const modalDiv = createModal();

  // Add a child element
  const lessonDetailDiv = createLessonDetail(selectedElement);
  modalDiv.appendChild(lessonDetailDiv);

  // Append to body
  document.body.appendChild(modalDiv);
}

function createLessonDetail(selectedElement) {
  // Make div that contains the lesson title, schedule,
  // teacher name, and class link as the content
  const lessonDetailDiv = document.createElement('div');
  lessonDetailDiv.classList.add('lesson-detail');

  // <span>Lesson Detail</span>
  const lessonDetailTitle = document.createElement('span');
  lessonDetailTitle.classList.add('title');
  lessonDetailTitle.innerHTML = 'Lesson Detail';
  lessonDetailDiv.appendChild(lessonDetailTitle);

  // Get the selected lesson's detail
  const lessonElement = selectedElement.currentTarget;
  const lessonInformation = {
    'Class Code': lessonElement.querySelector('.lesson-code').innerText,
    'Teacher Name': lessonElement.querySelector('.teacher-name').innerText,
    Classroom: lessonElement.querySelector('.classroom').innerText,
    Time: lessonElement.querySelector('.time').innerText,
    Link: `https://ke.qq.com/dummy-link/${
      lessonElement.querySelector('.lesson-code').innerText
    }`,
  };

  // <div class='lesson-information'>...</div>
  const lessonInformationDiv = document.createElement('div');
  lessonInformationDiv.classList.add('lesson-information');
  for (const prop in lessonInformation) {
    // ex: <p>Lesson Code: CSPROG</p>
    const infoParagraph = document.createElement('p');
    infoParagraph.innerHTML = `<strong>${prop}</strong>: ${lessonInformation[prop]}`;
    lessonInformationDiv.appendChild(infoParagraph);
  }

  // Inserts all content to lessonDetailDiv
  lessonDetailDiv.appendChild(lessonInformationDiv);

  // <p>please come to class on-time! ...</p>
  const reminder = document.createElement('p');
  reminder.classList.add('reminder');
  reminder.innerHTML =
    'please come to class on-time!<br> click anywhere to close';
  lessonDetailDiv.appendChild(reminder);

  // Returns the div
  return lessonDetailDiv;
}

function showMaterialModal(selectedElement) {
  // Create a modal
  const modalDiv = createModal();

  // Add a child element
  const materialDetailDiv = createMaterialDetail(selectedElement);
  modalDiv.appendChild(materialDetailDiv);

  document.body.appendChild(modalDiv);
}

function createMaterialDetail(selectedElement) {
  // Make a div that contains a collection of material links for each different chapter
  const materialDetailDiv = document.createElement('div');
  materialDetailDiv.classList.add('material-detail');

  // Extracting material information
  const materialElement = selectedElement.currentTarget;
  const materialTitle =
    materialElement.querySelector('.material-title').innerText;

  // Construct the materialDetailDiv child
  // TITLE
  const title = document.createElement('span');
  title.classList.add('title');
  title.innerText = `${materialTitle} Material Collection`;
  materialDetailDiv.appendChild(title);

  // LIST OF CHAPTERS
  const chapters = document.createElement('div');
  chapters.classList.add('chapters-card', 'card');
  const chaptersUl = document.createElement('ul');

  // Only make for upto 5 chapters
  for (let i = 1; i <= 5; i++) {
    const chapterLi = document.createElement('li');
    // <li>Chapter n: chapter title</li>
    chapterLi.innerHTML = `Chapter ${i}: dummy title`;
    chaptersUl.appendChild(chapterLi);
  }
  chapters.appendChild(chaptersUl);

  materialDetailDiv.appendChild(chapters);

  return materialDetailDiv;
}

function submitTodo(event) {
  const todoText = document.querySelector('#todo-text');

  // Prevent the browser to refresh
  event.preventDefault();

  // Add the new todo to the list
  createTodoElement(todoText.value);

  // Reset the form back to empty
  todoText.value = '';
}

function createTodoElement(todoText) {
  /**
   * Ex:
   * li.todo
   *   span.todo-left
   *      p todoText
   *   span.todo-right
   *      p checkButton
   */

  const todoList = document.querySelector('#todos');

  const todoLi = document.createElement('li');
  todoLi.classList.add('todo');

  const todoTxt = document.createElement('span');
  todoTxt.classList.add('todo-left');
  todoTxt.innerHTML = `<p>${todoText}</p>`;
  todoLi.appendChild(todoTxt);

  const todoButton = document.createElement('span');
  todoButton.classList.add('todo-right');
  todoButton.innerHTML = '<i class="fas fa-check"></i>';
  todoButton.addEventListener('click', removeTodo);
  todoLi.appendChild(todoButton);

  todoList.appendChild(todoLi);
}

function removeTodo(event) {
  const todoLi = event.currentTarget.parentNode;
  todoLi.remove();
}

function showHomeworkModal(selectedElement) {
  // Create a modal
  const modalDiv = createModal();

  // Add a child element
  const homeworkDetailDiv = createHomeworkDetail(selectedElement);
  modalDiv.appendChild(homeworkDetailDiv);

  document.body.appendChild(modalDiv);
}

function createHomeworkDetail(selectedElement) {
  /**
   * structure:
   * div.homework-detail
   *    span.title Homework Detail
   *    div.homework-info...
   *      p class code
   *      p instruction
   *      p due date
   *      link submit page
   *    span reminder
   */
  const classCode = selectedElement.currentTarget.childNodes[1].innerText;
  const dueDate = selectedElement.currentTarget.childNodes[3].innerText;

  const homeworkDetailDiv = document.createElement('div');
  homeworkDetailDiv.classList.add('homework-detail');

  const classCodeSpan = document.createElement('span');
  classCodeSpan.classList.add('title');
  classCodeSpan.innerText = 'Homework Detail';
  homeworkDetailDiv.appendChild(classCodeSpan);

  const homeworkInfoDiv = document.createElement('div');
  homeworkInfoDiv.classList.add('homework-info');

  const classCodeParagraph = document.createElement('p');
  classCodeParagraph.innerHTML = `<strong>Class Code:</strong> ${classCode}`;
  homeworkInfoDiv.appendChild(classCodeParagraph);

  const instructionParagraph = document.createElement('p');
  instructionParagraph.innerHTML =
    '<strong>Instruction: </strong>Dummy instruction';
  homeworkInfoDiv.appendChild(instructionParagraph);

  const dueDateParagraph = document.createElement('p');
  const trimmedDueDate = dueDate.split(':')[1];
  dueDateParagraph.innerHTML = `<strong>Due Date: </strong>${trimmedDueDate}`;
  homeworkInfoDiv.appendChild(dueDateParagraph);

  const submitPageLink = document.createElement('a');
  submitPageLink.classList.add('submit-page__link');
  submitPageLink.href = '#';
  submitPageLink.innerText = 'Submit Here';
  homeworkInfoDiv.appendChild(submitPageLink);

  // Insert all content to div.homework-detail
  homeworkDetailDiv.appendChild(homeworkInfoDiv);

  const reminderParagraph = document.createElement('p');
  reminderParagraph.classList.add('reminder');
  reminderParagraph.innerHTML =
    'please submit the homework on-time!<br> click anywhere to close';
  homeworkDetailDiv.appendChild(reminderParagraph);

  return homeworkDetailDiv;
}

// Helper functions
function createModal() {
  // Create a div element
  const modalDiv = document.createElement('div');
  modalDiv.addEventListener('click', () => {
    modalDiv.parentNode.removeChild(modalDiv);
  });

  // Add a class
  modalDiv.classList.add('modal');

  // Returns the modal
  return modalDiv;
}
