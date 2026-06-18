import React, { useState } from 'react';
import {Box,Button,Card,CardContent,Container,Typography,Paper,Stack,} from '@mui/material';
import { RestartAlt as RestartIcon } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

type Player = 'X' | 'O' | null;

interface GameState {board: Player[];isXNext: boolean;winner: Player;isDraw: boolean;}

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const StyledSquare = styled(Paper)<{ isWinner?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-2px);
  }

  ${({ isWinner }) =>
    isWinner &&
    `
    animation: ${bounce} 0.6s ease-in-out;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  `}

  &.empty {
    background: linear-gradient(135deg, #e0e7ff 0%, #f3e7e9 100%);
    color: #cbd5e1;

    &:hover {
      background: linear-gradient(135deg, #c7d2e8 0%, #e8d5de 100%);
    }
  }
`;

const StyledGameBoard = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const StyledGameCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  color: white;
`;

const StyledStatusBox = styled(Box)`
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
`;

const TicTacToe: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    isXNext: true,
    winner: null,
    isDraw: false,
  });

  const calculateWinner = (board: Player[]): Player => {
    const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleSquareClick = (index: number) => {
    if (gameState.board[index] || gameState.winner || gameState.isDraw) {
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.isXNext ? 'X' : 'O';
    const winner = calculateWinner(newBoard);
    const isFull = newBoard.every((square) => square !== null);

    setGameState({
      board: newBoard,
      isXNext: !gameState.isXNext,
      winner,
      isDraw: !winner && isFull,
    });
  };

  const resetGame = () => {
    setGameState({
      board: Array(9).fill(null),
      isXNext: true,
      winner: null,
      isDraw: false,
    });
  };

  const getStatusMessage = () => {
    if (gameState.winner) {
      return `Player ${gameState.winner} Wins!`;
    }
    if (gameState.isDraw) {
      return "It's a Draw!";
    }
    return `Current Player: ${gameState.isXNext ? 'X' : 'O'}`;
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <StyledGameCard>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: 'center',
              mb: 3,
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Tic Tac Toe
          </Typography>

          <StyledStatusBox>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.5rem',
              }}
            >
              {getStatusMessage()}
            </Typography>
          </StyledStatusBox>

          <StyledGameBoard>
            {gameState.board.map((value, index) => (
              <StyledSquare
                key={index}
                elevation={3}
                onClick={() => handleSquareClick(index)}
                className={!value ? 'empty' : ''}
                isWinner={gameState.winner === value}
              >
                {value === 'X' ? 'X' : value === 'O' ? 'O' : ''}
              </StyledSquare>
            ))}
          </StyledGameBoard>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<RestartIcon />}
              onClick={resetGame}
              sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(245, 87, 108, 0.4)',
                },
              }}
            >
              New Game
            </Button>
          </Stack>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 3,
              opacity: 0.9,
            }}
          >
            Click any empty square to play. First to get 3 in a row wins!
          </Typography>
        </CardContent>
      </StyledGameCard>
    </Container>
  );
};

export default TicTacToe;
