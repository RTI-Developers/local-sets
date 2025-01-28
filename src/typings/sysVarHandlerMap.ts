interface SysVarHandlerMap {
    [sysVarId: number]: (() => void);
}