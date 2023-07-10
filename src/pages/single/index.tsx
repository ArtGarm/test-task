import React from 'react';
import { useParams } from 'react-router-dom';

function Index() {
  const { id } = useParams();

  return (
    <div>
      Single
      {' '}
      {id}
    </div>
  );
}

export default Index;
