import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../../services/pixabay-api';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImageList } from './ImageGallery.styled';

export const ImageGallery = ({ query, page, images, onFetchImages }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);
    setLoadingMore(false);

    async function fetchImages() {
      try {
        const response = await getImages(query, page);
        response.hits.length < 1 &&
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );

        const results = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        onFetchImages(results);
        response.hits.length < response.total && setLoadingMore(true);
      } catch (error) {
        toast.error(`${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [onFetchImages, page, query]);

  useLayoutEffect(() => {
    const itemHeight = itemRef.current?.firstElementChild.clientHeight ?? 0;
    if (page > 1 && !loading) {
      window.scrollBy({ top: itemHeight * 2 + 40, behavior: 'smooth' });
    }
  }, [loading, page]);

  return (
    <>
      {images.length > 0 && (
        <ImageList ref={itemRef}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              smallImage={webformatURL}
              largeImage={largeImageURL}
              description={tags}
            />
          ))}
        </ImageList>
      )}
      {loading && <Loader />}
      {loadingMore && <Button />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number.isRequired,
  images: PropTypes.array.isRequired,
  onFetchImages: PropTypes.func.isRequired,
};
