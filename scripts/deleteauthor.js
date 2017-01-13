const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();

$(document).ready(function() {
    getAuthors()
        .then(showAuthors)
        .then(deleteAuthor);
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

function deleteAuthor(data) {
    $('.delete-button').click(function(event) {
        let deleteId = $(this).attr('id');
        let bookObj = {
            id: deleteId
        };
        $.ajax({
            url: `${SERVER_URL}/authors`,
            method: "DELETE",
            data: bookObj,
            dataType: "json",
            success: function() {
                window.location.replace(`${CLIENT_URL}/authors`);
            }
        });
    });
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
