import axios from "axios";

const DeleteStudents = (id, dbFetchingData) => {
  axios
    .delete(`http://localhost:4000/api/students/${id}`)
    .then(() => {
      dbFetchingData();
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    });
};
export default DeleteStudents;
