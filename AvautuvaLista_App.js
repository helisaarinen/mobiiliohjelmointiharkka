import * as React from 'react';
import { List } from 'react-native-paper';
import { View, Text } from 'react-native';



//Avautuva lista List.Accordion
//Ohjeet-sivulle
const MyComponent = () => {
  const [expanded, setExpanded] = React.useState({}); // State for tracking expanded items

  // Function to toggle the expansion of an item
  const handlePress = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Function to render content for each accordion
  const renderContent = (contentText) => {
    return (
      <View>
        <Text>{contentText}</Text>
      </View>
    );
  };

  const ohje=()=>{
    return(
      <View><Text>ohjesivu aukee tähän</Text></View>
    )
  }

  return (
    <List.Section //title="Accordions"
    >
      {/* First Accordion */}
      <List.Accordion
        title="Eka aihe"
        //left={props => <List.Icon {...props} icon="folder" />}
        style={{backgroundColor:'lightblue', margin:10, borderRadius:10}}
        expanded={expanded[0]} // Check if the accordion is expanded based on its index
        onPress={() => handlePress(0)} // Pass the index to the handlePress function
      >
        {/* Render content for the first accordion */}
        {renderContent(ohje())}
      </List.Accordion>

      {/* Second Accordion */}
      <List.Accordion
        title="Toinen aihe"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded[1]} // Check if the accordion is expanded based on its index
        onPress={() => handlePress(1)} // Pass the index to the handlePress function
      >
        {/* Render content for the second accordion */}
        {renderContent("toinen sisältö")}

      </List.Accordion>
    </List.Section>
  );
};

export default MyComponent;


/*
import * as React from 'react';
import { List } from 'react-native-paper';

import { View, Text } from 'react-native';

const MyComponent = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);


  const sisalto=()=>{
    return(
      <View><Text>TEKSLTKSJ</Text></View>
    )
  }

  return (
    <List.Section title="Accordions">
      <List.Accordion
        title="Eka aihe"
        style={{backgroundColor:'yellow'}}
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default MyComponent;*/