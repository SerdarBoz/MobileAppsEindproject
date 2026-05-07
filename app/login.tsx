import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { getUserByCredentials } from "@/db/database";
import { styles } from "@/styles/login.style";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormData = {
  username: string;
  password: string;
}

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onLogin(data: LoginFormData) {
    setErrorMessage(null);
    setSuccessMessage(null);

    const user = getUserByCredentials(data.username, data.password);

    if (!user) {
      setErrorMessage("Invalid username or password");
      return;
    }

    setSuccessMessage(`Welcome, ${user.firstName}! ${user.lastName}`);

    setTimeout(() => {
      router.replace({
        pathname: "/overview",
        params: { userId: user.id },
      });
    }, 3000);
  }

  return (
    <View>
      <Text>Electroman</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      {errors.username && (
        <Text>
          {errors.username.message}
        </Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />
      {errors.password && (
        <Text>
          {errors.password.message}
        </Text>
      )}

      {errorMessage && (
        <Text>
          {errorMessage}
        </Text>
      )}

      {successMessage && (
        <Text>
          {successMessage}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onLogin)}>
        Login
      </Button>

      <Button
        mode="text"
        onPress={() => router.push("/create-account")}>
        Create Account
      </Button>
    </View>
  );
}
