import express from "express";

const app = express();
app.use(express.json());

const PORT = 5001;

// this is a temporary data store
const STUDENTS = [
  {
    id: 1,
    name: "Akash",
    city: "Amravati",
  },
  {
    id: 2,
    name: "Amit",
    city: "Pune",
  },
];

app.get("/students", (req, res) => {
  res.json({
    sccess: true,
    data: STUDENTS,
    message: "Students fetched successfully",
  });
});

app.post("/students", (req, res) => {
  const { name, city, id } = req.body;

  for (const student of STUDENTS) {
    if (id === student.id) {
      return res.json({
        success: false,
        message: "Student with this id already exists",
      });
    }
  }

  if (!name) {
    return res.json({
      success: false,
      message: "Name is required",
    });
  }

  if (!city) {
    return res.json({
      success: false,
      message: "City is required",
    });
  }

  if (!id) {
    return res.json({
      success: false,
      message: "Id is required",
    });
  }

  const studentObj = {
    id,
    name,
    city,
  };

  STUDENTS.push(studentObj);

  res.json({
    sccess: true,
    data: studentObj,
    message: "Student created successfully",
  });
});

app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  let studentIndex = -1;

  STUDENTS.forEach((stud, i) => {
    if (stud.id == id) {
      studentIndex = i;
    }
  });

  if (studentIndex == -1) {
    return res.json({
      success: false,
      message: `Student with id:${id} does not exist`,
    });
  } else {
    STUDENTS.splice(studentIndex, 1);
    return res.json({
      success: true,
      message: `Student with id:${id} deleted successfully`,
    });
  }
});

app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;

  if (!name) {
    return res.json({
      success: false,
      message: "Name is required",
    });
  }

  if (!city) {
    return res.json({
      success: false,
      message: "City is required",
    });
  }

  let studentIndex = -1;

  STUDENTS.forEach((stud, i) => {
    if (stud.id == id) {
      studentIndex = i;
    }
  });

  if (studentIndex == -1) {
    return res.json({
      success: false,
      message: `Student with id:${id} does not exist`,
    });
  }

  STUDENTS[studentIndex] = {
    id: parseInt(id),
    name: name,
    city: city,
  };

  res.json({
    success: true,
    data: STUDENTS[studentIndex],
    message: `Student with id:${id} updated successfully`,
  });
});

app.patch("/students/city/:id", (req, res) => {
  const { id } = req.params;
  const { city } = req.body;

  if (!city) {
    return res.json({
      success: false,
      message: "City is required",
    });
  }

  let studentIndex = -1;

  STUDENTS.forEach((stud, i) => {
    if (stud.id == id) {
      studentIndex = i;
    }
  });

  if (studentIndex == -1) {
    return res.json({
      success: false,
      message: `Student with id:${id} does not exist`,
    });
  }

  const existingStudent = STUDENTS[studentIndex];

  const updatedStudent = {
    ...existingStudent,
    city,
  };

  STUDENTS[studentIndex] = updatedStudent;

  res.json({
    success: true,
    data: updatedStudent,
    message: `Student with id:${id} updated successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
