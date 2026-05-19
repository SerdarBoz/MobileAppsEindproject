import { useCallback, useLayoutEffect, useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { getWorkOrderById, updateWorkOrder, reopenWorkOrder } from '@/db/database';
import { WorkOrder } from '@/types/WorkOrder';
import { styles } from '@/styles/detail.style';

export default function DetailScreen() {
  const { id, userId } = useLocalSearchParams<{ id: string; userId: string }>();
  const navigation = useNavigation();

  const [workOrder, setWorkOrder] = useState<WorkOrder | null>(null);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [repairInfo, setRepairInfo] = useState('');
  const repairInfoRef = useRef('');
  const originalRepairInfoRef = useRef('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReopened, setIsReopened] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const order = getWorkOrderById(Number(id));
      setWorkOrder(order);

      const info = order?.repairInformation ?? '';
      setRepairInfo(info);
      repairInfoRef.current = info;

      setMode(order?.processed ? 'view' : 'edit');
      setErrorMessage(null);
      setIsReopened(false);
    }, [id])
  );


  useLayoutEffect(() => {
    if (!workOrder) return;

    if (mode === 'edit') {
      navigation.setOptions({
        headerShown: true,
        title: '',
        headerBackVisible: false,
        headerLeft: () => null,
        headerRight: () => (
          <View style={styles.headerButtons}>
            <Text style={styles.saveButton} onPress={isReopened ? handleReopenSave : handleSave}>
              V Save
            </Text>
            <Text style={styles.cancelButton} onPress={isReopened ? handleReopenCancel : handleCancel}>
              X Cancel
            </Text>
          </View>
        ),
      });
      return;
    }

    if (workOrder.processed && mode === 'view') {
      navigation.setOptions({
        headerShown: true,
        title: '',
        headerBackVisible: true,
        headerLeft: undefined,
        headerRight: () => (
          <Text style={styles.reopenButton} onPress={handleReopen}>
            Reopen
          </Text>
        ),
      });
      return;
    }
  }, [navigation, workOrder, mode, isReopened]);

  function handleCancel() {
    setRepairInfo(workOrder?.repairInformation ?? '');
    repairInfoRef.current = workOrder?.repairInformation ?? '';
    setErrorMessage(null);

    router.replace({
      pathname: '/overview',
      params: { userId },
    });
  }

  function handleSave() {
    if (!repairInfoRef.current.trim()) {
      setErrorMessage('Not saved. No repair information was entered!');
      return;
    }
    updateWorkOrder(Number(id), repairInfoRef.current.trim());
    router.replace({
      pathname: '/overview',
      params: { userId },
    });
  }

  function handleReopen() {
    originalRepairInfoRef.current = workOrder?.repairInformation ?? '';
    reopenWorkOrder(Number(id));
    const updated = getWorkOrderById(Number(id));
    setWorkOrder(updated);
    setRepairInfo('');
    repairInfoRef.current = '';
    setIsReopened(true);
    setMode('edit');
    setErrorMessage(null);
  }

  function handleReopenSave() {
    if (!repairInfoRef.current.trim()) {
      setErrorMessage('Not saved. No repair information was entered!');
      return;
    }
    updateWorkOrder(Number(id), repairInfoRef.current.trim());
    const updated = getWorkOrderById(Number(id));
    setWorkOrder(updated);
    setRepairInfo(updated?.repairInformation ?? '');
    repairInfoRef.current = updated?.repairInformation ?? '';
    setIsReopened(false);
    setMode('view');
    setErrorMessage(null);
  }

  function handleReopenCancel() {
    updateWorkOrder(Number(id), originalRepairInfoRef.current);
    const updated = getWorkOrderById(Number(id));
    setWorkOrder(updated);
    setRepairInfo(updated?.repairInformation ?? '');
    repairInfoRef.current = updated?.repairInformation ?? '';
    originalRepairInfoRef.current = '';
    setIsReopened(false);
    setMode('view');
    setErrorMessage(null);
  }

  if (!workOrder) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.sectionTitle}>Detailed problem description:</Text>
      <Text style={styles.descriptionText}>
        {workOrder.detailedProblemDescription}
      </Text>

      <Text style={styles.sectionTitle}>Repair information:</Text>

      {!workOrder.processed && mode === 'edit' && (
        <>
          <TextInput
            value={repairInfo}
            onChangeText={(text) => {
              setRepairInfo(text);
              repairInfoRef.current = text;
              setErrorMessage(null);
            }}
            multiline
            numberOfLines={6}
            style={styles.textarea}
            placeholder="Repair information"
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </>
      )}

      {!workOrder.processed && mode === 'view' && (
        <Text style={styles.repairText}>
          {workOrder.repairInformation || '(not yet filled in)'}
        </Text>
      )}

      {workOrder.processed && mode === 'view' && (
        <Text style={styles.repairText}>
          {workOrder.repairInformation}
        </Text>
      )}

      {workOrder.processed && mode === 'edit' && (
        <>
          <TextInput
            value={repairInfo}
            onChangeText={(text) => {
              setRepairInfo(text);
              repairInfoRef.current = text;
              setErrorMessage(null);
            }}
            multiline
            numberOfLines={6}
            style={styles.textarea}
            placeholder="Repair information"
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </>
      )}

    </ScrollView>
  );
}