import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchStory} from './redux/actions/story.action';
import Modal from 'react-native-modal';

import Card from './component/Card';

const RootComponent = props => {
  const txtSearch = useRef(null);
  const {fetchStory, story} = props;
  const [gotStories, setGotStories] = useState([]);
  const [gotStoriesFiltered, setGotStoriesFiltered] = useState([]);
  const [noData, setNoData] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [json, setJson] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStory(false);
    setTimeout(() => {
      setGotStories(story.story);
      setGotStoriesFiltered(story.story);
    }, 3000);
  }, []);

  const closeModal = () => {
    setIsModal(false);
    setJson(null);
  };

  const getStories = scroll => {
    !scroll ? fetchStory(false) : fetchStory(true);
  };

  const filterStories = stateFilter => {
    let text = stateFilter.toLowerCase();
    let stateArr = gotStories;
    let filteredStateArr = stateArr.filter(item => {
      return (
        (item.title && item.title.toLowerCase().match(text)) ||
        (item.created_at && item.created_at.toLowerCase().match(text))
      );
      // item.created_at.toLowerCase().match(text) ||
      // item.author.toLowerCase().match(text) ||
      // item.url.toLowerCase().match(text)
    });
    if (!text || text === '') {
      setGotStoriesFiltered(gotStories);
    } else if (!Array.isArray(filteredStateArr) && !filteredStateArr.length) {
      // set no data flag to true so as to render flatlist conditionally
      setNoData(true);
    } else if (Array.isArray(filteredStateArr)) {
      setNoData(false);
      setGotStoriesFiltered(filteredStateArr);
    }
  };

  if (story.isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              ref={txtSearch}
              placeholder="Search"
              underlineColorAndroid="transparent"
              onChangeText={text => {
                setSearch(text);
                filterStories(text);
              }}
            />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={gotStoriesFiltered}
          keyExtractor={item => {
            return item.objectID;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          onRefresh={() => getStories(false)}
          onEndReached={() => getStories(true)}
          onEndReachedThreshold={0.1}
          refreshing={story.isLoading}
          renderItem={item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setJson(JSON.stringify(item));
                  setIsModal(true);
                }}>
                <Card
                  title={item.item.title}
                  created_at={item.item.created_at}
                  url={item.item.url}
                  author={item.item.author}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Modal isVisible={isModal} onBackdropPress={() => closeModal()}>
          <View
            style={{flex: 0.5, paddingHorizontal: 10, backgroundColor: '#fff'}}>
            <TouchableOpacity
              style={{alignItems: 'flex-end', padding: 20}}
              onPress={() => closeModal()}>
              <ScrollView>
                <Text style={{fontSize: 20}}>X</Text>
              </ScrollView>
            </TouchableOpacity>
            <Text>{json}</Text>
          </View>
        </Modal>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    story: state.story,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStory: scroll => dispatch(fetchStory(scroll)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  formContent: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
});
