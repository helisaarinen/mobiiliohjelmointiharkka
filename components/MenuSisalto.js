import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Menu, Divider, Provider } from 'react-native-paper';

export default function MenuSisalto() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button title='buttoni' onPress={openMenu}>Show menu</Button>}>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

