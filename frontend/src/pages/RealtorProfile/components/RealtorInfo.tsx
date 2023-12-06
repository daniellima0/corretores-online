import { styled } from "@mui/material/styles";
import defaultBanner from "../../../assets/default-banner.png";
import profilePicture from "../../../assets/profile-picture.jpeg";
import ProfilePicture from "../../../components/ProfilePicture";
import SocialMediaInfo from "../../../components/SocialMediaInfo";
import RoundedButton from "../../../components/RoundedButton";
import { Typography } from "@mui/material";

const Container = styled("div")`
  margin-top: 40px;
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
  margin-top: 70px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Bio = styled(Typography)``;

const RegionsInfo = styled("div")`
  grid-row: 2;
  align-self: center;
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

const SecondSection = styled(FirstSection)`
  padding: 32px;
`;

const AboutMeTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.semiBold};
  font-size: 1.2rem;
`;

const Description = styled(Typography)``;

const RealtorInfo = () => {
  const realtor = {
    name: "Marcel Fonseca",
    bio: "Lorem ipsum Lorem ipsum Lorem ipsum",
    regionsList: "Lorem ipsum, Lorem ipsum, Lorem ipsum, Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mi enim acadipiscing malesuada malesuada scelerisque. Viverra non ametviverra semper elementum imperdiet. In enim nulla vitae seddictum orci molestie interdum nunc. Aliquet risus gravida accongue arcu quam scelerisque. Lorem ipsum dolor sit ametconsectetur. Mi enim ac adipiscing malesuada malesuadascelerisque. Viverra non amet viverra semper elementumimperdiet. In enim nulla vitae sed dictum orci molestieinterdum nunc. Aliquet risus gravida ac congue arcu quamscelerisque. Lorem ipsum dolor sit amet consectetur. Mi enimac adipiscing malesuada malesuada scelerisque. Viverra nonamet viverra semper elementum imperdiet. In enim nulla vitaesed dictum orci molestie interdum nunc. Aliquet risusgravida ac congue arcu quam scelerisque.",
    phone: "+55998786550",
  };

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${realtor.phone}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container>
      <FirstSection>
        <ImagesContainer>
          <Banner src={defaultBanner} />
          <ProfilePictureWrapper>
            <ProfilePicture
              src={profilePicture}
              width="160px"
              borderColor="white"
              borderWidth="4px"
            />
          </ProfilePictureWrapper>
        </ImagesContainer>
        <TextContainer>
          <Header>
            <Name variant="h2">{realtor.name}</Name>
            <Bio variant="body1">{realtor.bio}</Bio>
          </Header>
          <RegionsInfo>
            <RegionsTitle variant="h2">Regiōes</RegionsTitle>
            <RegionsList variant="body1">{realtor.regionsList}</RegionsList>
          </RegionsInfo>
          <SocialMediaInfoWrapper>
            <SocialMediaInfo />
          </SocialMediaInfoWrapper>
        </TextContainer>
      </FirstSection>
      <SecondSection>
        <AboutMeTitle variant="h2">Sobre Mim</AboutMeTitle>
        <Description variant="body1">{realtor.description}</Description>
      </SecondSection>
      <RoundedButton onClick={handleClick} />
    </Container>
  );
};

export default RealtorInfo;
