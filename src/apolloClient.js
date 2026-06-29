import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://anime-hub-backend-ik8o.onrender.com/api/anilist',
  cache: new InMemoryCache(),
});

export default client;
