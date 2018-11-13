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
      dataSource: [],
      page: 1,
      isLoading: true,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({
      isLoading: true
    });
    const url = `https://examjoy.com/api/v1/results?page=${this.state.page}`;
    setTimeout(() => {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJzdHVkZW50X2lkIjoxLCJqdGkiOiJlODdkNDI0OS0zOThiLTQ5Y2YtOGQ2My02MzFkMWExOTBiMGQiLCJpYXQiOjE1NDIwOTMzNTF9.W56tuuNL5Qvi-R6JjhAB_s_9vGzxEoswfv0kNntLkwg"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataSource: [...this.state.dataSource, ...responseJson.exams],
            page: 1,
            isLoading: false,
            refreshing: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, 1500);
  };

  renderItem = ({ item }) => {
    const name = `${item.name} - `;
    const date = item.date;
    const duration = `${item.duration} mins`;
    return (
      <View style={{ height: 80, margin: 5 }}>
        <Text style={{ fontSize: 18, color: "#72c1fa" }}>{date}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 18, color: "#6cb354" }}>{name}</Text>
          <Text style={{ fontSize: 17, color: "#fa8072" }}>{duration}</Text>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
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
        refreshing: true,
        page: 1
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
