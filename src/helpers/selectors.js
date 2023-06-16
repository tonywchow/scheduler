//Function that takes in the state and selected day and returns an array of the appointment objects for the specific day

export function getAppointmentsForDay(state, day) {
  let daysArr = state.days;
  let appointmentArr = [];
  const filterDays = daysArr.filter((item) => item.name === day);
  if (filterDays.length !== 0) {
    filterDays[0].appointments.forEach((ele) => {
      if (state.appointments[ele] !== undefined) {
        appointmentArr.push(state.appointments[ele]);
      }
    });
  }
  return appointmentArr;
}

//Function that takes in state and interview object and returns an object containing the student and interviewer information
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let interviewerObj = {};
  let interviewerID = interview.interviewer;
  if (state.interviewers[interviewerID] !== undefined) {
    interviewerObj = {
      student: interview.student,
      interviewer: state.interviewers[interviewerID],
    };
  }
  return interviewerObj;
}

//Function that takes in the state and selected day and returns an array of the interviewers objects for the specific day

export function getInterviewersForDay(state, day) {
  let daysArr = state.days;
  let interviewersArr = [];
  const filterDays = daysArr.filter((item) => item.name === day);
  if (filterDays.length !== 0) {
    filterDays[0].interviewers.forEach((ele) => {
      if (state.interviewers[ele] !== undefined) {
        interviewersArr.push(state.interviewers[ele]);
      }
    });
  }
  return interviewersArr;
}
