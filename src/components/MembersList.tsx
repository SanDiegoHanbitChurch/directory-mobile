import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { Member } from '../api/member';
import MemberListItem from './MemberListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 20,
  },
});

interface MembersListProps {
  members: Member[];
  onEndReached: () => void;
  refreshing: boolean;
}

export default function MembersList({
  members = [],
  onEndReached,
  refreshing,
}: MembersListProps) {
  const renderItem = (member: Member) => <MemberListItem member={member} />;

  return (
    <View style={[styles.container, styles.list]}>
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
      />
    </View>
  );
}
