const Course = ({ course }: { course: any }) => {
  return (
    <div
      key={course.id}
      className="course"
      style={{ backgroundColor: course.bgColor }}
    >
      <img src={course.image} alt="картинка для курса" />
      <span>{course.name}</span>
    </div>
  );
};

export default Course;
