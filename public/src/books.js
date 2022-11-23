function findAuthorById(authors, id) {
  let result = authors.find((authorsObj) => {
    return authorsObj.id === id;
  })
  return result;
}

function findBookById(books, id) {
  let result = books.find ((booksObj) => {
    return booksObj.id === id;
  })
  return result;
}

function partitionBooksByBorrowedStatus(books) {
// we want to create a new array that contains two arrays inside of it

// the first array: represents books that are currently "checked out" --->  within the books data, we know that books that have been checked out have a "returned" value of FALSE
// the second array: represents books that have been "returned" ---> within the books date, we know that the books that have been returned have a "returned" value of TRUE

// first, we need to look at every book within the books array and see what matches to our condition using the .filter() higher order function
  // deconstruct borrowers so we don't have to write bookObj.borrowers every time

// then, we need to pull out the data that matches the returned value (true or false")
// since the instructions want the first array to be the books that are currently checked out, then we will use the .some() higher order funcntion
  // remember that returned value of "false" means the book is checked out, so that is what we want our parameter to match to
// then we follow with a similar .filter() higher order function for books that have been returned, followed by the .every() function, since we need every returned value to equal to true in order for it to be in the new array

 let booksCheckedOut = books.filter((bookObj) => {
    
    const {borrows} = bookObj

   let matchingCheckedOut = borrows.some((borrowObj) => {
      return borrowObj.returned === false;
    })
    return matchingCheckedOut;
  })

  let returnedBooks = books.filter((bookObj) => {

    const {borrows} = bookObj

    let matchingReturnedBooks = borrows.every((borrowObj) => {
      return borrowObj.returned === true;
    })
    return matchingReturnedBooks;
  })
  return [booksCheckedOut, returnedBooks];
}

function getBorrowersForBook(book, accounts) {

  // we want to get an array of 10 or less account object id's that match the book object id's. the new array should also include the "returned" key from the borrows array from within the books data

  const {borrows} = book;

  let result = borrows.map((bookBorrowObj) => {
    
    let foundAccount = accounts.find((accountObj) => {
      return bookBorrowObj.id === accountObj.id
    })
      foundAccount.returned = bookBorrowObj.returned
      return foundAccount;
  })
    return result.splice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
