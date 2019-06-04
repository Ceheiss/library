//On page load functions-----------------------------------------------------------------------------------------------------------------------------------------------------
// hide div sections in order to load as you scroll down the pageee.

$(document).ready(function(){
    
    let getNewBook = $("#new-book");
    
    //Toggle bookshelf 
    getNewBook.on('click', function(){
        $('#form').slideToggle();
    });
});

//listen to the scroll of the window---------------------------------------------------------------------------------------------------------------------------------------------------
$(window).scroll(function(e){

 // This variable is very important as it tracks the window's scrollTop(); position and all animations are triggered based on this value
let scrollTop = $(this).scrollTop();

 // Book list array
let bookList = document.querySelectorAll(".book");
let iteration = 0;

		// Added this variable as a control method as somethimes the offset().top was set to 0 randomly and would conflict with scrollTop, because scrollTop > 0
		if($('#bookshelf').offset().top !=0){
            // When scrolltop is bigger than bookshelf heigh - 750, trigger animation
			if(scrollTop > $('#bookshelf').offset().top + $('#bookshelf').height()-1000 ){ 	 
                    //loop through booklist array
					bookList.forEach(function(book){
	            		// had a delay with setTimeout function in order to load pictures to the page with a sligth delay
					    setTimeout(function(){
			 		   	book.classList.add('show-book');
			 		   }, (125*(iteration+1)));
						iteration++;
					});
	             }  
              }
});

/* ===============  Library Functionality ======================= */

// Book generator
function Book (title, author, year, numberOfPages, rating, isRead, image) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.rating = rating;
  this.isRead = isRead;
  this.image = image;
}

let myLibrary = [];

// Simple example to have dummy data
let asoiaf = new Book ("A Song of Ice and Fire", "George R.R. Martin", "1992", "1023", "5", "true", "images/got.jpg");
myLibrary.push(asoiaf);


// This is getting access to all the relevant elements
const inputTitle = document.getElementById("inp-title");
const inputAuthor = document.getElementById("inp-author");
const inputYear = document.getElementById("inp-year");
const inputPages = document.getElementById("inp-pages");
const inputRead = document.getElementById("inp-read");
const inputRate = document.getElementById("inp-rate");
const inputImage = document.getElementById("inp-image");
const btnInsert = document.getElementById("btn-insert");
const temporaryBooks = document.getElementById("temporary-books");
const bookshelf = document.getElementById("bookshelf");

// This function generates a new element to go in the list of books
function addBook () {
  // Return boolean regarding if book has been read
  if (inputRead.checked){
    inputRead.value = true;
  } else {
    inputRead.value = false;
  }
  // Add default image in case no image is added by user
  if (inputImage.value === "") {
    inputImage.value = "https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/08/20131551/Plain-Book-Transparent-Image.png";
  }
  let book = new Book (inputTitle.value, inputAuthor.value, inputYear.value, inputPages.value, inputRate.value, inputRead.value, inputImage.value);
  console.log(book.image)
  console.log(book.title)
  myLibrary.push(book);
  // to reset it
  cleanInputs();
  // this function creates some problematic outcomes
  cleanBookshelf();
  printBooks();
  addElement();
  return myLibrary;
};

// This prints a list of books in library
// This is just to chek that all values can be displayed 
function printBooks() {
  myLibrary.forEach(function(book){
    if (book.isRead == "true") {
      temporaryBooks.innerHTML += `Title: ${book.title} Author: ${book.author} Year: ${book.year} Number of pages: ${book.numberOfPages} rating: ${book.rating}  === HAVE READ IT<br />`
    } else {
      temporaryBooks.innerHTML += `Title: ${book.title} Author: ${book.author} Year: ${book.year}  ==== NOT READ YET<br />`
    }
  })
}

// This function is to clean the input boxes without refreshing the page
// and also erase previous list so it's no replicated constantly
function cleanInputs () {
  temporaryBooks.innerHTML = "";
  inputTitle.value = "";
  inputAuthor.value = "";
  inputYear.value = "";
  inputPages.value = "";
  inputRate.value = "";
  inputImage.value = "";
  inputRead.checked = true;
}

btnInsert.onclick = addBook;

// Create div element, assign it the "book" class and add the html content. append to bookshelf
function addElement(){
  myLibrary.forEach(function(book){
    let content = `Title: ${book.title} <br>Author: ${book.author}<br> Year: ${book.year}`;
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    const bookInfo= document.createElement("p");
    bookInfo.className = "book-info";
    bookDiv.appendChild(bookInfo);
    bookInfo.innerHTML = content;
    // Create img element and set it as child of bookDiv. Assign a class for styling
    const bookImage = document.createElement("img");
    bookImage.className = "book-image";
    bookImage.src = book.image;
    bookDiv.appendChild(bookImage);
        // Append book div to the shelf
    bookshelf.appendChild(bookDiv);
  })
}

// Destroys all elements that are child of bookshelf (all books)
function cleanBookshelf () {
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.firstChild);
  } 
}
/*=== 
1. We need to buttons in each book, one to toggle whether is read or not (that can change over time) and the second is to erase the book from the visuals and the library.
2. We also need to find a way for it to display information when hovering.
3. Once we have everything working properly, a cool add-on would be to manage data using localStorage or Firebase (I've used localStorage, firebase no idea).
4. Because this is not really a form, we should handle the data in a different way, like disabling button until author and book title is entered (if book.title && book.author !== "" button.active, something like that).
5. We need to refine the styling (now we have images inside divs, as opposed to background images of the divs).
6. It would be cool to use a star based animation for the rating.
7. In the future, it would be also cool to have a search bar that filters the books that are displayed based on rating, name or other values.
===*/