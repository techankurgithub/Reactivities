import { ChangeEvent, useEffect, useState } from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form,  } from "formik";
import { values } from "mobx";
import * as Yup from "yup";
import { ErrorMessage } from "formik/dist/ErrorMessage";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";


const ActivityForm = () => {
  const { activitystore } = useStore();
  const navigate = useNavigate();
  const { selectedActivity, createActivity, updateActivity,
    loadActivity,
    loading,
    loadingIntial,
  } = activitystore;
  const { id } = useParams();
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required field"),
    description: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    city: Yup.string().required(),
    category: Yup.string().required(),
    venue: Yup.string().required(),
  });

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: null,
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

  const handleFormSubmit = (activity: Activity) => {
    if(!activity.id) {
        activity.id = uuid();
        createActivity(activity).then( () => { navigate(`/activities/${activity.id}`)});
    } else {
        updateActivity(activity).then( () => { navigate(`/activities/${activity.id}`)});
    }    
  };

  if(loadingIntial) return <LoadingComponent content="Loading ..."></LoadingComponent>

  return (
    <Segment clearing>
      <Header sub color="teal" content="Activity Details"></Header>      
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} 
      onSubmit={values => handleFormSubmit(values)}>
        { ({ handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                  <MyTextInput name="title" placeholder="Title" ></MyTextInput>
                <MyTextArea
                  placeholder="Description"                  
                  name="description"
                  rows={3}
                ></MyTextArea>
                <MySelectInput options={categoryOptions}
                  placeholder="Category"                  
                  name="category"
                ></MySelectInput>
                <MyDateInput placeholderText="Date" showTimeSelect timeCaption="time" dateFormat='MMMM d, yyyy h:mm aa'                  
                  name="date"
                ></MyDateInput>
                <Header sub color="teal" content="Location Details"></Header>
                <MyTextInput
                  placeholder="City"                  
                  name="city"
                ></MyTextInput>
                <MyTextInput
                  placeholder="Venue"                  
                  name="venue"
                ></MyTextInput>
                <Button disabled={!isValid || !dirty || isSubmitting}
                  loading={activitystore.loading}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                ></Button>
                <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"></Button>
              </Form>
        )}
      </Formik>

    </Segment>
  );
};

export default observer(ActivityForm);
