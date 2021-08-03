import axios from "axios";

const CreateStudents = (data, dbFetchingData) => {
  axios
    .post(`http://localhost:4000/api/students`, { ...data })
    .then(() => {
      dbFetchingData();
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    });
};
export default CreateStudents;
