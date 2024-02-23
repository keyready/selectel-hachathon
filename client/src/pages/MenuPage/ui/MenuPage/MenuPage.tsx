import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { memo } from 'react';
import { HStack, VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import PlusCircleIcon from 'shared/assets/icons/plus-circle.svg';
import CalendarIcon from 'shared/assets/icons/calendar.svg';
import BloodIcon from 'shared/assets/icons/blood.svg';
import CardsIcon from 'shared/assets/icons/card-stack.svg';
import MapPinIcon from 'shared/assets/icons/map-pin.svg';
import MapLocationPinIcon from 'shared/assets/icons/map-location-pin.svg';
import AchievementRewardIcon from 'shared/assets/icons/achievement-reward-winner.svg';
import AwardIcon from 'shared/assets/icons/award.svg';
import NoteCheckIcon from 'shared/assets/icons/note-check.svg';
import GameIcon from 'shared/assets/icons/game.svg';
import BookOpenIcon from 'shared/assets/icons/book-open.svg';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import classes from './MenuPage.module.scss';

interface MenuPageProps {
    className?: string;
}

const MenuPage = memo((props: MenuPageProps) => {
    const { className } = props;

    const { user } = useTelegram();

    return (
        <Page className={classNames(classes.MenuPage, {}, [className])}>
            <VStack gap="24" maxW>
                <VStack maxW align="center">
                    <Text align="center" size="large" title={`Привет, ${user?.first_name}`} />
                    <Text align="center" title="Мы рады снова тебя видеть!" />
                </VStack>

                <VStack maxW gap="16">
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={PlusCircleIcon} />
                            <Text size="small" title="Добавить донацию" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW variant="warning">
                        <HStack maxW justify="center">
                            <Icon Svg={CalendarIcon} />
                            <Text size="small" title="Запланировать донацию" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={BloodIcon} />
                            <Text size="small" title="Мои донации" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={CardsIcon} />
                            <Text size="small" title="Карточки центров крови" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={MapPinIcon} />
                            <Text size="small" title="Адресные потребности" />
                        </HStack>
                    </Button>

                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={MapLocationPinIcon} />
                            <Text size="small" title="Мероприятия в городе" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={AchievementRewardIcon} />
                            <Text size="small" title="Бонусы" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={AwardIcon} />
                            <Text size="small" title="Мое место в топе" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={NoteCheckIcon} />
                            <Text size="small" title="Памятка донора" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={GameIcon} />
                            <Text size="small" title="Игры и спецпроекты" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={BookOpenIcon} />
                            <Text size="small" title="Журнал DonorSearch" />
                        </HStack>
                    </Button>
                    <Button className={classes.button} maxW>
                        <HStack maxW justify="center">
                            <Icon Svg={MapPinIcon} />
                            <Text size="small" title="Сделать пожертвование" />
                        </HStack>
                    </Button>
                </VStack>
            </VStack>
        </Page>
    );
});

export default MenuPage;
