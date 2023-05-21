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
