import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {connect} from 'react-redux';
import {logoutUser, storeAvatar} from '../../store/actions/authAction';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadAvatar} from '../misc/FireBaseApi';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImagePicked: false,
      fileURI: null,
      fileTYPE: null,
      fileData: null,
      messages: {},
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    //On Drawer closed clear messages and picked image
    if (
      prevProps.navigation.state.isDrawerOpen !==
      this.props.navigation.state.isDrawerOpen
    ) {
      if (!this.props.navigation.state.isDrawerOpen) {
        this.setState({messages: {}, fileURI: null});
      }
    }
  }

  _logOutUser = () => {
    AsyncStorage.removeItem('user')
      .then(() => {
        this.props.logoutUser();
        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  _openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);
        this.setState(prevState => {
          return {
            ...prevState,
            fileURI: image.path,
            fileTYPE: image.mime,
            fileData: image.data,
            isImagePicked: true,
            messages: {},
          };
        });
      })
      .catch(err => {
        console.log('err ', err);
      });
  };

  //Store Avatar Image In FireBase Storage via /functions
  _storeAvatar = () => {
    this.setState({loading: true});

    //id for user to change avatar
    const uid = this.props.auth.user._id;
    const image = {};
    image.uri = this.state.fileURI;

    if (!this.state.fileURI) {
      this.setState(prevState => {
        return {
          ...prevState,
          messages: {error: 'Pick Image!'},
        };
      });
      return;
    }
    //path from redux for ref to delete()
    const path = this.props.auth.user.path;
    uploadAvatar(image, uid, path, cb => {
      // console.log('cb.cbObj in drawer', cb.cbObj);
      // console.log(
      //   'cb.cbObj in drawer snapshot.ref.path',
      //   cb.cbObj.snapshot.ref.path,
      // );
      const data = {
        email: this.props.auth.user.email,
        _id: this.props.auth.user._id,
        avatar: cb.cbObj.urlToFile,
        path: cb.cbObj.snapshot.ref.path,
      };
      //Change avatar in AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
        console.log('user inserted in async storage');
        this.setState(prevState => {
          return {
            ...prevState,
            messages: {
              Success: 'Avatar updated!',
            },
            loading: false,
          };
        });
        this.props.storeAvatar(data);
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.containerUser}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
            User :{' '}
            {this.props.auth.user !== null ? this.props.auth.user.email : ''}{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerLog}
          onPress={this._logOutUser}>
          <View style={styles.containerIcon}>
            <Icon
              name="md-log-out"
              size={20}
              color="#FFF"
              style={{marginLeft: 10}}
            />
          </View>
          <View style={styles.containerText}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.containerAvatar}>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={this._openPicker}>
            <Text style={{color: '#FFF'}}>Pick Avatar</Text>
          </TouchableOpacity>
          {Object.keys(this.state.messages).length !== 0 && (
            <View>
              <Text style={{color: 'red'}}>{this.state.messages.error}</Text>
              <Text style={{color: 'green'}}>
                {this.state.messages.Success}
              </Text>
            </View>
          )}

          {/* {Container for this.state picked Image} */}
          {this.state.fileURI && (
            <View style={styles.containerImage}>
              <Image
                source={{uri: this.state.fileURI}}
                style={{width: '100%', height: 200}}
              />
            </View>
          )}
          {/* {Container for this.props.auth.user.avatar Image} */}
          {this.props.auth.user &&
            this.props.auth.user.avatar &&
            !this.state.fileURI && (
              <View style={styles.containerImage}>
                <Image
                  source={{uri: this.props.auth.user.avatar}}
                  style={{width: '100%', height: 200}}
                />
              </View>
            )}
          {this.state.loading && Object.keys(this.state.messages).length === 0 && (
            <View style={{marginTop: 20}}>
              <ActivityIndicator size={40} color="#4dc3ff" />
            </View>
          )}

          <View style={styles.containerCombineButtons}>
            <TouchableOpacity style={styles.CancelButton}>
              <Text style={{color: '#FFF'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.AcceptButton}
              onPress={this._storeAvatar}>
              <Text style={{color: '#FFF'}}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {logoutUser, storeAvatar})(
  DrawerContent,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
  },
  containerUser: {
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 20,
    backgroundColor: '#007ab3',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  containerLog: {
    flexDirection: 'row',
    backgroundColor: '#007ab3',
    padding: 7,
    width: '40%',
    marginTop: 20,
    borderRadius: 5,
  },
  containerText: {
    marginLeft: 10,
  },
  containerAvatar: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  containerButton: {
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#007ab3',
    borderRadius: 5,
    paddingVertical: 10,
  },
  containerImage: {
    width: '80%',
    marginTop: 30,
  },
  containerCombineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '80%',
  },
  CancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007ab3',
  },
  AcceptButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#007ab3',
  },
});
