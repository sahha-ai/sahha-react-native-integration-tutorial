import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import globalStyles from '../global-styles';
import { SafeAreaView } from 'react-native-safe-area-context';

function Index(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.scrollContainer}>
        <Text>Index screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
