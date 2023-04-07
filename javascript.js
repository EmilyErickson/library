let myLibrary = [];
let form = document.querySelector("form");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function info() {
      return `${title} ${author} ${pages} ${read}`;
    };
  }
}

function validate(event) {
  event.preventDefault();
  let title = document.querySelector("#title");
  let titleError = document.querySelector(".titleError");
  let authorError = document.querySelector(".authorError");
  let pagesError = document.querySelector(".pagesError");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let titleValidity = title.validity;
  if (titleValidity.valueMissing) {
    titleError.classList.remove("hidden");
    titleError.classList.add("active");
    titleError.textContent = "Please put in the book title";
  } else {
    titleError.classList.add("hidden");
  }
  let authorValidity = author.validity;
  if (authorValidity.valueMissing) {
    authorError.classList.remove("hidden");
    authorError.classList.add("active");
    authorError.textContent = "Please put in the author";
  } else {
    authorError.classList.add("hidden");
  }
  let pagesValidity = pages.validity;
  if (pagesValidity.valueMissing) {
    pagesError.classList.remove("hidden");
    pagesError.classList.add("active");
    pagesError.textContent = "Please add the number of pages";
  } else {
    pagesError.classList.add("hidden");
  }
  if (
    title.checkValidity() &&
    author.checkValidity() &&
    pages.checkValidity()
  ) {
    newBook();
  }
  // form.submit();
}

function newBook() {
  let title = document.querySelector("#title").value.replace(/\s+/g, "");
  let author = document.querySelector("#author").value.toString();
  let pages = document.querySelector("#pages").value.toString();

  // author.value.toString();
  // pages.value.toString();
  let areadyread = document.querySelector("#read").checked;

  let addBook = new Book(`${title}`, `${author}`, `${pages}`, `${areadyread}`);

  if (inLibrary(addBook)) {
    document.querySelector(".newBookInfo").style.display = "none";
    document.querySelector(".newBookInfo").reset();
    return;
  }

  myLibrary.push(addBook);
  console.log({ myLibrary });
  let newBookCard = document.createElement("div");
  newBookCard.classList.add("bookCard", `${title}`);
  document.querySelector(".books").appendChild(newBookCard);
  newBookCard = document.querySelector(`.${title}`);
  let newBookTitle = document.createElement("p");
  document.querySelector(`.${title}`).appendChild(newBookTitle);
  let newBookAuthor = document.createElement("p");
  document.querySelector(`.${title}`).appendChild(newBookAuthor);
  let newBookPages = document.createElement("p");
  document.querySelector(`.${title}`).appendChild(newBookPages);
  newBookTitle.textContent += document.querySelector("#title").value;
  newBookAuthor.textContent += document.querySelector("#author").value;
  newBookPages.textContent += document.querySelector("#pages").value;
  let read = document.createElement("button");
  read.classList.add("readBtn");
  let ifRead = document.querySelector("#read").checked;
  if (ifRead === true) {
    read.classList.add("read");
    read.textContent += "Read";
  } else {
    read.classList.add("notRead");
    read.textContent += "Not Read";
  }

  read.addEventListener("click", () => {
    read.classList.toggle("read");
    read.classList.toggle("notRead");
    if (read.classList.contains("read")) {
      read.textContent = "Read";
    } else {
      read.textContent = "Not Read";
    }
  });

  document.querySelector(`.${title}`).appendChild(read);

  function inLibrary() {
    let bookDuplicate = false;
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === addBook.title) {
        bookDuplicate = true;
      } else {
        bookDuplicate = false;
      }
    }
    return bookDuplicate;
  }

  function removeFromLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].title === addBook.title) {
        let index = myLibrary.indexOf(addBook);
        myLibrary.splice(index, 1);
      }
      console.log({ myLibrary });
    }
  }

  let newBookDelete = document.createElement("button");
  newBookDelete.classList.add("deleteBtn");
  newBookDelete.textContent = "Delete";
  document.querySelector(`.${title}`).appendChild(newBookDelete);
  newBookDelete.addEventListener("click", () => {
    document.querySelector(`.${title}`).remove();
    removeFromLibrary(addBook);
  });
  document.querySelector(".newBookInfo").style.display = "none";
  document.querySelector(".newBookInfo").reset();
}

function addBookToLibrary() {
  document.querySelector(".addBook").addEventListener("click", () => {
    document.querySelector(".newBookInfo").style.display = "flex";
    document.querySelector("#saveBook").addEventListener("click", validate);
  });
}

addBookToLibrary();
