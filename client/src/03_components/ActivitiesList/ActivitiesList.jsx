import React from "react";
import { useSelector } from "react-redux";
import Activity from "../Activity/Activity";
import NavBar from "../NavBar/NavBar";
import "./ActivityList.css";

export default function ActivitiesList() {
  const activities = useSelector((state) => state.activities);
  console.log(activities);
  return (
    <div className="activityListContainer">

      <div>
        <NavBar />
      </div>

      <div className="activityCardListContainer">{
      activities?.map((acc) => {
        const countries = acc.Countries.map(country => country.name).join(", ");
          return (
            <div className="activityCardList">
              <Activity
                name={acc.name}
                duration={acc.duration}
                season={acc.season}
                difficulty={acc.difficulty}
                countries={countries}
              />
            </div> 
          )
        })}
      </div>
      
    </div>
  );
}