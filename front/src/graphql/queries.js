import { gql } from "@apollo/client";

export const GET_ALL_APPOINTMENTS_QUERY = gql`
  query GetAllAppointments {
    getAllAppointments {
      id
      patientName
      patientEmail
      appointmentDate
      purpose
    }
  }
`;
