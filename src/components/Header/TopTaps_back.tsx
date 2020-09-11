import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import IMenu from 'interfaces/Common/IMenu';

const useStyles = makeStyles((theme) => ({
  menuTabs: {
    margin: "0 auto",
    justifyContent: "space-between",
  },
  menuTab: {
    padding: theme.spacing(1),
    flexShrink: 2,
  },
  tabListItem: {
    margin: "auto",
    textAlign: "center"
  }
}));

export default function TopTaps() {
  const classes = useStyles();
  
  const [value, setValue] = React.useState(0);
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
    console.log(e.currentTarget);
  }
  const _onTabsLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    _tabsClose();
  }

  const _onListItemOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpenFixed(true);
    _tabsOpen();
  }
  const _onListItemClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpenFixed(false);
    _tabsClose();
  }

  const _onTabsChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    
    console.log(menus.find((menu) => {
      return menu.key === newValue.toString();
    }));
  };
  
  const menus: Array<IMenu> = [
      {
        idx: 0,
        key: "0000100",
        title: "게시판", 
        url: "/#1",
        sub: [
          {
            idx: 0,
            key: "0000101",
            title: "자유게시판",
            url: "/#1/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000102",
            title: "서버게시판",
            url: "/#1/#2",
            sub: []
          },
        ]
      },
      {
        idx: 1,
        key: "0000200",
        title: "계산기", 
        url: "/#2",
        sub: [
          {
            idx: 0,
            key: "0000201",
            title: "전투력 계산기",
            url: "/#2/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000202",
            title: "능력치 계산기",
            url: "/#2/#2",
            sub: []
          },
        ]
      },
      {
        idx: 2,
        key: "0000300",
        title: "도감", 
        url: "/#3",
        sub: [
          {
            idx: 0,
            key: "0000301",
            title: "아이템",
            url: "/#3/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000302",
            title: "환수",
            url: "/#3/#2",
            sub: []
          },
        ]
      },
      {
        idx: 3,
        key: "0000400",
        title: "경매장", 
        url: "/#4",
        sub: [
          {
            idx: 0,
            key: "0000401",
            title: "거래게시판",
            url: "/#4/#1",
            sub: []
          }
        ]
      },
      {
        idx: 4,
        key: "0000500",
        title: "회원시스템", 
        url: "/#5",
        sub: [
          {
            idx: 0,
            key: "0000501",
            title: "질의응답",
            url: "/#5/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000502",
            title: "등급별 보상",
            url: "/#5/#2",
            sub: []
          },
        ]
      },
      {
        idx: 5,
        key: "0000600",
        title: "마이페이지", 
        url: "/#6",
        sub: [
          {
            idx: 0,
            key: "0000601",
            title: "내정보",
            url: "/#6/#1",
            sub: []
          },
          {
            idx: 1,
            key: "0000602",
            title: "아이디 찾기",
            url: "/#6/#2",
            sub: []
          },
          {
            idx: 2,
            key: "0000603",
            title: "패스워드 찾기",
            url: "/#6/#3",
            sub: []
          },
        ]
      },
  ]

  return (
    <React.Fragment>
      <Tabs
        value={false} //{value}
        onChange={_onTabsChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        //centered
        orientation="horizontal"
        className={classes.menuTabs}
        >
      {
        menus.map((menu: IMenu) => {
          return( 
            <div
              key={menu.key}
              id={menu.key}
              onMouseEnter={_onTabsEnter}
              onMouseLeave={_onTabsLeave}>
              <Tab
                value={value}
                className={classes.menuTab}
                label={menu.title}
              />
              {
                (isOpen || isOpenFixed) &&
                  <List>
                    {
                      menu.sub.map((submenu: IMenu) => (
                        <ListItem
                          key={submenu.key}
                          button
                          className={classes.tabListItem}>
                            <Typography
                              align="center"
                              className={classes.tabListItem}
                              variant="subtitle2"
                              display="block">
                                {submenu.title}
                            </Typography>
                        </ListItem>
                      ))
                    }
                  </List>
                }
            </div>
          );
        })
      }
      {
        isOpenFixed ?
          <Box
            key="98"
            onClick={_onListItemClose}>
            <IconButton>
              <ExpandLessIcon/>
            </IconButton>
          </Box>
        : 
          <Box
            key="99"
            onClick={_onListItemOpen}>
            <IconButton>
              <ExpandMoreIcon/>
            </IconButton>
          </Box>
      }
      </Tabs>
      <Divider/>
    </React.Fragment>
  );
}
