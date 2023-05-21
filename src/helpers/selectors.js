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
