import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useAuth } from "@/hooks/useAuth";
import { getAuthToken } from "@/lib/tractive/api";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginPage() {
  const auth = useAuth({ skipAuthCheck: true });

  const [emailValue, setEmailValue] = useState<string | undefined>(undefined);
  const [passwordValue, setPasswordValue] = useState<string | undefined>(
    undefined,
  );

  const handleLogin = useCallback(async () => {
    if (emailValue && passwordValue) {
      const userToken = await getAuthToken(emailValue, passwordValue);
      if (!userToken) {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
        return;
      }

      auth.signIn(userToken);
    }
  }, [auth, emailValue, passwordValue]);

  return (
    <ContentLayout title="Login">
      <Container>
        <Typography variant="h3" mb={2}>
          Sign in with your Tractive account
        </Typography>

        <FormControl fullWidth>
          <TextField
            label="Email"
            type="email"
            value={emailValue}
            helperText={
              emailValue && !emailRegex.test(emailValue)
                ? "Please enter a valid email address"
                : undefined
            }
            error={Boolean(emailValue && !emailRegex.test(emailValue))}
            onChange={(e) => setEmailValue(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            margin="normal"
            required
          />

          <Button
            variant="contained"
            color="primary"
            disabled={!emailValue || !passwordValue}
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </FormControl>
      </Container>
    </ContentLayout>
  );
}
