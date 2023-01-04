import React, { Fragment, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard = () => {
  const { activitystore } = useStore();  
  const { loadActivities, activityRegistry, setPagingParams, pagination} = activitystore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }
  
  useEffect(() => {
    if(activityRegistry.size === 0) loadActivities();   
  }, [loadActivities, activityRegistry.size]);



  return (
    <Grid>
      <Grid.Column width="10">
        {activitystore.loadingInitial && !loadingNext ? (
          <Fragment>
            <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
            <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
          </Fragment>
        ) : (
          <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination &&
            pagination.currentPage < pagination.totalPages } initialLoad={false}>
              <ActivityList></ActivityList>
            </InfiniteScroll>
        ) }

      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}></Loader>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
