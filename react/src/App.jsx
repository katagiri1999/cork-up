import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

function App() {
  const [valueEmail, setEmailValue] = useState("");
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const [valuePw, setPwValue] = useState("");
  const handlePwChange = (event) => {
    setPwValue(event.target.value);
  };

  const onClickSignin = () => {
    console.log(valueEmail);
    console.log(valuePw);

    // 疑似的にログインの成否をランダムで決定
    var random = parseInt(Math.random() * 100);
    var _error = random % 2 === 0;
    console.log(_error);
    setError(_error);
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

  return (
    <Container maxWidth="xs">
      <title>Sign in</title>
      <Box
        sx={{ marginTop: 5 }}
      >
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>

        <Box component="form" noValidate sx={{ marginTop: "1%" }}>
          <TextField
            value={valueEmail}
            onChange={handleEmailChange}
            margin="normal"
            fullWidth
            label="email"
          />

          <TextField
            value={valuePw}
            onChange={handlePwChange}
            margin="normal"
            fullWidth
            label="password"
            type="password"
            autoComplete="current-password"
          />

          <Button
            onClick={onClickSignin}
            fullWidth
            variant="contained"
            sx={{ marginTop: "5%", marginBottom: "2%" }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <IsError />

    </Container>
  );
};

export default App;