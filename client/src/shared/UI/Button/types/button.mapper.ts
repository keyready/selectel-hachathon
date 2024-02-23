import { buttonVariants } from './button.types';
import classes from '../ui/Button.module.scss';

export const variantsMapper: Record<buttonVariants, string> = {
    primary: classes.primary,
    clear: classes.clear,
    telegram: classes.telegram,
    donorSearch: classes.donorSearch,
    danger: classes.danger,
};
