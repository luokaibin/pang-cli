// @flow
declare module '@kikitrade/api-gateway-client' {
    declare var Timeout: number;
    declare export interface EventListener {
        // eslint-disable-next-line flowtype/no-weak-types
        (msg: any): void,
    }
    declare interface Config {
        url: string,
        registerPath?: string,
        unregisterPath?: string,
        authType: "appCode" | "accessKey" | "none",
        stage: "TEST" | "RELEASE",
        appCode?: string,
        appKey?: string,
        appSecret?: string
    }
    declare export class WS {
        ws: WebSocket | null,
        registered: boolean,
        registerResp: boolean,
        hbStarted: boolean,
        autoConnect: boolean,
        timer: number | null,
        registerPath?: string,
        unregisterPath?: string,
        host: string,
        config: Config,
        constructor(config: Config): this,
        do_send(msg: string): void,
        register(
            update: EventListener,
            deviceId: string,
            bodyInJson?: {...}
        ): void,
        unregister(body?: {...}): void,
        send(
            method: string,
            path: string,
            webSocketApiType?: any,
            body?: {...} | string
        ): void
    }
}
