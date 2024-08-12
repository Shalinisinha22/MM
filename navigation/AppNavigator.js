import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, ScrollView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import Wallet from '../Screens/Wallet';
import WithdrawalScreen from '../Screens/WithdrawalScreen';
import Profile from '../Screens/Profile';
import SearchBar from '../Screens/SearchScreen';
import CartScreen from '../Screens/CartScreen';
import ComingSoon from '../Screens/ComingSoon';
import ProductsScreen from '../Screens/ProductsScreen';
import ProductInnerScreen from '../Screens/ProductInnerScreen';
import LoginScreen from '../Screens/LoginScreen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import KycScreen from '../Screens/KycScreen';
import UpdatePasswordScreen from '../Screens/UpdatePasswordScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo : null);
  
    const drawerMenu = [

        { id: 0,
            name: "My Info",
            submenu: [
              { id: 0, name: "Update Profile", url: "profile" },
              { id: 1, name: "Update KYC", url: "kyc" },
              { id: 2, name: "Update Password", url: "updatePassword" }
      
            ],
            icon:<AntDesign name="arrowright" size={18} color="#9e0059" /> ,
            dropdownIcon: <AntDesign name="down" size={15} color="white" />,
            url: ""
        },

       { id: 1,
                name: "My Network",
                submenu: [
                  { id: 0, name: "Genealogy Tree", url: "coming" },
                  { id: 1, name: "Direct member", url: "coming" },
                  { id: 2, name: "Downline list", url: "coming" },
                  { id: 2, name: "Active Member", url: "coming" },
          
                ],
                icon:<AntDesign name="arrowright" size={18} color="#9e0059" /> ,
                dropdownIcon: <AntDesign name="down" size={15} color="white" />,
                url: "",},


       { id: 2,
                    name: "Activation",
                    submenu: [
                      { id: 0, name: "Item 1", url: "coming" },
                      { id: 1, name: "Item 2", url: "coming" },
                
              
                    ],
                    icon:<AntDesign name="arrowright" size={18} color="#9e0059" /> ,
                    dropdownIcon: <AntDesign name="down" size={15} color="white" />,
         url: "",},

      { id: 3,
                        name: "Fund Manager",
                        submenu: [
                          { id: 0, name: "Fund Request", url: "coming" },
                          { id: 0, name: "Fund Request Status", url: "coming" },
                    
                  
                        ],
                        icon:<AntDesign name="arrowright" size={18} color="#9e0059" /> ,
                        dropdownIcon: <AntDesign name="down" size={15} color="white" />,
        url: "",},

        
      { id: 4,
        name: "Income Report",
        submenu: [
       { id: 1, name: "Self ROI", url: "coming" },
        { id: 2, name: "Sponsor Income Loan", url: "coming" },
        { id: 3, name: "Loan Income", url: "coming" },
        { id: 4, name: "Owner Sponsor Income", url: "coming" },
        { id: 5, name: "Binary Matching Income", url: "coming" },
    
        ],
        icon:<AntDesign name="arrowright" size={18} color="#9e0059" /> ,
        dropdownIcon: <AntDesign name="down" size={15} color="white" />,
url: "",},

 { id: 5, name: "Logout", url: "" }




        // { id: 1, name: "Self ROI", url: "coming" },
        // { id: 2, name: "Sponsor Income Loan", url: "coming" },
        // { id: 3, name: "Loan Income", url: "coming" },
        // { id: 4, name: "Owner Sponsor Income", url: "coming" },
        // { id: 5, name: "Binary Matching Income", url: "coming" },
        // { id: 6, name: "Logout", url: "" }
    ];


    const dispatch = useDispatch();
  const handleLogout = () => {

    dispatch({ type: 'CLEAR_USER_INFO' });
  };

    function StackNavigator() {
        return (
            <Stack.Navigator>
                {userInfo ? (
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                )}
                <Stack.Screen name="Search" component={SearchBar} options={{ headerShown: false }} />
                <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="coming" component={ComingSoon} options={{ headerShown: false }} />
                <Stack.Screen name="products" component={ProductsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="productInner" component={ProductInnerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="kyc" component={KycScreen} options={{ headerShown: false }} />
                <Stack.Screen name="updatePassword" component={UpdatePasswordScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }

    const DrawerContent = ({ navigation }) => {
        const [submenuVisible, setSubmenuVisible] = useState({});

    const toggleSubmenu = (id) => {
        setSubmenuVisible((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
        return (
            <ScrollView style={{ flex: 1, paddingTop: 10 }} aria-hidden={false}>
            <Entypo name="cross" size={35} color="white" onPress={() => navigation.closeDrawer()} style={{ marginLeft: 15 }} />
            <View style={{ alignItems: "center", marginTop: 30 }}>
                <FlatList
                    keyExtractor={(item) => item.id.toString() + item.name}
                    data={drawerMenu}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View key={item.id} style={{ justifyContent: "center", gap: 2, padding: 5 }}>
                            {item.submenu ? (
                                <>
                                    <TouchableOpacity onPress={() => toggleSubmenu(item.id)} style={{ flexDirection: "row", alignItems: "center", padding: 15, gap: 12 }}>
                                        {item.icon}
                                        <Text allowFontScaling={false} style={{ fontSize: 15, color: "white", fontWeight: 700 }}>{item.name}</Text>
                                        <View style={{ marginLeft: 10 }}>{item.dropdownIcon}</View>
                                    </TouchableOpacity>
                                    {submenuVisible[item.id] && (
                                        <View style={styles.submenu}>
                                            {item.submenu.map((subitem) => (
                                                <TouchableOpacity key={subitem.id} onPress={() => navigation.navigate(subitem.url)} style={{ flexDirection: "row", alignItems: "center", padding: 10, gap: 10 }}>
                                                    <AntDesign name="arrowright" size={12} color="white" />
                                                    <Text allowFontScaling={false} style={{ fontSize: 13, color: "white" }}>{subitem.name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </>
                            ) : (
                                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center",padding: 15, gap: 15 }} onPress={() => item.name === "Logout" ? handleLogout() : navigation.navigate(item.url)}>
                                    {item.icon}
                                    <Text allowFontScaling={false} style={{ fontSize: 15, color: "white", fontWeight: 700 }}>
                                        <AntDesign name="arrowright" size={18} color="#9e0059" />   {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <Text allowFontScaling={false} style={{ height: 1, borderColor: "#fff", borderWidth: 0.2, marginTop: 0 }} />
                        </View>
                    )}
                />
            </View>
        </ScrollView>
        );
    };

    const BottomNavigator = () => (
        <Tab.Navigator screenOptions={{ tabBarStyle: { elevation: 15, height: 65, borderTopWidth: 1, backgroundColor: "#9e0059", opacity: 1, paddingBottom: 5 } }}>
            <Tab.Screen
                name="Home"
                component={StackNavigator}
                options={{
                    tabBarLabel: "Home",
                    tabBarLabelStyle: { color: "#fff", fontSize: 12, fontWeight: 800, letterSpacing: 2 },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? <Entypo name="home" size={30} color="#fff" /> : <AntDesign name="home" size={30} color="#D0D0D0" />,
                }}
            />
            <Tab.Screen
                name="wallet"
                component={Wallet}
                options={{
                    tabBarLabel: "Wallet",
                    tabBarLabelStyle: { color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: 2 },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? <Entypo name="wallet" size={30} color="#fff" /> : <Entypo name="wallet" size={30} color="#D0D0D0" />,
                }}
            />
            <Tab.Screen
                name="withdrawal"
                component={WithdrawalScreen}
                options={{
                    tabBarLabel: "Withdrawal",
                    tabBarLabelStyle: { color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: 2 },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? <MaterialCommunityIcons name="piggy-bank" size={30} color="#fff" /> : <MaterialCommunityIcons name="piggy-bank-outline" size={30} color="#D0D0D0" />,
                }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarLabelStyle: { color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: 2 },
                    headerShown: false,
                    tabBarIcon: ({ focused }) => focused ? <FontAwesome name="user-circle-o" size={30} color="#fff" /> : <FontAwesome name="user-circle-o" size={30} color="#D0D0D0" />,
                }}
            />
        </Tab.Navigator>
    );

    return (
        <NavigationContainer>
            {userInfo ? (
                <Drawer.Navigator screenOptions={{ drawerStyle: { backgroundColor: "#8ac926", width: 240, opacity: 0.95 } }} drawerContent={(props) => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
                </Drawer.Navigator>
            ) : (
                <StackNavigator />
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    drawerItem: {
        padding: 10,
    },
    submenu: {
        borderColor: "#ffe4c4",
        borderTopWidth: 0.2,
    },
    submenuItem: {
        padding: 10,
    },
});
