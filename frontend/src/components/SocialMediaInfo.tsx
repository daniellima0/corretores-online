import styled from "@mui/material/styles/styled";
import instagramIcon from "../assets/instagram.svg";
import whatsappIcon from "../assets/whatsapp.svg";
import facebookIcon from  "../assets/facebook.png";
import { Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const SocialIcons = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const SocialIcon = styled("img")`
  width: 40px;
  height: 40px;
`;

const ContactInfo = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContactInfoTitle = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.semiBold};
  font-size: 1.2rem;
`;

const ContactForm = styled("div")`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ContactFormValue = styled(Typography)``;

interface SocialMediaInfoProps {
  realtorData: {
    real_id: string;
    creci: string;
    is_online: boolean;
    description: string;
    user: {
      user_id: string;
      name: string;
      cpf: string;
      email: string;
      date_of_birth: string;
      telephone: {
        DDD: string;
        number: string;
      };
    };
    realtor_instagram: string;
    realtor_facebook: string;
    realtor_whatsapp: string;
    realtor_location: {
      // ...
    };
    regions: string;
  };
}

const SocialMediaInfo: React.FC<SocialMediaInfoProps> = (props) => {
  const socials = [
    {
      name: "Instagram",
      url: instagramIcon,
    },
    {
      name: "WhatsApp",
      url: whatsappIcon,
    },
    {
      name: "Facebook",
      url: facebookIcon,
    },
  ];

  const contactInfo = [
    {
      name: "Phone",
      icon: <CallIcon />,
      value: `(${props.realtorData.user.telephone.DDD}) ${props.realtorData.user.telephone.number}`,
    },
    {
      name: "Email",
      icon: <EmailIcon />,
      value: props.realtorData.user.email,
    },
  ];

  return (
    <Container>
      <SocialIcons>
        {socials.map((social, index) => (
          <SocialIcon src={social.url} alt={social.name} key={index} />
        ))}
      </SocialIcons>
      <ContactInfo>
        <ContactInfoTitle variant="h2">Mais Contatos:</ContactInfoTitle>
        {contactInfo.map((contact, index) => (
          <ContactForm key={index}>
            {contact.icon}
            <ContactFormValue variant="body1">{contact.value}</ContactFormValue>
          </ContactForm>
        ))}
      </ContactInfo>
    </Container>
  );
};

export default SocialMediaInfo;
