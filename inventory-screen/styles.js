import {
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';

import Constants from 'expo-constants';

const HEADER_BACKGROUND = '#3498db';
const CONTENT_BACKGROUND = '#f9f9f9';

const dimensions = Dimensions.get('window');
const screenHeight = dimensions.height;
const imageHeight = Math.round(dimensions.width * (9 / 16));
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: HEADER_BACKGROUND,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:
      Platform.OS === 'ios' ? CONTENT_BACKGROUND : HEADER_BACKGROUND,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HEADER_BACKGROUND,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    // padding: 20,
    backgroundColor: CONTENT_BACKGROUND,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    color: '#7d7e79',
    fontSize: 16,
    lineHeight: 30,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#e3e3e3',
    backgroundColor: '#fff',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: '#ff7675',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  cuveeList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  bottleView: {
    width: '50%',
  },
  imageLogo: {
    // width: imageWidth,
    // height: imageHeight ,
    // aspectRatio: 2/3,
    width: '100%',
    height: 200,
    // flex: 1,
    resizeMode: 'contain',
  },
  bottleName: {
    textAlign: 'center',
    flexShrink: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  cuveeContainer: {
    width: imageWidth,
    height: screenHeight,
  },
  cuveeView: {
    width: imageWidth,
  },
  singleCuveeMainImage: {
    width: imageWidth,
    height: 400,
    // flex: 1,
    resizeMode: 'contain',
  },
  cuveeDetail: {
    textAlign: 'left',
    marginLeft: 20,
  },
});

export default styles;
