import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Header from "../components/header.jsx";
import Loading from '../components/loading.jsx';
import userStore from '../store/user_store.jsx';
import utils from "../utils/utils.js";

function Login() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, setIdToken } = userStore();
  const [isLoginError, setLoginError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userStore.getState().reset();
    setLoginError(false);
    setLoading(false);
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePwChange = (event) => {
    setPassword(event.target.value);
  };

  const onClickSignin = async () => {
    setLoading(true);
    var res = await utils.requests(
      `${import.meta.env.VITE_API_HOST}/${import.meta.env.VITE_API_VER}/login`,
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
      setIdToken(res.body.id_token);
      navigate("/main");
    };

    setLoading(false);
  };

  return (
    <>
      <title>Login</title>
      <Header />
      <Loading loading={isLoading} />

      <Container maxWidth="xs">
        <Box
          sx={{ marginTop: 10 }}
        >
          <Typography variant="h4" align="center">
            Login
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

        {isLoginError &&
          <Alert severity="error">IDまたはパスワードが正しくありません</Alert>
        }

      </Container>
    </>
  );
};

export default Login;