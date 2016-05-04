'use strict';

var React = require('react-native');

var {
  View,
  StyleSheet,
  ListView,
} = React;

var CollectionView = React.createClass({
    groupItems: function(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
          if (group.length === itemsPerRow) {
            itemsGroups.push(group);
            group = [item];
          } else {
            group.push(item);
          }
        });

        if (group.length > 0) {
          if (this.props.cleanGrid == true) {
            while (group.length < itemsPerRow) {
              group.push(null);
            }
          }
          itemsGroups.push(group);
        }

        return itemsGroups;
    },
    renderGroup: function(group) {
      var that = this;
      var items = group.map(function(item, index) {
        return that.props.renderItem(item, index);
      });
      return (
        <View style={styles.group}>
          {items}
        </View>
      );
    },
    render: function() {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (<ListView
          {...this.props}
          renderRow={this.renderGroup}
          dataSource={ds.cloneWithRows(groups)}
        />);
    },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});

module.exports = CollectionView;
