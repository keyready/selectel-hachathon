import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo } from 'react';
import { BreadCrumbs } from 'shared/UI/BreadCrumbs';
import classes from './CreateDonationPage.module.scss';

interface CreateDonationPageProps {
    className?: string;
}

const CreateDonationPage = memo((props: CreateDonationPageProps) => {
    const { className } = props;

    const items: string[] = ['Добавить донацию'];

    return (
        <Page className={classNames(classes.CreateDonationPage, {}, [className])}>
            <BreadCrumbs items={items} />
            <h1>Создать донацию</h1>
        </Page>
    );
});

export default CreateDonationPage;
