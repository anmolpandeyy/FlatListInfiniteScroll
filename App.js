import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: ["w"]
    };
  }

  makeRemoteRequest = () => {
    const url = "https://examjoy.com/api/v1/results?page=1";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50X2lkIjoxLCJqdGkiOiJlODdkNDI0OS0zOThiLTQ5Y2YtOGQ2My02MzFkMWExOTBiMGQiLCJpYXQiOjE1NDIwOTMzNTF9.W56tuuNL5Qvi-R6JjhAB_s_9vGzxEoswfv0kNntLkwg"
      }
    })
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          dataSource: responseJson.exams
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.date}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

//url:"https://examjoy.com/api/v1/results?page=1"
// {
//   method: "GET",
//   headers: {
//     Authorization:
//       "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50X2lkIjoxLCJqdGkiOiJlODdkNDI0OS0zOThiLTQ5Y2YtOGQ2My02MzFkMWExOTBiMGQiLCJpYXQiOjE1NDIwOTMzNTF9.W56tuuNL5Qvi-R6JjhAB_s_9vGzxEoswfv0kNntLkwg"
//   }
