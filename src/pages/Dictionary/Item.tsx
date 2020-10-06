import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MyInputSearch from 'elements/Input/MyInputSearch';
import IItem from 'interfaces/Dictionary/IItem';

import { useRecoilValue } from 'recoil';
import { SearchValueState } from 'state';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    margin: "auto",
    justifyContent: "space-between",
  },
  tabs: {
    margin: "0 auto",
    justifyContent: "space-between",
  },
  tab: {
    padding: theme.spacing(1),
    flexShrink: 2,
  },
}));

export default function Item() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const searchValue = useRecoilValue(SearchValueState);

  const tabs: Array<IItem> = [
    {
      key: "01",
      title: "전체"
    },
    {
      key: "02",
      title: "목록1"
    },
    {
      key: "03",
      title: "목록2"
    },
  ]

  const _onTabsChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
			<Grid container spacing={3}
        className={classes.tabbar}>
        <Grid item xs={9}>
          <Tabs
            value={value}
            onChange={_onTabsChange}
            indicatorColor="primary"
            textColor="primary">
              {
                tabs.map((tab: IItem) => {
                  return (
                    <Tab
                      key={tab.key}
                      className={classes.tab}
                      label={tab.title}>
                    </Tab>
                  );
                })
              }
          </Tabs>
        </Grid>
        <Grid item xs={3}>
          <MyInputSearch />
        </Grid>
        <Grid item xs={12}>
          현재 검색어 : {searchValue}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}