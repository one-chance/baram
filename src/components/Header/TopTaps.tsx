import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { getMenus } from 'utils/ConfigUtil';
import IMenu from 'interfaces/Common/IMenu';

const useStyles = makeStyles((theme) => ({
  menuTabs: {
    margin: "0 auto",
  },
  menuTab: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: "space-around",
    width: "13%",
    textAlign: "center",
  },
  tabListItem: {
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    flexShrink: 0,
  }
}));

export default function TopTaps() {
  const classes = useStyles();
  
  const Menus: Array<IMenu> = getMenus();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenFixed, setIsOpenFixed] = React.useState(false);

  const _tabsOpen = () => {
    setIsOpen(true);
  }
  const _tabsClose = () => {
    setIsOpen(false);
  }

  const _onTabsEnter = (e: React.MouseEvent<{}>) => {
    _tabsOpen();
  }
  const _onTabsLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _tabsClose();
  }

  const _onListItemOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpenFixed(true);
    _tabsOpen();
  }
  const _onListItemClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpenFixed(false);
    _tabsClose();
  }

  const _onMoveMenu = (url: string) => {
    document.location.href = url;
  }

  return (
    <React.Fragment>
      <Box>
        <Grid
          container
          spacing={0}
          direction="row"
          justify="center"
          className={classes.menuTabs}>
          {
            Menus.map((menu: IMenu) => {
              return(
                <Grid
                  item
                  key={menu.idx}
                  className={classes.menuTab}
                  onMouseEnter={_onTabsEnter}
                  onMouseLeave={_onTabsLeave}>
                    <List>
                      <ListItem
                        key={menu.key}
                        button
                        className={classes.tabListItem}
                        onClick={() => (_onMoveMenu(menu.url))}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            display="block">
                              {menu.title}
                          </Typography>
                      </ListItem>
                      {
                        (isOpen || isOpenFixed) &&
                          menu.sub.map((submenu: IMenu) => (
                            <ListItem
                              key={submenu.key}
                              button
                              className={classes.tabListItem}
                              onClick={() => (_onMoveMenu(submenu.url))}>
                                <Typography
                                  align="center"
                                  variant="subtitle2"
                                  display="block">
                                    {submenu.title}
                                </Typography>
                            </ListItem>
                          ))
                      }
                    </List>
                </Grid>
              );
            })
          }
          <Grid
            item
            sm={1}
            className={classes.menuTab}>
            {
              isOpenFixed ?
                <IconButton
                  onClick={_onListItemClose}>
                  <ExpandLessIcon/>
                </IconButton>
              :
                <IconButton
                  onClick={_onListItemOpen}>
                  <ExpandMoreIcon/>
                </IconButton>
            }
          </Grid>
        </Grid>
      </Box>
      <Divider/>
    </React.Fragment>
  );
}
