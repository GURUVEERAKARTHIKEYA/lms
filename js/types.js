// Book type definition
class Book {
    constructor(id, title, author, isbn, category, coverUrl) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.category = category;
        this.coverUrl = coverUrl;
        this.isCheckedOut = false;
        this.dueDate = null;
    }
}