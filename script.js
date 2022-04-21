const container = document.getElementById('container');
const newBook = document.getElementById('newBook');

newBook.addEventListener('click', () => addBookToLibrary());

let myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const book1 = new Book("Ethan Myos", "how to read", 200, true);
    myLibrary.push(book1);
    displayLibrary();
}

function displayLibrary() {
    removeAllChildNodes(container);
    for(let i=0; i<myLibrary.length; i++) {
        const book = document.createElement('div');
        book.style.border = '3px solid blue';
        book.setAttribute('class', 'items');
        container.appendChild(book);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
