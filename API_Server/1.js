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
};

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
get();

/*
Records
.find(...)
.sort({popularity: -1})
.limit(10)
.exec(...)
 */