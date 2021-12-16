import * as React from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableHighlight,
  Button,
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { composeAsync } from 'expo-mail-composer';
import { isAvailableAsync, sendSMSAsync } from 'expo-sms';
import {
  getContactsAsync,
  Contact,
  EMAILS,
  PHONE_NUMBERS,
} from 'expo-contacts';
// @ts-ignore
import { groupBy } from 'lodash';

// Is this redux?
type ContactsState = {
  loading: boolean;
  error: Error | null;
  data: Array<Contact>;
};

function useContacts() {
  const [contacts, setContacts] = React.useState<ContactsState>({
    loading: true,
    error: null,
    data: [],
  });
  React.useEffect(() => {
    const fetchContacts = async () => {
      try {
        let { status } = await Permissions.getAsync(Permissions.CONTACTS);
        if (status !== Permissions.PermissionStatus.GRANTED) {
          // TODO: Handle permissions denied.
          await Permissions.askAsync(Permissions.CONTACTS);
        }
        const data = await getContactsAsync({
          fields: [EMAILS, PHONE_NUMBERS],
        });
        setContacts(state => ({
          loading: false,
          error: null,
          data: state.data.concat(data.data),
        }));
      } catch (ex) {
        setContacts({
          loading: false,
          error: ex,
          data: [],
        });
      }
    };

    fetchContacts();
  }, []);

  return contacts;
}

type ContactRowProps = {
  name: string;
  emailOrNumber: string;
  onPress: () => void;
  selected: boolean;
};

const ContactRow = React.memo(
  ({ onPress, name, emailOrNumber, selected }: ContactRowProps) => {
    return (
      <TouchableHighlight onPress={onPress}>
        <View
          style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 16 }}>{selected ? '✅' : '⭕️'}</Text>
          <View style={{ flex: 1 }}>
            <Text>{name || emailOrNumber}</Text>
            {name.length > 0 && (
              <Text style={{ marginTop: 4, color: '#666' }}>
                {emailOrNumber}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
);

type RowItem = {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
};

function InviteScreen() {
  const contacts = useContacts();

  const [selectedContacts, setSelectedContacts] = React.useState<RowItem[]>([]);
  const sections = React.useMemo(() => {
    // @ts-ignore
    return Object.entries(
      groupBy(
        // Create one contact per phone number and email.
        contacts.data.reduce(
          (res, cur) => {
            if (cur.phoneNumbers != null) {
              for (const p of cur.phoneNumbers) {
                res.push({
                  id: cur.id + p.number,
                  name: cur.name || '',
                  phoneNumber: p.number,
                });
              }
            }
            if (cur.emails != null) {
              for (const e of cur.emails) {
                res.push({
                  id: cur.id + e.email,
                  name: cur.name || '',
                  email: e.email,
                });
              }
            }
            return res;
          },
          [] as Array<RowItem>
        ),
        (c: RowItem) => {
          const firstChar = (c.name.charAt(0) || '#').toLowerCase();
          return firstChar.match(/[a-z]/) ? firstChar : '#';
        }
      )
    )
      .map(([key, value]: [string, RowItem[]]) => ({
        key,
        data: value.sort((a, b) =>
          (a.name || a.name || '') < (b.name || b.name || '') ? -1 : 1
        ),
      }))
      .sort((a: { key: string }, b: { key: string }) =>
        a.key < b.key ? -1 : 1
      );
  }, [contacts.data]);

  const onInvitePress = async () => {
    let didShare = false;
    const message = `Join my cool app`;
    const emails = selectedContacts
      .filter(c => c.email != null)
      .map(c => c.email) as string[];
    const phoneNumbers = selectedContacts
      .filter(c => c.phoneNumber != null)
      .map(c => c.phoneNumber) as string[];
    if (emails.length > 0) {
      try {
        const result = await composeAsync({
          recipients: emails,
          subject: 'Hello friend',
          body: message,
          isHtml: false,
        });
        didShare = didShare || result.status === 'sent';
      } catch (ex) {
        Alert.alert(ex.message);
      }
    }
    if (phoneNumbers.length > 0 && (await isAvailableAsync())) {
      try {
        const result = await sendSMSAsync(phoneNumbers, message);
        didShare = didShare || result.result === 'sent';
      } catch (ex) {
        Alert.alert(ex.message);
      }
    }

    if (didShare) {
      Alert.alert('Thanks for sharing!!');
    }
  };

  if (contacts.loading) {
    return <Text>Loading...</Text>;
  } else if (contacts.error != null) {
    return <Text>Oh no error :( {contacts.error.message}</Text>;
  } else {
    return (
      <>
        <Text
          style={{
            paddingTop: 28,
            paddingBottom: 8,
            paddingHorizontal: 16,
            fontSize: 22,
          }}>
          Invite friends
        </Text>
        <SectionList
          sections={sections}
          renderSectionHeader={({ section }) => (
            <Text
              style={{
                backgroundColor: '#eee',
                paddingHorizontal: 16,
                paddingVertical: 4,
              }}>
              {section.key!.toUpperCase()}
            </Text>
          )}
          renderItem={({ item }: { item: RowItem }) => {
            const selectedIndex = selectedContacts.findIndex(
              i => i.id === item.id
            );
            const onPress = () => {
              const newContacts = [...selectedContacts];
              if (selectedIndex >= 0) {
                newContacts.splice(selectedIndex, 1);
              } else {
                newContacts.push(item);
              }
              setSelectedContacts(newContacts);
            };
            return (
              <ContactRow
                name={item.name}
                emailOrNumber={(item.email || item.phoneNumber)!}
                selected={selectedIndex >= 0}
                onPress={onPress}
              />
            );
          }}
          extraData={selectedContacts}
          contentContainerStyle={{ paddingBottom: 104 }}
        />
        <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, padding: 8 }}>
          <Button
            title={`Invite (${selectedContacts.length})`}
            onPress={onInvitePress}
            disabled={selectedContacts.length === 0}
          />
        </View>
      </>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <InviteScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
