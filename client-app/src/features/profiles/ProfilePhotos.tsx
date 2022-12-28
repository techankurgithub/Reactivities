import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
  const { profileStore: { isCurrentUser, uploadPhoto, uploading, setMainPhoto, loading, deletePhoto }} = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then( () => {
        setAddPhotoMode(false);
    });
  }

  const handleSetMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

  const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon="image" content="Photos"></Header>
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            ></Button>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}></PhotoUploadWidget>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((image) => (
                <Card key={image.id}>
                  <Image src={image.url}></Image>
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                        <Button basic color="green" content='Main' name={'main' + image.id} 
                        disabled={image.isMain} loading={target === 'main' + image.id && loading}
                        onClick={e => handleSetMainPhoto(image, e)} ></Button>
                        <Button basic color="red" icon='trash'
                        loading={target === image.id && loading}
                        onClick={e => handleDeletePhoto(image, e)} disabled={image.isMain} name={image.id}></Button>                        
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
