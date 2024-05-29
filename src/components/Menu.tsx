const Menu = ({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: string[];
  selectedTag: string;
  setSelectedTag: any;
}) => {
  return (
    <ul>
      <li
        onClick={() => {
          setSelectedTag("");
        }}
        {...(!selectedTag && { className: "selected" })}
      >
        Все темы
      </li>
      {tags.map((tag: string) => (
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
  );
};

export default Menu;
