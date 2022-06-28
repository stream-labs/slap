/// <reference types="react" />
import { InputProps } from 'antd';
export declare function TextInput(p: Omit<InputProps, 'onChange'> & {
    onChange?: (val: any) => unknown;
}): JSX.Element;
export declare function ItemProps(): JSX.Element;
