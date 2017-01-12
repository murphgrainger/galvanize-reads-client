const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();


$(document).ready(function() {
    getBooks()
        .then(showBooks)
        .then(deleteBook);
});


function getBooks() {
    return $.get(`${SERVER_URL}/books`);
}

function showBooks(data) {
    let source = $('#card-template').html();
    let template = Handlebars.compile(source);
    let context = {
        data
    };
    let html = template(context);
    $('.cards').html(html);
    return data;
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

function getUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://line-waiter-db.herokuapp.com';
    }
}

function getUrl2() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:8080';
    } else {
        return 'https://line-waiter.firebaseapp.com';
    }
}
