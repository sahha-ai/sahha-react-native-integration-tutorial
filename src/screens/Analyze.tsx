import { Button, ScrollView, Text, View } from 'react-native';
import globalStyles from '../global-styles';
import { useState } from 'react';
import Sahha from 'sahha-react-native';

function Analyze(): JSX.Element {
  const [analysis, setAnalysis] = useState({ loading: false, data: null });

  const analyzePast24Hours = () => {
    setAnalysis({ loading: true, data: null });

    Sahha.analyze((error, value) => {
      console.log(`Sahha analyze past 24 hours success: ${!error}`);
      setAnalysis({ loading: false, data: JSON.parse(value) });

      if (error) {
        console.log(`Sahha analyze past 24 hours error: ${error}`);
      }
    });
  };

  const analyzePastSevenDays = () => {
    const endDate: Date = new Date();
    const days = endDate.getDate() - 7;
    const startDate = new Date();
    startDate.setDate(days);

    setAnalysis({ loading: true, data: null });

    Sahha.analyzeDateRange(
      startDate.getTime(),
      endDate.getTime(),
      (error, value) => {
        console.log(`Sahha analyze past seven days success: ${!error}`);
        setAnalysis({ loading: false, data: JSON.parse(value) });

        if (error) {
          console.log(`Sahha analyze past seven days error: ${error}`);
        }
      },
    );
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={globalStyles.scrollContainer}>
      <View style={{ gap: 12 }}>
        <Button
          title="Past 24 hours"
          onPress={analyzePast24Hours}
          disabled={analysis.loading}
        />
        <Button
          title="Past seven days"
          onPress={analyzePastSevenDays}
          disabled={analysis.loading}
        />

        {analysis.data && (
          <>
            <Text>Analysis:</Text>
            <Text>{JSON.stringify(analysis.data, null, 2)}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default Analyze;
