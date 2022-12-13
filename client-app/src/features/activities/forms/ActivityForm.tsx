import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    formClose: () => void;
    activity: Activity | undefined;
    createOrEdit: (activity: Activity) => void;
    submmiting: boolean;
}

const ActivityForm = ({formClose, activity: selectedActivity, createOrEdit, submmiting} : Props) => {
    const intialState = selectedActivity ?? {        
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    };
    const [activity, setActivity] = useState(intialState);
    const handleSubmit = () => {
        //console.log(activity);
        createOrEdit(activity);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}></Form.Input>
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}></Form.Input>
                <Button loading={submmiting} floated="right" positive type="submit" content="Submit"></Button>
                <Button onClick={formClose} floated="right" type="button" content="Cancel"></Button>
            </Form>
        </Segment>
    );
};

export default ActivityForm;