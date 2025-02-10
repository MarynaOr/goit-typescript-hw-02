

const LoadMoreBtn =({ isLoading, setIsLoading, loadMoreImages })=> {

const handleClickMore =() =>{

setIsLoading(true)
loadMoreImages()
}

return(<>

<button  type="button" onClick={handleClickMore} disabled={isLoading} > {isLoading ? "Loading..." : "Load More"}</button>

</>)
}



export default LoadMoreBtn