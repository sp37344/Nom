const React = require('react-native')
const Colors = require('./constants/Colors')
const {
	StyleSheet, 
	Platform, 
	Dimensions
} = React

const styles = StyleSheet.create({
	borderCenter: {
		height: 55,
		borderWidth: 0.5,
		borderColor: '#FFA890',
	},
	buttons: {
		paddingTop: 40,
	},
	buttonFooter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	buttonOpaque: {
     // opacity: .75,
     	backgroundColor: '#ffaa00',
	    borderColor: 'white',
	    borderWidth: 1,
	    borderRadius: 26,
	    marginLeft: 60,
	    marginRight: 60,
	    marginBottom: 20,
	    color: 'white',
	    fontSize: 20,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 12,
	    textAlign:'center',
    },
	buttonTransparent: {
     // opacity: .75,
	    borderColor: 'white',
	    borderWidth: 1,
	    borderRadius: 26,
	    marginLeft: 60,
	    marginRight: 60,
	    marginBottom: 20,
	    color: 'white',
	    fontSize: 20,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 12,
	    textAlign:'center',
    },
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
	},
	coverContainer: {
		position: 'relative',
	},
	coverImage: {
		height: Dimensions.get('window').width * (3 / 4),
		width: Dimensions.get('window').width,
	},
	descriptionEditText: {
		marginBottom: 4,
		color: '#d3d3d3',
		fontSize: 16,
		fontWeight: '400',
		letterSpacing: 1,
	},
	descriptionText: {
		marginBottom: 4,
		color: '#ffaa00',
		fontSize: 16,
		fontWeight: '400',
		letterSpacing: 1,
	},
	detailText: {
		marginBottom: 4,
		color: 'gray',
		fontSize: 16,
		fontWeight: '500',
		letterSpacing: 0.5,
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	footer: {
		position: 'absolute',
		flex: 0.1,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#F64A25',
		flexDirection: 'row',
		height: 65,
		alignItems: 'center',
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 100,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	headerContainer: {
		alignItems: 'center',
		backgroundColor: '#FFF',
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	homeContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffaa00',
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	input: {
		fontSize: 22,
		color: 'rgba(96,100,109, 1)',
		flex: 1,
	},
	inputContainer: {
		paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		flex: 1,
		flexDirection: 'row',
	},
	inputContainerDiet: {
		paddingTop: 10,
		paddingLeft: 15,
		paddingRight: 15,
		flex: 1,
		flexDirection: 'row',
	},
	itemsContainer: {
		height: 130, 
	},
	label: {
		fontSize: 22,
		color: '#ffaa00',
		fontWeight: '500',
		paddingRight: 10,
	},
	link: {
		color: 'rgba(0, 122, 255, 1)',
	},
	loadingContainer: {
		backgroundColor: 'white',
	},
	loginContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		paddingTop: 100,
		alignItems: 'center',
	},
	loginField: { // Wraps login label and input
		borderBottomColor: 'rgba(96,100,109, 1)',
		borderBottomWidth: 1,
		marginBottom: 10,

	},
	loginInput: {
		fontSize: 24,
		color: 'rgba(96,100,109, 1)',
		width: 240,

	},
	loginLabel: {
		fontSize: 18,
		color: '#ffaa00',
	},
	loginTitle: {
		fontSize: 26,
		color: 'rgba(96,100,109, 1)',
		marginBottom: 20,
		textAlign: 'center',
	},
	mainViewStyle: {
		flex: 1,
		flexGrow: 1,
		flexDirection: 'column',
	},
	navigationFilename: {
		marginTop: 5,
	},
	newPostContainer: {
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		backgroundColor: 'white',
	},
	newPostText: {
		fontSize: 18,
		color: '#ffaa00',
	},
	nomText: {
		fontSize: 64,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 100,
		textAlign: 'center',
	},
	nomTextAndroid: {
		fontSize: 96,
		color: 'white',
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	nomTextIOS: {
		fontSize: 96,
		color: 'white',
		textAlign: 'center',
		fontFamily: 'bold',
		fontFamily: 'Avenir-Light',
	},
	postContainer: {
		paddingTop: 30,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: 'white',
	},
	postText: {
		fontSize: 24,
		color: '#ffaa00',
		paddingRight: 10,
	},
	productRow: {
		margin: 25,
	},
	restaurantEditText: {
		marginBottom: 5,
		letterSpacing: 1,
		paddingRight: 15,
		color: '#d3d3d3',
		fontSize: 36,
		fontWeight: '400',
	},
	restaurantText: {
		marginBottom: 5,
		letterSpacing: 1,
		paddingRight: 15,
		color: Colors.black,
		fontSize: 36,
		fontWeight: '400',
	},
	scroll: {
		backgroundColor: '#FFF',
	},
	statsDescriptionText: {
		textAlign: 'center',
		fontWeight: '500',
		letterSpacing: 0.5,
		marginBottom: 10,
		color: '#ffaa00',
	},
	statsContainer: {
		paddingTop: 10,
		paddingLeft: 30,
		paddingRight: 30,
	},
	subDetailText: {
		color: Colors.black,
		fontSize: 16,
		fontWeight: '100',
		lineHeight: 28,
		letterSpacing: 0.5,
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
			shadowColor: 'black',
			shadowOffset: { height: -3 },
			shadowOpacity: 0.1,
			shadowRadius: 3,
			},
			android: {
			elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	tagButtonPressed: {
		// margin: 10,
		marginRight: 10,
		textAlign: 'center',
		backgroundColor: "#ffaa00",
		borderWidth: 1,
		borderColor: '#ffaa00',
		borderRadius: 6,
	},
	tagButtonUnpressed: {
		// margin: 10,
		marginRight: 10,
		textAlign: 'center',
		backgroundColor: "#EEE",
		borderWidth: 1,
		borderColor: '#EEE',
		borderRadius: 6,
	},
	tagTextPressed: {
		fontSize: 18,
		color: 'white',
		flex: 1,
	},
	tagTextUnpressed: {
		fontSize: 18,
		color: 'gray',
		flex: 1,
	},
	textContainer: {
		paddingTop: 100,
		paddingLeft: 30,
		paddingRight: 30,
	},
	textFooter: {
		color: 'white',
		fontWeight: 'bold',
		alignItems: 'center',
		fontSize: 18,
	},
	title: {
		textAlign: 'center',
		fontSize: 48,
	},
	titleContainer: {
		paddingTop: 40,
		paddingLeft: 15,
		paddingRight: 15,
	},
	userProfileName: {
		marginBottom: 5,
		letterSpacing: 1,
		color: Colors.black,
		fontSize: 36,
		fontWeight: '400',
	},
	userProfileSubtitle: {
		marginBottom: 5,
		letterSpacing: 1,
		color: Colors.black,
		fontSize: 28,
		fontWeight: '400',
	},
	userSelectionText: {
		fontSize: 24,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 100,
		textAlign: 'center',
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 200,
		marginBottom: 100,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
})

module.exports = styles