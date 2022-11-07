import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import Auth from './Auth';
import { useEffect, useState } from 'react';
import { Button, Input, Text } from '@rneui/themed';

export default function App() {
  const [session, setSession] = useState(null);

  const sair = async () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((evt, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <>
          <Text>Logado como:</Text>
          <Input value={session.user.email} disabled={true} />
          <Button title="Sair" onPress={() => sair()}
          />
        </>
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
