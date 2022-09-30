//main library
let mainLibrary = [];
function dataAttrLibrary() {
  for (let i = 0; i < mainLibrary.length; i++) {
    mainLibrary[i]["data-index"] = i;
  }
}

//Book Class for implementation of all new books

class Bookclass {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }

  info() {
    return `${this.title} by ${this.author} has ${this.pages} pages, and is ${this.readStatus}`;
  }
}
//Method for viewing a book information

const viewBook = document.querySelector(".viewBooks");
viewBook.addEventListener("click", () => {
  display.textContent = "";
  message.textContent = "";
  for (let i = 0; i < mainLibrary.length; i++) {
    const newDisplay = document.createElement("div");
    const removeBook = document.createElement("button");
    newDisplay.className = "newcard";
    newDisplay.textContent = `Title: ${mainLibrary[i].title}`;
    newDisplay.textContent += `\n Author: ${mainLibrary[i].author}`;
    mainLibrary[i]["data-index"] = i;
    newDisplay.textContent += `\n Data-Index: ${mainLibrary[i]["data-index"]}`;
    removeBook.textContent = "Remove Book";
    removeBook.className = "removeButton";
    removeBook["data-index"] = i;
    removeBook.textContent += removeBook["data-index"];
    newDisplay.appendChild(removeBook);
    display.appendChild(newDisplay);
  }
  //remove book from library
  const removeABook = document.querySelectorAll("button.removeButton");
  removeABook.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
      let indexButton = removeButton["data-index"];
      mainLibrary.filter((element) => {
        if (element["data-index"] == indexButton) {
          let indexElement = mainLibrary.indexOf(
            mainLibrary[element["data-index"]]
          );
          mainLibrary.splice(indexElement, 1);
          removeButton.parentElement.classList.remove("newcard");
          removeButton.parentElement.textContent = "";
          alert(`${element.title} by ${element.author} removed successfully`);
          return mainLibrary;
        }
      });
    });
  });
});

//view all books in library in their own cards
const display = document.querySelector("div.display");
function viewLibraryBooks() {
  for (let i = 0; i < mainLibrary.length; i++) {
    const newDisplay = document.createElement("div");
    newDisplay.textContent = mainLibrary[i];
    newDisplay["data-index"] = i;
    display.appendChild(newDisplay);
  }
}

//add a new book to the library.
// - add new button, pops form
// - fill out form.
// - add book to library button once successfully added.
const message = document.querySelector("div.message");
const para = document.createElement("p");
const addBook = document.querySelector("input.addBook");
addBook.addEventListener("click", () => {
  const userTitle = document.querySelector("input#title");
  const userAuthor = document.querySelector("input#author");
  const userPages = document.querySelector("input#pages");
  const userRead = checkRead();

  const newBook = new Bookclass(
    userTitle.value,
    userAuthor.value,
    userPages.value,
    userRead
  );
  mainLibrary.push(newBook);
  para.textContent = newBook.info();
  message.appendChild(para);
});

const form = document.querySelector("form");
function removeForm() {
  form.className = "removeform";
}

const newBook = document.querySelector("button.newBook");
newBook.addEventListener("click", () => {
  form.reset();
  para.textContent = "";
  display.textContent = "";
  form.className = "displayForm";
});

const readStatus = document.querySelectorAll('input[type="radio"]');
function checkRead() {
  for (let i = 0; i < readStatus.length; i++) {
    if (readStatus[i].checked == true) {
      if (readStatus[i].value == "yes") {
        return "Read";
      } else {
        return "Not Read";
      }
    } else {
      continue;
    }
  }
}
