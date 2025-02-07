import { View, Text,Dimensions,TouchableOpacity, ScrollView,Image,StyleSheet,Pressable,RefreshControl } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { FontAwesome5,Entypo } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler'
import { useForm, Controller } from "react-hook-form";
const width = Dimensions.get('screen').width
const Wallet = ({navigation}) => {


  const user= useSelector((state)=>state.user.userInfo?state.user.userInfo:null)
 

  console.log("userwallet",user.mani_wallet)


  const [wallet, setWallet] = useState(user?.mani_wallet);

  const getWallet = async () => {
    if (user?.mani_wallet) {
      setWallet(user.mani_wallet);
    }
  };

  useEffect(() => {
    getWallet();
  }, [user]);



 

  const [refreshing, setRefreshing] = useState(false); 

  const handleRefresh = async () => {
    setRefreshing(true);
    getWallet()
    setRefreshing(false);
  };
 

  return (
    <View  style={{ flex: 1, backgroundColor: "#fff" }}>
   <View style={{alignItems:"center",width:width,marginTop:20,flexDirection:"row"}}>

   <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingTop: 7,paddingLeft:30}}>
<Entypo name="menu" size={40} color="#155d27" />
   
            </TouchableOpacity>
            <Pressable onPress={()=>navigation.navigate("Home")}>
            <Image  source={require("../assets/logo.png")} style={{height:80,width:80,resizemode:"contain",marginLeft:75}}></Image>

            </Pressable>

    </View>   
    

    <Text
      allowFontScaling={false}
      style={{
        height: 1,
        borderColor: "whitesmoke",
        borderWidth: 2,
        marginBottom: 10
      }}
    />
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <Text allowFontScaling={false} style={{ color: "#9e0059", fontSize: 18, letterSpacing: 2 }}>
      YOUR WALLET
      </Text>
      <FontAwesome5 name="wallet" size={40} color="#0a7736" style={{marginTop:5}} />
    </View>
    {/* <Text
      allowFontScaling={false}
      style={{
        height: 1,
        borderColor: "whitesmoke",


        borderWidth: 2,
        marginTop: 15,
      }}
    /> */}

    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }>
      <View style={{ width: width, alignItems: "center", marginTop: 40 }}>
        <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 12, letterSpacing: 1.2 }}>Total Amount:</Text>
        <Text allowFontScaling={false} style={{ fontSize: 18, marginTop: 5 }}>Rs {user.mani_wallet?Math.round(user.mani_wallet):"0"}</Text>
        {/* <Text
          allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "whitesmoke",
            borderWidth: 2,
            marginTop: 20,
            width: Dimensions.get('screen').width
          }}
        /> */}
      </View>

   

    </ScrollView>
  </View>
);
}


const styles = StyleSheet.create({
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  columnData: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: "bold"
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 5,
    marginHorizontal: 2,
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8
  },
  statusText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 8
  },
  searchInput: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    fontSize: 14,
    marginHorizontal: 10,
  }
});
export default Wallet;