import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core";

import { TournamentStatus } from "constant";
import { TabPanel, TournamentCard } from "components/common";
import { Box } from "components/material-ui";
import { CustomTab, CustomTabs } from "./styles";

import { getTournamentList } from "redux/reducers/tournamentReducer";

export const Tournaments = () => {
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(TournamentStatus.ONGOING);

  const tournamentList = useSelector((state) => state.tournamentReducer.list);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleViewTounamentDetail = (tournament) => {
    history.push(`/tournament/${tournament.id}`);
  };

  useEffect(() => {
    if (!tournamentList.length) dispatch(getTournamentList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      borderRadius={10}
      bgcolor="transparent"
    >
      <CustomTabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="tournaments"
        indicatorColor="secondary"
      >
        <CustomTab
          label="Upcoming"
          value={TournamentStatus.SCHEDULED}
          bgcolor={theme.palette.background.paper}
        />
        <CustomTab
          label="Registered"
          value={TournamentStatus.ONGOING}
          bgcolor={theme.palette.background.paper}
        />
        <CustomTab
          label="Past Events"
          value={TournamentStatus.FINISHED}
          bgcolor={theme.palette.background.paper}
        />
      </CustomTabs>
      {Object.values(TournamentStatus).map((status) => (
        <TabPanel
          value={tabValue}
          index={status}
          key={status}
          p={5}
          bgcolor={theme.palette.background.paper}
          borderRadius="10px"
        >
          {tournamentList
            .filter((tournament) => tournament.state === status)
            .map((tournament) => (
              <Box
                width="100%"
                bgcolor="#15375C"
                p={5}
                mb={5}
                borderRadius={10}
                key={tournament.id}
              >
                <TournamentCard
                  tournament={tournament}
                  onViewDetails={handleViewTounamentDetail}
                />
              </Box>
            ))}
        </TabPanel>
      ))}
    </Box>
  );
};
