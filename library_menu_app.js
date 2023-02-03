//To start, I am creating a class called 'Book' to enter a book's title and author name.

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    describe() {
        return `${this.title}, a book by ${this.author}`;
    }

}

//Then a class called 'Genre' that will store books of the same genre
class Genre {
    constructor(type) {
        this.type = type;
        this.books = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            throw new Error(`You can only add instance of Book. Argument is not a book: ${book}`);
        }
    }

    describe() {
        return `The ${this.type} genre contains ${this.books.length} books.`;
    }
}

//Now a class called 'Library' that will organize the genres of books and allow for the creation of new books in designated genres

class Library {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }
//The 'start' method will create a dialogue that will allow a user to either create new genres of books, view genres,
//delete genres, and display genre information

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.createGenre();
                    break;
                case '2' :
                    this.viewGenre();
                    break;
                case '3' :
                    this.deleteGenre();
                    break;
                case '4' :
                    this.displayGenres();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) add a new genre
        2) view genres
        3) delete genre
        4) display all genres
        `);
    }

    showGenreMenuOptions(genreInfo) {
        return prompt(`
        0) back
        1) add new book
        2) delete book
        -----------------
        ${genreInfo}

        `);

    }

    displayGenres() {
        let genreString = '';
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + ')' + this.genres[i].type + '\n';
        }
        alert(genreString);
    }
    createGenre() {
        let type = prompt (`Enter name for new genre type:`);
        this.genres.push(new Genre(type));
        console.log('Genre added: ', this.genre);
    }
    //
    viewGenre() {
        let index = prompt('Enter the index of the genre you wish to view: ');
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = 'Genre Name: ' + this.selectedGenre.type + '\n';

            for (let i =0; i < this.selectedGenre.books.length; i++) {
                description += i + ') ' + this.selectedGenre.books[i].title
                + ' - ' + this.selectedGenre.books[i].author + '\n';
            }
            
            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1' :
                    this.createBook();
                    break;
                case '2' :
                    this.deleteBook();
            }
        }
    }

    deleteGenre() {
        let index = prompt(`Enter the index of the genre you wish to delete:`);
        if (index > -1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }
    }

    createBook() {
        let title = prompt(`Enter the title of new book:`);
        let author = prompt(`Enter author name for new book:`);
        this.selectedGenre.books.push(new Book(title, author));

    }
    deleteBook() {
        let index = prompt(`Enter the index of the book you wish to delete:`);
        if (index > -1 && index < this.selectedGenre.books.length) {
            this.selectedGenre.books.splice(index, 1);
        }

    }
}

let myLibrary = new Library();
myLibrary.start();


