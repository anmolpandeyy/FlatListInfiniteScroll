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

//Database backup

// {
//   "book_array": [
//     {
//       "book_title": "The Silence of the Lambs",
//       "image": "http://i.imgur.com/mEa8Hhs.png",
//       "author": "Thomas Harris"
//     },
//     {
//       "book_title": "The Girl with the Dragon Tattoo",
//       "image": "http://i.imgur.com/KMhDOCS.jpg",
//       "author": "Stieg Larsson"
//     },
//     {
//       "book_title": "Kiss the Girls",
//       "image": "http://i.imgur.com/1Mi4eCI.jpg",
//       "author": "James Patterson"
//     },
//     {
//       "book_title": "In Cold Blood",
//       "image": "http://i.imgur.com/nF8D6lo.jpg",
//       "author": "Truman Capote"
//     },
//     {
//       "book_title": "The Da Vinci Code",
//       "image": "http://i.imgur.com/IUopb8k.jpg",
//       "author": "Dan Brown"
//     },
//     {
//       "book_title": "The Shining",
//       "image": "http://i.imgur.com/Ofz8Fzz.jpg",
//       "author": "Stephen King"
//     },
//     {
//       "book_title": "And Then There Were None",
//       "image": "https://lh3.googleusercontent.com/-SJwTH0r43Fg/VSEh1dBH3iI/AAAAAAAABIw/eCbMBuwno9w/h120/51o0UB-9YwL._SY344_BO1%2C204%2C203%2C200_.jpg",
//       "author": "Agatha Christie"
//     },
//     {
//       "book_title": "The Hunt tor Red October",
//       "image": "http://i.imgur.com/94BpAYI.jpg",
//       "author": "Tom Clancy"
//     },
//     {
//       "book_title": "The Hound of the Baskervilles",
//       "image": "http://i.imgur.com/be0zLx0.jpg",
//       "author": "Sir Athur Conan Doyle"
//     },
//     {
//       "book_title": "Dracula",
//       "image": "http://i.imgur.com/1zczIsH.jpg",
//       "author": "Bram Stoker"
//     },
//     {
//       "book_title": "The Stand",
//       "image": "http://i.imgur.com/94WDykQ.jpg",
//       "author": "Stephen King"
//     },
//     {
//       "book_title": "The Bone Collector",
//       "image": "http://i.imgur.com/zwCLZKX.jpg",
//       "author": "Jeffery Deaver"
//     },
//     {
//       "book_title": "Jurassic Park",
//       "image": "https://lh3.googleusercontent.com/-G-eCeJSghbw/VSEh1Yrz2vI/AAAAAAAABI0/Z6-vbKIhNEU/h120/51tn4xOHDqL.jpg",
//       "author": "Michael Crichton"
//     }
//   ]
// }
