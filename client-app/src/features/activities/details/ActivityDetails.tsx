import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const ActivityDetails = () => {
  const { activitystore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingIntial} = activitystore;
  const { id } = useParams();

  useEffect( () => {
    if(id){
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if(loadingIntial || !activity) return <LoadingComponent content="loading..."/>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content='Edit'></Button>
            <Button as={Link} to={`/activities`} basic color="grey" content='Cancel'></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
