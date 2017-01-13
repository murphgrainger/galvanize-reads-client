const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();
const cleanQuery = queryParse(window.location.search);

$(document).ready(function() {
    getBooks(cleanQuery.id)
        .then(addBooktoPage)
        .then(deleteBook)
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
    let source = $('#card-template').html();
    let template = Handlebars.compile(source);
    let context = {
        book
    };
    let html = template(context);
    $('.cards').html(html);
    return book;
}

function deleteBook(data) {
    $('.delete-button').click(function(event) {
        let deleteId = $(this).attr('id');
        let bookObj = {
            id: deleteId
        };
        $.ajax({
            url: `${SERVER_URL}/books`,
            method: "DELETE",
            data: bookObj,
            dataType: "json",
            success: function() {
                window.location.replace(`${CLIENT_URL}/books`);
            }
        });
    });
}

function getURL() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://cruddydegree.herokuapp.com';
    }
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
