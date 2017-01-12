const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();

$(document).ready(function() {
    postBooks();
});

function postBooks() {
    $('#add-button').click(function(event) {
        event.preventDefault();
        let formObj = {};
        formObj.title = $('#title').val();
        formObj.genre = $('#genre').val();
        formObj.description = $('#description').val();
        formObj.cover = $('#cover').val();
        $.post(`${SERVER_URL}/books`, formObj).then(function(result) {
            window.location.replace(`${CLIENT_URL}/books`);
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
