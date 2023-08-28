import React from 'react';
import Card from './Card';

export default function Cards({ prod }) {
  return prod?.map((obj) => {
    return <Card elem={obj} key={obj.id} />
  })
}
