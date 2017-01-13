const SERVER_URL = getUrl();

$(document).ready(function() {
    getBooks()
        .then(showBooks);
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

function getUrl() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000';
    } else {
        return 'https://galvanize-reads-mg.herokuapp.com';
    }
}
