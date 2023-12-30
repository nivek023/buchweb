import { useState } from 'react';
import AddNewBookForm from '../form/AddNewBookForm';

const AddNewBook = () => {
  const [addNewBook] = useState();

  return (
    <div>
      <AddNewBookForm addNewBook={addNewBook} />
    </div>
  );
};

export default AddNewBook;
