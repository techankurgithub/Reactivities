import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

// interface Props {
//     activity: Activity;
//     cancelSelectActivity: () => void;
//     formOpen: (id: string) => void;
// }

const ActivityDetails = () => {
  const { activitystore } = useStore();
  const { selectedActivity: activity} = activitystore;

  if(!activity) return <LoadingComponent content="loading..."/>;

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
            <Button basic color="blue" content='Edit' onClick={() => activitystore.openForm(activity.id)}></Button>
            <Button basic color="grey" content='Cancel' onClick={activitystore.cancelSelectedActivity}></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
