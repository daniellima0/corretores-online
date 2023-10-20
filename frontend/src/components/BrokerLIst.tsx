import React, { useState, useEffect } from "react";
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
            <Avatar alt={item.name} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="h5"
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
                  component="h6"
                  variant="h6"
                  color="text.primary"
                >
                  {item.location.hood},
                </Typography>
                {` ${item.location.street}`}
              </React.Fragment>
            }
          />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default function VirtualizedList() {
  const [data, setData] = useState<
    { name: string; location: { hood: string; street: string } }[]
  >([]);

  useEffect(() => {
    const testData = [
      {
        name: "Bernardo Serravalle",
        location: {
          hood: "Pituba",
          street: "Rua Muito doida",
        },
      },
      {
        name: "Arthur Sant'Anna",
        location: {
          hood: "Itaigara",
          street: "Avenida Principal",
        },
      },
      {
        name: "Giulia Franca",
        location: {
          hood: "Barra",
          street: "Rua Tranquila",
        },
      },
      {
        name: "Bernardo Serravalle",
        location: {
          hood: "Pituba",
          street: "Rua Muito doida",
        },
      },
      {
        name: "Arthur Sant'Anna",
        location: {
          hood: "Itaigara",
          street: "Avenida Principal",
        },
      },
      {
        name: "Giulia Franca",
        location: {
          hood: "Barra",
          street: "Rua Tranquila",
        },
      },
      {
        name: "Bernardo Serravalle",
        location: {
          hood: "Pituba",
          street: "Rua Muito doida",
        },
      },
      {
        name: "Arthur Sant'Anna",
        location: {
          hood: "Itaigara",
          street: "Avenida Principal",
        },
      },
      {
        name: "Giulia Franca",
        location: {
          hood: "Barra",
          street: "Rua Tranquila",
        },
      },
    ];

    setData(testData);
  }, []);

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
