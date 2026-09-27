import { useState } from 'react';

import {
  Button,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';


const App = () => {

  const [text, setText] = useState('');


  return (
    <ScrollView>

      <View
        style={{
          padding: 20,
          marginTop: 55,
          backgroundColor: '#F8FAF9',
        }}
      >


        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >

          

          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#064E3B',
              marginTop: 10,
            }}
          >
            GharSewa
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#64716C',
              marginTop: 5,
            }}
          >
            Trusted Home Services
          </Text>

        </View>


        <View
          style={{
            backgroundColor: '#087F5B',
            padding: 20,
            borderRadius: 15,
            marginBottom: 20,
          }}
        >

          <Text
            style={{
              fontSize: 16,
              color: '#E8F5F0',
              marginBottom: 8,
            }}
          >
            Welcome back!
          </Text>

          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: 8,
            }}
          >
            What do you need help with?
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#E8F5F0',
              marginBottom: 15,
            }}
          >
            Find trusted professionals for your home.
          </Text>

          <Button
            title="Find a Service"
            color="#F59E0B"
            onPress={() => setText('Choose a service')}
          />

        </View>



        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            color: '#17201D',
            marginBottom: 12,
          }}
        >
          Popular Services
        </Text>



        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E3EAE6',
            borderRadius: 14,
            padding: 18,
            marginBottom: 12,
          }}
        >

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#087F5B',
              marginBottom: 8,
            }}
          >
            Plumbing
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#64716C',
              marginBottom: 12,
            }}
          >
            Find a plumber
          </Text>

          <Button
            title="Book Service"
            onPress={() => setText('Plumbing service selected')}
          />

        </View>


       
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E3EAE6',
            borderRadius: 14,
            padding: 18,
            marginBottom: 12,
          }}
        >

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#087F5B',
              marginBottom: 8,
            }}
          >
            Electrical
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#64716C',
              marginBottom: 12,
            }}
          >
            Find an electrician
          </Text>

          <Button
            title="Book Service"
            onPress={() => setText('Electrical service selected')}
          />

        </View>


        

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E3EAE6',
            borderRadius: 14,
            padding: 18,
            marginBottom: 12,
          }}
        >

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#087F5B',
              marginBottom: 8,
            }}
          >
            Cleaning
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#64716C',
              marginBottom: 12,
            }}
          >
            Clean your home
          </Text>

          <Button
            title="Book Service"
            onPress={() => setText('Cleaning service selected')}
          />

        </View>


        

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E3EAE6',
            borderRadius: 14,
            padding: 18,
            marginBottom: 20,
          }}
        >

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#087F5B',
              marginBottom: 8,
            }}
          >
            AC Repair
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: '#64716C',
              marginBottom: 12,
            }}
          >
            Repair your AC
          </Text>

          <Button
            title="Book Service"
            onPress={() => setText('AC Repair service selected')}
          />

        </View>


      

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E3EAE6',
            borderRadius: 14,
            padding: 18,
            marginBottom: 15,
          }}
        >

          <Text
            style={{
              fontSize: 19,
              fontWeight: 'bold',
              color: '#17201D',
              marginBottom: 8,
            }}
          >
            Your Booking
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: '#64716C',
              marginBottom: 12,
            }}
          >
            No active booking
          </Text>

          <Button
            title="View Booking"
            onPress={() => setText('No active booking')}
          />

        </View>


        {/* State Result */}

        <Text
          style={{
            fontSize: 15,
            color: '#087F5B',
            marginBottom: 15,
          }}
        >
          {text}
        </Text>


        {/* Bottom Section */}

        <View
          style={{
            backgroundColor: '#064E3B',
            padding: 15,
            borderRadius: 14,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >

          <Text
            style={{
              fontSize: 14,
              color: '#FFFFFF',
            }}
          >
            GharSewa • Trusted Home Services
          </Text>

        </View>

      </View>

    </ScrollView>
  );
};


export default App;