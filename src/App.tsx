import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { toDoState } from './atoms';
import { darkTheme } from './theme';

import Board from './Components/Board';

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
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setToDos(allBoards => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
