import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo, useMemo } from 'react';
import { Text } from 'shared/UI/Text';
import { BreadCrumbs } from 'shared/UI/BreadCrumbs';
import classes from './MyDonationsPage.module.scss';

interface MyDonationsPageProps {
    className?: string;
}

const MyDonationsPage = memo((props: MyDonationsPageProps) => {
    const { className } = props;

    const items = useMemo<string[]>(() => ['Мои донации'], []);

    return (
        <Page className={classNames(classes.MyDonationsPage, {}, [className])}>
            <BreadCrumbs items={items} />
            <Text size="large" title="Мои донации" />
        </Page>
    );
});

export default MyDonationsPage;
