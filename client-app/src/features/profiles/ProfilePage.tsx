import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile} = profileStore;

    useEffect( () => {
        if(username) loadProfile(username);
    }, [loadProfile, username]);

    if(loadingProfile) return <LoadingComponent content="Loading ..."></LoadingComponent>

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile && <ProfileHeader profile={profile}></ProfileHeader>}
                {profile && <ProfileContent profile={profile}></ProfileContent>}
            </Grid.Column>
        </Grid>
    );
};

export default ProfilePage;