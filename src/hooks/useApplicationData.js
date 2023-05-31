import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        setState((prev) => ({ ...prev, appointments }));
        console.log("saving", res);
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
