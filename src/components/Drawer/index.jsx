import { AppBar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon, ShoppingCart, People, MonetizationOn, ShowChart, Settings, ExitToApp } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';



function DrawerBar ({ title, children }) {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('authorization')
    history.push('/login')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>

        
      </AppBar>

      <Drawer
        onMouseOver={()=> setOpen(true)}
        onMouseLeave={()=> setOpen(false)}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
            <ListItem button onClick={()=>{history.push('/a')}}>
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText>Produtos</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>{history.push('/')}}>
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText>Clientes</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>{history.push('/')}}>
              <ListItemIcon><MonetizationOn /></ListItemIcon>
              <ListItemText>Vendas</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>{history.push('/')}}>
              <ListItemIcon><ShowChart /></ListItemIcon>
              <ListItemText>Vendas</ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><Settings /></ListItemIcon>
            <ListItemText>Administrativo</ListItemText>
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { children }
      </main>
    </div>
  )
}

export default DrawerBar;