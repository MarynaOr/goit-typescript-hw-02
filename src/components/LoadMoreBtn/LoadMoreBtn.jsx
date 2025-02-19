const LoadMoreBtn = ({ isLoading, loadMoreImages }) => {
  return (
    <button type="button" onClick={loadMoreImages} disabled={isLoading}>
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};

export default LoadMoreBtn;
