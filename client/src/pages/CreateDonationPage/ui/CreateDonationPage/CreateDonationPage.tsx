import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from 'shared/UI/BreadCrumbs';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { Button } from 'shared/UI/Button';
import classes from './CreateDonationPage.module.scss';

interface CreateDonationPageProps {
    className?: string;
}

const CreateDonationPage = memo((props: CreateDonationPageProps) => {
    const { className } = props;

    const items: string[] = ['Добавить донацию'];
    const donationTypes = useMemo(() => ['Платно', 'Безвозмездно'], []);

    const [stationsNames, setStationsNames] = useState<string[]>([]);
    const [selectedStation, setSelectedStation] = useState<string>('');
    const [donationType, setDonationType] = useState<string>('');
    const [donationDate, setDonationDate] = useState<Nullable<Date>>(null);
    const [donationDocument, setDonationDocument] = useState<string | ArrayBuffer | null>('');

    useEffect(() => {
        fetch(
            'https://api2.donorsearch.org/api/blood_stations/map/?bbox1=59.744410786472635,29.592746835620193&bbox2=60.2096799591528,30.948185068042072',
        )
            .then((res) => res.json())
            .then((res) => setStationsNames(res.map((result: any) => result.title)));
    }, []);

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        const file = event.files[0];
        const reader = new FileReader();
        // @ts-ignore
        const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
            setDonationDocument(base64data);
        };
    };

    const handleFormSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            console.log(selectedStation, donationDate, donationType, donationDocument);
        },
        [donationDate, donationDocument, donationType, selectedStation],
    );

    const isButtonDisabled = useMemo<boolean>(
        () => !(donationDate && donationDocument && donationType && selectedStation),
        [donationDate, donationDocument, donationType, selectedStation],
    );

    return (
        <Page className={classNames(classes.CreateDonationPage, {}, [className])}>
            <BreadCrumbs items={items} />
            <h1>Добавить донацию</h1>

            <form onSubmit={handleFormSubmit}>
                <VStack maxW>
                    <HStack maxW className={classes.stations}>
                        <Dropdown
                            value={selectedStation}
                            onChange={(e: DropdownChangeEvent) => setSelectedStation(e.value)}
                            options={stationsNames}
                            filter
                            placeholder="Выберите Центр донации"
                            emptyMessage="Загрузка Центров донации"
                            emptyFilterMessage="По запросу ничего не найдено"
                        />
                    </HStack>
                    <HStack maxW className={classes.stations}>
                        <Calendar
                            value={donationDate}
                            onChange={(e) => setDonationDate(e.value)}
                            placeholder="Выберите дату донации"
                            dateFormat="dd.mm.yy"
                        />
                    </HStack>
                    <HStack maxW className={classes.stations}>
                        <Dropdown
                            value={donationType}
                            onChange={(e: DropdownChangeEvent) => setDonationType(e.value)}
                            options={donationTypes}
                            placeholder="Выберите тип донации"
                        />
                    </HStack>
                    <HStack maxW className={classes.stations}>
                        <FileUpload
                            className={classes.uploadButton}
                            mode="basic"
                            name="document-file"
                            // url="/api/upload"
                            accept="image/*"
                            maxFileSize={1000000}
                            customUpload
                            auto
                            uploadHandler={customBase64Uploader}
                            chooseLabel="Выберите фото документа"
                        />
                    </HStack>

                    <Button
                        disabled={isButtonDisabled}
                        type="submit"
                        className={classes.submitButton}
                    >
                        Добавить
                    </Button>
                </VStack>
            </form>
        </Page>
    );
});

export default CreateDonationPage;
