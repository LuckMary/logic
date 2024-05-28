import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [selectedTag, setSelectedTag] = useState<string>();

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
      <ul>
        <li
          onClick={() => {
            setSelectedTag("");
          }}
          {...(!selectedTag && { className: "selected" })}
        >
          Все темы
        </li>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => {
              setSelectedTag(tag);
            }}
            {...(selectedTag === tag && { className: "selected" })}
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="courses">
        {(selectedTag
          ? courses.filter((item) => item.tags.includes(selectedTag))
          : courses
        ).map((course) => (
          <div
            key={course.id}
            className="course"
            style={{ backgroundColor: course.bgColor }}
          >
            <img src={course.image} alt="картинка для курса" />
            <span>{course.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
