import React from "react";
import { nanoid } from "nanoid";

export const ImageGallery = ({ images,loadMore }) => {
  return (<div>
    <ul className="gallery">
      {images.map((image) => (
        <li className="gallery-item" key={nanoid()}>
          <img src={image.webformatURL} alt={image.tags} width="500px"/>
        </li>
      ))}
    </ul>
    <button onClick={loadMore}>Load More</button>
    </div>
  );
};
