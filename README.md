# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Final Product

### Homepage

!["Screenshot of Homepage"](./public/images/homepage.png)

### Selecting Days

!["GIF of Selecting Days"](./public/images/SelectingDays.gif)

### Creating New Appointment

!["GIF of Creating Appointment"](./public/images/Saving.gif)

### Editing Appointment

!["GIF of Editing Appointment"](./public/images/Editing.gif)

### Deleting Appointment

!["GIF of Deleting Appointment"](./public/images/Deleting.gif)

### Error Handling

!["GIF of Error Saving"](./public/images/eNew.gif)

!["GIF of Error Deleting"](./public/images/eDelete.gif)

!["GIF of Error Deleting"](./public/images/eEdit.gif)

## Setup

Install dependencies with `npm install`.

## Instructions

- Run scheduler-api in it's project folder

```sh
npm start
```

- Run scheduler in it's project folder

```sh
npm start
```

## Dependencies

- axios
- classnames
- normalize.css
- React
- React-dom
- React-scripts
