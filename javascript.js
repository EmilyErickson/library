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

let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", "259", "Not Read");

console.log(theHobbit.info());

function newBook(event) {
  event.preventDefault();
  let title = document.querySelector("#title").value.replace(/\s+/g, "");
  if (myLibrary.includes(`${title}`)) {
    document.querySelector(".newBookInfo").style.display = "none";
    document.querySelector(".newBookInfo").reset();
    return;
  }

  myLibrary.push(`${title}`);
  console.log(myLibrary);
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

  let newBookDelete = document.createElement("button");
  newBookDelete.classList.add("deleteBtn");
  newBookDelete.textContent = "Delete";
  document.querySelector(`.${title}`).appendChild(newBookDelete);
  newBookDelete.addEventListener("click", () => {
    document.querySelector(`.${title}`).remove();
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

//   let test = document.querySelector(`.books .${title}`);
//   if (test != null) {
//     document.querySelector(".newBookInfo").style.display = "none";
//     document.querySelector(".newBookInfo").reset();
//     return;
//   }
