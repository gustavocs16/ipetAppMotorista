import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, ActivityIndicator} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            
            isLoading: true,
            CorridaCompartilhada: [],
            CorridaParticular: [],
            expanded : false,
          
        }
    }
    UrlParticular = 'https://ipettcc.azurewebsites.net/api/usuario/CorridaParticular';
    UrlCompartilhada = 'https://ipettcc.azurewebsites.net/api/usuario/CorridaCompartilhada';

    componentDidMount() {
      
        rfetch(this.UrlParticular,{
           method: "GET",
           headers: {
             "Content-Type": "application/json"
           }
         })
          
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              corridas: responseJson,
              } 
            );
          }
          )
          .catch((error) => {console.error(error);});
      }
  
  render() {

    if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
      var titulo = this.props.title;

        return (
            <View style={styles.container}>           
            <View>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>Compartilhadas</Text>
                
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>

            
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={{}}>
                    
                    <FlatList
                    data={this.state.CorridaCompartilhada}
                    numColumns={1}
                    scrollEnabled={true}
                    keyExtractor={({item, index}) => index} 
                    renderItem={({item, index}) => 
                        <View>
                            <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnInActive : styles.btnActive]} onPress={()=>this.onClick(index)}>
                                <Text style={[styles.font, styles.itemInActive]} >{item.endereco}, {item.numero}</Text>
                                <Icon name={'check-circle'} size={24} color={ item.value ? Colors.LIGHTGRAY : Colors.GREEN} />
                            </TouchableOpacity>
                            <View style={styles.childHr}/>
                        </View>
                    }
                    
                    />
                </View>
            }

          
            
       </View> 

       


       <View>
            <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>Particulares</Text>
                
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>

            
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={{}}>
                    
                    <FlatList
                    data={this.state.CorridaParticular}
                    numColumns={1}
                    scrollEnabled={true}
                    keyExtractor={({item, index}) => index} 
                    renderItem={({item, index}) => 
                        <View>
                            <TouchableOpacity style={[styles.childRow, styles.button, item.value ? styles.btnInActive : styles.btnActive]} onPress={()=>this.onClick(index)}>
                                <Text style={[styles.font, styles.itemInActive]} >{item.endereco}, {item.numero}</Text>
                                <Icon name={'check-circle'} size={24} color={ item.value ? Colors.LIGHTGRAY : Colors.GREEN} />
                            </TouchableOpacity>
                            <View style={styles.childHr}/>
                        </View>
                    }
                    
                    />
                </View>
            }

          
            
       </View> 
               
       </View>
    )
      
    
  }

  onClick=(index)=>{
    const temp = this.state.corridas.slice()
    temp[index].value = !temp[index].value
    this.setState({data: temp})
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:100,
        backgroundColor:Colors.PRIMARY,
        
       },
    font:{
       // fontFamily: Fonts.bold,
    },
    button:{
        width:'100%',
        height:54,
        alignItems:'center',
        paddingLeft:35,
        paddingRight:35,
        fontSize: 12,
    },
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    itemActive:{
        fontSize: 12,
        color: Colors.GREEN,
    },
    itemInActive:{
        fontSize: 12,
        color: Colors.DARKGRAY,
    },
    btnActive:{
        borderColor: Colors.GREEN,
    },
    btnInActive:{
        borderColor: Colors.DARKGRAY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.CGRAY,
    },
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: Colors.GRAY,
    },
    parentHr:{
        height:1,
        color: Colors.WHITE,
        width:'100%'
    },
    childHr:{
        height:1,
        backgroundColor: Colors.LIGHTGRAY,
        width:'100%',
    },
    colorActive:{
        borderColor: Colors.GREEN,
    },
    colorInActive:{
        borderColor: Colors.DARKGRAY,
    }
    
});

