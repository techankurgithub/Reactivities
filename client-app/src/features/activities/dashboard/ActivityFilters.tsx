import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityFilters = () => {
  const {activitystore: {predicate, setPredicate}} = useStore();

  return (
    <Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters"></Header>
        <Menu.Item 
        content="All Activities"
        active={predicate.has('all')}
        onClick={() => setPredicate('all', 'true')} ></Menu.Item>
        <Menu.Item content="Im going"
        active={predicate.has('isGoing')}
        onClick={() => setPredicate('isGoing', 'true')}></Menu.Item>
        <Menu.Item content="Im hosting"
        active={predicate.has('isHost')}
        onClick={() => setPredicate('isHost', 'true')}></Menu.Item>
      </Menu>
      <Header></Header>
      <Calendar onChange={ (date: any) => setPredicate('startDate', date as Date)}
      value={predicate.get('startDate' || new Date())}></Calendar>
    </Fragment>
  );
};

export default observer(ActivityFilters);
