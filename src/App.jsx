import { Container, Table } from "react-bootstrap";
import "./App.css";
import { useEffect, useState } from "react";
import {
  deleteEmployee,
  editEmployee,
  getBudget,
  getEmployee,
  postEmployee,
} from "./services/allApi";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [attendance, setAttendance] = useState("");
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    getData();
  
    setStrength(
      Math.floor(
        (data.filter((eachData) => eachData.attendance == "Present").length *
          100) /
          data.length
      )
    );
  }, [data]);

  const getData = async () => {
    try {
      let apiResponse = await getEmployee();
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setData(apiResponse.data);
      } else {
        alert("Error Fetching Data");
      }
    } catch (error) {
      alert("Error Fetching Data");
    }
  };



  const onAddClick = async () => {
    let reqBody = {
      empName: name,
      Role: role,
      attendance: attendance,
    };
    let apiResponse = await postEmployee(reqBody);
    console.log(apiResponse);
    if (apiResponse.status == 201) {
      setName("");
      setRole("");
      setAttendance("");
    } else {
      alert("Error while adding details");
    }
  };

  const onDeleteClick = async (id) => {
    let apiResponse = await deleteEmployee(id);
    if (apiResponse.status !== 200) {
      alert("Error while deleting the data");
    }
  };

  const onEditClick = async (id) => {
    let reqBody = {
      empName: name,
      Role: role,
      attendance: attendance,
    };
    let apiResponse = await editEmployee(id, reqBody);
    if (apiResponse.status == 200) {
      setEditMode(false);
      setName("");
      setRole("");
      setAttendance("");
    } else {
      alert("Error occured while editing");
    }
  };

  return (
    <>
      <div style={{ height: "100%" }} className="text-white">
        <div className="glass-card  m-5 d-flex justify-content-center flex-column align-items-center rounded-5 p-5">
          <h1 className="text-center pt-3">Employee App</h1>
          <div className="form d-flex container justify-content-center gap-3 mt-5">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Employee Name"
              className="form-control w-25"
            />
            <input
              type="text"
              placeholder="Enter Employee Role"
              className="form-control w-25"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />

            {editMode ? (
              <>
                <select
                  className="form-select w-25"
                  onChange={(e) => setAttendance(e.target.value)}
                  value={attendance}
                >
                  <option value="">Enter Attendance</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>

                <button
                  onClick={() => onEditClick(editData.id)}
                  className="btn btn-warning"
                >
                  Edit Employee
                </button>
              </>
            ) : (
              <button onClick={onAddClick} className="btn btn-success">
                Add Employee
              </button>
            )}
          </div>
          <Container className="mt-5 w-75">
            <Table
              className="table-dark overflow-hidden rounded"
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Attendace</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-light">
                {data.map((eachData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{eachData.empName}</td>
                    <td>{eachData.Role}</td>
                    <td>{eachData.attendance}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditData(eachData);
                          setEditMode(true);
                          setName(eachData.empName);
                          setRole(eachData.Role);
                          setAttendance(eachData.attendance);
                        }}
                        className="btn btn-warning me-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteClick(eachData.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <div className="container d-flex justify-content-center gap-5 mt-5">
            <div className="hover" style={{ height: "200px", width: "200px" }}>
              <CircularProgressbarWithChildren strokeWidth={5} value={100}>
                <p className="text-center mt-4">
                  Total Employees
                  <br />
                  {data.length}
                </p>
              </CircularProgressbarWithChildren>
            </div>
            <div className="hover" style={{ height: "200px", width: "200px" }}>
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  trailColor: "#ffffffff",
                  pathColor: "#2200ff81",
                })}
                strokeWidth={5}
                value={strength}
              >
                <p className="text-center mt-4">
                  Employee Attendance
                  <br />
                  {strength}%
                </p>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
