import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode, useEffect, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { StepsComponent } from 'shared/UI/StepsComponent';
import { Tabs, TabsItem } from 'shared/UI/Tabs';
import { Button } from 'primereact/button';
import classes from './StepsForm.module.scss';

interface StepsFormProps {
    className?: string;
    items: TabsItem[];
    children?: ReactNode;
    onNextStepSubmit?: () => void;
}

export const StepsForm = memo((props: StepsFormProps) => {
    const { className, items, onNextStepSubmit, children } = props;

    const [currentStep, setCurrentStep] = useState<number>(0);

    useEffect(() => {
        if (currentStep === items.length) {
            setCurrentStep(0);
        }
    }, [currentStep, items]);

    return (
        <VStack gap="32" maxW className={classNames(classes.StepsForm, {}, [className])}>
            <StepsComponent activeIndex={currentStep} headers={items.map((item) => item.header)} />
            <Tabs activeIndex={currentStep} items={items} />
            <Button onClick={() => setCurrentStep((currentStep) => currentStep + 1)}>Next</Button>
        </VStack>
    );
});
