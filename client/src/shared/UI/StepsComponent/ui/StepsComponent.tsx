import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import { HStack } from 'shared/UI/Stack';
import classes from './StepsComponent.module.scss';

interface StepsComponentProps {
    className?: string;
    headers: string[];
    activeIndex: number;
}

export const StepsComponent = memo((props: StepsComponentProps) => {
    const { className, headers, activeIndex } = props;

    const menuItems: MenuItem[] = headers.map((header) => ({ label: header }));

    return (
        <HStack
            maxW
            gap="16"
            justify="between"
            className={classNames(classes.StepsComponent, {}, [className])}
        >
            <Steps activeIndex={activeIndex} model={menuItems} />
        </HStack>
    );
});
