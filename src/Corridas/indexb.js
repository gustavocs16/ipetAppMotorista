import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';

class MyComponent extends React.Component {
  state = {
    expanded: true,
    data: []
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

    componentDidMount() {
      
        return fetch('https://ipettcc.azurewebsites.net/api/usuario/GetCorridas',{
           method: "GET",
           headers: {
             "Content-Type": "application/json"
           }
         })
          
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson,
              data: responseJson
              
            }, function() {
              // In this block you can do something with new state.
            });
          }
          )
          .catch((error) => {
            console.error(error);
          });
      }

  render() {
    return (
        
      <List.Section title="Accordions">
          <List.Accordion
          title="Compartilhadas"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this._handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

      </List.Section>
    );
  }
}

export default MyComponent;