import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.li`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
`;

interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  console.log(toDo, 'has been render');

  return (
    <Draggable draggableId={toDo} index={index} key={toDo}>
      {magic => (
        <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
