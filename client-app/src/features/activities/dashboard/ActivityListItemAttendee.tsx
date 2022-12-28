import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[]
}

const ActivityListItemAttendee = ({attendees} : Props) => {
    return (
        <List horizontal>
            {attendees.map((attendee) => (
                <Popup hoverable key={attendee.userName} trigger={
                    <List.Item key={attendee.userName} as={Link} to={`/profiles/${attendee.userName}`}>
                    <Image circular size="mini" src={attendee.image || "/assets/user.png"}></Image>
                </List.Item>  
                }>
                    <Popup.Content>
                        <ProfileCard profile={attendee}></ProfileCard>
                    </Popup.Content>
                </Popup>          
            ))}
        </List>
    );
};

export default observer(ActivityListItemAttendee);