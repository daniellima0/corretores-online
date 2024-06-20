import { styled } from "@mui/material/styles";
import defaultBanner from "@/assets/default-banner.png";
import SocialMediaInfo from "@/components/SocialMediaInfo";
import RoundedButton from "@/components/RoundedButton";
import { Avatar, FormControlLabel, Switch, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useTheme } from "@mui/material";
import { UserTypeContext } from "@/App";
import { useParams } from "react-router-dom";

const Container = styled("div")`
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0px 120px;

  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;

const FirstSection = styled("section")`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.customPallete.grey};
`;

const ImagesContainer = styled("div")`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Banner = styled("img")`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProfilePictureWrapper = styled("div")`
  position: absolute;
  bottom: -80px;
  left: 30px;
`;

const TextContainer = styled("div")`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 7fr 2fr;
  padding: 0 32px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-rows: 1fr 1fr 200px;
    grid-template-columns: 1fr;
  }
`;

const Header = styled("div")``;

const Name = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.semiBold};
  font-size: 2.2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RegionsInfo = styled("div")`
  grid-row: 2;
  align-self: center;
`;

const QRCodeWrapper = styled("div")`
  width: "50px";
  height: "50px";
  position: absolute;
  margin-right: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const RegionsTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.semiBold};
  font-size: 1.2rem;
`;

const RegionsList = styled(Typography)``;

const SocialMediaInfoWrapper = styled("div")`
  grid-row: span 2;
  grid-column: 2;
  padding: 0 20px;
  border-left: 1px solid ${({ theme }) => theme.customPallete.grey};
  padding-left: 40px;

  @media (max-width: 768px) {
    border-top: 1px solid ${({ theme }) => theme.customPallete.grey};
    grid-row: 3/3;
    grid-column: 1;
    border-left: none;
    padding: 0;
  }
`;

const CreciNameContainer = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 70px;
  align-items: center;
`;

const SecondSection = styled(FirstSection)`
  padding: 32px;
`;

const AboutMeTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.semiBold};
  font-size: 1.2rem;
`;

const Description = styled(Typography)``;

interface RealtorInfoProps {
  loggedUserId: string;
}

const RealtorInfo: React.FC<RealtorInfoProps> = (props) => {
  const { userType } = useContext(UserTypeContext);

  const theme = useTheme();

  const params = useParams();

  const url = "http://localhost:8080/realtors/" + params.user_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();

        setProfileData(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [profileData, setProfileData] = useState({
    real_id: "",
    creci: "",
    uf: "",
    is_online: false,
    description: "",
    user: {
      user_id: "",
      name: "",
      cpf: "",
      email: "",
      date_of_birth: "",
      telephone: { DDD: "", number: "" },
    },
    realtor_location: { latitude: "0", longitude: "0" },
    regions: "",
    realtor_instagram: "",
    realtor_facebook: "",
    realtor_whatsapp: "",
  });

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${profileData.user.telephone.DDD}${profileData.user.telephone.number}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      is_online: checked,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocationAndStatus(checked, latitude, longitude);
      },
      () => {
        setProfileData((prevProfileData) => ({
          ...prevProfileData,
          is_online: !checked,
        }));

        alert("Compartilhe sua localização para ficar online");
      }
    );
  };

  const updateLocationAndStatus = (
    isOnline: boolean,
    latitude: number,
    longitude: number
  ) => {
    fetch(
      `http://localhost:8080/realtors/set_location/${profileData.user.user_id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: Number(latitude),
          longitude: Number(longitude),
        }),
      }
    )
      .then(() => {
        fetch(
          `http://localhost:8080/realtors/set_status/${profileData.user.user_id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              is_online: isOnline,
            }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch. Status: ${response.status}`);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <FirstSection>
        <ImagesContainer>
          <QRCodeWrapper>
            <QRCode
              style={{ height: "120px", width: "120px" }}
              value={`http://localhost:5173/profile/${params.user_id}`}
            />
          </QRCodeWrapper>
          <Banner src={defaultBanner} />
          <ProfilePictureWrapper>
            <Avatar
              alt={profileData.user.name}
              src="/static/images/avatar/1.jpg"
              sx={{
                width: "160px",
                height: "160px",
                borderColor: "white",
                borderWidth: "4px",
                fontSize: "70px",
              }}
            />
          </ProfilePictureWrapper>
        </ImagesContainer>
        <TextContainer>
          <Header>
            <CreciNameContainer>
              <Name variant="h2">{profileData.user.name}</Name>
              <Description variant="body1">{`(${profileData.creci}, ${profileData.uf})`}</Description>
            </CreciNameContainer>

            <FormControlLabel
              control={
                <Switch
                  disabled={
                    userType === "realtor" &&
                    props.loggedUserId == params.user_id
                      ? false
                      : true
                  }
                  checked={profileData.is_online}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  size="medium"
                  color="success"
                />
              }
              label={profileData.is_online ? "Online" : "Offline"}
              labelPlacement="end"
            />
          </Header>
          <RegionsInfo>
            <RegionsTitle variant="h2">Regiōes de atuação</RegionsTitle>
            <RegionsList variant="body1">{profileData.regions}</RegionsList>
          </RegionsInfo>
          <SocialMediaInfoWrapper>
            <SocialMediaInfo realtorData={profileData} />
          </SocialMediaInfoWrapper>
        </TextContainer>
      </FirstSection>
      <SecondSection>
        <AboutMeTitle variant="h2">Sobre Mim</AboutMeTitle>
        <Description variant="body1">{profileData.description}</Description>
      </SecondSection>
      <RoundedButton
        buttonColor={userType == "realtor" ? theme.customPallete.realtor : ""}
        onClick={handleClick}
      >
        Quero entrar em contato
      </RoundedButton>
    </Container>
  );
};

export default RealtorInfo;
