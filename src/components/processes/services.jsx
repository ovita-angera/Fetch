<Container>
      <Stack
        className='services-summary'
        direction='row'
        spacing={4}
        sx={{ justifyContent: 'center', alignContent: 'center'}}
        >
        <Card>
          <CardHeader

            title="Number of Services Online"
            subheader={ip}
          />
          <CardContent>
            <Typography variant='h4' sx={{ color: '#000', padding: '5px' }} gutterBottom>
              Count: {active}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader

            title="Number of Services Offline"
            subheader={ip}
          />
          <CardContent>
            <Typography variant='h4' sx={{ color: '#000', padding: '5px' }} gutterBottom>
              Count: {inactive}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Total Number of Services"
            subheader="Server ip"
          />
      
          
          <CardContent>
            <Typography variant='h4' sx={{ color: '#000', padding: '5px' }} gutterBottom>
              Count: {numberOfServices}
            </Typography>
          </CardContent>
        </Card>
      </Stack>


      <TableContainer component={Paper} sx={{ mt: '12px' }}>
          <Table aria-label="services-table" sx={{ alignContent: 'center', margin: 'auto' }}>
            <TableHead sx={{ background: '#000', color: '#fff' }}>
              <TableRow>
                <TableCell>Service Name</TableCell>
                <TableCell align="left">Number of Instances</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((src, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {src.name}
                  </TableCell>
                  <TableCell align='left'>
                    {services.filter((service) => service.name === src.name).length}
                  </TableCell>
                  <TableCell align="left">
                    {src.status === '+'? 'Online': 'Offline'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Container>