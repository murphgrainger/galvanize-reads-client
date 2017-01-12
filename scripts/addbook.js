const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();

$(document).ready(function() {
    getAuthors()
        .then(showAuthors)
        .then(postBooks);
});

function getAuthors() {
    return $.get(`${SERVER_URL}/authors`);
}

function showAuthors(data) {
    console.log(data);
    let source = $('#author-template').html();
    let template = Handlebars.compile(source);
    let context = {
        data
    };
    let html = template(context);
    $('#author-field').html(html);
    $('select').material_select();
    return data;
}

function postBooks(data) {
    $('#add-button').click(function(event) {
        event.preventDefault();
        let formObj = {};
        formObj.title = $('#title').val();
        formObj.genre = $('#genre').val();
        formObj.description = $('#description').val();
        formObj.cover = $('#cover').val();
        formObj.author = $('#author-field').val();
        console.log(formObj);
        // $.post(`${SERVER_URL}/books`, formObj).then(function(result) {
        //     window.location.replace(`${CLIENT_URL}/books`);
        // });
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
