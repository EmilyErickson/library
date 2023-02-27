let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info() {
    return `${title} ${author} ${pages} ${read}`;
  };
}

function newBook(event) {
  event.preventDefault();
  let title = document.querySelector("#title").value.replace(/\s+/g, "");
  let author = document.querySelector("#author").value.toString();
  let pages = document.querySelector("#pages").value.toString();
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
    document.querySelector("#saveBook").addEventListener("click", newBook);
  });
}

addBookToLibrary();
