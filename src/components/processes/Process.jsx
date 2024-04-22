

export const Process = () => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
    }}
    >
        <h1>
            Google Chrome
        </h1>

        <div style={{
            display: 'flex',
            gap: '0.2rem',
            alignItems: 'strech',
            justifyContent: 'left',
            fontWeight: 'bold'
        }}>
            <h3>Memory Util: </h3>
            <span>4.5%</span>
        </div>
        <div style={{
            display: 'flex',
            gap: '0.2rem',
            alignItems: 'strech',
            justifyContent: 'left',
            fontWeight: 'bold'
        }}>
            <h3>CPU Util: </h3>
            <span>4.5%</span>
        </div>
        <div style={{
            display: 'flex',
            gap: '0.2rem',
            alignItems: 'strech',
            justifyContent: 'left',
            fontWeight: 'bold'
        }}>
            <h3>Storage Util: </h3>
            <span>4.5%</span>
        </div>
        
        <hr />

        <small>About the process - arises from chrome service with pid: 11234</small>
        <p>&copy; 2024</p>
    </div>
  )
}
