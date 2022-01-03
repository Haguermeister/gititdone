function getUsersRepos() {
    fetch("https://api.github.com/users/octocat/repos");
};

getUsersRepos();