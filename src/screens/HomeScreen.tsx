import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { SearchBar, Text, Button } from 'react-native-elements';

import { getMembers, GetMembersPayload } from '../api/member';
import MembersList from '../components/MembersList';
import { useAuth } from '../context/auth-context';
import { useDebounce } from '../hooks/useDebounce';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  greetingTitle: {
    marginBottom: 10,
  },
});

type MobilePlatforms = 'ios' | 'android' | 'default';

export default function HomeScreen() {
  // Search bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const { currentUser, signOut } = useAuth();
  const { data, fetchNextPage, isFetching, isFetchingNextPage } =
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

  const platform = Platform.OS as MobilePlatforms;

  return (
    <View style={styles.container}>
      <Text style={styles.greetingTitle} h4>
        Hello, {currentUser?.displayName}.
      </Text>
      <SearchBar
        placeholder="Type here..."
        // @ts-expect-error
        onChangeText={(text) => updateSearch(text)}
        value={searchQuery}
        platform={platform}
      />
      <MembersList
        members={flatData}
        onEndReached={searchQuery === '' ? fetchNextPage : () => {}}
        refreshing={isFetching || isFetchingNextPage}
      />
      <Button title="Sign Out" onPress={() => signOut()} />
      <StatusBar />
    </View>
  );
}
