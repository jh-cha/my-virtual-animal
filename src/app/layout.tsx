'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import { store } from '../store/index';
import { Provider } from 'react-redux';
import NavBar from '@/components/NavBar/NavBar';

const inter = Inter({ subsets: ['latin'] });

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        https://velog.io/@jhcha
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider theme={defaultTheme}>
          <Provider store={store}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            <NavBar />

            {children}

            {/* Footer */}
            <Container
              maxWidth="md"
              component="footer"
              sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
              }}
            >
              <Grid container spacing={4} justifyContent="space-evenly">
                {footers.map((footer) => (
                  <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item) => (
                        <li key={item}>
                          <Link href="#" variant="subtitle1" color="text.secondary">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                ))}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
