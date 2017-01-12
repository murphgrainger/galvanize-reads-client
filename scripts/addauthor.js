const SERVER_URL = getUrl();
const CLIENT_URL = getUrl2();

$(document).ready(function() {
    postAuthors();
});

function postAuthors() {
    $('#add-button').click(function(event) {
        event.preventDefault();
        let formObj = {};
        formObj.fname = $('#fname').val();
        formObj.lname = $('#lname').val();
        formObj.biography = $('#textarea').val();
        formObj.portrait = $('#portrait').val();
        $.post(`${SERVER_URL}/authors`, formObj).then(function(result) {
            window.location.replace(`${CLIENT_URL}/authors`);
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
