import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
// import { Context as ImageContext } from '../context/ImageContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
            <View>
                <Text> Index Screen</Text>
                <FlatList
                    data={state}
                    keyExtractor = {(note) => note.noteId}
                    renderItem={({ item }) => {
                    return (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.noteId })}>
                    <View style={styles.row}>
                    <Text style={styles.title}>
                    {item.content} -
                    {"Created: " + new Date(item.createdAt).toLocaleString()}
                    </Text>
                    <TouchableOpacity onPress={() => deleteBlogPost(item.noteId)}>
                    <Feather style={styles.icon} name="trash" />
                    </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                    );
                    }}

                    />

            </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
};



const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 15
    }
});

export default IndexScreen;
