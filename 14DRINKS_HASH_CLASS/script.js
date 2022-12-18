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

enter.onclick = function () {
    const drinkName = prompt('Введите название напитка');
    const drinkAlcohol = confirm('Напиток алкогольный?');
    const drinkComposition = prompt('Введите рецепт напитка');
    return drinkStorage.addValue(drinkName, {drinkAlcohol, drinkComposition});
};

getInfo.onclick = function () {
    const drinkName = prompt('Введите название напитка');
    const info = drinkStorage.getValue(drinkName)
    if (info) {
        const {drinkAlcohol, drinkComposition} = info;
        alert(`напиток ${drinkName}
алкогольный: ${drinkAlcohol ? 'да' : 'нет'}
рецепт приготовления: 
${drinkComposition}`);
    } else alert(`Напиток ${drinkName} не найден`);
}

del.onclick = function () {
    const drinkName = prompt('Введите название напитка');
    if (drinkStorage.deleteValue(drinkName))
        alert(`Информация о напитке ${drinkName} удалена`);
    else alert(`Напиток ${drinkName} не найден`);
}

getList.onclick = function () {
    alert(`Имеется информация о напитках: ${drinkStorage.getKeys()}`);
}