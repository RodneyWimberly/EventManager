export class GlobalSettings {
    static getSetting(model, key) {
        let item = model.find(f => f.key === key);
        if (item.value == null)
            item.value = "";
        return item;
    }
    static updateSetting(model, key, value) {
        let item = model.find(f => f.key === key);
        if (item != null)
            item.value = value;
        return item;
    }
}
//# sourceMappingURL=global-settings.model.js.map