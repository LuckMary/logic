import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import Menu from "./components/Menu";
import Course from "./components/Course";

import "./App.scss";

interface ICourse {
  id: string;
  name: string;
  image: string;
  bgColor: string;
  tags: string[];
}

function App() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const { data } = await axios.get<ICourse[]>(
        "https://logiclike.com/docs/courses.json"
      );

      setCourses(data);
      setTags([...new Set(data.map((course) => course.tags).flat())]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Menu
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <div className="courses">
        {(selectedTag
          ? courses.filter((item) => item.tags.includes(selectedTag))
          : courses
        ).map((course) => (
          <Course course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
