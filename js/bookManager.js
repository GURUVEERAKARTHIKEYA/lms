class BookManager {
    constructor() {
        this.books = [];
        this.loadSampleBooks();
    }

    loadSampleBooks() {
        const sampleBooks = [
            {
                id: 1,
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                isbn: "9780743273565",
                category: "Fiction",
                coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
                isCheckedOut: false,
                dueDate: null
            },
            {
                id: 2,
                title: "Sapiens",
                author: "Yuval Noah Harari",
                isbn: "9780062316097",
                category: "Non-Fiction",
                coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
                isCheckedOut: true,
                dueDate: "2024-04-01"
            }
        ];

        this.books = sampleBooks.map(book => Object.assign(new Book(
            book.id,
            book.title,
            book.author,
            book.isbn,
            book.category,
            book.coverUrl
        ), book));
    }

    addBook(bookData) {
        const id = this.books.length + 1;
        const book = new Book(
            id,
            bookData.title,
            bookData.author,
            bookData.isbn,
            bookData.category,
            bookData.coverUrl
        );
        this.books.push(book);
        return book;
    }

    getBooks() {
        return this.books;
    }

    checkoutBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book && !book.isCheckedOut) {
            book.isCheckedOut = true;
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 14);
            book.dueDate = dueDate.toISOString().split('T')[0];
            return true;
        }
        return false;
    }

    returnBook(id) {
        const book = this.books.find(b => b.id === id);
        if (book && book.isCheckedOut) {
            book.isCheckedOut = false;
            book.dueDate = null;
            return true;
        }
        return false;
    }

    searchBooks(query) {
        query = query.toLowerCase();
        return this.books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query)
        );
    }

    getStats() {
        return {
            total: this.books.length,
            checkedOut: this.books.filter(book => book.isCheckedOut).length,
            available: this.books.filter(book => !book.isCheckedOut).length,
            members: 152
        };
    }
}