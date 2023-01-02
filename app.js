const themes = {
    light: {
        '--heading-color': '#000',
        '--bg-color': '#fff',
        '--task-bg-color': '#ffffe9',
        '--border-color': '#666',
        '--checked-color': '#000',
        '--checked-bg-color': '#42e285',
        '--link-color': '#5656dd'
    },
    dark: {
        '--heading-color': '#e7e6d6',
        '--bg-color': '#2c2e3a',
        '--task-bg-color': '#34344c',
        '--border-color': '#ffa857',
        '--checked-color': '#e7e6d6',
        '--checked-bg-color': '#703615',
        '--link-color': '#e7e6d6'
    }
};


const themeSelect = document.getElementById('themeSelect');

themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    setTheme(selectedTheme);
});

function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    })
};