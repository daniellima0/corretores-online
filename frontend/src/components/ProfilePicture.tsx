import { styled } from "@mui/material/styles";
import defaultCostumerPicture from "../assets/default-costumer-picture.svg";
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
            src={props.src || defaultCostumerPicture}
            width={props.width || "fit"}
            borderWidth={props.borderWidth || "1px"}
            borderColor={props.borderColor || "transparent"}
        />
    );
};

export default ProfilePicture;
