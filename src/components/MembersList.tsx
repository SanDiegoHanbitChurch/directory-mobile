import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { Member } from '../api/member';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 50,
    paddingHorizontal: '5%',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});

interface MembersListProps {
  members: Member[];
  onEndReached: () => void;
  refreshing: boolean;
}

export default function MembersList({
  members,
  onEndReached,
  refreshing,
}: MembersListProps) {
  const renderItem = (member: Member) => (
    <View style={styles.item} key={member.id}>
      <Image
        source={{
          uri: member.avatar,
        }}
        style={styles.avatar}
      />
      <View style={styles.container}>
        <Text>{member.name}</Text>
        <Text>{member.email}</Text>
        <Text>{member.phone}</Text>
      </View>
      <View />
    </View>
  );

  return (
    <View style={[styles.container, styles.list]}>
      <FlatList
        data={members}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
      />
    </View>
  );
}
