import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { SearchBar } from 'react-native-elements';

import { getMembers, GetMembersPayload } from '../api/member';
import MembersList from '../components/MembersList';
import { useAuth } from '../context/auth-context';
import { useDebounce } from '../hooks/useDebounce';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: '5%',
  },
});

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { currentUser, signOut } = useAuth();
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery<GetMembersPayload, AxiosError>(
      ['members', debouncedSearchQuery],
      ({ pageParam }) =>
        getMembers(currentUser!, debouncedSearchQuery, pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.nextOffset,
      }
    );

  const updateSearch = (search: string) => {
    setSearchQuery(search);
  };

  const flatData = data?.pages
    ? data?.pages?.flatMap((page) => [...page.data])
    : [];

  return (
    <View style={styles.container}>
      <Text>Current User: {currentUser?.email}</Text>
      <SearchBar
        placeholder="Type here..."
        // @ts-expect-error
        onChangeText={(text) => updateSearch(text)}
        value={searchQuery}
        lightTheme
      />
      <MembersList
        members={flatData}
        onEndReached={searchQuery === '' ? fetchNextPage : () => {}}
        refreshing={isFetching || isFetchingNextPage}
      />
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}
