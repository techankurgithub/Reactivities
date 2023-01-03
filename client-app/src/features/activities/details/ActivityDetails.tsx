import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

const ActivityDetails = () => {
  const { activitystore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activitystore;
  const { id } = useParams();

  useEffect( () => {
    if(id){
      loadActivity(id);
    }
    return () => clearSelectedActivity();
  }, [id, loadActivity, clearSelectedActivity]);

  if(loadingInitial || !activity) return <LoadingComponent content="loading..."/>;  

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityDetailedHeader activity={activity}></ActivityDetailedHeader>
        <ActivityDetailedInfo activity={activity}></ActivityDetailedInfo>
        <ActivityDetailedChat activityId={activity.id}></ActivityDetailedChat>
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityDetailedSideBar activity={activity}></ActivityDetailedSideBar>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
