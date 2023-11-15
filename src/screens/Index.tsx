import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import globalStyles from '../global-styles';
import Sahha from 'sahha-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const appId = '';
const appSecret = '';
const externalId = 'test-external-id';

function Index(): JSX.Element {
  const [authentication, setAuthentication] = useState({
    loading: false,
    authenticated: false,
  });

  const authenticateSahha = () => {
    setAuthentication({ ...authentication, loading: true });

    Sahha.authenticate(appId, appSecret, externalId, (error, success) => {
      console.log(`Sahha authentication success: ${success}`);
      setAuthentication({ loading: false, authenticated: success });

      if (error) {
        console.log(`Sahha authentication error: ${error}`);
      }
    });
  };

  const deauthenticateSahha = () => {
    setAuthentication({ ...authentication, loading: true });

    Sahha.deauthenticate((error, success) => {
      console.log(`Sahha deauthentication success: ${success}`);
      setAuthentication({ loading: false, authenticated: !success });

      if (error) {
        console.log(`Sahha deauthentication error: ${error}`);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.scrollContainer}>
        <View style={{ gap: 12 }}>
          <Text>
            {authentication.loading
              ? 'Authenticating...'
              : `Authenticated: ${authentication.authenticated}`}
          </Text>
          <Button
            title="Authenticate Sahha"
            onPress={authenticateSahha}
            disabled={authentication.loading}
          />
          <Button
            title="Deauthenticate Sahha"
            onPress={deauthenticateSahha}
            disabled={authentication.loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
