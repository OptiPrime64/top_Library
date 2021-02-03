let myLibrary = [
    {
        title: 'Avengers',
        author: 'Stan Lee',
        pages: 24,
        isRead: true
    }
];

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pageNumber = '0',
        isRead = 'false') {
        this.title = title;
        this.author = author;
        this.pageNumber = pageNumber;
        this.isRead = isRead;
    }
    // the constructor...
}

function toggleForm() {
    bookForm.classList.toggle('form-toggle');
}

function addBookToLibrary(e) {
    // do stuff here
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#is-read').checked;
    if (!title || !author || !pages) {
        alert('Please fill out all form entries');
        return;
    }
    myLibrary.push(new Book(title, author, pages, isRead));
    document.getElementById('book-form').reset();
    updateList();
    toggleForm();
    saveLocal();
}

function removeFromLibrary(bookTitle) {
    myLibrary = myLibrary.filter(book => {
        console.log(bookTitle, book.title)
        return book.title !== bookTitle;
    });
    saveLocal();
    updateList();
}

function toggleCheck(bookTitle, bookCheck) {
    myLibrary.forEach(book => {
        if (book.title === bookTitle) {
            book.isRead = bookCheck;
        }
    })
    saveLocal();
}

const bookList = document.getElementById('book-list');

updateList();

const button = document.querySelector('button.book-form-input');
const openFormBtn = document.getElementById('open-form');
const bookForm = document.getElementById('book-form');

button.addEventListener('click', addBookToLibrary);
openFormBtn.addEventListener('click', toggleForm);

function updateList() {
    bookList.innerHTML = '';
    myLibrary.forEach(book => {

        //create elements
        const bookTitle = document.createElement('h1');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');

        const bookIsRead = document.createElement('label');
        bookIsRead.setAttribute('for', 'is-read');

        const bookCheck = document.createElement('input')
        bookCheck.setAttribute('type', 'checkbox');
        bookCheck.setAttribute('id', 'is-read');

        const bookDiv = document.createElement('div');
        const delButton = document.createElement('button');

        //give elements text
        bookTitle.innerHTML = "Title: " + book.title;
        bookAuthor.innerHTML = "Author: " + book.author;
        bookPages.innerHTML = "Pages: " + book.pages;
        bookIsRead.innerHTML = 'Read?'

        book.isRead ? bookCheck.checked = true : bookCheck.checked = false;

        delButton.innerHTML = 'Delete';

        //add classes
        bookDiv.classList.add('book-card');
        delButton.classList.add('del-btn');

        //add elements to DOM
        bookDiv.appendChild(bookTitle);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookIsRead);
        bookDiv.appendChild(bookCheck);
        bookDiv.appendChild(delButton);
        bookList.appendChild(bookDiv);

        delButton.addEventListener('click', () => {
            removeFromLibrary(book.title);
        });
        bookCheck.addEventListener('change', () => {
            toggleCheck(book.title, bookCheck.checked);
        });
    });
}

//local storage
function saveLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [
        {
            title: 'Avengers',
            author: 'Stan Lee',
            pages: 24,
            isRead: true
        }
    ];
    updateList();
}

restoreLocal();
// addForm.addEventListener('submit', function(e){
//     e.preventDefault();
//     const value = addForm.querySelector
// })

