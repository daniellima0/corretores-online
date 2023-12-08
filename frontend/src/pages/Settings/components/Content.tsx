import { styled } from "@mui/material/styles/";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfilePicture from "../../../components/ProfilePicture";
import RoundedButton from "../../../components/RoundedButton";
import InputGroup from "./InputGroup";
import ProfilePictureWithButton from "../../../components/ProfilePictureWithButton";
import { useState } from "react";

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

const Username = styled(Typography)`
  color: ${(props) => props.theme.customPallete.grey};
`;

const Description = styled(Typography)`
  grid-column: 2/2;
  color: ${(props) => props.theme.customPallete.grey};
`;

const Section = styled("section")`
  margin-top: 20px;
`;

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

const CancelButton = styled(RoundedButton)``;

const SaveButton = styled(RoundedButton)``;

// interface ProfileFormState {
//   name: string;
//   email: string;
//   telefone: string;
//   apelido: string;
//   senha: string;
//   confirmarSenha: string;
//   instagram: string;
//   facebook: string;
//   whatsapp: string;
//   regioesDeAtuacao: string;
//   bio: string;
// }

// const initialProfileState: ProfileFormState = {
//   name: "Marcel Fonseca",
//   email: "marcel.fonseca@gmail.com",
//   telefone: "+557198159-1481",
//   apelido: "marcel.fonseca",
//   senha: "senhadousuario",
//   confirmarSenha: "",
//   instagram: "https://www.instagram.com/marcel.fonseca",
//   facebook: "https://www.facebook.com/marcel.fonseca",
//   whatsapp: "+557198159-1481",
//   regioesDeAtuacao: "Barra, Pituba, Imbuí",
//   bio: "Sou corretor de imóveis desde 2010 e tenho como objetivo ajudar as pessoas a encontrarem o lar ideal para elas.",
// };

const Content = () => {
  const theme = useTheme();

  // const [profileData, setProfileData] =
  //   useState<ProfileFormState>(initialProfileState);

  // const handleInputChange = (name: keyof ProfileFormState, value: string) => {
  //   setProfileData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const [profileData, setProfileData] = useState({
    name: "Marcel Fonseca",
    email: "marcel.fonseca@gmail.com",
    telefone: "+557198159-1481",
    apelido: "marcel.fonseca",
    senha: "senhadousuario",
    confirmarSenha: "",
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
      !profileData.apelido ||
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
          <ProfilePicture width="50px" />
        </ProfilePictureWrapper>
        <NameWrapper>
          <Name variant="body1">Marcel Fonseca</Name>
          <Username variant="body1">(marcel.fonseca)</Username>
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
              label="Apelido"
              name="apelido"
              type="text"
              defaultValue="marcel.fonseca"
              onChange={handleInputChange("apelido")}
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
            <ProfilePictureWithButton width="130px" />
          </ProfilePictureWithButtonWrapper>
        </SectionContentWrapper>
      </Section>
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
      <ButtonGroup>
        <CancelButton
          buttonColor={theme.customPallete.costumer}
          invertColor={true}
          onClick={refreshPage}
        >
          Cancelar
        </CancelButton>
        <SaveButton
          buttonColor={theme.customPallete.costumer}
          onClick={handleSave}
        >
          Salvar
        </SaveButton>
      </ButtonGroup>
    </Container>
  );
};

export default Content;
