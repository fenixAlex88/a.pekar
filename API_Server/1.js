let _post =  {
    author: "zzz",
    title: "second",
    content: "lorem"
};

console.log(_post);
async function post() {
    let response = await fetch('http://127.0.0.1:3000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(_post)
    });

    const {_id, author, title} =  await response.json();
    console.log(_id, author, title);
}

async function get() {
    let response = await fetch('http://127.0.0.1:3000/api/posts', {
        method: 'GET'
    });

    const result = await response.json();
    result.forEach((post)=>{
        const {_id, author, title} = post;
        console.log(_id, author, title);
    })

}

async function reg() {
    const username = 'Alex22'
    const password = '12345';
    const req = JSON.stringify({username, password});
    try {
        let response = await fetch('http://127.0.0.1:3000/auth/registration', {

            mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: req
        });
        const result = await response.json();
        console.log(result);
    } catch (e) {
        console.log('error: ', e);
    }
}
reg();

/*
Records
.find(...)
.sort({popularity: -1})
.limit(10)
.exec(...)
 */