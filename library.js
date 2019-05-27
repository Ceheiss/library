//On page load functions-----------------------------------------------------------------------------------------------------------------------------------------------------
// hide div sections in order to load as you scroll down the page.

$(document).ready(function(){
    
    var getNewBook = $("#new-book");
    
    //Toggle bookshelf 
    getNewBook.on('click', function(){
        $('#form').slideToggle();
    });
});

//listen to the scroll of the window---------------------------------------------------------------------------------------------------------------------------------------------------
$(window).scroll(function(e){

 // This variable is very important as it tracks the window's scrollTop(); position and all animations are triggered based on this value
 var scrollTop = $(this).scrollTop();

 // Book list array
var bookList = document.querySelectorAll(".book");
var iteration = 0;

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

/* ===============  Library ======================= */

function Book (title, author, year, numberOfPages, rating, isRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.numberOfPages = numberOfPages;
  this.rating = rating;
  this.isRead = isRead;
}

let myLibrary = [];

let asoiaf = new Book ("A Song of Ice and Fire", "George R.R. Martin", 1992, 1023, 5, true);

myLibrary.push(asoiaf)


// Create an object constructor
// With the information obtained from the form, add it to the database
// link on submit button

const inputTitle = document.getElementById("inp-title");
const inputAuthor = document.getElementById("inp-author");
const inputYear = document.getElementById("inp-year");
const inputPages = document.getElementById("inp-pages");
const inputRead = document.getElementById("inp-read");
const inputRate = document.getElementById("inp-rate");
const btnInsert = document.getElementById("btn-insert");
const temporaryBooks = document.getElementById("temporary-books");


function addBook () {
  let book = new Book (inputTitle.value, inputAuthor.value);
  myLibrary.push(book);
  // to reset it
  temporaryBooks.innerHTML = "";
  printBooks();
  return myLibrary;
};

function printBooks() {
  myLibrary.forEach(function(book){
    temporaryBooks.innerHTML += `Title: ${book.title} Author: ${book.author} Year: ${book.year} <br />`
  })
}

btnInsert.onclick = addBook;

