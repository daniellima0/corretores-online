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
} from "@mui/material";

type Broker = {
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const item = data[index];

  return (
    <div style={{ overflowX: "hidden" }}>
      <ListItem
        alignItems="flex-start"
        style={style}
        key={index}
        component="div"
        disablePadding
      >
        <ListItemButton>
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
                >
                  teste,
                </Typography>
                {` 123`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default function BrokerList({ data }: { data: Broker[] }) {
  const [localData, setLocalData] = useState<Broker[]>([]);

  useEffect(() => {
    console.log("Data prop changed:", data);
    setLocalData(data);
  }, [data]);

  return (
    <Box
      sx={{
        width: "25%",
        height: "100%",
        bgcolor: "background.paper",
        overflow: "hidden",
        boxShadow: "10px 0px 10px -10px rgba(0, 0, 0, 0.2)",
        zIndex: "10",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          padding: "40px",
          boxShadow: "0 1px 10px 0px rgba(0, 0, 0, 0.2)",
          height: "20%",
        }}
      >
        Foram encontrados <strong>{data.length}</strong> corretores nessa área:
      </Typography>

      <FixedSizeList
        height={1000}
        width={""}
        itemSize={100}
        itemCount={data.length}
        itemData={data}
        overscanCount={0}
        style={{
          width: "100%",
          height: "80%",
          overflowX: "hidden",
        }}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
