import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  AsyncStorage
} from "react-native";

// http://www.json-generator.com/api/json/get/cwqvQqjRmG?indent=2

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
      refreshing: false,
      page: 1
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const url = `https://examjoy.com/api/v1/results?page=${this.state.page}`;
    this.setState({
      isLoading: true
    });
    setTimeout(() => {
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
            dataSource: [...this.state.dataSource, ...responseJson.exams],
            isLoading: false,
            refreshing: false,
            page: 1
          })
        )
        .catch(error => {
          console.log(error);
        });
    }, 1000);
  };

  renderItem = ({ item }) => {
    const name = `${item.name} - `;
    const date = item.date;
    const duration = item.duration;

    return (
      <View
        style={{
          flex: 1,
          margin: 5,
          height: 80,
          justifyContent: "space-around"
        }}
      >
        <Text style={{ padding: 5, fontSize: 14, color: "steelblue" }}>
          {date}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "grey", color: "#ff9933" }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "grey",
              marginLeft: 5,
              color: "#ff4d4d"
            }}
          >
            {`${duration} minutes`}
          </Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }

    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" color="#330066" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => this.makeRemoteRequest()
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => this.makeRemoteRequest()
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          extraData={this.state.isLoading}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
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

//url = `https://examjoy.com/api/v1/results?page=${this.state.page}`
//Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50X2lkIjoxLCJqdGkiOiJlODdkNDI0OS0zOThiLTQ5Y2YtOGQ2My02MzFkMWExOTBiMGQiLCJpYXQiOjE1NDIwOTMzNTF9.W56tuuNL5Qvi-R6JjhAB_s_9vGzxEoswfv0kNntLkwg"
