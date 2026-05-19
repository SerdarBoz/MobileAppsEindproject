import { useCallback, useLayoutEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, Checkbox } from 'react-native-paper';
import { router, useLocalSearchParams, useNavigation, useFocusEffect } from 'expo-router';
import { getAllWorkOrders, getUserById } from '@/db/database';
import { WorkOrder } from '@/types/WorkOrder';
import { User } from '@/types/User';
import { styles } from '@/styles/overview.style';

export default function OverviewScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const navigation = useNavigation();

  const [user, setUser] = useState<User | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        const foundUser = getUserById(Number(userId));
        setUser(foundUser);
      }
      const orders = getAllWorkOrders();
      setWorkOrders(orders);
    }, [userId])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => (
        <Button
          onPress={() => (
            router.push({
              pathname: '/new-workorder',
              params: { userId },
            })
          )}>
          New
        </Button>
      ),
      headerRight: () => (
        <Button onPress={() => router.replace('/login')}>
          Logout
        </Button>
      ),
    });
  }, [navigation, userId]);

  function renderItem({ item }: { item: WorkOrder }) {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/detail/[id]',
            params: { id: item.id, userId },
          })
        }
      >
        <View style={styles.row}>
          <Text style={[styles.cell, styles.cellCity]}>{item.city}</Text>
          <Text style={[styles.cell, styles.cellDevice]}>{item.device}</Text>
          <Text style={[styles.cell, styles.cellCode]}>{item.problemCode}</Text>
          <Text style={[styles.cell, styles.cellName]}>{item.customerName}</Text>
          <View style={[styles.cell, styles.cellProcessed]}>
            <Checkbox
              status={item.processed ? 'checked' : 'unchecked'}
              disabled
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.welcome}>
          Welcome {user.firstName}, {user.lastName}
        </Text>
      )}

      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.cellCity, styles.headerCell]}>City</Text>
        <Text style={[styles.cell, styles.cellDevice, styles.headerCell]}>Device</Text>
        <Text style={[styles.cell, styles.cellCode, styles.headerCell]}>Problem code</Text>
        <Text style={[styles.cell, styles.cellName, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.cellProcessed, styles.headerCell]}>Processed</Text>
      </View>

      <FlatList
        data={workOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No work orders found.</Text>
        }
      />
    </View>
  );
}