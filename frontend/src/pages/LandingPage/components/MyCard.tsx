import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const InfoCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  display: "flex",
  minWidth: "160px",
  alignItems: "center",
  justifyContent: "center",
  height: "50%",
  cursor: "pointer",
  "&: hover": { boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.20)" },
  [theme.breakpoints.down("md")]: { height: "50%", scale: "0.8" },
}));

const CardIcon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  paddingBottom: "20px",
  [theme.breakpoints.down("md")]: {},
}));

interface MyCardProps {
  card: {
    icone: string;
    title: string;
    description: string;
  };
}

const MyCard: React.FC<MyCardProps> = (props) => {
  return (
    <InfoCard sx={{ maxWidth: 400 }}>
      <Link
        to="/choose-signup"
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <CardContent>
          <CardIcon>
            <img src={props.card.icone} alt="icon" style={{ width: "150px" }} />
          </CardIcon>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign={"center"}
            fontWeight={900}
            fontSize={"30px"}
          >
            {props.card.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={"center"}
            fontSize={"16px"}
          >
            {props.card.description}
          </Typography>
        </CardContent>
      </Link>
    </InfoCard>
  );
};

export default MyCard;
