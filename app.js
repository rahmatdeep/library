//DOM selectors
const books = document.querySelector('.books-display');
const container = document.querySelector('.container');
const form = document.getElementById("form");
const deleteButton = document.getElementById('deleteButton');
const errorDisplay = document.querySelector('.error');
const formSubmit = document.getElementById('formsubmit');
const readsel = document.getElementById('read');
const notReadsel = document.getElementById('notread');

//storage
let booksInLibrary = [];

//sample data
let a = new bookTemplate('Silent Patient', 'Alex', 300, "read")
booksInLibrary.push(a);
displayArray(booksInLibrary);
//Functions

function bookTemplate(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};


const addBookToLibrary = function(event){
    event.preventDefault();
    let titleVal = document.getElementById('name').value
    let authorVal = document.getElementById('author').value
    let pagesVal = document.getElementById('pages').value

    if(!(titleVal===''||authorVal===''||pagesVal==='')){
        if(readsel.checked==true){
            let nb = new bookTemplate(titleVal, authorVal, pagesVal, "Read");
            booksInLibrary.push(nb);
            formSubmit.setAttribute("data-bs-dismiss","modal")
            formSubmit.click();
            (()=>{
                formSubmit.setAttribute("data-bs-dismiss","")
            })()}
        else if(notReadsel.checked==true){
            let nb = new bookTemplate(titleVal, authorVal, pagesVal, "not Read");
            booksInLibrary.push(nb);
            formSubmit.setAttribute("data-bs-dismiss","modal")
            formSubmit.click();
            (()=>{
                formSubmit.setAttribute("data-bs-dismiss","")
            })()
        }
}
    else{
        errorDisplay.textContent='Form Cannot be Empty'
    }
    clearForm();
    displayArray(booksInLibrary);
    
};

function clearForm(){
    document.getElementById('name').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
};

function displayArray(Arr){  
    container.innerHTML = ''
    for(let i=0; i<Arr.length; i++){
            let newBook = document.createElement('div');
            newBook.classList.add('book');
            newBook.dataset.index = i;
            newBook.innerHTML = `<p><span>${Arr[i].title}</span> by <span>${Arr[i].author}</span> has <span>${Arr[i].pages}</span> pages is ${Arr[i].read} </p><div class="right"><i onClick = "deleteElement(this)" class="fa-solid fa-trash"></i><i data-bs-toggle="modal" data-bs-target="#form" onClick="editElement(this)" class="fa-sharp fa-solid fa-pen-to-square"></i></div>`;
            container.appendChild(newBook);
        };
};

function deleteElement(e){
    let selectedElement = e.parentElement.parentElement;
    let toBeDeleted = selectedElement.firstChild.firstChild.textContent;
    for (let i=0; i<booksInLibrary.length; i++){
        if(toBeDeleted===booksInLibrary[i].title){
            booksInLibrary.splice(i,1);
        }
    }
    displayArray(booksInLibrary)
}

function editElement(e){
    let selectedElement = e.parentElement.parentElement;
    document.getElementById('name').value = selectedElement.firstChild.children[0].textContent;
    document.getElementById('author').value = selectedElement.firstChild.children[1].textContent;
    document.getElementById('pages').value = selectedElement.firstChild.children[2].textContent;
    let toBeDeleted = selectedElement.firstChild.firstChild.textContent;
    for (let i=0; i<booksInLibrary.length; i++){
        if(toBeDeleted===booksInLibrary[i].title){
            booksInLibrary.splice(i,1);
        }
    }
    displayArray(booksInLibrary)
}




//Execution
form.addEventListener('submit', addBookToLibrary);
