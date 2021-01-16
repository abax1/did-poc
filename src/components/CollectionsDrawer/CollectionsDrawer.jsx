import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Drawer, Classes, Position } from "@blueprintjs/core";
import WorldMap from "../Maps/WorldMap";
import { getJobById, getCollections } from "../../actions/actionCreators";



function CollectionsDrawer({
  theme,
  setCollectionsDrawerState,
  collectionsDrawerState,
  collectionIsLoading,
  getCollection,
  collection,
  getJob,
  job
}) {
  const [jobDrawerState, setJobDrawerState] = useState({
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    size: "30vw",
    usePortal: true,
    title: "Job",
    data: {},
  });
  const [jobIsLoading, setJobIsLoading] = useState(false);

  useEffect(() => {
    //getCollection(()=>{}, ()=>{}, collectionsDrawerState.collectionId)
  }, []);

  return (
    <>
      <Drawer
        className={theme}
        {...collectionsDrawerState}
        onClose={() =>
          setCollectionsDrawerState({
            ...collectionsDrawerState,
            isOpen: false,
          })
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <div>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collection Id: </b>
                {collection.Collection_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Id: </b>
                {collection.Driver_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Restaurant Id: </b>
                {collection.Restaurant_id}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Collected: </b>
                {collection.Oil_collected}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Measurement Unit: </b>
                {collection.Measurement_unit}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Oil Type: </b>
                {collection.Oil_type}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Owner: </b>
                {collection.Owner}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Asset Type: </b>
                {collection.AssetType}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Location: </b>
                {collection.Driver_longitude} {collection.Driver_lattitude}
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job ID: </b>
                <Button
                  style={{ zIndex: "1" }}
                  id={collection.Job_id}
                  onClick={() => {
                    setJobDrawerState({ ...jobDrawerState, isOpen: true });
                    setJobIsLoading(true);
                    getJob(() => {
                      setJobIsLoading(false);
                    }, collection.Job_id);
                  }}
                  minimal
                  intent="success"
                >
                  {collection.Job_id}
                </Button>
              </p>
              <p className={collectionIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Timestamp: </b>
                {collection.Datetime}
              </p>
            </div>
            <div
              style={{ marginTop: "4rem", zIndex: "-1", paddingTop: "100px" }}
            >
              {!collectionIsLoading && (
                <WorldMap
                  scale={100}
                  lat={collection.Driver_lattitude}
                  long={collection.Driver_longitude}
                />
              )}
            </div>
          </div>
        </div>
      </Drawer>
      <Drawer
        className={theme}
        {...jobDrawerState}
        onClose={() =>
          setJobDrawerState({
            ...jobDrawerState,
            isOpen: false,
          })
        }
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <div>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Id: </b>
                {job.length > 0 && job[0].job_id}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Driver Id: </b>
                {job.length > 0 && job[0].assigneddriverid}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Assigned: </b>
                {job.length > 0 && job[0].collection_assigned}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collected: </b>
                {job.length > 0 && job[0].collection_completed}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Measurement Unit: </b>
                {job.length > 0 && job[0].job_measurement_unit}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Date: </b>
                {job.length > 0 && job[0].job_date}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Sign: </b>
                {job.length > 0 && job[0].job_sign}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Status: </b>
                {job.length > 0 && job[0].job_status}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Job Sign Date: </b>
                {job.length > 0 && job[0].job_sign_date}
              </p>
              <p className={jobIsLoading === true ? "bp3-skeleton" : ""}>
                <b>Collection Target: </b>
                {job.length > 0 && job[0].job_collection_target}
              </p>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    collection: state.mainReducer.collections,
    job: state.mainReducer.jobs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCollection: (callback, displayToast, collectionId) =>
      getCollections(callback, displayToast, collectionId, dispatch),
    getJob: (callback, jobId) => getJobById(callback, jobId, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsDrawer);
