import type { tMenu } from '../constants/types/menu'

export type sidebarProps = {
    bottom: boolean;
    bottomPos: number;
    bp: Object;
    className: string;
    downloads: Array<Array<string> | Object>;
    fixed: boolean;
    menu: tMenu;
    reference: Array<Array<string> | Object>;
    style: Object;
    [key: string]: any;
    type: string;
    infographics: Array<Object>;
    infographicDefinitions: Object;
    explorers: Object;
    fields: Object;
};

export type sidebarState = {
    bottom: boolean;
    bottomPos: number;
    fixed: boolean;
};

export type sidebarContainerState = {
    activeHeader: Array<any>;
    path: string;
    showMobileSidebar: boolean;
};

export type sectionProps = {
    id?: string;
    title: string;
    collapse?: boolean;
    index?: number;
    toggleSection: React.MouseEventHandler<HTMLHeadingElement>;
    toggleMobileSidebar: React.MouseEventHandler<HTMLAnchorElement>;
    activeHeader: string | any[];
};

export type SectionLinkProps = {
    title: string;
    link?: string;
    items: any[];
    collapse?: boolean;
    id: string;
    children?: any[];
    toggleSection: React.MouseEventHandler<HTMLSpanElement> | undefined;
    toggleMobileSidebar: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    activeHeader: string | any[];
    isChild?: boolean;
    isTutorial?: boolean;
    index?: number;
    node?: any;
    style?: object;
}

export interface StickySidebarProps {
    className?: string;
    enter?: string;
    exit?: string;
    children?: React.ReactNode;
    sidebarFixed?: boolean;
    toggleFixed?: (fixed: boolean) => void;
}


export type BreadcrumbSection = {
    items: BreadcrumbItem[];
};

export type BreadcrumbItem = {
    title?: string;
    link?: string;
    items?: BreadcrumbSubItem[];
};

export type BreadcrumbSubItem = {
    title?: string;
    link?: string;
};

export type docSidebarProps = {
    activeHeader: string;
    path: string;
    isSticky: boolean;
    style: object;
    yaml: any[]; // Change from object to array
    showMobileSidebar: boolean;
    toggleSection: React.MouseEventHandler<HTMLHeadingElement>;
    toggleMobileSidebar: () => void;
};
