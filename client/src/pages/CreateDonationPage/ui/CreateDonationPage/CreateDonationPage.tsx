import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo, useEffect, useState } from 'react';
import { BreadCrumbs } from 'shared/UI/BreadCrumbs';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import classes from './CreateDonationPage.module.scss';

interface CreateDonationPageProps {
    className?: string;
}

const CreateDonationPage = memo((props: CreateDonationPageProps) => {
    const { className } = props;

    const items: string[] = ['Добавить донацию'];

    const [stationsNames, setStationsNames] = useState<string[]>([]);
    const [selectedStation, setSelectedStation] = useState<string>('');

    useEffect(() => {
        fetch(
            'https://api2.donorsearch.org/api/blood_stations/map/?bbox1=59.744410786472635,29.592746835620193&bbox2=60.2096799591528,30.948185068042072',
        )
            .then((res) => res.json())
            .then((res) => setStationsNames(res.map((result: any) => result.title)));
    }, []);

    return (
        <Page className={classNames(classes.CreateDonationPage, {}, [className])}>
            <BreadCrumbs items={items} />
            <h1>Добавить донацию</h1>
            <HStack maxW className={classes.stations}>
                <Dropdown
                    value={selectedStation}
                    onChange={(e: DropdownChangeEvent) => setSelectedStation(e.value)}
                    options={stationsNames}
                    filter
                />
            </HStack>
        </Page>
    );
});

export default CreateDonationPage;
