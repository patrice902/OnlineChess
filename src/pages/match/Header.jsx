import React, { useMemo } from "react";

import { Box } from "@material-ui/core";
import { Button, Typography } from "components/common/SpacedMui";

import { GameStatus } from "constant";

const Header = (props) => {
  const {
    currentMatch,
    gameStatus,
    onOfferDraw,
    onResign,
    onStartGame,
  } = props;
  const headerText = useMemo(
    () =>
      currentMatch
        ? `Round ${currentMatch.round + 1} : ${currentMatch.tournament}`
        : "",
    [currentMatch]
  );
  const subHeaderText = useMemo(
    () =>
      currentMatch
        ? `${currentMatch.players[0].name}(${currentMatch.players[0].ratings.uscf.ratings.rapid.rating}) VS ${currentMatch.players[1].name}(${currentMatch.players[0].ratings.uscf.ratings.rapid.rating})`
        : "",
    [currentMatch]
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100%"
      px={10}
      py={5}
      borderBottom="1px solid rgba(0, 0, 0, 0.2)"
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle1">{headerText}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {subHeaderText}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="flex-start">
        {gameStatus === GameStatus.Ready ? (
          <Button
            variant="contained"
            color="primary"
            onClick={onStartGame}
            size="large"
          >
            Start
          </Button>
        ) : (
          <></>
        )}
        {gameStatus === GameStatus.Started ? (
          <>
            <Button
              variant="contained"
              color="primary"
              size="large"
              mr={3}
              onClick={onOfferDraw}
            >
              Offer Draw
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              mr={3}
              onClick={onResign}
            >
              Resign
            </Button>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Header;
