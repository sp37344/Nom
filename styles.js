const React = require('react-native')
const {
	StyleSheet, 
	Platform
} = React

const styles = StyleSheet.create({
	buttons: {
		paddingTop: 40,
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	contentContainer: {
		paddingTop: 30,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
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
		paddingTop: 40,
		paddingLeft: 15,
		paddingRight: 10,
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
	navigationFilename: {
		marginTop: 5,
	},
	nomText: {
		fontSize: 64,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 100,
		textAlign: 'center',
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