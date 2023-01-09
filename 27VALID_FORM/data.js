const formDef1 =
    [
        {label: 'Разработчики:', kind: 'longtext', name: 'author'},
        {label: 'Название сайта:', kind: 'longtext', name: 'title'},
        {label: 'URL сайта:', kind: 'url', name: 'siteurl'},
        {label: 'Дата запуска сайта:', kind: 'date', name: 'startdate'},
        {label: 'Посетителей в сутки:', kind: 'number', name: 'persons'},
        {label: 'E-mail для связи:', kind: 'email', name: 'email'},
        {
            label: 'Рубрика каталога:', kind: 'combo', name: 'division',
            variants: [{text: 'здоровье', value: 1}, {text: 'домашний уют', value: 2}, {
                text: 'бытовая техника', value: 3
            }]
        },
        {
            label: 'Размещение:', kind: 'radio', name: 'payment',
            variants: [{text: 'бесплатное', value: 1}, {text: 'платное', value: 2}, {text: 'VIP', value: 3}]
        },
        {label: 'Разрешить отзывы:', kind: 'check', name: 'votes'},
        {label: 'Описание сайта:', kind: 'memo', name: 'description'},
        {caption: 'Опубликовать', kind: 'submit'},
    ];
