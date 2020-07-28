function getRepos(gitURL) {
    fetch(gitURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => 
        displayRepos(responseJson))
        .catch(error => alert('User handle not found or wait a bit before submitting again'));
}

function templateRepoHtml(repoUrl, repoTitle){

    return `<li class="repo"><a href="${repoUrl}">${repoTitle}</a></li>`

}

function loopRepo(repoArray, username) {
    $('#result-list').empty();
    for (let i = 0; i < repoArray.length; i++) {
        $('#result-list').append(templateRepoHtml(repoArray[i].url, repoArray[i].name));
    };
    $('.result-title').removeClass('hidden');
    $('.results').removeClass('hidden');
}

function displayRepos(responseJson, username) {
    /* Log the JSON array from the response */
    console.log(responseJson);
    console.log(username);
    /* Set array as local variable */
    repoArray = responseJson;

    loopRepo(repoArray, username);
}

function formEvent() {

    $('form').on('submit', function(event){
        event.preventDefault();
        let username = $('#js-search').val();
        console.log(username);
        let gitURL = "https://api.github.com/users/"+ username + "/repos";
        console.log(gitURL);
        getRepos(gitURL, username);
    });

}


$(function start() {
    console.log('Done');
    formEvent();
})
