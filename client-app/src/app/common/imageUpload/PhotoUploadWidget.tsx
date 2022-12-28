import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget = ({loading, uploadPhoto}: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo"></Header>
        <PhotoWidgetDropZone setFiles={setFiles}></PhotoWidgetDropZone>
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize Image"></Header>
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          ></PhotoWidgetCropper>
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload"></Header>
        <Fragment>
          <div
            className="img-preview"
            style={{ minHeight: 200, overflow: "hidden" }}
          ></div>
          {files.length > 0 && (
            <Button.Group widths={2}>
              <Button loading={loading} onClick={onCrop} positive icon="check"></Button>
              <Button disabled={loading}  onClick={() => setFiles([])} icon="close"></Button>
            </Button.Group>
          )}
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PhotoUploadWidget);
