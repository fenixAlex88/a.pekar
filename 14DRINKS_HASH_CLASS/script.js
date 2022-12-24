class HashStorageClass {
    constructor() {
        this.storage = {};
    }

    addValue(key, value) {
        this.storage[key] = value;
    }

    getValue(key) {
        if (key in this.storage) {
            return this.storage[key];
        } else {
            return undefined;
        }
    }

    deleteValue(key) {
        if (key in this.storage) {
            delete this.storage[key];
            return true;
        } else {
            return false;
        }
    }

    getKeys() {
        return Object.keys(this.storage);
    }
}

const drinkStorage = new HashStorageClass();

document.getElementById('enter').onclick = () => {
    const drinkName = prompt('Введите название напитка');
    const drinkAlcohol = prompt('Напиток алкогольный?');
    const drinkComposition = prompt('Введите рецепт напитка');
    return drinkStorage.addValue(drinkName, {drinkAlcohol, drinkComposition});
};

document.getElementById('getInfo').onclick = () => {
    const drinkName = prompt('Введите название напитка');
    const info = drinkStorage.getValue(drinkName)
    if (info) {
        const {drinkAlcohol, drinkComposition} = info;
        alert(`напиток ${drinkName}
алкогольный: ${drinkAlcohol} 
рецепт приготовления: 
${drinkComposition}`);
    } else alert(`Напиток ${drinkName} не найден`);
}

document.getElementById('del').onclick = () => {
    const drinkName = prompt('Введите название напитка');
    drinkStorage.deleteValue(drinkName) ?
        alert(`Информация о напитке ${drinkName} удалена`) :
        alert(`Напиток ${drinkName} не найден`);
}

document.getElementById('getList').onclick = () => {
    alert(`Имеется информация о напитках: ${drinkStorage.getKeys()}`);
}