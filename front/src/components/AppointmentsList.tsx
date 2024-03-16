// AppointmentsList.js
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENTS_QUERY } from "../graphql/queries"; // Adjust the import path as needed

const AppointmentsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS_QUERY);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error loading appointments: {error.message}</p>;

  return (
    <div>
      <h2>All Appointments</h2>
      <div className="appointments-grid">
        {data.getAllAppointments.map(
          ({
            id,
            patientName,
            patientEmail,
            appointmentDate,
            purpose,
          }: {
            id: string;
            patientName: string;
            patientEmail: string;
            appointmentDate: string;
            purpose: string;
          }) => (
            <div key={id} className="appointment-item">
              <p>
                <strong>Name:</strong> {patientName}
              </p>
              <p>
                <strong>Email:</strong> {patientEmail}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(Number(appointmentDate)).toLocaleDateString()}
              </p>
              <p>
                <strong>Purpose:</strong> {purpose || "Not specified"}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
