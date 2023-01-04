import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile
}

const ProfileCard = ({profile}: Props) => {
    return (
        <Card as={Link} to={`/profiles/${profile.userName}`} >
            <Image src={profile.image || '/assets/user.png' }></Image>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>Bio goes here</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"></Icon>
                {profile.followersCount} followers
            </Card.Content>
            <FollowButton profile={profile}></FollowButton>
        </Card>
    );
};

export default observer(ProfileCard);