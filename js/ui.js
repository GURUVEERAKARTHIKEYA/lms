class UI {
    constructor(bookManager) {
        this.bookManager = bookManager;
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }

    initializeElements() {
        // Stats elements
        this.totalBooksEl = document.getElementById('totalBooks');
        this.availableBooksEl = document.getElementById('availableBooks');
        this.checkedOutBooksEl = document.getElementById('checkedOutBooks');
        this.totalMembersEl = document.getElementById('totalMembers');

        // Book list
        this.bookListEl = document.getElementById('bookList');

        // Search
        this.searchInput = document.getElementById('searchInput');

        // Modal elements
        this.modal = document.getElementById('addBookModal');
        this.addBookBtn = document.getElementById('addBookBtn');
        this.addBookForm = document.getElementById('addBookForm');
        this.closeBtn = document.querySelector('.close-btn');
        this.cancelBtn = document.getElementById('cancelBtn');
    }

    bindEvents() {
        // Search
        this.searchInput.addEventListener('input', () => {
            const query = this.searchInput.value;
            const filteredBooks = this.bookManager.searchBooks(query);
            this.renderBooks(filteredBooks);
        });

        // Modal
        this.addBookBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.addBookForm.addEventListener('submit', (e) => this.handleAddBook(e));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    updateUI() {
        this.updateStats();
        this.renderBooks(this.bookManager.getBooks());
    }

    updateStats() {
        const stats = this.bookManager.getStats();
        this.totalBooksEl.textContent = stats.total;
        this.availableBooksEl.textContent = stats.available;
        this.checkedOutBooksEl.textContent = stats.checkedOut;
        this.totalMembersEl.textContent = stats.members;
    }

    renderBooks(books) {
        this.bookListEl.innerHTML = books.map(book => this.createBookCard(book)).join('');
        
        // Add event listeners to buttons
        books.forEach(book => {
            const bookEl = document.getElementById(`book-${book.id}`);
            const actionBtn = bookEl.querySelector('.action-btn');
            actionBtn.addEventListener('click', () => {
                if (book.isCheckedOut) {
                    this.bookManager.returnBook(book.id);
                } else {
                    this.bookManager.checkoutBook(book.id);
                }
                this.updateUI();
            });
        });
    }

    createBookCard(book) {
        return `
            <div id="book-${book.id}" class="book-card">
                <div class="book-image">
                    <img src="${book.coverUrl}" alt="${book.title}">
                    <span class="book-status ${book.isCheckedOut ? 'status-checked-out' : 'status-available'}">
                        ${book.isCheckedOut ? 'Checked Out' : 'Available'}
                    </span>
                </div>
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <span class="book-category">${book.category}</span>
                    ${book.isCheckedOut && book.dueDate ? `
                        <p class="book-due-date">Due: ${new Date(book.dueDate).toLocaleDateString()}</p>
                    ` : ''}
                    <div class="mt-4">
                        <button class="btn ${book.isCheckedOut ? 'btn-success' : 'btn-primary'} action-btn">
                            ${book.isCheckedOut ? 'Return Book' : 'Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    openModal() {
        this.modal.classList.add('active');
        this.addBookForm.reset();
    }

    closeModal() {
        this.modal.classList.remove('active');
    }

    handleAddBook(e) {
        e.preventDefault();
        const formData = new FormData(this.addBookForm);
        const bookData = {
            title: formData.get('title'),
            author: formData.get('author'),
            isbn: formData.get('isbn'),
            category: formData.get('category'),
            coverUrl: formData.get('coverUrl')
        };

        this.bookManager.addBook(bookData);
        this.updateUI();
        this.closeModal();
    }
}