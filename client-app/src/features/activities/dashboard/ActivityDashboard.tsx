import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

const ActivityDashboard = () => {
  const { activitystore } = useStore();
  const { selectedActivity, editMode} = activitystore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails></ActivityDetails>
        )}
        {editMode && 
        <ActivityForm></ActivityForm> }
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
