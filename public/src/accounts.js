function findAccountById(accounts = [], id) {
  let result = accounts.find((accountsObj) => {
    return accountsObj.id === id;
  })
  return result;
}

function sortAccountsByLastName(accounts) {
  let result = accounts.sort((nameA, nameB) => {
    if (nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase()){
      return 1
    } else {
      return -1;
    }
  })
  return result;
}

function getTotalNumberOfBorrows(account, books) {
  // loop through the books array 
    // look at the id of the borrow's array within the book's array and check if given account id matches the id within the borrows array
    // everytime we find a match, increment the total count by 1
    // return the total count

  let total = 0;

  books.forEach((bookObj) => {
    const {borrows} = bookObj;
    // we need to access the id within the borrows array, but since it is in an array, we need to loop through it to access it

    borrows.forEach((borrowObj) => {
      if (borrowObj.id === account.id){
        total ++
      }
    })
  })
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  // loop the the books array using .filter in order to get only the books that the account has checked out
    // for each book object, check to see if the given account id is in the borrows array. if it is, then make it part of the new result array

  let foundBook = books.filter((bookObj) => {
    const {borrows} = bookObj;

    // loop through borrows in order to access the id within the borrows array 

    let foundAccount = borrows.find((borrowObj) => {
      return borrowObj.id === account.id && borrowObj.returned === false;
    })
    if (foundAccount !== undefined){
      return true;
    } else {
      return false;
    }
  })

    // now that we have the new filtered array, we need to use .map to map each of the books with the author and add the author as an additional key to each book object in the new array

    let result = foundBook.map((bookObj) => {

      // look at the author data and find the first author that matches the current book object's id
      const {authorId} = bookObj
      let foundAuthor = authors.find((authorObj) => {
        return authorObj.id === authorId
      })

      // embed the foundAuthor varibale into the current book object

      bookObj.author = foundAuthor;
      return bookObj;

    })
    return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
