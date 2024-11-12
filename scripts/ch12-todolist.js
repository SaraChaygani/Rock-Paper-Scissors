let toDoList = [{
  name: 'Make dinner',
  dueDate: '2022-12-22'
},
{
  name: 'eat lunch',
  dueDate: '2022-12-22'
}];
displayOnDOM();


//display TO DO TO LIST

function displayOnDOM() {
  letToDoListHtml = '';
  toDoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button 
      " class='delete-todo-button js-delete-button'>Delete</button>`;
    letToDoListHtml += html;
  });
  document.querySelector('.js-todo').innerHTML = letToDoListHtml;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {

      deleteButton.addEventListener('click', () => {
        toDoList.splice(index, 1);
        displayOnDOM();
      });
    });

}

document.querySelector('.js-add-button').addEventListener('click', () => {
  addToList();
});
function addToList() {
  const name = document.querySelector('.js-input').value;
  const dueDate = document.querySelector('.js-date-input').value;
  toDoList.push({ name, dueDate });
  displayOnDOM();
  console.log(`added to to do list: ${name} and ${dueDate}`);
  console.log(toDoList);
}

//Onkeydown Function
function onEnter(event) {
  if (event.key === 'Enter') {
    addToList();
  }
}
