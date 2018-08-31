import { LogEventOptions, SetScreenNameOptions, SetUserPropertyOptions } from "./analytics";
export declare function logEvent(options: LogEventOptions): Promise<void>;
export declare function setUserId(arg: any): Promise<void>;
export declare function setUserProperty(options: SetUserPropertyOptions): Promise<void>;
export declare function setScreenName(options: SetScreenNameOptions): Promise<void>;
