import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/Loading";
import SelectUf from "@/pages/SignUp/components/SelectUF";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

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

const TextFieldStyled = styled(TextField)({
  width: "100%",
  padding: "0px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

const CreciBox = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  gap: "20px",
});

interface SignUpFormProps {
  userType: "realtor" | "user";
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const primaryColor = props.userType === "realtor" ? "#1C5E9F" : "#FF5E00";
  const navigate = useNavigate();

  const ButtonStyled = styled(Button)({
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    borderRadius: "45px",
    margin: "30px 0px 10px 0px",
    backgroundColor: primaryColor,
    width: "120px",
    "&: hover": {
      backgroundColor: primaryColor,
      color: "#ffffff",
      border: "none",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [ufOptions, setUfOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = React.useState({
    name: "",
    telephone: {
      ddd: "",
      number: "",
    },
    date_of_birth: "",
    cpf: "",
    creci: "",
    email: "",
    password: "",
    confirmPassword: "",
    uf: "",
  });

  const [areTermsAccepted, setAreTermsAccepted] = React.useState(false);

  const handleInputChange =
    (field: string, nestedField?: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormData((prevFormData) => {
        // If the field is nested, we need to update the nested object
        if (nestedField) {
          return {
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [nestedField]: value,
            },
          };
        }
        // Otherwise, we can update the field directly
        return { ...prevFormData, [field]: value };
      });
    };

  const validateData = () => {
    for (const field in formData) {
      if (!formData[field]) {
        if ((field === "creci" || field === "uf") && props.userType === "user")
          continue;
        alert(`Preencha o campo ${field}!`);
        return false;
      }
    }

    if (formData.cpf.length !== 11) {
      alert("CPF inválido!");
      return false;
    }

    if (formData.telephone.ddd.length !== 2) {
      alert("DDD inválido!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return false;
    }

    if (formData.password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres!");
      return false;
    }

    if (!areTermsAccepted) {
      alert("Você deve aceitar os termos de uso para se cadastrar");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateData()) {
      setLoading(true);
      const body = {
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
        telephone: {
          DDD: formData.telephone.ddd,
          number: formData.telephone.number,
        },
        ...(props.userType === "realtor" && {
          creci: formData.creci,
          uf: formData.uf,
        }),
      };

      let signUpUrl =
        props.userType === "realtor"
          ? "http://localhost:8080/realtors/"
          : "http://localhost:8080/user/";

      fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          alert("Erro ao cadastrar usuário!");
        });
    }
  };

  const fetchUfOptions = async () => {
    setLoading(true);
    try {
      const responseUfOptions = await fetch(
        "http://localhost:8080/uf_options/",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseUfOptions.ok) {
        throw new Error("Failed to fetch UF options data");
      }
      const jsonUfOptions = await responseUfOptions.json();
      setUfOptions(jsonUfOptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUfOptions();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Form>
      <TextFieldStyled
        id="name"
        label="Nome Completo"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.name}
        onChange={handleInputChange("name")}
      />
      <TextFieldStyled
        id="ddd"
        label="DDD"
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.telephone.ddd}
        onChange={handleInputChange("telephone", "ddd")}
      />
      <TextFieldStyled
        helperText="Digite apenas os números"
        id="telefone"
        label="Telefone"
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.telephone.number}
        onChange={handleInputChange("telephone", "number")}
      />
      <TextFieldStyled
        helperText="Digite sua data de nascimento"
        id="date_of_birth"
        type="date"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.date_of_birth}
        onChange={handleInputChange("date_of_birth")}
      />
      <TextFieldStyled
        helperText="Digite apenas os números"
        id="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.cpf}
        onChange={handleInputChange("cpf")}
      />
      {props.userType === "realtor" && (
        <CreciBox>
          <TextFieldStyled
            id="creci"
            label="CRECI"
            variant="outlined"
            margin="normal"
            fullWidth
            value={formData.creci}
            onChange={handleInputChange("creci")}
          />
          <SelectUf
            placeholder={"UF"}
            uf={formData.uf}
            setUf={(selectedUf: any) =>
              handleInputChange("uf")({ target: { value: selectedUf } })
            }
            possibleUfs={ufOptions}
          />
        </CreciBox>
      )}
      <TextFieldStyled
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.email}
        onChange={handleInputChange("email")}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="password"
        helperText="Senha de no mínimo 8 caracteres"
        label="Senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.password}
        onChange={handleInputChange("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        label="Confirme sua senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormGroup>
        <FormControlLabel
          checked={areTermsAccepted}
          onChange={(event) =>
            setAreTermsAccepted((event.target as HTMLInputElement).checked)
          }
          required
          control={<Checkbox />}
          label={
            <span>
              Eu li e concordo com os{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="/terms-and-conditions"
              >
                Termos de Uso
              </Link>
            </span>
          }
        />
      </FormGroup>
      <div>
        <ButtonStyled
          fullWidth
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <span>Cadastrar</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default SignUpForm;
