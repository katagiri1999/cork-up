import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import * as utils from "./utils.js";

function Login() {
  const navigate = useNavigate();

  const [valueEmail, setEmailValue] = useState("");
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const [valuePw, setPwValue] = useState("");
  const handlePwChange = (event) => {
    setPwValue(event.target.value);
  };

  const [error, setError] = useState(false);
  useEffect(() => { }, [error]);
  function IsError() {
    if (error) {
      return (
        <Alert severity="error">Invalid Email or PW</Alert>
      );
    };
  };

  const onClickSignin = async () => {
    var res = await utils.requests(
      "https://i49186bbs1.execute-api.us-east-1.amazonaws.com/v0r1/login",
      "POST",
      {},
      {
        email: valueEmail,
        password: valuePw
      }
    );

    if (res.status != 200) {
      setError(true);
    } else {
      setError(false);
      navigate("/menu");
    }
  };

  return (
    <Container maxWidth="xs">
      <title>ログイン</title>
      <Box
        sx={{ marginTop: 5 }}
      >
        <Typography component="h1" variant="h4">
          ログイン
        </Typography>

        <Box component="form" noValidate sx={{ marginTop: "1%" }}>
          <TextField
            value={valueEmail}
            onChange={handleEmailChange}
            margin="normal"
            fullWidth
            label="メールアドレス"
          />

          <TextField
            value={valuePw}
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
  );
};

export default Login;