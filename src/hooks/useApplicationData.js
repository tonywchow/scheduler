import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  //user creates appointment
  //using axios sends data to api URL
  //on success: response from api server
  //calculate number of spots from response (function)
  //on error: console.log(error)/transition(ERROR_SAVE)

  //how to calculate the number of spots:
  //parameters Obj
  //let space = 0;
  //state.day === day.name
  //dayArr = day.appointments  //Array
  //for(let appointmentID of dayArr) {
  //if(appointments[appointmentID].interview === null) {
  //space += 1
  //return space;
  //let appointment = { ...appointment, appointment.interview}

  function updateSpot(obj) {
    let space = 0;
    let dayArr = [];
    //grabbing the array of appointment IDs if it equal to day selected
    for (let day of state.days) {
      if (day.name === state.day) {
        dayArr = day.appointments;
      }
    }
    for (let appointmentID of dayArr) {
      if (obj[appointmentID].interview === null) {
        space += 1;
      }
    }
    return space;
  }

  let dayObjectID = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  };


  const apiURLS = {
    GET_DAYS: "http://localhost:8001/api/days",
    GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
    GET_INTERVIEWERS: "http://localhost:8001/api/interviewers",
  };
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState((prev) => {
          let newState = { ...prev };
          newState.appointments[id] = appointment;
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

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        // setSpots(spots + 1);
        // let spotRefresh = updateSpots(1);
        setState((prev) => ({ ...prev, appointments }));
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
