import axios from "axios";

const apiAddress = process.env.REACT_APP_API_URL + "/api";
const authToken = localStorage.getItem('code_spell_token');

async function postLogin(email, password) {
    return axios.post(apiAddress + '/auth/login', {
        email: email,
        password: password
    });
}

async function postRegister(username, email, password) {
    return axios.post(apiAddress + '/auth/register', {
        username: username,
        email: email,
        password: password
    });
}

async function getUserDetails(username) {
    return axios.get(apiAddress + '/user/' + username + '/details', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getUserAchievements(username) {
    return axios.get(apiAddress + '/user/' + username + '/achievements', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function putUserPassword(username, password) {
    return axios.put(apiAddress + '/user/' + username + '/password', {
        new_password: password
    }, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function putUserName(username, name) {
    return axios.put(apiAddress + '/user/' + username + '/name', {
        new_name: name
    }, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}


async function getLevelLeaderboard(levelId, language, level, skillLevel) {
    return axios.get(apiAddress + '/level/' + levelId + '/leaderboards', {
        params: {
            language: language,
            level: level,
            skill_level: skillLevel
        },
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getLevelDocumentation(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/documentation', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    })
}

async function getLevels(language, skill_level, chapter) {
    return axios.get(apiAddress + '/level', {
        params: {
            language: language,
            skill_level: skill_level,
            chapter: chapter
        },
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getChapter(language, skillLevel) {
    return axios.get(apiAddress + '/chapter', {
        params: {
            language: language,
            skill_level: skillLevel,
        },
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getPossibleSolutions(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/solutions', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    })
}


async function postLevelSolution(levelId, solutionId, code) {
    return axios.post(apiAddress + '/level/' + levelId + '/submit/' + solutionId, code, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('code_spell_token'),
            'Content-Type': 'text/plain'
        }
    });
}

async function getLevelGoals(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/goals', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getLevel(levelId) {
    return axios.get(apiAddress + '/level/' + levelId, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getSolution(levelId, solutionId) {
    return axios.get(apiAddress + '/level/' + levelId + '/solutions/' + solutionId, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });

}

export {
    postRegister,
    postLogin,
    getChapter,
    getSolution,
    getLevel,
    getLevelGoals,
    getPossibleSolutions,
    postLevelSolution,
    getLevels,
    getLevelLeaderboard,
    getLevelDocumentation,
    getUserAchievements,
    getUserDetails,
    putUserName,
    putUserPassword
};