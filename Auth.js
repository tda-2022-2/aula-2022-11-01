import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { Alert } from "react-native-web";
import { View } from "react-native";
import { supabase } from './supabase'

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carregando, setCarregando] = useState(false);

    const login = async () => {
        setCarregando(true);
        const { error } = await supabase.auth.signInWithPassword({
            email, password
        });
        console.log(error);
        if (error) Alert.alert('Erro', error.message);
        setCarregando(false);
    };

    const cadastrar = async () => {
        setCarregando(true);
        const { error } = await supabase.auth.signUp({
            email, password
        });
        console.log(error);
        if (error) Alert.alert('Erro', error);
        setCarregando(false);
    };

    return (
        <View>
            <Input
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope'}}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <Input
                label="Password"
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Button 
                title="Cadastrar"
                disabled={carregando}
                onPress={() => cadastrar()}
            />
            <Button 
                title="Login"
                disabled={carregando}
                onPress={() => login()}
            />
        </View>
    );
}