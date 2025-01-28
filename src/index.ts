// Local Set Driver
// Copyright 2025 Noesis Labs

System.Print('Local Set: Initializing Local Set Driver\r\n');
const g_debug: boolean = Config.Get('DebugTrace') == 'true';
const g_logger: Logger = new Logger("LocalSet", g_debug);
const g_loggerContext: string = 'Local Set Driver, Global';
const g_sets: Set[] = [];
const g_setCount: number = parseInt(Config.Get('SetCount'), 10);

function init(): void {
	for (let i = 0; i < g_setCount; i++) {
		g_sets.push(new Set(i, g_logger));
	}
}

function clearSelection(setIndex: number, deviceId: number) {
	g_logger.logTrace(`clearSelection, setIndex: [${setIndex}], deviceId: [${deviceId}]`, g_loggerContext);
	
	if (!g_sets[setIndex]) {
        g_logger.logTrace(`clearSelection: Invalid setIndex [${setIndex}]`, g_loggerContext);
        return;
    }

    g_sets[setIndex].clearSelection(deviceId);
}

function selectItem(setIndex: number, itemIndex: number, deviceId: number) {
	g_logger.logTrace(`selectItem, setIndex: [${setIndex}], itemIndex: [${itemIndex}], deviceId: [${deviceId}]`, g_loggerContext);
	
	if (!g_sets[setIndex]) {
        g_logger.logTrace(`selectItem: Invalid setIndex [${setIndex}]`, g_loggerContext);
        return;
    }

    g_sets[setIndex].selectItem(itemIndex, deviceId);
}

init();

System.SignalEvent(`Initialized`);
