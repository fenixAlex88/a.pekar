let formCount = 1;

const renderForm = formArr => {
    const form = document.createElement('form');
    form.action = 'http://fe.it-academy.by/TestForm.php';
    form.name = `form${formCount++}`;
    document.getElementById('app').appendChild(form);
    const hr = document.createElement('hr');
    form.appendChild(hr);
    formArr.forEach(formElem => {
        if (formElem.label) {
            const label = document.createElement('label');
            label.textContent = formElem.label;
            label.classList.add('label');
            form.appendChild(label);
        }
        const input = formElem.kind === 'combo' ?
            document.createElement('select') :
            document.createElement('input');
        if (formElem.name) {
            input.name = formElem.name;
        }
        switch (formElem.kind) {
            case 'longtext':
                form.appendChild(input);
                input.type = 'text';
                input.classList.add('input--longtext');
                break;
            case 'shorttext':
                form.appendChild(input);
                input.type = 'text';
                input.classList.add('input--shorttext');
                break;
            case 'number':
                form.appendChild(input);
                input.type = 'number';
                input.classList.add('input--number');
                break;
            case 'combo':
                form.appendChild(input);
                formElem.variants.forEach(variant => {
                    const option = document.createElement('option');
                    option.value = variant.value;
                    option.textContent = variant.text;
                    input.appendChild(option);
                });
                break;
            case 'radio':
                formElem.variants.forEach(variant => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = formElem.name;
                    radio.value = variant.value;
                    form.appendChild(radio);
                    const label = document.createElement('label');
                    label.textContent = variant.text;
                    form.appendChild(label);
                });
                break;
            case 'check':
                input.type = 'checkbox';
                form.appendChild(input);
                break;
            case 'memo':
                const textarea = document.createElement('textarea');
                textarea.name = formElem.name;
                textarea.classList.add('textarea');
                form.appendChild(textarea);
                break;
            case 'submit':
                form.appendChild(input);
                input.type = 'submit';
                input.value = formElem.caption;
                break;
            default:
                break;
        }
        const br = document.createElement('br');
        form.appendChild(br);
    });
}

renderForm(formDef1);
renderForm(formDef2);
