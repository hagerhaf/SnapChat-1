import React, {PropTypes} from 'react'
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native'
import {myFriendsStyles as styles} from '../MyFriends/myFriendsStyles'

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
                <View style={styles.ImagePosition}>
                    <Image
                        source={require('../../../images/friend_icon.png')}
                        style={styles.imageIcon} />
                </View>
                <Text style={highLighted ? styles.highlighted : styles.nonHighlighted}>{name}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

renderFriendRow.propTypes = {
    name: PropTypes.string.required,
    highLighted: PropTypes.bool.isRequired
}


export default renderFriendRow
export {seperatorFriends}