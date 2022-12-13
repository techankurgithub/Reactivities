import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./layout/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { Activity } from "./models/activity";
import { v4 as uuid } from "uuid";
import agent from "./api/agent";
import LoadingComponent from "./layout/LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id): handleCancelSelectActivity() ;
    setEditMode(true);
  };
  const handleFormClose = () => {    
    setEditMode(false);
  };
  const handleEditOrCreateActivity = (activity: Activity) => {
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then( () => {
        setActivities([...activities.filter(item => item.id !== activity.id), activity])
      setEditMode(false);
      setSelectedActivity(activity);        
      setSubmitting(false);
      });
      
    } else {      
      activity.id = uuid();
      agent.Activities.create(activity).then( () => {
        setActivities([...activities, activity]);  
      setEditMode(false);
      setSelectedActivity(activity);        
      setSubmitting(false);
      });      
    }       
  };
  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then( () => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
    
  };

  useEffect(() => {
    // axios
    //   .get<Activity[]>("http://localhost:5000/api/activities")
    //   .then((response) => {
    //     setActivities(response.data);
    //   });
      agent.Activities.list()
      .then((response) => {
        const activities: Activity[] = [];
        response.forEach( activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        })
        setActivities(activities);
        setLoading(false);
      });      
  }, []);

  if(loading){
    return <LoadingComponent content="Loading..."></LoadingComponent>
  }

  return (
    <Fragment>
      <NavBar formOpen={handleFormOpen}></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          editMode={editMode}
          createOrEdit={handleEditOrCreateActivity}
          deleteActivity={handleDeleteActivity}
          submmiting={submitting}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
