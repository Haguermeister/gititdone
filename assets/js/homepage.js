function getUsersRepos(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
        })
    });
};
getUsersRepos("haguermeister");