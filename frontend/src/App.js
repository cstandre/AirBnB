import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList";
import SpotDetails from "./components/Spots/SpotDetails";
import UserSpots from "./components/Spots/UserSpots";
import CreateSpotFrom from "./components/Spots/CreateSpot";
import EditSpotFrom from "./components/Spots/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotList />
          </Route>
          <Route path='/spots/current'>
            <UserSpots />
          </Route>
          <Route path='/spots/new'>
            <CreateSpotFrom />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <EditSpotFrom />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
