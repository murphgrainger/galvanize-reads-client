const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();
const cleanQuery = queryParse(window.location.search);

$(document).ready(function() {
    getBooks(cleanQuery.id)
        .then(addBooktoPage)
        .then(editBook)
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

function getBooks(id) {
    return $.get(`${SERVER_URL}/books/${id}`);
}

function addBooktoPage(book) {
    let source = $('#book-template').html();
    let template = Handlebars.compile(source);
    let context = {
        book
    };
    let html = template(context);
    $('#form').html(html);
    $('select').material_select();
    return book;
}

function editBook(data) {
    $('#edit-button').click(function(event) {
        event.preventDefault();
        let formObj = {};
        formObj.book_id = data[0].book_id;
        formObj.title = $('#title').val();
        formObj.genre = $('#genre').val();
        formObj.description = $('#description').html();
        formObj.cover = $('#cover').val();
        formObj.author = $('#author-field').val();
        formObj.author_id = Number($(`.${formObj.author}`).attr('id'));
        $.ajax({
            url: `${SERVER_URL}/books/${data[0].book_id}`,
            method: "PUT",
            data: formObj,
            dataType: "json",
            success: function() {
                window.location.replace(`${CLIENT_URL}/books`);
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
        return 'https://galvanize-reads-mg.herokuapp.coms';
    }
}

function getUrl2() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:8080';
    } else {
        return 'https://galvanize-reads-mg.firebaseapp.com';
    }
}
