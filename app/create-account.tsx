import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { createUser } from '@/db/database';
import { styles } from '@/styles/create-account.style';

const createAccountSchema = z
  .object({
    firstName: z
      .string()
      .min(1, {
        message: 'First name is required'
      }),
    lastName: z
      .string()
      .min(1, {
        message: 'Last name is required'
      }),
    username: z
      .string()
      .min(3, {
        message: 'Username must be at least 3 characters'
      }),
    password: z
      .string()
      .min(4, {
        message: 'Password must be at least 4 characters'
      }),
    confirmPassword: z
      .string(),
    birthdate: z
      .string()
      .min(1, {
        message: 'Birthdate is required'
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Birthdate must be in format YYYY-MM-DD'
      }),
    municipality: z
      .string()
      .min(1, {
        message: 'Municipality is required'
      }),
    postalcode: z
      .string()
      .min(1, {
        message: 'Postal code is required'
      })
      .regex(/^\d{4}$/, {
        message: 'Postal code must be 4 digits'
      }),
    street: z
      .string()
      .min(1, {
        message: 'Street is required'
      }),
    houseNumber: z
      .string()
      .min(1, {
        message: 'House number is required'
      }),
    box: z
      .string()
      .optional(),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the terms and conditions',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export default function CreateAccountScreen() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
      birthdate: '',
      municipality: '',
      postalcode: '',
      street: '',
      houseNumber: '',
      box: '',
      agreeToTerms: false,
    },
  });

  function onSave(data: CreateAccountFormData) {
    setErrorMessage(null);
    try {
      createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        birthdate: new Date(data.birthdate),
        municipality: data.municipality,
        postalcode: data.postalcode,
        street: data.street,
        houseNumber: data.houseNumber,
        box: data.box ?? '',
      });
      router.replace('/login');
    } catch (e: any) {
      if (e.message?.includes('UNIQUE')) {
        setErrorMessage('Username already exists. Please choose another.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="First Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.firstName && <Text style={styles.fieldError}>
        {errors.firstName.message}
      </Text>}

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Last Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.lastName && <Text style={styles.fieldError}>
        {errors.lastName.message}
      </Text>}

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
      {errors.username && <Text style={styles.fieldError}>
        {errors.username.message}
      </Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry style={styles.input}
          />
        )}
      />
      {errors.password && <Text style={styles.fieldError}>
        {errors.password.message}
      </Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={styles.input}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.fieldError}>
        {errors.confirmPassword.message}
      </Text>}

      <Controller
        control={control}
        name="birthdate"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Birthdate (YYYY-MM-DD)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.birthdate && <Text style={styles.fieldError}>
        {errors.birthdate.message}
      </Text>}

      <Controller
        control={control}
        name="municipality"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Municipality"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.municipality && <Text style={styles.fieldError}>
        {errors.municipality.message}
      </Text>}

      <Controller
        control={control}
        name="postalcode"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Postal Code"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.postalcode && <Text style={styles.fieldError}>
        {errors.postalcode.message}
      </Text>}

      <Controller
        control={control}
        name="street"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Street"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.street && <Text style={styles.fieldError}>
        {errors.street.message}
      </Text>}

      <Controller
        control={control}
        name="houseNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="House Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.houseNumber && <Text style={styles.fieldError}>
        {errors.houseNumber.message}
      </Text>}

      <Controller
        control={control}
        name="box"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Box (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />

      {errorMessage && (
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}

      <Controller
        control={control}
        name="agreeToTerms"
        render={({ field: { onChange, value } }) => (
          <View style={styles.checkboxRow}>
            <Checkbox
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            <Text style={styles.checkboxLabel}>
              I agree to the terms and conditions
            </Text>
          </View>
        )}
      />
      {errors.agreeToTerms && (
        <Text style={styles.fieldError}>
          {errors.agreeToTerms.message}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSave)}
        style={styles.button}>
        Save Account
      </Button>

      <Button
        mode="text"
        onPress={() => router.back()}
        style={styles.button}>
        Back to Login
      </Button>
    </ScrollView>
  );
}