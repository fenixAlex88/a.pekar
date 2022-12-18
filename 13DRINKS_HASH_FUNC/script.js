function HashStorageFunc() {
    const _storage = {};
    this.addValue = function (key, value) {
        _storage[key] = value;
    }
    this.getValue = function (key) {
        if (key in _storage) {
            return _storage[key];
        } else {
            return undefined;
        }
    }
    this.deleteValue = function (key) {
        if (key in _storage) {
            delete _storage[key];
            return true;
        } else {
            return false;
        }
    }
    this.getKeys = function () {
        return Object.keys(_storage);
    }
}

const drinkStorage = new HashStorageFunc();

enter.onclick = function () {
    const drinkName = prompt('Введите название напитка');
    const drinkAlcohol = prompt('Напиток алкогольный?');
    const drinkComposition = prompt('Введите рецепт напитка');
    return drinkStorage.addValue(drinkName, {drinkAlcohol, drinkComposition});
};

getInfo.onclick = function () {
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

del.onclick = function () {
    const drinkName = prompt('Введите название напитка');
    if (drinkStorage.deleteValue(drinkName))
        alert(`Информация о напитке ${drinkName} удалена`);
    else alert(`Напиток ${drinkName} не найден`);
}

getList.onclick = function () {
    alert(`Имеется информация о напитках: ${drinkStorage.getKeys()}`);
}