import React, { Fragment, useEffect } from "react";
import NavBar from "./layout/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./layout/LoadingComponent";
import { useStore } from "./stores/store";
import { observer } from "mobx-react-lite";

function App() {
  //const [activities, setActivities] = useState<Activity[]>([]);
  //const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  //const [editMode, setEditMode] = useState(false);
  //const [loading, setLoading] = useState(true);
  //const [submitting, setSubmitting] = useState(false);
  const { activitystore } = useStore();

  useEffect(() => {
    activitystore.loadActivities();
    // axios
    //   .get<Activity[]>("http://localhost:5000/api/activities")
    //   .then((response) => {
    //     setActivities(response.data);
    //   });
      // agent.Activities.list()
      // .then((response) => {
      //   const activities: Activity[] = [];
      //   response.forEach( activity => {
      //     activity.date = activity.date.split('T')[0];
      //     activities.push(activity);
      //   })
      //   setActivities(activities);
      //   setLoading(false);
      // });      
  }, [activitystore]);

  if(activitystore.loadingIntial){
    return <LoadingComponent content="Loading..."></LoadingComponent>
  }

  return (
    <Fragment>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default observer(App);
