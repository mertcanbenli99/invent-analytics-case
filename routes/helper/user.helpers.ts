export function MapBorrowedBooksData(usersWithBorrowedBooks)  {
    return usersWithBorrowedBooks.map(user => ({
        id: user.id,
        name: user.name,
        books: {
            past: user.books.filter(book => book.returned).map(book => ({
                name: book.book.name,
                userScore: book.score
            })),
            present: user.books.filter(book => !book.returned).map(book => ({
                name: book.book.name,
                
            }))
        }
        
    }))
}