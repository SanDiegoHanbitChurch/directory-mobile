import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';

import { getAllMembers, GetAllMembersPayload } from '../api/member';
import MembersList from '../components/MembersList';
import { useAuth } from '../context/auth-context';
import LoadingView from '../components/LoadingView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: '5%',
  },
});

export default function HomeScreen() {
  const { currentUser, signOut } = useAuth();
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery<GetAllMembersPayload, AxiosError>(
      'members',
      ({ pageParam }) => getAllMembers(currentUser!, pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
      }
    );

  if (status === 'loading') {
    return <LoadingView message="Getting members..." />;
  }
  if (status === 'error') {
    return (
      <View style={styles.container}>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  const flatData = data?.pages
    ? data?.pages?.flatMap((page) => [...page.data])
    : [];

  return (
    <View style={styles.container}>
      <Text>Current User: {currentUser?.email}</Text>
      <MembersList
        members={flatData}
        onEndReached={fetchNextPage}
        refreshing={isFetching || isFetchingNextPage}
      />
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}
