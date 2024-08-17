import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

export default function ExampleNavBar() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (language: 'en' | 'fr') => {
        i18n.changeLanguage(language);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('example_navbar')}
                    </Typography>
                    <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
                    <Button color="inherit" onClick={() => changeLanguage('fr')}>FR</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
