import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    styled,
} from "@mui/material";
import { useState } from "react";

const Form = styled("form")({
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
    paddingTop: "24px",

    "@media (max-width: 800px)": {
        width: "100%",
    },
});

const ButtonStyled = styled(Button)({
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    borderRadius: "45px",
    margin: "10px 0px 10px 0px",
    backgroundColor: "#1C5E9F",
    width: "120px",
});

const TextFieldStyled = styled(TextField)({
    width: "100%",
    "& label.Mui-focused": {
        color: "#FF5E00",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#FF5E00",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#1C5E9F",
            borderRadius: "15px",
            border: "2px solid #1C5E9F",
        },
        "&:hover fieldset": {
            borderColor: "#1C5E9F",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#1C5E9F",
        },
    },
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Form>
            <TextFieldStyled
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth={false}
            />
            <TextFieldStyled
                type={showPassword ? "text" : "password"}
                id="password"
                label="Senha"
                variant="outlined"
                margin="normal"
                fullWidth={false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                aria-label="Toggle password visibility"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <FormControlLabel
                label="Lembrar-me"
                control={<Checkbox color="primary" />}
            />
            <div>
                <ButtonStyled
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <span>Entrar</span>
                </ButtonStyled>
            </div>
        </Form>
    );
};

export default LoginForm;
