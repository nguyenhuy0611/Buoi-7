import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, FlatList, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { TextInput } from 'react-native-web';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  // Fetch users from API using axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://66fc9741c3a184a84d176b30.mockapi.io/user');
      setUsers(response.data);  // Assuming the API returns an array of users with id and name
      setLoading(false);
    } catch (error) {
      Alert.alert('Error fetching data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component is mounted
  }, []);

  const handleAdd = async () => {
    try {
      const response = await axios.post('https://66fc9741c3a184a84d176b30.mockapi.io/user', { name: name });
      if (response && response.status === 201) {
        console.log('User added:', response.data);
        fetchUsers();
        setName("")
      } else {
        Alert.alert('Error adding user');
      }
    } catch (error) {
      console.log('Error adding user:', error);
      Alert.alert('Error adding user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://66fc9741c3a184a84d176b30.mockapi.io/user/${id}`);
      console.log(response);
      if (response && response.status === 200) {
        console.log('User delete:', response.data);
        fetchUsers();
      } else {
        Alert.alert('Error delete user');
      }
    } catch (error) {
      console.log('Error delete user:', error);
      Alert.alert('Error delete user');
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setId(item.id)

  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://66fc9741c3a184a84d176b30.mockapi.io/user/${id}`, { name });
      console.log(response);
      if (response && response.status === 200) {
        console.log('User update ok');
        fetchUsers();
      } else {
        Alert.alert('Error delete user');
      }
    } catch (error) {
      console.log('Error delete user:', error);
      Alert.alert('Error delete user');
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={styles.item}>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEdit(item)} color="orange" />
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add" onPress={handleAdd} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={() => handleUpdate()} color="red" />
      </View>
      <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
        Danh sách người dùng
      </Text>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
  },
  buttonContainer: {
    margin: 10,
    width: 200,
  },
  flatList: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  item: {
    display: "flex",
    flexDirection: "row",
    gap: 15
  }
});

export default App;
