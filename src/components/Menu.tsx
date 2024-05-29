interface Props {
  tags: string[];
  selectedTag: string;
  setSelectedTag: any;
}

const Menu: React.FC<Props> = ({ tags, selectedTag, setSelectedTag }) => {
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
