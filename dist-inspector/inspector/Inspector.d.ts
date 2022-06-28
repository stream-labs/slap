import { ReactChild, ReactNode } from 'react';
import { TAppContext } from '../lib/index';
import './Inspector.css';
export declare function Inspector(p: {
    inspectedApp: TAppContext;
}): JSX.Element;
export declare function InspectorHeader(p: {
    title: string;
    extra: ReactChild;
}): JSX.Element;
export declare function SidePanel(p: {
    title?: string;
    children: ReactNode;
    isExpanded?: boolean;
}): JSX.Element;
export declare function DescriptionList(p: {
    items: ({
        label: string;
        value: string;
    })[];
}): JSX.Element;
