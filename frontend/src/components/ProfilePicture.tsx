import { styled } from "@mui/material/styles";
import defaultUserPicture from "../assets/default-user-picture.svg";
import {ProfilePictureProps} from "../types/ProfilePicture";

const Image = styled("img")<{
    width: string;
    borderWidth: string;
    borderColor: string;
}>`
    width: ${(props) => props.width};
    border-radius: 50%;
    border: ${(props) => props.borderWidth} solid
        ${(props) => props.borderColor};
`;

const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
    return (
        <Image
            src={props.src || defaultUserPicture}
            width={props.width || "fit"}
            borderWidth={props.borderWidth || "1px"}
            borderColor={props.borderColor || "transparent"}
        />
    );
};

export default ProfilePicture;
