import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Button, Form, Input } from './SearchForm.styled';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchForm = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();
    request.trim() !== ''
      ? onSubmit(request)
      : toast('Please enter your request');
  };

  const handleChangeInput = e => {
    setRequest(e.currentTarget.value);
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Button type="submit" aria-label="Search images">
        <AiOutlineSearch size={20} title="Search" />
      </Button>
      <Input
        onChange={handleChangeInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};