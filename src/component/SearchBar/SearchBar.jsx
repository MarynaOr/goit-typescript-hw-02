import toast from "react-hot-toast";

const SearchBar = ({ setQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.query.value.trim().toLowerCase();

    if (!searchQuery) {
      return toast.error("The search field is empty 😖");
    }
    
    setQuery(searchQuery);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
