import { styled } from "@mui/material/styles";
import ProfilePicture from "./ProfilePicture";
import { ProfilePictureProps } from "../types/ProfilePicture";

const Button = styled("button")`
    border: none;
    background: none;
    display: flex;
    cursor: pointer;
`;

const ProfilePictureWithButton: React.FC<ProfilePictureProps> = (props) => {
    const handleClick = () => {
        console.log("profile picture clicked");
    };

    return (
        <Button onClick={handleClick}>
            <ProfilePicture
                src={props.src}
                width={props.width}
                borderColor={props.borderColor}
            />
        </Button>
    );
};

export default ProfilePictureWithButton;
