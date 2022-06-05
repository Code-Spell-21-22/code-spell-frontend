import axios from "axios";

const apiAddress = process.env.REACT_APP_API_URL + "/api";

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
    return axios.get(apiAddress + '/user/' + username + '/details');
}

async function getUserAchievements(username) {
    return axios.get(apiAddress + '/user/' + username + '/achievements');
}

async function putUserPassword(username, password) {
    return axios.put(apiAddress + '/user/' + username + '/password', {
        new_password: password
    });
}

async function putUserName(username, name) {
    return axios.put(apiAddress + '/user/' + username + '/name', {
        new_name: name
    });
}


async function getLevelLeaderboard(levelid, language, level, skill_level) {
    return axios.get(apiAddress + '/level/' + levelid + '/leaderboards', {
        params: {
            language: language,
            level: level,
            skill_level: skill_level
        }
    });
}

async function getLevelDocumentation(levelid) {
    return axios.get(apiAddress + '/level/' + levelid + '/documentation')
}

async function getLevels(language, skill_level, chapter) {
    return axios.get(apiAddress + '/level', {
        params: {
            language: language,
            skill_level: skill_level,
            chapter: chapter
        }
    });
}

async function getChapter(language, skill_level) {
    return axios.get(apiAddress + '/chapter', {
        params: {
            language: language,
            skill_level: skill_level,
        }
    });
}

async function getPossibleSoluctions(levelid) {
    return axios.get(apiAddress + '/level/' + levelid + '/solutions')
}


async function postLevelSolution(levelid, solutionid, code) {
    return axios.post(apiAddress + '/level/' + levelid + '/submit/' + solutionid, code, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('code_spell_token'),
            'Content-Type': 'text/plain'
        }
    });
}

async function getLevelGoals(levelid) {
    return axios.get(apiAddress + '/level/' + levelid + '/goals');
}

async function getLevel(levelid) {
    return axios.get(apiAddress + '/level/' + levelid);
}

async function getSolution(levelid, solutionid) {
    return axios.get(apiAddress + '/level/' + levelid + '/solutions/' + solutionid);

}

export {
    postRegister,
    postLogin,
    getChapter,
    getSolution,
    getLevel,
    getLevelGoals,
    getPossibleSoluctions,
    postLevelSolution,
    getLevels,
    getLevelLeaderboard,
    getLevelDocumentation,
    getUserAchievements,
    getUserDetails,
    putUserName,
    putUserPassword
};