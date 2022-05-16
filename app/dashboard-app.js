// Element queries
const lessonCards = document.querySelectorAll('#lesson-card');

// Event registrations
lessonCards.forEach((element) => {
  element.addEventListener('click', showLessonModal);
});

// Functions
function showLessonModal(selectedElement) {
  // Create a div element
  const modalDiv = document.createElement('div');
  modalDiv.addEventListener('click', () => {
    modalDiv.parentNode.removeChild(modalDiv);
  });

  // Add a class
  modalDiv.classList.add('modal');

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

  // <span>Lesson Detail</>
  const lessonDetailTitle = document.createElement('span');
  lessonDetailTitle.classList.add('title');
  lessonDetailTitle.innerHTML = 'Lesson Detail';
  lessonDetailDiv.appendChild(lessonDetailTitle);

  // Get the selected lesson's detail
  const lessonElement = selectedElement.currentTarget;
  const lessonInformation = {
    'Lesson Code': lessonElement.querySelector('#lesson-code').innerText,
    'Teacher Name': lessonElement.querySelector('#teacher-name').innerText,
    Classroom: lessonElement.querySelector('#classroom').innerText,
    Time: lessonElement.querySelector('#time').innerText,
    Link: `https://ke.qq.com/dummy-link/${
      lessonElement.querySelector('#lesson-code').innerText
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
  reminder.classList.add('lesson-reminder');
  reminder.innerHTML =
    'please come to class on-time!<br> click anywhere to close';
  lessonDetailDiv.appendChild(reminder);

  // Returns the div
  return lessonDetailDiv;
}
