import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './DonationCard.module.scss';

interface DonationCardProps {
    className?: string;
}

export const DonationCard = memo((props: DonationCardProps) => {
    const { t } = useTranslation();

    const { className } = props;

    return (
        <div className={classNames(classes.DonationCard, {}, [className])}>{t('DonationCard')}</div>
    );
});
