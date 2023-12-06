import { styled } from "@mui/material/styles/";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ProfilePicture from "../../../components/ProfilePicture";
import RoundedButton from "../../../components/RoundedButton";
import InputGroup from "./InputGroup";
import ProfilePictureWithButton from "../../../components/ProfilePictureWithButton";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 40px;
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
`;

const InputGroupWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 60%;
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

const Content = () => {
  const theme = useTheme();

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
            />
            <InputGroup
              label="Email"
              name="email"
              type="text"
              defaultValue="marcel.fonseca@gmail.com"
            />
            <InputGroup
              label="Telefone"
              name="telefone"
              type="text"
              defaultValue="+557198159-1481"
            />
            <InputGroup
              label="Apelido"
              name="apelido"
              type="text"
              defaultValue="marcel.fonseca"
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
          />
          <InputGroup
            label="Facebook"
            name="facebook"
            type="text"
            defaultValue="https://www.facebook.com/marcel.fonseca"
            icon="/public/facebook.png"
          />
          <InputGroup
            label="WhatsApp"
            name="whatsapp"
            type="text"
            defaultValue="+557198159-1481"
            icon="/public/whatsapp.svg"
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
          />
          <InputGroup
            label="Bio"
            name="bio"
            type="text"
            defaultValue="Sou corretor de imóveis desde 2010 e tenho como objetivo ajudar as pessoas a encontrarem o lar ideal para elas."
            isTextField={true}
          />
        </InputGroupWrapper>
      </Section>
      <ButtonGroup>
        <CancelButton
          buttonColor={theme.customPallete.costumer}
          invertColor={true}
        >
          Cancelar
        </CancelButton>
        <SaveButton buttonColor={theme.customPallete.costumer}>
          Salvar
        </SaveButton>
      </ButtonGroup>
    </Container>
  );
};

export default Content;
