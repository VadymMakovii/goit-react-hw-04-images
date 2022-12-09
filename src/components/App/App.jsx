import { useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { AppContext } from '../../services/app-context';

export const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');

  const formSubmitHandler = newQuery => {
    if (query === newQuery) {
      return toast.info(
        'Please enter a new request or continue browsing current images'
      );
    }
    setPage(1);
    setImages([]);
    setQuery(newQuery);
  };

  const loadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getNewImages = useCallback(newImages => {
    setImages(prevImages => [...prevImages, ...newImages]);
  }, []);

  const { Provider } = AppContext;

  return (
    <Provider value={{ loadMoreClick }}>
      <Container>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery
          query={query}
          page={page}
          images={images}
          onFetchImages={getNewImages}
        />
        <ToastContainer
          position="top-left"
          autoClose={1000}
          theme="colored"
          pauseOnHover={true}
        />
      </Container>
    </Provider>
  );
};
