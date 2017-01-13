const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();


$(document).ready(function() {
    getAuthors()
        .then(showAuthors)
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
