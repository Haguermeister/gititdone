var userFromEl = document.querySelector("#user-form");
var NameInputEl = document.querySelector("#username");
var RepoName = document.querySelector("#repos-search-term");
var repoContainerEl = document.querySelector("#repos-container");
var languagesButtonEl = document.querySelector("#language-buttons");

function getUsersRepos(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getThatInfo(data, user);
            })
        }
        else {
            alert("Error: Github User Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to connect to Github");
        });
};

function formSubmitHandler(event) {
    event.preventDefault();
    var username = NameInputEl.value.trim();
    if (username) {
        getUsersRepos(username);
        NameInputEl.value = "";
    }
    else {
        alert("Please insert a Github User Name");
    }
}

function getThatInfo(repos, searchterm) {
    RepoName.innerHTML = searchterm;
    repoContainerEl.textContent = "";

    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
}
function getFeaturedRepos(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getThatInfo(data.items, language);
            });
        }
        else {
            alert("Error: Github User Not Found");
        }
    });
}
function buttonClickHandler(event) {
    var language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);
        repoContainerEl.textContent = "";
    }
}
languagesButtonEl.addEventListener('click', buttonClickHandler);
userFromEl.addEventListener('submit', formSubmitHandler);
