// import PropTypes from 'prop-types';
import { useAppContext } from '../../services/app-context';
import { LoadMoreButton } from './Button.styled';

export const Button = () => {
  const { loadMoreClick } = useAppContext();
  return (
    <LoadMoreButton type="button" onClick={loadMoreClick}>
      Load more
    </LoadMoreButton>
  );
};