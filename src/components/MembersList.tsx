import { AxiosError } from 'axios';
import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useInfiniteQuery } from 'react-query';

import { Member, getAllMembers, GetAllMembersPayload } from '../api/member';
import { useAuth } from '../context/auth-context';

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

function MembersList() {
  const { currentUser } = useAuth();
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery<GetAllMembersPayload, AxiosError>(
      'members',
      ({ pageParam }) => getAllMembers(currentUser!, pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
      }
    );

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

  const flattenData = data?.pages
    ? data?.pages?.flatMap((page) => [...page.data])
    : [];

  // eslint-disable-next-line no-nested-ternary
  return status === 'loading' ? (
    <View style={[styles.container, styles.loadingOrError]}>
      <ActivityIndicator size="large" />
    </View>
  ) : status === 'error' ? (
    <View style={[styles.container, styles.loadingOrError]}>
      <Text>Error: {error?.message}</Text>
    </View>
  ) : (
    <View style={[styles.container, styles.list]}>
      <FlatList
        data={flattenData}
        renderItem={({ item }) => renderItem(item)}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.1}
        refreshing={isFetching || isFetchingNextPage}
      />
    </View>
  );
}

export default MembersList;
