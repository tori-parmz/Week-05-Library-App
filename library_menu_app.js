//To start, I am creating a class called 'Book' to enter a book's title and author name.

class Book {
    constructor(title, author){
        this.title = title;
        this.author = author;
    }

}

//Then a class called 'Genre' that will store books of the same genre
class Genre {
    constructor(genreType) {
        this.type = genreType;
        this.books = [];
    }

}

//Now a class called 'Library' that will organize the genres of books and allow for the creation of new books in designated genres

class Library {
    constructor() {
        this.allGenres = [];
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
        1) create book
        2) delete book
        ----------------
        ${genreInfo}
        `)
    }

    displayGenres() {
        let genreString = '';
        for (let i = 0; i < this.allGenres.length; i++) {
            genreString += i + ')' + this.allGenres[i].genreType + '\n';
        }
        alert(genreString);
    }
    createGenre() {
        let genreType = prompt (`Enter name for new genre type:`);
        this.allGenres.push(new Genre(genreType));
        console.log('Genre added: ', this.allGenres);
    }
    //
    viewGenre() {
        let index = prompt(`Enter the index of the genre you wish to view.`);
        if (index > -1 && index < this.allGenres.length) {
            this.selectedGenre = this.allGenres[index];
            let description = 'Genre Name: ' + this.selectedGenre.genreType + '\n';

            for (let i =0; i < this.selectedGenre.books.length; i++) {
                description += i + ')' + this.selectedGenre.books[i].name
                + ' - ' + this.selectedGenre.books[i].position + '\n';
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
        let index = propmt(`Enter the name of the genre you wish to delete:`);
        if (index > -1 && index < this.allGenres.length) {
            this.allGenres.splice(index, 1);
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

let myMenu = new Menu();
myMenu.start();


