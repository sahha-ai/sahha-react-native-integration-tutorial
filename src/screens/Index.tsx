import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import globalStyles from '../global-styles';
import Sahha, { SahhaSensorStatus } from 'sahha-react-native';

const appId = '';
const appSecret = '';
const externalId = 'test-external-id';

const sensorStatusToString = (status: SahhaSensorStatus) => {
  switch (status) {
    case SahhaSensorStatus.pending:
      return 'Pending';
    case SahhaSensorStatus.disabled:
      return 'Disabled';
    case SahhaSensorStatus.enabled:
      return 'Enabled';
    default:
      return 'Unavailable';
  }
};

function Index(): JSX.Element {
  const [authentication, setAuthentication] = useState({
    loading: false,
    authenticated: false,
  });
  const [sensorStatus, setSensorStatus] = useState({
    loading: true,
    status: SahhaSensorStatus.pending,
  });

  useEffect(() => {
    getSahhaSensorStatus();
  }, []);

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

  const getSahhaSensorStatus = () => {
    setSensorStatus({ ...sensorStatus, loading: true });

    Sahha.getSensorStatus((error, status) => {
      console.log(`Sahha get sensor status success: ${!error}`);
      setSensorStatus({ loading: false, status });

      if (error) {
        console.log(`Sahha get sensor status error: ${error}`);
      }
    });
  };

  const enableSahhaSensors = () => {
    setSensorStatus({ ...sensorStatus, loading: true });

    Sahha.enableSensors((error, status) => {
      console.log(`Sahha enable sensors success: ${!error}`);
      setSensorStatus({ loading: false, status });

      if (error) {
        console.log(`Sahha enable sensors error: ${error}`);
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

      <View style={{ gap: 12 }}>
        <Text>
          {sensorStatus.loading
            ? 'Getting sensor status...'
            : `Sensor status: ${sensorStatusToString(sensorStatus.status)}`}
        </Text>

        {sensorStatus.status === SahhaSensorStatus.unavailable && (
          <Text>Sensors are unavailable on this device</Text>
        )}

        <Button
          title="Enable sensors"
          onPress={enableSahhaSensors}
          disabled={
            sensorStatus.loading ||
            sensorStatus.status !== SahhaSensorStatus.pending
          }
        />

        {sensorStatus.status === SahhaSensorStatus.disabled && (
          <Button
            title="Open app settings"
            onPress={() => Sahha.openAppSettings()}
          />
        )}
      </View>
    </View>
  );
}

export default Index;
