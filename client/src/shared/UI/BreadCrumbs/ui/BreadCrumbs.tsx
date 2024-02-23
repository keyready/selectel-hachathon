import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon } from '@radix-ui/react-icons';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import classes from './BreadCrumbs.module.scss';

interface BreadCrumbsProps {
    className?: string;
    items: string[];
}

export const BreadCrumbs = memo((props: BreadCrumbsProps) => {
    const { className, items } = props;

    const navigate = useNavigate();

    const menuItems = useMemo<MenuItem[]>(() => items.map((item) => ({ label: item })), [items]);

    const home: MenuItem = {
        icon: <HomeIcon className={classes.breadcrumbIcon} />,
        url: RoutePath.menu,
        command: (data) => {
            data.originalEvent.preventDefault();
            if (data.item.url) {
                navigate(data.item.url.toString());
            }
        },
    };

    return (
        <BreadCrumb
            className={classNames(classes.breadcrumb, {}, [className])}
            model={menuItems}
            home={home}
        />
    );
});
