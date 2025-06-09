import books from '../data/books.js'


export const getEntries = () => {
    return books
}
export const getByBooksId = (id) => {
    const book = books.find(book => book.id === id);
    if (!book) {
        return null;
    }
    const {title, author, recommendedBy, year, description } = book;
    return {
        id,
        title,
        author,
        recommendedBy,
        year,
        description
    }
}

