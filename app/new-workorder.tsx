import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { createWorkOrder, workOrderExists } from '@/db/database';
import { styles } from '@/styles/new-workorder.style';

const newWorkOrderSchema = z.object({
  city: z.string().min(1, { message: 'City is required' }),
  device: z.string().min(1, { message: 'Device is required' }),
  problemCode: z.string().min(1, { message: 'Problem code is required' }),
  customerName: z.string().min(1, { message: 'Customer name is required' }),
  detailedProblemDescription: z
    .string()
    .min(1, { message: 'Problem description is required' }),
});

type NewWorkOrderFormData = z.infer<typeof newWorkOrderSchema>;

export default function NewWorkOrderScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewWorkOrderFormData>({
    resolver: zodResolver(newWorkOrderSchema),
    defaultValues: {
      city: '',
      device: '',
      problemCode: '',
      customerName: '',
      detailedProblemDescription: '',
    },
  });

  function onSave(data: NewWorkOrderFormData) {
    setErrorMessage(null);

    const exists = workOrderExists(data.city, data.device, data.customerName);
    if (exists) {
      setErrorMessage(
        'A work order with this city, device and customer already exists.'
      );
      return;
    }

    createWorkOrder({
      city: data.city,
      device: data.device,
      problemCode: data.problemCode,
      customerName: data.customerName,
      detailedProblemDescription: data.detailedProblemDescription,
    });

    router.replace({
      pathname: '/overview',
      params: { userId },
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Work Order</Text>

      <Controller
        control={control}
        name="customerName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Customer Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.customerName && (
        <Text style={styles.fieldError}>
          {errors.customerName.message}
        </Text>
      )}

      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="City"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.city && (
        <Text style={styles.fieldError}>
          {errors.city.message}
        </Text>
      )}

      <Controller
        control={control}
        name="device"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Device"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.device && (
        <Text style={styles.fieldError}>
          {errors.device.message}
        </Text>
      )}

      <Controller
        control={control}
        name="problemCode"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Problem Code"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      {errors.problemCode && (
        <Text style={styles.fieldError}>
          {errors.problemCode.message}
        </Text>
      )}

      <Controller
        control={control}
        name="detailedProblemDescription"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Problem Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={4}
            style={styles.input}
          />
        )}
      />
      {errors.detailedProblemDescription && (
        <Text style={styles.fieldError}>
          {errors.detailedProblemDescription.message}
        </Text>
      )}

      {errorMessage && (
        <Text style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSave)}
        style={styles.button}
      >
        Save Work Order
      </Button>

      <Button
        mode="text"
        onPress={() =>
          router.replace({
            pathname: '/overview',
            params: { userId },
          })
        }
        style={styles.button}
      >
        Cancel
      </Button>
    </ScrollView>
  );
}