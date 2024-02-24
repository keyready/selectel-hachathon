import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo } from 'react';
import { Text } from 'shared/UI/Text';
import classes from './MyDonationsPage.module.scss';

interface MyDonationsPageProps {
    className?: string;
}

const MyDonationsPage = memo((props: MyDonationsPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(classes.MyDonationsPage, {}, [className])}>
            <Text title="Мои донации" />
        </Page>
    );
});

export default MyDonationsPage;
