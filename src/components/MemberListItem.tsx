import * as React from 'react';
import { StyleSheet, View, Linking, Platform, Alert } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';

import { Member } from '../api/member';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
});

interface MemberListItemProps {
  member: Member;
}

export default function MemberListItem({ member }: MemberListItemProps) {
  const sendEmailTo = () => {
    Linking.openURL(`mailto:${member.email}`);
  };

  const callPhoneNumber = () => {
    Linking.openURL(`tel:${member.phone}`);
  };

  const openMap = async () => {
    const destination = encodeURIComponent(
      `${member.address.street} ${member.address.zip}, ${member.address.city}`
    );
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `http://maps.${provider}.com/?daddr=${destination}`;

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      Alert.alert('Error', 'Cannot open map URL.');
    }
  };

  return (
    <ListItem key={member.id} bottomDivider>
      <Avatar
        rounded
        size="medium"
        source={{
          uri: member.avatar,
        }}
      />
      <ListItem.Content style={styles.container}>
        <ListItem.Title>{member.name}</ListItem.Title>
        {member.email && <ListItem.Subtitle>{member.email}</ListItem.Subtitle>}
        {member.phone && <ListItem.Subtitle>{member.phone}</ListItem.Subtitle>}
        {member.address && (
          <>
            <ListItem.Subtitle>{member.address.street}</ListItem.Subtitle>
            <ListItem.Subtitle>
              {member.address.city}, {member.address.state} {member.address.zip}
            </ListItem.Subtitle>
          </>
        )}
        <View style={styles.actions}>
          <Icon
            type="ionicons"
            name="mail"
            disabled={!member.email}
            reverse
            size={18}
            onPress={sendEmailTo}
          />
          <Icon
            type="font-awesome-5"
            name="phone-alt"
            disabled={!member.phone}
            reverse
            size={18}
            onPress={callPhoneNumber}
          />
          <Icon
            type="font-awesome-5"
            name="map-marked-alt"
            disabled={!member.address}
            reverse
            size={18}
            onPress={openMap}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );
}
