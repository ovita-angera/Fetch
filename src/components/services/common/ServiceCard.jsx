import PropTypes from 'prop-types';
import './css/styles.css'

const ServiceCard = ({ title, icon, detail, color }) => {
  return (
    <div className="main-container">
        <div className="title-container" style={{color: `${color}`}}>
            {icon}
            <h4>{title}</h4>
        </div>
        <div className="detail-container">
            Number: {detail}
        </div>
    </div>
  )
}

ServiceCard.defaultProps = {
    title: 'Enter title',
    icon: null,
    detail: 'Enter details here',
    color: '#555'
}


ServiceCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    detail: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}

export default ServiceCard