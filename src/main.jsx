import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApolloProvider} from '@apollo/client'
import client from './apolloClient'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import FilterProvider from './Context/isAdultContext'

createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
    <BrowserRouter>
    <AuthProvider >
    <FilterProvider>
        <App />
    </FilterProvider>
    </AuthProvider>
    </BrowserRouter>
    </ApolloProvider>
)
