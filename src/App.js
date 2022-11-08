import './App.css';
import { CssBaseline } from '@mui/material';
import FullLayout from './Components/FullLayout';

import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    text: {
      primary:  "#fff",
      secondary:  '#f2f2f2',
    },
  },
});

function App() {
  return (
    <>
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <FullLayout />
      </ThemeProvider>
    </>
  );
}

export default App;
