import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const { activitystore } = useStore();  
  const { loadActivities, activityRegistry} = activitystore;
  
  useEffect(() => {
    if(activityRegistry.size === 0) loadActivities();   
  }, [loadActivities, activityRegistry.size]);

  if(activitystore.loadingIntial){
    return <LoadingComponent content="Loading..."></LoadingComponent>
  }

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
