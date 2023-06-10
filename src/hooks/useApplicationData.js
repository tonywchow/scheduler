import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const dayObjectID = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  };

  function updateSpot(obj) {
    let space = 0;
    let dayArr = [];
    //grabbing the array of appointment IDs if it equal to day selected
    for (let day of state.days) {
      if (day.name === state.day) {
        dayArr = day.appointments;
      }
    }
    //Looping through the appointment ID array and confirming if the key value pair in appointments is null
    for (let appointmentID of dayArr) {
      if (obj[appointmentID].interview === null) {
        space += 1;
      }
    }
    return space;
  }

  const apiURLS = {
    GET_DAYS: "/api/days",
    GET_APPOINTMENTS: "/api/appointments",
    GET_INTERVIEWERS: "/api/interviewers",
  };
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      // setState((prev) => {
      //   //Creating a clone of the latest state and updating values
      //   let newState = { ...prev };
      //   newState.appointments[id] = appointment;
      //   newState.days[dayObjectID[state.day]].spots = updateSpot(
      //     newState.appointments
      //   );
      //   return newState;
      // });
      setState((prev) => {
        //Creating a clone of the latest state and updating values
        let newState = { ...prev };
        newState.appointments = appointments;
        newState.days[dayObjectID[state.day]].spots = updateSpot(
          newState.appointments
        );
        return newState;
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState((prev) => {
        //Creating a clone of the latest state and updating values
        let newState = { ...prev };
        newState.appointments = appointments;
        newState.days[dayObjectID[state.day]].spots = updateSpot(
          newState.appointments
        );
        return newState;
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(apiURLS.GET_DAYS),
      axios.get(apiURLS.GET_APPOINTMENTS),
      axios.get(apiURLS.GET_INTERVIEWERS),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [apiURLS.GET_DAYS, apiURLS.GET_APPOINTMENTS, apiURLS.GET_INTERVIEWERS]);

  return { bookInterview, cancelInterview, state, setDay };
};

export default useApplicationData;
