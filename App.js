import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url =
      "http://www.json-generator.com/api/json/get/cwqvQqjRmG?indent=2";

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.book_array,
          isLoading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          refreshing: false
        });
        console.log(error);
      });
  };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginBottom: 3
        }}
      >
        <Image
          style={{ height: 80, width: 80, margin: 5 }}
          source={{ uri: item.image }}
        />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 5 }}>
          <Text style={{ fontSize: 18, color: "green", marginBottom: 15 }}>
            {item.book_title}
          </Text>
          <Text style={{ fontSize: 16, color: "red" }}>{item.author}</Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "77%",
          backgroundColor: "#CED0CE",
          marginLeft: "23%"
        }}
      />
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  render() {
    return this.state.isLoading ? (
      <View>
        <ActivityIndicator animating color="#330066" size="large" />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
