const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();
const cleanQuery = queryParse(window.location.search);

$(document).ready(function() {
    getAuthors(cleanQuery.id)
        .then(cleanData)
        .then(addAuthortoPage)
        .then(editAuthor)
        .catch(errorFunction);
});

function queryParse(query) {
    let obj = {};
    let arr1 = query.substr(1).split('&').forEach((element) => {
        let arr2 = element.split('=');
        obj[arr2[0]] = arr2[1];
    });
    return obj;
}

function getAuthors(id) {
    return $.get(`${SERVER_URL}/authors/${id}`);
}

function addAuthortoPage(author) {
    console.log(author);
    let source = $('#author-template').html();
    let template = Handlebars.compile(source);
    let context = {
        author
    };
    let html = template(context);
    $('#form').html(html);
    $('select').material_select();
    return author;
}

function editAuthor(data) {
    console.log(data);
    $('#edit-button').click(function(event) {
        event.preventDefault();
        let formObj = {};
        formObj.author_id = data[0].id;
        formObj.fname = $('#fname').val();
        formObj.lname = $('#lname').val();
        formObj.description = $('#biography').html();
        formObj.cover = $('#portrait').val();
        $.ajax({
            url: `${SERVER_URL}/authors/${data[0].id}`,
            method: "PUT",
            data: formObj,
            dataType: "json",
            success: function() {
                window.location.replace(`${CLIENT_URL}/authors.html`);
            }
        });
    });
}

function errorFunction() {
    alert('An Error Occured');
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
