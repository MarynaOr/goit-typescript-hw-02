import ImageCard from "./ImageCard";

const ImageGallery = ({ images, openModal }) => {
  const uniqueImages = images.filter(
    (image, index, self) =>
      index === self.findIndex((img) => img.id === image.id)
  );

  return (
    <ul>
      {uniqueImages.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
