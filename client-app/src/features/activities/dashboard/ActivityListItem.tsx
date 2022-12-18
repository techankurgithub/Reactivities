import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}

const ActivityListItem = ({ activity } : Props) => {
    const [target, setTarget] = useState("");
    const { activitystore } = useStore();
    const { deleteActivity, loading } = activitystore;  

    const handleActivityDelete = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: string
      ) => {
        setTarget(e.currentTarget.value);
        deleteActivity(id);
      };

    return (
       <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size="tiny" circular src='/assets/user.png'></Item.Image>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}                        
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name="clock"></Icon> {activity.date}
                <Icon name="marker"></Icon> {activity.venue}
            </span>
        </Segment>
        <Segment secondary>
            Attendees go here
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content='View'></Button>
        </Segment>
       </Segment.Group>
    );
};

export default ActivityListItem;