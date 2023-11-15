import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import globalStyles from '../global-styles';
import Sahha from 'sahha-react-native';

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

  const postSahhaDemographic = () => {
    const demographic = {
      age: 35, // number
      gender: 'Female', // string, "Male", "Female", "Gender Diverse",
      country: 'NZ', // ISO 2 digit code, i.e. "US", "UK", "AU", etc.
      birthCountry: 'UK', // ISO 2 digit code, i.e. "US", "UK", "AU", etc.
      birthDate: '1990-05-20', // must be in format "YYYY-MM-DD", i.e. "1990-05-20"
    };

    Sahha.postDemographic(demographic, (error, success) => {
      console.log(`Sahha post demographic success: ${success}`);

      if (error) {
        console.log(`Sahha post demographic error: ${error}`);
      }
    });
  };

  const getSahhaDemographic = () => {
    Sahha.getDemographic((error, value) => {
      console.log(`Sahha get demographic success: ${!error}`);

      if (error) {
        console.log(`Sahha get demographic error: ${error}`);
      } else if (value) {
        console.log(value);
      }
    });
  };

  return (
    <View style={[globalStyles.container, { gap: 24 }]}>
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

      <View style={{ gap: 12 }}>
        <Text>Demographic</Text>
        <Button
          title="Post demographic"
          onPress={postSahhaDemographic}
          disabled={!authentication.authenticated}
        />
        <Button
          title="Get demographic"
          onPress={getSahhaDemographic}
          disabled={!authentication.authenticated}
        />
      </View>
    </View>
  );
}

export default Index;
