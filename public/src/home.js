function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {

  // returns a number so we want to start with a total to start the count
  let totalBooks = 0

  // loop through the book objects to look at the borrows array within the book object
  books.forEach ((bookObj) => {
    const {borrows} = bookObj;

    // within the borrows array, we need to check if the book is currently checked out. we can use some since we need only one value of false to know that it is checked out
   let isABookCheckedOut = borrows.some((borrowObj) => {
      return borrowObj.returned === false;
    })

    // then we want to add it to the count if the book has been checked out
    if (isABookCheckedOut === true){
    totalBooks ++
    }
  })
  return totalBooks;
}

function getMostCommonGenres(books) {
  // look at each book object and identify the genre key
  // need to create an object that keeps track of each genre and a counter that totals how many time each genre occurs within the book array
// first create a variable to hold the empty object that we will be adding to

  let genreLookup = {}

  books.forEach((bookObj) => {
    const {genre} = bookObj;

    // googled a way to find get keys from an object
    if (genreLookup.hasOwnProperty(genre)){
      genreLookup[genre] += 1;
    } else {
      genreLookup[genre] = 1;
    }
  })

  // use object.keys() and .map to create a new array of objects with the genre (name) and amount of time it occurs (count)

    let commonGenresArray = Object.keys(genreLookup)

    let results = commonGenresArray.map((genre) => {
      const count = genreLookup[genre]
      let currentGenreObj = {name: genre , count: count}

      return currentGenreObj;
    })

    // sort genres from most common to least common once we have the results variable completed

    results.sort((genreA, genreB) => {
    return genreA.count > genreB.count ? -1 : 1;
    })

    // limit the amount to no more than 5 in the list
    return results.slice(0,5);

}

function getMostPopularBooks(books) {
  // need to sort books based on how many times the book has been checked out (borrows.length)

  books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length
  })

  // create a new array using .map with the title of the book as the key (name) and the amount of times the book has been checked out (count)

  let results = books.map((bookObj) => {
    let obj = {name: bookObj.title, count: bookObj.borrows.length}
    return obj;
  })
  return results.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  // once again, sort the books array based on the amount of times the book has been checked out (borrows.length)

  books.sort((bookA, bookB) => {
    return bookB.borrows.length - bookA.borrows.length;
  })

  // create a new array using .map to match the authors id that corresponds to the authorId in the books array

  let results = books.map((bookObj) => {
    const {authorId,borrows} = bookObj;
    let matchingAuthor = authors.find((authorObj) => {
      return authorObj.id === authorId;
    })
    
    let fullName = helperMergeFirstAndLastName(matchingAuthor.name.first, matchingAuthor.name.last)

    let newObj = { name: fullName, count: borrows.length}

    return newObj;
  })

  //limit the list to no more than 5

  return results.slice(0,5);
}

// create a helper function to clean up the fullName variable for correct formating of 'First Last' name

function helperMergeFirstAndLastName (first, last) {
  return `${first} ${last}`;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
