import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { toDoState } from './atoms';
import { darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
  /* reset */ 
  * {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  input,
  textarea,
  select {
    display: block;
    border-radius: 0;
    outline: none;
  }
  body,
  button,
  html,
  input,
  td,
  th {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-font-kerning: auto;
    font-kerning: auto;
  }
  fieldset {
    border: none;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
  img {
    vertical-align: middle;
    border: none;
  }
  img,
  video {
    max-width: 100%;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: normal;
  }
  address,
  em,
  i {
    font-style: normal;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  /* style */
  #root {
  white-space: pre-line;
  }
  html {
    font-size: 16px;
  }
  body {
    font: 1rem/1.6 'Source Sans Pro', 'Malgun Gothic', sans-serif;
    width: 100vw;
    overflow-x: hidden;
    background-color: ${props => props.theme.bgColor};
    color: black;
    line-height: 1.2;
  }
  button {
    cursor: pointer;
    font: 1rem/1.6 'Source Sans Pro', 'Malgun Gothic', sans-serif;
    outline: none;
    border: none;
    background-color: #DC54DC;
    border-radius: 4px;
    padding: 0 .4em;
    margin: .1em;
  } 
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
`;

const Board = styled.ul`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${props => props.theme.boarderColor};
`;

const Card = styled.li`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination }: any) => {
    console.log(destination.index);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {magic => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index} key={index}>
                      {magic => (
                        <Card ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
