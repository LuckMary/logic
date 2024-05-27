import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.scss";

function App() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedTag, setSelectedTag] = useState("Все темы");
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: "https://logiclike.com/docs/courses.json",
      });
      setCourses(response.data);
      setSelectedCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const tags = [
    "Все темы",
    "Логика и мышление",
    "Загадки",
    "Головоломки",
    "Путешествия",
  ];

  const rows: any[] = selectedCourses
    .map(
      (course, index) =>
        index % 3 === 0 && selectedCourses.slice(index, index + 3)
    )
    .filter(Boolean);

  return (
    <div className="App">
      <ul>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => {
              setSelectedTag(tag);
              setSelectedCourses(
                tag === "Все темы"
                  ? courses
                  : courses.filter((item) =>
                      item.tags.find((el: any) =>
                        tag === "Путешествия"
                          ? el === "Страны и столицы"
                          : el === tag
                      )
                    )
              );
            }}
            {...(selectedTag === tag && { className: "selected" })}
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="courses">
        <div className="row"> </div>
        {rows.map((row, index) => (
          <div key={index} className="row">
            {row.map((course: any) => (
              <div
                key={course.id}
                className="course"
                style={{ backgroundColor: course.bgColor }}
              >
                <img src={course.image} alt="картинка для курса" />
                <span>{course.name}</span>
              </div>
            ))}
            {/* скрытые блоки курсов */}
            {row.length < 3 && (
              <div className="course" style={{ opacity: 0 }}></div>
            )}
            {row.length < 2 && (
              <div className="course" style={{ opacity: 0 }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
