const container = document.getElementById('container');
const submit = document.getElementById('submit');

const grayout = document.getElementById('grayout');

// when the button is clicked, add the new book and reset the form
submit.addEventListener('click', () => addBookToLibrary());
// event listener to toggle read and not read
document.addEventListener('click', function (e) {
    // if book WAS not read, make it read
    if (e.target.classList.contains('notread')) {
        e.target.classList.remove('notread');
        e.target.classList.add('read');
        e.target.innerHTML = 'Read';
    // if book WAS read, make it not read
    } else if (e.target.classList.contains('read')) {
        e.target.classList.remove('read');
        e.target.classList.add('notread');
        e.target.innerHTML = 'Not Read';
    // remove button removes book from library
    } else if (e.target.classList.contains('remove')) {
        myLibrary.splice(parseInt(e.target.getAttribute('data-index')), 1);
        displayLibrary();
    }
});
// functions to open and close the form where users input book data
function openForm() {
    document.getElementById("popupForm").style.display = "block";
    // gray out background when form is clicked
    grayout.classList.add('active');
}
function closeForm() {
    document.getElementById("popupForm").style.display = "none";
    // stop graying out the background
    grayout.classList.remove('active');
}
// function to reset the form after it is submitted
function resetForm() {
    // select the three non-checkbox inputs
    const formElements = document.querySelectorAll('#title, #author, #pages');
    // reset their values
    formElements.forEach(el => {
        el.value = '';
    });
    // uncheck the checkbox
    document.getElementById('read').checked = false;
}
// initialize the library
let myLibrary = [];
// constructor to make each book
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// function called when "Submit" is clicked on
function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const book1 = new Book(title, author, pages, read);
    closeForm();
    // add book to library
    myLibrary.push(book1);
    // call function to display the library contents
    displayLibrary();
}

function displayLibrary() {
    // get rid of all the books displayed
    removeAllChildNodes(container);
    // display each book with its respective information
    for(let i=0; i<myLibrary.length; i++) {
        const displayBook = document.createElement('div');
        displayBook.setAttribute('id', 'items')
        container.appendChild(displayBook);
        // add the information from the book object
        const displayTitle = document.createElement('p');
        // add quotes around the book title
        displayTitle.innerHTML = "\"" + myLibrary[i].title + "\"";

        const displayAuthor = document.createElement('p');
        displayAuthor.innerHTML = myLibrary[i].author;

        const displayPages = document.createElement('p');
        displayPages.innerHTML = (myLibrary[i].pages.toString()) + " pages";

        const displayRead = document.createElement('button');
        // book is read
        displayRead.classList.add('read');
        // decide whether the book has been read or not
        if(myLibrary[i].read) {
            displayRead.innerHTML = "Read";
        }
        else {
            // book is not read
            displayRead.classList.add('notread');
            displayRead.innerHTML = "Not Read";
        }
        // add remove button
        const displayRemove = document.createElement('button');
        displayRemove.innerHTML = "Remove";
        displayRemove.style.backgroundColor = 'lightgray';
        displayRemove.classList.add('remove');
        // set the index of the book in the library
        displayRemove.setAttribute('data-index', i);
        // add the information as children to the book being displayed
        displayBook.append(displayTitle, displayAuthor, displayPages, displayRead, displayRemove);
    }
    // save the library to local storage
    localStorage.setItem("library", JSON.stringify(myLibrary));
    resetForm();
}
// function to remove all nodes that are children of parent node
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
// if there is data is local storage, retrieve it, otherwise leave library empty
if(JSON.parse(localStorage.getItem("library"))) {
    myLibrary = books;
}
// initial display of the library
displayLibrary();