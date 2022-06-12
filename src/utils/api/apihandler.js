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

async function getUserDetails(email) {
    return axios.get(apiAddress + '/user/' + email + '/details', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getUserAchievements(email) {
    return axios.get(apiAddress + '/user/' + email + '/achievements', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function putUserPassword(email, password) {
    return axios.put(apiAddress + '/user/' + email + '/password', {
        newPassword: password
    }, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        }
    });
}


async function getLevelLeaderboard(levelId) {
    return axios.get(apiAddress + '/leaderboard/level/' + levelId, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getChapterLeaderboard(chapterId) {
    return axios.get(apiAddress + '/leaderboard/chapter/' + chapterId, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getOverallLeaderboard() {
    return axios.get(apiAddress + '/leaderboard', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getLevelDocumentation(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/documentation', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
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
        }
    });
}

async function getPossibleSolutions(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/solutions', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    })
}


async function postLevelSolution(levelId, solutionId, code) {
    return axios.post(apiAddress + '/level/' + levelId + '/submit/' + solutionId, code, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'text/plain'
        }
    });
}

async function getLevelGoals(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/goals', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getLevel(levelId) {
    return axios.get(apiAddress + '/level/' + levelId, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getAllAchievements() {
    return axios.get(apiAddress + '/achievements', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getAchievementDetails(achievementId) {
    return axios.get(apiAddress + `/achievements/${achievementId}`, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function postFinalSolution(levelId, codeReportId, score, code, language, difficulty) {

    let body;

    if (language && difficulty) {
        body = {
            levelId: levelId,
            codeReportId: codeReportId,
            score: score,
            code: code,
            settings: {language: language.toUpperCase(), skillLevel: difficulty.toUpperCase()}
        }
    } else {
        body = {
            levelId: levelId,
            codeReportId: codeReportId,
            score: score,
            code: code,
        }
    }

    return axios.post(apiAddress + '/solution', body, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        }
    });

}

async function getAllUserSolutions() {
    return axios.get(apiAddress + '/solution', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function getAllSolutionsForLevel(levelId) {
    return axios.get(apiAddress + `/solution/${levelId}`, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        }
    });
}

async function putAchievementToUser(email, achievementId) {
    return axios.put(apiAddress + `/user/${email}/achievements`, {
        achievementId: achievementId
    }, {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        }
    });
}

async function getCodeProvided(levelId) {
    return axios.get(apiAddress + '/level/' + levelId + '/code', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        }
    });
}

export {
    postRegister,
    postLogin,
    getChapter,
    getLevel,
    getLevelGoals,
    getPossibleSolutions,
    postLevelSolution,
    getLevels,
    getLevelLeaderboard,
    getChapterLeaderboard,
    getOverallLeaderboard,
    getLevelDocumentation,
    getUserAchievements,
    getAllAchievements,
    getUserDetails,
    putUserPassword,
    getAchievementDetails,
    postFinalSolution,
    getAllUserSolutions,
    getAllSolutionsForLevel,
    putAchievementToUser,
    getCodeProvided
};