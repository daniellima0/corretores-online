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
import { useNavigate } from "react-router-dom";
import { RealtorType } from "@/types/RealtorType";

function renderRow(
  item: RealtorType,
  setSearchMapCenter: (position: { lat: number; lng: number }) => void,
  navigator: any
) {
  const handleListItemClick = () => {
    navigator(`/profile/${item.user.user_id}`);

    // setSearchMapCenter({
    //   lat: Number(item.realtor_location.latitude),
    //   lng: Number(item.realtor_location.longitude),
    // });
  };

  return (
    <ListItem
      key={item.real_id}
      alignItems="flex-start"
      component="div"
      disablePadding
    >
      <ListItemButton sx={{ height: "100%" }} onClick={handleListItemClick}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#FF5E00" }} alt={item.user.name} src="" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component={"span"}
                variant="h5"
                color="text.primary"
              >
                {item.user.name}
              </Typography>
            </>
          }
          secondary={<>Visitar perfil</>}
        />
      </ListItemButton>
    </ListItem>
  );
}

interface BrokerListProps {
  data: RealtorType[];
  setSearchMapCenter: (position: { lat: number; lng: number }) => void;
}

export default function BrokerList({
  data,
  setSearchMapCenter,
}: BrokerListProps) {
  const navigator = useNavigate();

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
          {data && data.length != 0
            ? data.length > 1
              ? `Foram encontrados ${data.length} corretores nessa área:`
              : `Foi encontrado ${data.length} corretor nessa área:`
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
          {data &&
            data.map((item) => renderRow(item, setSearchMapCenter, navigator))}
        </div>
      </div>
    </ListBox>
  );
}
