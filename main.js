import { Book } from "./Book.js";

// number container
const numberContainer = document.getElementById('number-container');
const bookNumberInp = document.getElementById('number');
const numberError = document.querySelector('.num-error');
const addNumberBtn = document.getElementById('add-number-btn');
//form container
const formContainer = document.getElementById('form-container');
const bookNameInp = document.getElementById('book-name');
const bookNameError = document.querySelector('.bName-error');
const bookPriceInp = document.getElementById('book-price');
const bookPriceError = document.querySelector('.bPrice-error');
const authorNameInp = document.getElementById('author-name');
const authorNameError = document.querySelector('.aName-error');
const authorEmailInp = document.getElementById('author-email');
const authorEmailError = document.querySelector('.aEmail-error');
const addBookBtn = document.getElementById('add-book-btn');
//table container
const tableContainer = document.getElementById('table-container');
const tableBody = document.getElementById('table-body');

const counterbook = document.querySelector('.counterBook');

// console.log(counterbook);

const image =document.querySelector('.image');

let numOfBooks = 0;
let counter = 0

addNumberBtn.addEventListener('click', function() {
    ValidationNumberInput(bookNumberInp.value); 
   
});

function ValidationNumberInput(val){
    if (val === '') {
        numberError.innerHTML = "Book Number is required";
        numberError.classList.remove('hide');
    } else if (!isFinite(val)) {
        numberError.innerHTML = "Book Number must be number";
        numberError.classList.remove('hide');
    } 
    else if (val <= 0){
        numberError.innerHTML = "Book Number must be greater than zero";
        numberError.classList.remove('hide');
    }
    
    else {
        numOfBooks = val;
        numberError.classList.add('hide');  
        numberContainer.classList.add('hide');
        formContainer.classList.remove('hide');
    }
}

let booksList = [];
addBookBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(counter < numOfBooks){
        console.log(counter);
        console.log(numOfBooks);
        
        let bookNameValue = ValidateBookName(bookNameInp.value);
        let bookPriceValue = ValidateBookPrice(bookPriceInp.value);
        let authorNameValue = ValidateAuthorName(authorNameInp.value);
        let authorEmailValue = ValidateAuthorEmail(authorEmailInp.value);

        if (bookNameValue && bookPriceValue && authorNameValue && authorEmailValue) {
            let book = new Book(bookNameInp.value, bookPriceInp.value, authorNameInp.value, authorEmailInp.value);
            booksList.push(book);
            console.log(booksList);
            
            Reset();
            counter++
            
            if(counter == numOfBooks){

                formContainer.classList.add('hide');
                image.classList.add('hide');
                DisplayTable();
            }
        }
    }    
});

function ValidateBookName(val){
    console.log("eeee");
    
    if(val === ''){
        bookNameError.innerHTML = "Book name is required";
        bookNameError.classList.remove('hide');
        return false;
    }
    else if (!isNaN(val)) {
        bookNameError.innerHTML = "Book name cannot be a number";
        bookNameError.classList.remove('hide');
        return false;
    }
    else if (val.length <= 3 || val.length >= 50) {
        bookNameError.innerHTML = "Book name must be greater than 3 and less than 50 characters";
        bookNameError.classList.remove('hide');
        return false;
    } else {
        bookNameError.classList.add('hide');
        return true;
    }
}
function ValidateBookPrice(val) {
    if (val === '') {
        bookPriceError.innerHTML = "Book price is required";
        bookPriceError.classList.remove('hide');
        return false;
    } else if (isNaN(val)) {
        bookPriceError.innerHTML = "Book price must be a number";
        bookPriceError.classList.remove('hide');
        return false;
    } else if (val <= 0) {
        bookPriceError.innerHTML = "Book price must be greater than zero";
        bookPriceError.classList.remove('hide');
        return false;
    } else {
        bookPriceError.classList.add('hide');
        return true;
    }
}
function ValidateAuthorName(val) {
    if (val === '') {
        authorNameError.innerHTML = "Author name is required";
        authorNameError.classList.remove('hide');
        return false;
    } else if (!isNaN(val)) {
        authorNameError.innerHTML = "Author name cannot be a number";
        authorNameError.classList.remove('hide');
        return false;
    } else if (val.length <= 3 || val.length >= 50) {
        authorNameError.innerHTML = "Author name must be greater than 3 and less than 10 characters";
        authorNameError.classList.remove('hide');
        return false;
    } else {
        authorNameError.classList.add('hide');
        return true;
    }
}
function ValidateAuthorEmail(val) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (val === '') {
        authorEmailError.innerHTML = "Author email is required";
        authorEmailError.classList.remove('hide');
        return false;
    } else if (!emailPattern.test(val)) {
        authorEmailError.innerHTML = "Invalid email format";
        authorEmailError.classList.remove('hide');
        return false;
    } else {
        authorEmailError.classList.add('hide');
        return true;
    }
}

function Reset(){
    bookNameInp.value = '';
    bookPriceInp.value = '';
    authorNameInp.value = '';
    authorEmailInp.value = '';
}

function DisplayTable(){
    tableContainer.classList.remove('hide');
    booksList.forEach(book =>{
        const tr = document.createElement("tr");
        tr.innerHTML= ` <td>${book.bookName}</td>
                <td>${book.bookPrice} </td>
                <td>${book.author.name}</td>
                <td>${book.author.email}</td>
                <td><button id="update"> <i class="fa-solid fa-pen-to-square"></i> Update</button> <button id="save" class="hide"> <i class="fa-regular fa-circle-check"></i> Save</button></td>
                <td><button id="delete"> <i class="fa-solid fa-trash"></i> Delete</button> <button id="cancel" class="hide"> <i class="fa-solid fa-xmark"></i> Cancel</button></td>`;

        tableBody.append(tr);
});
}

tableBody.addEventListener('click', function(e) {
    
    if (e.target.id === 'update') {
        // console.log(e.target.parentNode.parentNode);
    
        const tr = e.target.parentNode.parentNode;
        const tds = tr.querySelectorAll('td');
        const bookName = tds[0].innerText;
        const bookPrice = tds[1].innerText;
        const authorName = tds[2].innerText;
        const authorEmail = tds[3].innerText;

        tds[0].innerHTML = `<input class="inputUpdate" type="text" value="${bookName}" id="bookNameValue"> <span class="hide serror" id="errorSaveName"></span>`;
        tds[1].innerHTML = `<input class="inputUpdate" type="text" value="${bookPrice}" id="bookPriceValue"> <span class="hide serror" id="errorSavePrice"></span>`;
        tds[2].innerHTML = `<input class="inputUpdate" type="text" value="${authorName}" id="authorNameValue"> <span class="hide serror" id="errorSaveAuthorName"></span>`;
        tds[3].innerHTML = `<input class="inputUpdate" type="text" value="${authorEmail}" id="authorEmailValue"> <span class="hide serror" id="errorSaveEmail"></span>`;

        e.target.classList.add('hide');
        tr.querySelector('#save').classList.remove('hide');
        tr.querySelector('#cancel').classList.remove('hide');
        tr.querySelector('#delete').classList.add('hide');
        }





    if (e.target.id === 'save') {
        const tr = e.target.parentNode.parentNode;
        const tds = tr.querySelectorAll('td');
        const bookName = tr.querySelector('#bookNameValue').value;
        const bookPrice = tr.querySelector('#bookPriceValue').value;
        const authorName = tr.querySelector('#authorNameValue').value;
        const authorEmail = tr.querySelector('#authorEmailValue').value;

        let isValid = true;

        if (!ValidateBookName(bookName)) {
            console.log("dddddddd");
            
            tr.querySelector('#errorSaveName').innerHTML = "Invalid book name";
            tr.querySelector('#errorSaveName').classList.remove('hide');
            isValid = false;
        } else {
            tr.querySelector('#errorSaveName').classList.add('hide');
        }

        if (!ValidateBookPrice(bookPrice)) {
            tr.querySelector('#errorSavePrice').innerHTML = "Invalid book price";
            tr.querySelector('#errorSavePrice').classList.remove('hide');
            isValid = false;
        } else {
            tr.querySelector('#errorSavePrice').classList.add('hide');
        }

        if (!ValidateAuthorName(authorName)) {
            tr.querySelector('#errorSaveAuthorName').innerHTML = "Invalid author name";
            tr.querySelector('#errorSaveAuthorName').classList.remove('hide');
            isValid = false;
        } else {
            tr.querySelector('#errorSaveAuthorName').classList.add('hide');
        }

        if (!ValidateAuthorEmail(authorEmail)) {
            tr.querySelector('#errorSaveEmail').innerHTML = "Invalid author email";
            tr.querySelector('#errorSaveEmail').classList.remove('hide');
            isValid = false;
        } else {
            tr.querySelector('#errorSaveEmail').classList.add('hide');
        }

        if (isValid) {
            tds[0].innerText = bookName;
            tds[1].innerText = bookPrice;
            tds[2].innerText = authorName;
            tds[3].innerText = authorEmail;

            tr.querySelector('#save').classList.add('hide');
            tr.querySelector('#update').classList.remove('hide');
            tr.querySelector('#delete').classList.remove('hide');
            tr.querySelector('#cancel').classList.add('hide');
        }
        
    };

    if (e.target.id === 'delete') {
        const tr = e.target.parentNode.parentNode;
        tr.remove();
        if (tableBody.children.length === 0) {
            tableContainer.classList.add('hide');
            const emptyMessage = document.createElement('h2');
            emptyMessage.classList.add('empty-message');
            emptyMessage.innerText = "oops!! Table is empty:(";
            tableContainer.parentNode.appendChild(emptyMessage);
        }

    }
    if (e.target.id === 'cancel') {
        const tr = e.target.parentNode.parentNode;
        const tds = tr.querySelectorAll('td');
        const bookName = tr.querySelector('#bookNameValue').defaultValue;
        const bookPrice = tr.querySelector('#bookPriceValue').defaultValue;
        const authorName = tr.querySelector('#authorNameValue').defaultValue;
        const authorEmail = tr.querySelector('#authorEmailValue').defaultValue;

        tds[0].innerText = bookName;
        tds[1].innerText = bookPrice;
        tds[2].innerText = authorName;
        tds[3].innerText = authorEmail;

        tr.querySelector('#save').classList.add('hide');
        tr.querySelector('#update').classList.remove('hide');
        tr.querySelector('#delete').classList.remove('hide');
        tr.querySelector('#cancel').classList.add('hide');
    }


});




