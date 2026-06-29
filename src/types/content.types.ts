
export type contentProps = {
    content?: Array<Object | string>;
    examples?: Array<Object>;
    explorers?: Object;
    infographicDefinitions?: any;
    infographics?: any;
    fields?: Object;
    showMenu: boolean;
    meta?: {
        start: string;
        api_path: string;
    };
    fieldsMapped: Object;
    fieldsFlattened: Record<string, string>;
};

export type FieldsType = {
    properties: Record<string, any>;
    [key: string]: any;
};

export type contentWrapperProps = {
    content?: Array<Object | string>;
    explorers?: Object;
    infographics?: Array<Object>;
    infographicDefinitions?: Object;
    fields?: FieldsType;
    className?: string;
    hideMenu?: boolean;
    meta: { type?: string; start?: string | undefined; api_path?: string;[key: string]: any };
    type?: String;
};