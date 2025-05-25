import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../App/App";
interface ImgOpnMdal{
  images: Image[],
  openModal: (imageUrl:string)=> void
}
const ImageGallery:React.FC<ImgOpnMdal> = ({ images, openModal }) => {
  // const uniqueImages = images.filter(
  //   (image, index, self) =>
  //     index === self.findIndex((img) => img.id === image.id)
  // );

  return (
    <ul>
      {images.map((image ) => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
