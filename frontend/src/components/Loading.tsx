import { CircularProgress, styled } from "@mui/material";

const LoadingContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default LoadingSpinner;
