import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {fetchStory} from './redux/actions/story.action';
import Card from './component/Card';

const RootComponent = props => {
  const {fetchStory, story} = props;
  useEffect(() => {
    fetchStory();
  }, []);
  if (story.isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  } else
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={story.story}
          keyExtractor={item => {
            return item.objectID;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={item => {
            return (
              <Card
                title={item.item.title}
                createdAt={item.item.created_at}
                url={item.item.url}
                author={item.item.author}
                //   onPress={this.showModal(item)}
              />
            );
          }}
        />
      </View>
    );
};

const mapStateToProps = state => {
  return {
    story: state.story,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStory: () => dispatch(fetchStory()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
});
