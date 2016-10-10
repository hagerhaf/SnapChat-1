import React, {PropTypes} from 'react'
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native'
import {myFriendsStyles as styles} from './myFriendsStyles'

const seperatorFriends = (sectionID, rowID, adjacentRowHighlighted) => {
    return (<View
            key={`sep-${sectionID}-${rowID}`}
            style={styles.seperator}
        />
    )
}

seperatorFriends.propTypes = {
    sectionID: PropTypes.number.required,
    rowID: PropTypes.number.required,
    adjacentRowHighlighted: PropTypes.bool.required
}

const renderFriendRow = ({name, highLighted}, sectionId, rowId, highlightRow, onSelectFriend) => {
    return (
        <TouchableWithoutFeedback
            onPress={function () {
                onSelectFriend(rowId)
            }}
            key={rowId}
        >
            <View style={!highLighted ? styles.userRow : styles.userRowHighlighted}>
                <Text style={highLighted ? styles.highlighted : styles.nonHighlighted}>{name}</Text>
                <View style={styles.ImagePosition}>
                    <Image
                        source={requireCheckBox(highLighted)}
                        style={styles.imageIcon} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

function requireCheckBox (highLighted) {
    if (highLighted) return require('../../../images/send.png')
    else return require('../../../images/send.png')
}

renderFriendRow.propTypes = {
    name: PropTypes.string.required,
    highLighted: PropTypes.bool.isRequired
}


export default renderFriendRow
export {seperatorFriends}