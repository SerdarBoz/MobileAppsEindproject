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
    <View style={styles.container}>
      <Text style={styles.title}>Electroman</Text>

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
            style={styles.input}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.fieldError}>
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
            style={styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.fieldError}>
          {errors.password.message}
        </Text>
      )}

      {errorMessage && (
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}

      {successMessage && (
        <Text style={styles.successMessage}>
          {successMessage}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onLogin)}
        style={styles.button}>
        Login
      </Button>

      <Button
        mode="text"
        onPress={() => router.push("/create-account")}
        style={styles.button}>
        Create Account
      </Button>
    </View>
  );
}
