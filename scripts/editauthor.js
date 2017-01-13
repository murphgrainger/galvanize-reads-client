const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();


$(document).ready(function() {
    getAuthors()
        .then(cleanData)
        .then(showAuthors);
    // .then(editBookRedirect);
});


function getAuthors() {
    return $.get(`${SERVER_URL}/authors`);
}

function showAuthors(data) {
    console.log(data);
    let source = $('#card-template').html();
    let template = Handlebars.compile(source);
    let context = {
        data
    };
    let html = template(context);
    $('.cards').html(html);
    return data;
}


function getUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://galvanize-reads-mg.herokuapp.com';
    }
}

function getUrl2() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:8080';
    } else {
        return 'https://galvanize-reads-mg.firebaseapp.com';
    }
}

function cleanData(data) {
    let bookIndex = {};
    let authorList = [];
    data.forEach(author => {
        var newAuthor = {};
        var book = {};
        newAuthor.id = author.author_id;
        newAuthor.fname = author.fname;
        newAuthor.lname = author.lname;
        newAuthor.biography = author.biography;
        newAuthor.portrait = author.portrait;
        book.id = author.book_id;
        book.title = author.title;
        book.description = author.description;
        book.cover = author.cover;
        authorList.push(newAuthor);
        bookIndex[author.author_id] = bookIndex[author.author_id] || [];
        bookIndex[author.author_id].push(book);
    });
    return authorList.reduce((authors, author, index, array) => {
        if (array[index + 1] && author.id !== array[index + 1].id) {
            author.books = bookIndex[author.id];
            authors.push(author);
        } else if (!array[index + 1]) {
            author.books = bookIndex[author.id];
            authors.push(author);
        }
        return authors;
    }, []);
}
