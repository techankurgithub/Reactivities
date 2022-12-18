import React, { Fragment } from "react";
import { Calendar } from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  return (
    <Fragment>
      <Menu size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header icon="filter" attached color="teal" content="Filters"></Header>
        <Menu.Item content="All Activities"></Menu.Item>
        <Menu.Item content="Im going"></Menu.Item>
        <Menu.Item content="Im hosting"></Menu.Item>
      </Menu>
      <Header></Header>
      <Calendar></Calendar>
    </Fragment>
  );
};

export default ActivityFilters;
