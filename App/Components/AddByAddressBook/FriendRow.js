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

const renderFriendRow = ({name, username}, sectionId, rowId, highlightRow, onSelectFriend) => {
    return (
        <View style={styles.userRowInfo}>
            <Image style={styles.friendImage} source={require('../../../images/friend_icon.png')} />
            <View style={styles.userNameField}>
                <Text style={styles.username}>
                    {name}
                </Text>
                <Text style={styles.method}>
                    {username}
                </Text>
            </View>
            <TouchableWithoutFeedback
                onPress={function () {
                    onSelectFriend(rowId)
                }}
                key={rowId}
                style={styles.addButtonLocation}
            >
                <View style={styles.addButton}>
                    <Text style={styles.addText}>+ Add</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

renderFriendRow.propTypes = {
    name: PropTypes.string.required,
    highLighted: PropTypes.bool.isRequired
}


export default renderFriendRow
export {seperatorFriends}