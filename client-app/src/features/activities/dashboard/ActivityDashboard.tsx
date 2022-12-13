import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  formOpen: (id: string) => void;
  formClose: () => void;
  editMode: boolean;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submmiting: boolean;
}

const ActivityDashboard = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
  formOpen,
  formClose,
  editMode,
  createOrEdit,
  deleteActivity,
  submmiting
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submmiting}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            formOpen={formOpen}
          ></ActivityDetails>
        )}
        {editMode && 
        <ActivityForm submmiting={submmiting} createOrEdit={createOrEdit} formClose={formClose} activity={selectedActivity}></ActivityForm> }
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
