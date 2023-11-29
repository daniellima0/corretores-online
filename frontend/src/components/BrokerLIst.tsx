import React, { useEffect, useState } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
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
  props: ListChildComponentProps & { setSearchMapCenter: any }
) {
  const { index, style, data, setSearchMapCenter } = props;
  const item = data[index];

  const handleListItemClick = () => {
    setSearchMapCenter(item.position);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <ListItem
        alignItems="flex-start"
        style={style}
        key={index}
        component="div"
        disablePadding
      >
        <ListItemButton sx={{ height: "100%" }} onClick={handleListItemClick}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#FF5E00" }} alt={item.name} />
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
    </div>
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
    height: "100%",
    bgcolor: "background.paper",
    overflow: "hidden",
    boxShadow: "10px 0px 10px -10px rgba(0, 0, 0, 0.2)",
    zIndex: "10",
    [theme.breakpoints.down("sm")]: {
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
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            padding: "20px",
            boxShadow: "0 1px 10px 0px rgba(0, 0, 0, 0.2)",
            height: "30%",
          }}
        >
          {data.length > 1
            ? `Foram encontrados ${data.length} corretores nessa área:`
            : data.length === 1
            ? `Foi encontrado ${data.length} corretor nessa área:`
            : `Não foram encontrados corretores nessa área.`}
        </Typography>
      </div>

      <FixedSizeList
        height={1000}
        width={""}
        itemSize={100}
        itemCount={data.length}
        itemData={data}
        overscanCount={0}
        style={{
          width: "100%",
          height: "85%",
          overflowX: "hidden",
        }}
      >
        {(props) => renderRow({ ...props, setSearchMapCenter })}
      </FixedSizeList>
    </ListBox>
  );
}
