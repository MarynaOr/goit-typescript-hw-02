import toast from "react-hot-toast";
interface SearchBarProps{
  onSubmit: (newQuery: string) => void
}
const SearchBar:React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('query') as HTMLInputElement

    const searchQuery = input.value.trim().toLowerCase();

    if (!searchQuery) {
      return toast.error("The search field is empty 😖");
    }

    onSubmit(searchQuery); 
    form.reset();
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
