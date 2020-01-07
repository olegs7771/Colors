import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

import {connect} from 'react-redux';
import {sendPost} from '../store/actions/postAction';

export class PostScreen extends Component {
  state = {
    form: {
      post: '',
    },
  };

  _sendPost = async () => {
    const data = {
      post: this.state.form.post,
    };
    await this.props.sendPost(data);
  };
  render() {
    const {choosen} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text
            style={
              choosen ? {color: '#ffffff', fontSize: 20} : styles.textTitle
            }>
            {' '}
            Post here{' '}
          </Text>
        </View>
        {this.props.post.post && (
          <View style={styles.containerPost}>
            <Text
              style={
                choosen ? {color: '#ffffff', fontSize: 16} : styles.textPost
              }>
              Post :{this.props.post.post}
            </Text>
          </View>
        )}
        <View style={styles.containerTextInput}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            value={this.state.form.post}
            placeholder="Message.."
            onChangeText={text =>
              this.setState(prevState => {
                return {form: {...prevState.form, post: text}};
              })
            }
          />
        </View>
        <View style={styles.containerButton}>
          <Button title="send" color="grey" onPress={this._sendPost} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

const mapDispatchToProps = {sendPost};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  containerTitle: {
    // borderWidth: 1,
  },
  textTitle: {
    fontSize: 20,
  },
  containerTextInput: {
    width: '60%',
    marginTop: 30,
  },
  containerButton: {
    marginTop: 20,
  },
  containerPost: {
    width: '60%',
    paddingVertical: 10,
    paddingLeft: 10,
  },
  textPost: {
    fontSize: 16,
  },
});
