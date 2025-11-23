import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import * as utils from "../utils.js";
import userStore from '../store/user_store.jsx';
import screenStore from '../store/screen_store.jsx';
import Header from "../components/header.jsx";

function Login() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, setIdToken } = userStore();
  const { isLoginError, setLoginError } = screenStore();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePwChange = (event) => {
    setPassword(event.target.value);
  };

  function IsError() {
    if (isLoginError) {
      return (
        <Alert severity="error">Invalid Email or PW</Alert>
      );
    };
  };

  const onClickSignin = async () => {
    var res = await utils.requests(
      `${utils.API_HOST}/${utils.API_VER}/login`,
      "POST",
      {},
      {
        email: email,
        password: password,
      }
    );

    if (res.status != 200) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPassword("");
      setIdToken(res.id_token);
      navigate("/menu");
    }
  };

  return (
    <>
      <title>ログイン</title>
      <Header />
      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 10 }}
        >
          <Typography component="h1" variant="h4">
            ログイン
          </Typography>

          <Box component="form" noValidate sx={{ marginTop: "1%" }}>
            <TextField
              value={email}
              onChange={handleEmailChange}
              margin="normal"
              fullWidth
              label="メールアドレス"
            />

            <TextField
              value={password}
              onChange={handlePwChange}
              margin="normal"
              fullWidth
              label="パスワード"
              type="password"
              autoComplete="current-password"
            />

            <Button
              onClick={onClickSignin}
              fullWidth
              variant="contained"
              sx={{ marginTop: "5%", marginBottom: "2%" }}
            >
              ログイン
            </Button>
          </Box>
        </Box>

        <IsError />

      </Container>
    </>
  );
};

export default Login;