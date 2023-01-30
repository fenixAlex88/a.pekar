(function () {
    const socket = io.connect();
    const form = document.getElementById('messForm');
    const name = document.getElementById('name');
    const textarea = document.getElementById('textarea');
    const allMess = document.getElementById('all_mess');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('send mess', {msg: textarea.value, name: name.value});
        textarea.value = '';
    });

    socket.on('add mess', (data) => {
        allMess.innerHTML += `<div><b>${data.name}</b> ${data.mess} </div>`;
    });

})();