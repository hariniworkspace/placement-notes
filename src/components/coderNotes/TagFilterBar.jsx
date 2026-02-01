const tags = ["All", "Array", "DP", "Binary Search", "Greedy"];

const TagFilterBar = ({ activeTag, setActiveTag }) => {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`px-3 py-1 rounded-full text-sm border
            ${
              activeTag === tag
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilterBar;
