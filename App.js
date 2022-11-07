import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Auth from './Auth';
import { Button, Input } from '@rneui/themed';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } =
          await supabase.auth.getSession();
        console.log('getSession');
        setSession(session);
      } catch(error) {
        console.log(error);
      }

    supabase.auth.onAuthStateChange((evt, session) => {
        console.log('authChange');
        setSession(session);
      });
    })();
  }, []);

  const sair = async () => {
    const { error } = await supabase.auth.signOut();
    console.error(error);
  };

  return (
    <View style={styles.container}>
      {session && session.user ?
        <>
          <Text>Logado como:</Text>
          <Input value={session.user.email}
          disabled={true} />
          <Button title="Sair"
            onPress={sair}
          />
        </> : (
          <Auth />
        )
      }
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
