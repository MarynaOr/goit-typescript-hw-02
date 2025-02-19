const ImageCard = ({ image, openModal }) => {
  return (
    <div className="image-card" onClick={() => openModal(image.urls.full)}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
