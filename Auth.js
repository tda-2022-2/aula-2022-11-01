import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { View } from 'react-native';
import { supabase } from './supabase';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [carregando, setCarregando] = useState(false);

    const cadastrar = async () => {
        setCarregando(true);
        const { error } = await supabase.auth.signUp({
            email, password
        });
        console.error(error);
        setCarregando(false);
    };

    const entrar = async () => {
        setCarregando(true);
        const { error } = await supabase.auth.signInWithPassword({
            email, password
        });
        console.log(error);
        setCarregando(false);
    };

    return (
        <View>
            <Input
                label="Email"
                onChangeText={(texto) => setEmail(texto)}
                value={email}
            />
            <Input
                label="Password"
                onChangeText={(senha) => setPassword(senha)}
                value={password}
                secureTextEntry={true}
            />
            <Button
                title="Cadastrar"
                disabled={carregando}
                onPress={() => cadastrar()}
            />
            <Button
                title="Entrar"
                disabled={carregando}
                onPress={() => entrar()}
            />
        </View>
    )
};