import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentsList from "./components/AppointmentsList";
import { gql, useMutation } from "@apollo/client";

// Define your GraphQL mutation
const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointment($name: String!, $email: String!, $date: String!) {
    createAppointment(
      patientName: $name
      patientEmail: $email
      appointmentDate: $date
    ) {
      id
      patientName
      patientEmail
      appointmentDate
    }
  }
`;

const App: React.FC = () => {
  const [createAppointment, { data, loading, error }] = useMutation(
    CREATE_APPOINTMENT_MUTATION,
  );

  const handleAppointmentSubmit = async (appointment: {
    name: string;
    email: string;
    date: string;
  }) => {
    try {
      await createAppointment({
        variables: {
          name: appointment.name,
          email: appointment.email,
          date: appointment.date,
        },
      });
      console.log("Appointment booked:", data.createAppointment);
      // Handle success here
    } catch (e) {
      console.error("Error booking appointment:", e);
      // Handle errors here
    }
  };

  return (
    <div className="App">
      <h1>Book an Appointment</h1>
      <AppointmentForm onSubmit={handleAppointmentSubmit} />
      <h1>Appointments</h1>
      <AppointmentsList />
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </div>
  );
};

export default App;
