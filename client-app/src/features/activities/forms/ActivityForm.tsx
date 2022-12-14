import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";


const ActivityForm = () => {
  const { activitystore } = useStore();
  const navigate = useNavigate();
  const { selectedActivity, createActivity, updateActivity,
    loadActivity,
    loading,
    loadingIntial,
  } = activitystore;
  const { id } = useParams();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect( () => {
    if(id) {
        loadActivity(id).then( (activity) => {
            setActivity(activity!);            
        });
    }
  }, [id, loadActivity]);

  const handleSubmit = () => {
    if(!activity.id) {
        activity.id = uuid();
        createActivity(activity).then( () => { navigate(`/activities/${activity.id}`)});
    } else {
        updateActivity(activity).then( () => { navigate(`/activities/${activity.id}`)});
    }    
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if(loadingIntial) return <LoadingComponent content="Loading ..."></LoadingComponent>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        ></Form.Input>
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        ></Form.Input>
        <Button
          loading={activitystore.loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);