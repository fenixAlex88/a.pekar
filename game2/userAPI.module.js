const apiURL = 'http://86.57.135.50:12000/auth/';

async function query(method, addr, body = {}, cb) {
    try {
        let response;
        switch (method) {
            case 'POST':
                response = await fetch(apiURL + addr, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body)
                });
                break;
            case 'GET':
                response = await fetch(apiURL + addr, {
                    method: 'GET'
                })
                break;
            case 'PUT':
                response = await fetch(apiURL + addr, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body)
                });
                break;
        }
        const result = await response.json();
        cb(result);
    } catch (e) {
        alert(e);
    }
}

export const userAPImodule = {
    reg(username, password) {
        query('POST', 'registration', {username, password}, regHandler);
    },
    login(username, password) {
        query('POST', 'login', {username, password}, loginHandler);
    },
    getBests(getBestsHandler) {
        query('GET', 'users', {}, getBestsHandler);
    },
    saveScore(_id, score) {
        query('PUT', 'user', {_id, score}, saveScoreHandler);
    }
}

function regHandler(res) {
    sessionStorage.auth = res.auth;
    sessionStorage.player = JSON.stringify(res);
    alert(res.message);
    location.hash = 'main';
}

function loginHandler(res) {
    sessionStorage.auth = res.auth;
    sessionStorage.player = JSON.stringify(res);
    alert(res.message);
    location.hash = 'main';
}

function saveScoreHandler() {
    location.hash = 'main';
}
