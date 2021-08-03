import {
    Button,
    Container,
    Grid,
    Paper, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateStudents from "../components/Create";
import DeleteStudents from "../components/Delete";

const Students = () => {
    const [button, setButton] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    section: "",
    presentDay: "",
  });
  //   db data store
  const [dbData, setDbData] = useState([]);
  //   db data fetching hooks
  const dbFetchingData = () => {
    axios.get(`http://localhost:4000/api/students`).then((res) => {
      setDbData(res.data);
    });
  };
  useEffect(() => {
    dbFetchingData();
  }, []);
  //   form data handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //   form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateStudents(formData, dbFetchingData);
    setFormData({
      name: "",
      age: "",
      section: "",
      presentDay: "",
    });
    setButton(false)
  };
  //   item delete handler
  const handleDelete = (id) => {
    DeleteStudents(id, dbFetchingData);
  };
  //   item edit handler
  const handleEdit = (id) => {
    const data = dbData.find((d) => d._id === id);
    setFormData({
      name: data.name,
      age: data.age,
      section: data.section,
      presentDay: data.presentDay,
      id: data._id,
    });
    setButton(true)
  };
  return (
    <div>
      <Container>
        <Grid>
          <Paper>
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Students ID Card Make
            </Typography>
          </Paper>
        </Grid>
        <Grid style={{ marginTop: "20px" }}>
          <Paper style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label="Enter your name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="number"
                label="Enter your age"
                variant="outlined"
                name="age"
                value={formData.age}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="number"
                label="Enter Your class"
                variant="outlined"
                name="section"
                value={formData.section}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <TextField
                type="number"
                label="Present days per month"
                variant="outlined"
                name="presentDay"
                value={formData.presentDay}
                onChange={handleChange}
                style={{ marginRight: "8px", marginBottom: "8px" }}
              />
              <Button
                type="submit"
                style={{ fontSize: "18px", padding: "12px" }}
                variant="contained"
                color="primary"
                id="button"
              >
                {button ? "Update" : "Submit"}
              </Button>
            </form>
          </Paper>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Age
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Class
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Present Days
                </TableCell>
                <TableCell
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dbData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {data.name}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {data.age}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {data.class}
                  </TableCell>
                  <TableCell
                    style={{ fontSize: "16px", fontWeight: "500" }}
                    align="center"
                  >
                    {data.presentDay}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(data._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(data._id)}
                      variant="contained"
                      color="primary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Students;
