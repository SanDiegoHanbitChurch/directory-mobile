import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Member } from '../api/member';
import { useMembers } from '../hooks/member';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingOrError: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingVertical: 50,
    paddingHorizontal: '5%',
  },
  item: {
    flex: 1,
    paddingVertical: 20,
  },
  separator: {},
});

function Members() {
  const { data, isLoading, isError, refetch } = useMembers();

  const renderItem = (member: Member) => (
    <View style={styles.item}>
      <Text>{member.name}</Text>
      <Text>{member.email}</Text>
      <Text>{member.phone}</Text>
      <View />
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingOrError]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.loadingOrError]}>
        <Text>Error loading members.</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.list]}>
      <FlatList data={data} renderItem={({ item }) => renderItem(item)} />
    </View>
  );
}

export default Members;
