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
	descriptionText: {
		marginBottom: 4,
		color: Colors.gray,
		fontSize: 16,
		fontWeight: '400',
		letterSpacing: 1,
	},
	detailText: {
		marginBottom: 4,
		color: Colors.black,
		fontSize: 22,
		fontWeight: '600',
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
	homeScreenFilename: {
		marginVertical: 7,
	},
	input: {
		fontSize: 24,
		color: 'rgba(96,100,109, 1)',
		flex: 1,
	},
	inputContainer: {
		paddingTop: 25,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		flex: 1,
		flexDirection: 'row',
	},
	label: {
		fontSize: 24,
		color: 'rgba(0, 122, 255, 1)',
		paddingRight: 10,
	},
	link: {
		color: 'rgba(0, 122, 255, 1)',
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
	},
	newPostText: {
		fontSize: 20,
		color: 'rgba(0, 122, 255, 1)',
	},
	nomText: {
		fontSize: 64,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 100,
		textAlign: 'center',
	},
	postContainer: {
		paddingTop: 30,
		paddingLeft: 15,
		paddingRight: 15,
	},
	productRow: {
		margin: 25,
	},
	restaurantText: {
		marginBottom: 5,
		letterSpacing: 1,

		color: Colors.black,
		fontSize: 36,
		fontWeight: '400',
	},
	scroll: {
		backgroundColor: '#FFF',
		flex: 1,
		marginBottom: 55,
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