import { styled } from "@mui/material/styles/";
import { Avatar, Typography } from "@mui/material";
import RoundedButton from "../../../components/RoundedButton";
import InputGroup from "./InputGroup";
import { useContext, useEffect, useState } from "react";
import { UserTypeContext } from "../../../App";
import LoadingSpinner from "../../../components/Loading";
import HiddenComponent from "../../../components/HiddenComponent";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 40px;
  margin-bottom: 40px;
`;

const UserInfo = styled("div")`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 1fr;
  width: 360px;
  align-items: center;
`;

const ProfilePictureWrapper = styled("div")`
  grid-row: span 2;
  display: flex;
  align-items: center;
`;

const NameWrapper = styled("div")`
  display: flex;
  gap: 5px;
`;

const Name = styled(Typography)`
  font-family: ${(props) => props.theme.customTypography.semiBold};
`;

const Description = styled(Typography)`
  grid-column: 2/2;
  color: ${(props) => props.theme.customPallete.grey};
`;

const Section = styled("section")`
  margin-top: 20px;
`;

const CancelButton = styled(RoundedButton)``;

const SaveButton = styled(RoundedButton)``;

const SectionTitle = styled(Typography)`
  font-size: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.customPallete.grey};
  padding-bottom: 10px;
  margin-bottom: 30px;
`;

const SectionContentWrapper = styled("div")`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 40px;
  }
`;

const InputGroupWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProfilePictureWithButtonWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ProfilePictureWithButtonDescription = styled(Typography)``;

const ButtonGroup = styled("div")`
  display: flex;
  justify-content: space-between;
`;

const Content = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    description: "",
    regions: "",
    realtorInstagram: "",
    realtorFacebook: "",
    realtorWhatsapp: "",
    user: {
      name: "",
      email: "",
      telephone: {
        DDD: "",
        number: "",
      },
    },
  });
  const [userId, setUserId] = useState("");
  const { userType } = useContext(UserTypeContext);
  const primaryColor = userType === "realtor" ? "#1C5E9F" : "#FF5E00";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const json = await response.json();
        setUserId(json.user_id);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUrl =
      userType === "realtor"
        ? "http://localhost:8080/realtors/" + userId
        : "http://localhost:8080/user/" + userId;

    if (userId) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(fetchUrl, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch profile data");
          }
          const json = await response.json();
          if (userType === "realtor") {
            setProfileData(json);
          } else {
            setProfileData({
              ...profileData,
              user: {
                name: json.name,
                email: json.email,
                telephone: JSON.parse(json.telephone),
              },
            });
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId, userType]);

  const handleInputChange = (field: any) => (event: any) => {
    if (field in profileData.user) {
      setProfileData({
        ...profileData,
        user: {
          ...profileData.user,
          [field]: event.target.value,
        },
      });
    } else {
      setProfileData({
        ...profileData,
        [field]: event.target.value,
      });
    }
  };

  const handleSaveRealtor = () => {
    const data = {
      regions: profileData.regions,
      description: profileData.description,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/realtors/" + userId,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save realtor data");
        }
        const json = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  const handleSaveUser = () => {
    const data = {
      name: profileData.user.name,
      email: profileData.user.email,
      telephone: {
        DDD: profileData.user.telephone.DDD,
        number: profileData.user.telephone.number,
      },
    };
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/" + userId, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Failed to save user data");
        }
        const json = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  const handleSaveSocials = () => {
    const data = {
      realtorInstagram: profileData.realtorInstagram,
      realtorFacebook: profileData.realtorFacebook,
      realtorWhatsapp: profileData.realtorWhatsapp,
    };
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/realtors/" + userId,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to save socials data");
        }
        const json = await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  const refreshPage = () => {
    window.location.reload();
  };

  if (loading || !profileData || !profileData.user) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <UserInfo>
        <ProfilePictureWrapper>
          <Avatar
            alt={profileData.user.name}
            src="a"
            sx={{ width: "50px", height: "50px" }}
          />
        </ProfilePictureWrapper>
        <NameWrapper>
          <Name variant="body1">{profileData.user.name}</Name>
        </NameWrapper>
        <Description variant="body2">Sua conta pessoal</Description>
      </UserInfo>
      <Section>
        <SectionTitle variant="h2">Seu perfil</SectionTitle>
        <SectionContentWrapper>
          <InputGroupWrapper>
            <InputGroup
              label="Nome"
              name="name"
              type="text"
              value={profileData.user.name}
              onChange={handleInputChange("name")}
            />
            <InputGroup
              label="Email"
              name="email"
              type="text"
              value={profileData.user.email}
              onChange={handleInputChange("email")}
            />
            <InputGroup
              label="DDD"
              name="ddd"
              type="text"
              value={`(${profileData.user.telephone.DDD})`}
              onChange={handleInputChange("DDD")}
            />
            <InputGroup
              label="Telefone"
              name="telephone"
              type="text"
              value={profileData.user.telephone.number}
              onChange={handleInputChange("number")}
            />
            <ButtonGroup>
              <CancelButton
                buttonColor={primaryColor}
                invertColor={true}
                onClick={refreshPage}
              >
                Cancelar
              </CancelButton>
              <SaveButton buttonColor={primaryColor} onClick={handleSaveUser}>
                Salvar
              </SaveButton>
            </ButtonGroup>
          </InputGroupWrapper>
          <ProfilePictureWithButtonWrapper>
            <ProfilePictureWithButtonDescription variant="body1">
              Foto de Perfil
            </ProfilePictureWithButtonDescription>
            <Avatar
              alt={profileData.user.name}
              src="/static/images/avatar/1.jpg"
              sx={{ width: "130px", height: "130px", fontSize: "60px" }}
            />
          </ProfilePictureWithButtonWrapper>
        </SectionContentWrapper>
      </Section>
      <HiddenComponent hidden={userType !== "realtor"}>
        <Section>
          <SectionTitle variant="h2">Redes Sociais</SectionTitle>
          <InputGroupWrapper>
            <InputGroup
              label="Instagram"
              name="realtorInstagram"
              type="text"
              icon="/public/instagram.svg"
              value={profileData.realtorInstagram}
              onChange={handleInputChange("realtorInstagram")}
            />
            <InputGroup
              label="Facebook"
              name="realtorFacebook"
              type="text"
              value={profileData.realtorFacebook}
              icon="/public/facebook.png"
              onChange={handleInputChange("realtorFacebook")}
            />
            <InputGroup
              label="WhatsApp"
              name="realtorWhatsapp"
              type="text"
              value={profileData.realtorWhatsapp}
              icon="/public/whatsapp.svg"
              onChange={handleInputChange("realtorWhatsapp")}
            />
            <ButtonGroup>
              <CancelButton
                buttonColor={primaryColor}
                invertColor={true}
                onClick={refreshPage}
              >
                Cancelar
              </CancelButton>
              <SaveButton buttonColor={primaryColor} onClick={handleSaveSocials}>
                Salvar
              </SaveButton>
            </ButtonGroup>
          </InputGroupWrapper>
        </Section>
        <Section>
          <SectionTitle variant="h2">Biografia</SectionTitle>
          <InputGroupWrapper>
            <InputGroup
              label="Regiões de Atuação"
              name="regions"
              value={profileData.regions}
              type="text"
              onChange={handleInputChange("regions")}
            />
            <InputGroup
              label="Bio"
              name="description"
              type="text"
              value={profileData.description}
              isTextField={true}
              onChange={handleInputChange("description")}
            />
          </InputGroupWrapper>
        </Section>
        <ButtonGroup>
          <CancelButton
            buttonColor={primaryColor}
            invertColor={true}
            onClick={refreshPage}
          >
            Cancelar
          </CancelButton>
          <SaveButton buttonColor={primaryColor} onClick={handleSaveRealtor}>
            Salvar
          </SaveButton>
        </ButtonGroup>
      </HiddenComponent>
    </Container>
  );
};

export default Content;
