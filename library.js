//On page load functions-----------------------------------------------------------------------------------------------------------------------------------------------------
// hide div sections in order to load as you scroll down the page.

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



/*=== 
1. We need two buttons in each book, one to toggle whether is read or not (that can change over time) and the second is to erase the book from the visuals and the library.
2. We also need to find a way for it to display information when hovering.
3. Once we have everything working properly, a cool add-on would be to manage data using localStorage or Firebase (I've used localStorage, firebase no idea).
4. Because this is not really a form, we should handle the data in a different way, like disabling button until author and book title is entered (if book.title && book.author !== "" button.active, something like that).
5. We need to refine the styling (now we have images inside divs, as opposed to background images of the divs).
6. It would be cool to use a star based animation for the rating.
7. In the future, it would be also cool to have a search bar that filters the books that are displayed based on rating, name or other values.
===*/