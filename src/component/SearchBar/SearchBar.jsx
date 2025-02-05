import toast from "react-hot-toast";

const SearchBar = () => {



    const handleSubmit =(e)=>{
        e.preventDefault()
        const searchQuery = e.target.query.value

        if(!searchQuery){
            return toast.error("the search field is empty😖")
        }else {
            console.log("Searching for:", searchQuery);
          }

    e.target.reset()
        
    }





  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input type="text" 
          autoComplete='off'
          autoFocus
          placeholder="Search images and photos"
          name="query"
          />
          <button type="submit" >Search</button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
