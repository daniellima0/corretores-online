import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";

type Broker = {
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

function renderRow(
  item: Broker,
  setSearchMapCenter: (position: { lat: number; lng: number }) => void
) {
  const handleListItemClick = () => {
    setSearchMapCenter(item.position);
  };

  return (
    <ListItem
      key={item.id}
      alignItems="flex-start"
      component="div"
      disablePadding
    >
      <ListItemButton sx={{ height: "100%" }} onClick={handleListItemClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#FF5E00" }} alt={item.name} src="a" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component={"span"}
                variant="h5"
                color="text.primary"
              >
                {item.name}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component={"span"}
                variant="h6"
                color="text.primary"
              ></Typography>
              Visitar perfil
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default function BrokerList({
  data,
  setSearchMapCenter,
}: {
  data: Broker[];
  setSearchMapCenter: any;
}) {
  const [localData, setLocalData] = useState<Broker[]>([]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const ListBox = styled(Box)(({ theme }) => ({
    width: "25%",
    height: "fit-parent",
    bgcolor: "background.paper",
    overflow: "hidden",
    boxShadow: "10px 0px 10px -10px rgba(0, 0, 0, 0.2)",
    zIndex: "10",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "85%",
    },
  }));

  return (
    <ListBox>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            padding: "20px",
          }}
        >
          {data.length > 1
            ? `Foram encontrados ${localData.length} corretores nessa área:`
            : data.length === 1
            ? `Foi encontrado ${localData.length} corretor nessa área:`
            : `Não foram encontrados corretores nessa área.`}
        </Typography>

        <div
          id="luca"
          style={{
            overflowY: "auto",
            flexGrow: 1,
            width: "100%",
          }}
        >
          {localData.map((item) => renderRow(item, setSearchMapCenter))}
        </div>
      </div>
    </ListBox>
  );
}
