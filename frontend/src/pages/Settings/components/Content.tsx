import { styled } from "@mui/material/styles/";
import { Avatar, Typography } from "@mui/material";
import RoundedButton from "../../../components/RoundedButton";
import InputGroup from "./InputGroup";
import { useContext, useEffect, useState } from "react";
import { UserTypeContext } from "../../../App";

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
  const [userId, setUserId] = useState("");

  const { userType } = useContext(UserTypeContext);

  const primaryColor = userType === "realtor" ? "#1C5E9F" : "#FF5E00";

  // Checking if user trying to access this page is logged in.
  // If true, store its id in a state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        setUserId(json.user_id);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchUrl =
    userType === "realtor"
      ? "http://localhost:8080/realtors/" + userId
      : userType === "user"
      ? "http://localhost:8080/user/" + userId
      : "";

  // With the user id, fetch its data from the database and store it in a state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        setProfileData(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [profileData, setProfileData] = useState({
    Name: "",
    Cpf: "",
    Email: "",
    Dob: "",
    Telephone: "",
    
    instagram: "https://www.instagram.com/marcel.fonseca",
    facebook: "https://www.facebook.com/marcel.fonseca",
    whatsapp: "+557198159-1481",
    regioesDeAtuacao: "Barra, Pituba, Imbuí",
    bio: "Sou corretor de imóveis desde 2010 e tenho como objetivo ajudar as pessoas a encontrarem o lar ideal para elas.",
  });

  const validateData = () => {
    if (
      !profileData.name ||
      !profileData.email ||
      !profileData.telefone ||
      !profileData.senha
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return false;
    }
    if (profileData.senha !== profileData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    return true;
  };

  const handleInputChange =
    (field: string) => (event: { target: { value: any } }) => {
      setProfileData({ ...profileData, [field]: event.target.value });
    };

  const handleSave = () => {
    if (validateData()) {
      console.log("Dados válidos, salvando...");
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container>
      <UserInfo>
        <ProfilePictureWrapper>
          <Avatar
            alt="Marcel Fonseca"
            src="/static/images/avatar/1.jpg"
            sx={{ width: "50px", height: "50px" }}
          />
        </ProfilePictureWrapper>
        <NameWrapper>
          <Name variant="body1">Marcel Fonseca</Name>
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
              defaultValue="Marcel Fonseca"
              onChange={handleInputChange("name")}
            />
            <InputGroup
              label="Email"
              name="email"
              type="text"
              defaultValue="marcel.fonseca@gmail.com"
              onChange={handleInputChange("email")}
            />
            <InputGroup
              label="Telefone"
              name="telefone"
              type="text"
              defaultValue="+557198159-1481"
              onChange={handleInputChange("telefone")}
            />
            <InputGroup
              label="Senha"
              name="senha"
              type="password"
              defaultValue="senhadousuario"
              onChange={handleInputChange("senha")}
            />
            <InputGroup
              label="Confirme a mudança de senha"
              type="password"
              defaultValue="senhadousuario"
              onChange={handleInputChange("confirmarSenha")}
            />
          </InputGroupWrapper>
          <ProfilePictureWithButtonWrapper>
            <ProfilePictureWithButtonDescription variant="body1">
              Foto de Perfil
            </ProfilePictureWithButtonDescription>
            <Avatar
              alt="Marcel Fonseca"
              src="/static/images/avatar/1.jpg"
              sx={{ width: "130px", height: "130px", fontSize: "60px" }}
            />
          </ProfilePictureWithButtonWrapper>
        </SectionContentWrapper>
      </Section>
      {userType === "realtor" && (
        <>
          <Section>
            <SectionTitle variant="h2">Redes Sociais</SectionTitle>
            <InputGroupWrapper>
              <InputGroup
                label="Instagram"
                name="instagram"
                type="text"
                defaultValue="https://www.instagram.com/marcel.fonseca"
                icon="/public/instagram.svg"
                onChange={handleInputChange("instagram")}
              />
              <InputGroup
                label="Facebook"
                name="facebook"
                type="text"
                defaultValue="https://www.facebook.com/marcel.fonseca"
                icon="/public/facebook.png"
                onChange={handleInputChange("facebook")}
              />
              <InputGroup
                label="WhatsApp"
                name="whatsapp"
                type="text"
                defaultValue="+557198159-1481"
                icon="/public/whatsapp.svg"
                onChange={handleInputChange("whatsapp")}
              />
            </InputGroupWrapper>
          </Section>
          <Section>
            <SectionTitle variant="h2">Biografia</SectionTitle>
            <InputGroupWrapper>
              <InputGroup
                label="Regiões de Atuação"
                name="regioes-de-atuacao"
                type="text"
                defaultValue="Barra, Pituba, Imbuí"
                onChange={handleInputChange("regioesDeAtuacao")}
              />
              <InputGroup
                label="Bio"
                name="bio"
                type="text"
                defaultValue="Sou corretor de imóveis desde 2010 e tenho como objetivo ajudar as pessoas a encontrarem o lar ideal para elas."
                isTextField={true}
                onChange={handleInputChange("bio")}
              />
            </InputGroupWrapper>
          </Section>
        </>
      )}
      <ButtonGroup>
        <CancelButton
          buttonColor={primaryColor}
          invertColor={true}
          onClick={refreshPage}
        >
          Cancelar
        </CancelButton>
        <SaveButton buttonColor={primaryColor} onClick={handleSave}>
          Salvar
        </SaveButton>
      </ButtonGroup>
    </Container>
  );
};

export default Content;
