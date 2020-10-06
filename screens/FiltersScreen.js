import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Colors.primaryColor}
                value={props.state}
                onValueChange={props.onChange} />
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVeganFree, setIsVeganFree] = useState(false);
    const [isVegetarianFree, setIsVegetarianFree] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVeganFree,
            vegetarian: isVegetarianFree,
        };

        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVeganFree, isVegetarianFree, dispatch]);

    useEffect(() =>{
        navigation.setParams({save: saveFilters});
    }, [saveFilters] );

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten-Free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
            <FilterSwitch label='Lactose-Free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)} />
            <FilterSwitch label='Vegan' state={isVeganFree} onChange={newValue => setIsVeganFree(newValue)} />
            <FilterSwitch label='Vegetarian' state={isVegetarianFree} onChange={newValue => setIsVegetarianFree(newValue)} />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName="ios-save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

export default FiltersScreen;