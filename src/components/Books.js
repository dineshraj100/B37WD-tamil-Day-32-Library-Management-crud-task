import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import './../App.css';
import CardBooks from './CardBooks';

function Books(props) {
  useEffect(() => {
    props.addbooks();
  }, []);
  if (props.books.length != 0) {
    return (
      <div className='Books'>
        {props.books.books.length > 0 ? (
          props.books.books.map((book) => {
            return <CardBooks book={book} />;
          })
        ) : (
          <CircularProgress color='info' size={90} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.Reducers,
});

const mapDispatchToProps = (dispatch) => ({
  addbooks: () => {
    axios
      .get('https://645cec54e01ac61058975602.mockapi.io/books')
      .then((data) => {
        dispatch({ type: 'add', payload: data.data });
      })
      .catch((error) => toast.error('check your internet connection!'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
