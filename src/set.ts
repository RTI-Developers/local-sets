class Set {

    private readonly _index: number;
    private readonly _itemCount: number;
    private readonly _logger: Logger;
    private readonly _loggerContext: string;
    private readonly _name: string;   

    private _selectedItemIndex: number | undefined = undefined;

    constructor(index: number, logger: Logger) {
        this._index = index;
        this._logger = logger;

        this._name = Config.Get(`Set${index + 1}Name`);
        this._itemCount = parseInt(Config.Get(`Set${index + 1}ItemCount`), 10);
        
        const logIdentifier = `Set ${index + 1}`;
        this._loggerContext = this._name ? `${logIdentifier} (${this._name})` : logIdentifier;

        this._logger.logTrace(`constructor`, this._loggerContext);
        this._logger.logTrace(`constructor, found itemCount of ${this._itemCount}`);
    }

    public clearSelection(deviceId: number) {
        this._logger.logTrace(`clearSelection, deviceId: [${deviceId}]`, this._loggerContext);

        this._selectedItemIndex = undefined;

        this.updateVariables(deviceId);
    }

    public selectItem(itemIndex: number, deviceId: number) {
        this._logger.logTrace(`selectItem, itemIndex: [${itemIndex}], deviceId: [${deviceId}]`, this._loggerContext);

        this._selectedItemIndex = itemIndex;

        this.updateVariables(deviceId);
	}

    private updateVariables(deviceId: number) {
        this._logger.logTrace(`updateVariables, deviceId: [${deviceId}]`, this._loggerContext);

        const hasSelection = (this._selectedItemIndex != undefined);

        this._logger.logTrace(`updateVariables, writing ${hasSelection} to Set${this._index + 1}HasSelection%${deviceId}`, this._loggerContext);
		SystemVars.Write(`Set${this._index + 1}HasSelection%${deviceId}`, hasSelection);
        this._logger.logTrace(`updateVariables, writing ${!hasSelection} to Set${this._index + 1}HasNoSelection%${deviceId}`, this._loggerContext);
		SystemVars.Write(`Set${this._index + 1}HasNoSelection%${deviceId}`, !hasSelection);

        for (let i = 0; i < this._itemCount; i++) {
            const isItemSelected = (this._selectedItemIndex == i);

            this._logger.logTrace(`updateVariables, writing ${isItemSelected} to Set${this._index + 1}Item${i + 1}Selected%${deviceId}`, this._loggerContext);
            SystemVars.Write(`Set${this._index + 1}Item${i + 1}Selected%${deviceId}`, isItemSelected);
            this._logger.logTrace(`updateVariables, writing ${!isItemSelected} to Set${this._index + 1}Item${i + 1}NotSelected%${deviceId}`, this._loggerContext);
            SystemVars.Write(`Set${this._index + 1}Item${i + 1}NotSelected%${deviceId}`, !isItemSelected);
        }
    }
}
