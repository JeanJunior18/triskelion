import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Add, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import DrawerBar from '../../../components/Drawer';
import api from '../../../services/api';
import { getHeaders } from '../../../services/auth';

function Products() {

  const productInitial = {
    description: null,
    barcod: null,
    pbuy: null,
    psell: null,
  }

  const [openRegister, setOpenRegister] = useState(false)
  const [newRegister, setNewRegister] = useState(productInitial)
  const [rows, setRows] = useState([])
  const [selected, setSelected] = useState([])

  const columns = [
    { field: 'product_id', headerName: 'ID' },
    { field: 'description', headerName: 'DESCRIÇÃO', width: 500 },
    { field: 'barcod', headerName: 'CÓDIGO' },
    { field: 'pbuy', headerName: 'CUSTO' },
    { field: 'psell', headerName: 'PREÇO'},
  ]

  useEffect(() => {
    loadProducts()
  },[])

  function loadProducts () {
    api.get('/products', {
      headers: getHeaders()
    })
      .then(res => {
        const list = res.data.products.map(e => ({...e, id: e.product_id}))
        setRows(list)
      })
      .catch(() => {
        localStorage.removeItem('authorization')
      })
  }

  function deleteProduct () {
    console.log(selected)
    selected.rowIds.forEach(e => {
      api.delete(`/product/${e}`, {headers: getHeaders()})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    })
  }

  function RegisterChange (e) {
    const {name, value} = e.target
    setNewRegister({ ...newRegister, [name]:value })
  }

  function closeRegister () {
    setOpenRegister(false)
  }

  function handleRegister () {
    api.post('/products', newRegister, {
      headers: getHeaders()
    })
      .then(res => {
        setOpenRegister(productInitial)
        setOpenRegister(false)
        loadProducts()
      })
      .catch(err => {
        console.log(err)
        loadProducts()
        alert('Não foi possível cadastrar produto')
      })

      
  }

  

  return (
    <DrawerBar title="Produtos">
      <Button 
        size="small" 
        variant="contained"  
        color="primary"
        onClick={()=>{setOpenRegister(true)}}
        startIcon={<Add/>}
      >
        Cadastrar
      </Button>
      <Button 
        style={{margin: 20}}
        size="small" 
        variant="outlined"  
        color="secondary"
        disabled={!selected.rowIds || selected.rowIds?.length === 0}
        onClick={deleteProduct}
        startIcon={<Delete />}
      >
        Excluir Selecionados
      </Button>

      <div style={{ height: '75vh', width: '100%' }}>
        <DataGrid 
          onSelectionChange={e => setSelected(e)}  
          rows={rows} 
          columns={columns} 
          checkboxSelection 
        />      
      </div>

      <Dialog fullWidth open={openRegister} close={closeRegister}>
        <DialogTitle>Cadastro de Produto</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Descrição" 
                name="description" 
                variant="outlined"
                onChange={RegisterChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField 
                fullWidth 
                name="pbuy"
                label="Custo" 
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>
                }}
                onChange={RegisterChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                fullWidth
                name="psell"
                label="Preço de Venda" 
                variant="outlined"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>
                }}
                onChange={RegisterChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField 
                fullWidth 
                name="barcod"
                label="Código de Barras" 
                type="number"
                variant="outlined" 
                onChange={RegisterChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeRegister}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>Cadastrar</Button>
        </DialogActions>
      </Dialog>

      
    </DrawerBar>
  );
}

export default Products;