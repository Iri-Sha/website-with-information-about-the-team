import React from 'react';

const List = (props) => {

  return (
    <ul className={props.className}>
      {props.items.map(props.renderItem)}
    </ul>
  )
}

export default List;