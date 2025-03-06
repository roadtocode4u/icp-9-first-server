import cors from "cors";
import express from "express";

import {
  deleteStudentsById,
  getHealth,
  getStudents,
  getStudentsSearch,
  patchStudentsCityById,
  postStudents,
  putStudentsById,
  getStudentsById,
} from "./controllers/student.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

app.get("/health", getHealth);
app.get("/students", getStudents);
app.post("/students", postStudents);
app.delete("/students/:id", deleteStudentsById);
app.get("/students/:id", getStudentsById);
app.put("/students/:id", putStudentsById);
app.patch("/students/city/:id", patchStudentsCityById);
app.get("/students/search", getStudentsSearch);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
