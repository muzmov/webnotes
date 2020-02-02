import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    context: PropTypes.string,
    priority: PropTypes.number.isRequired,
    timeEstimation: PropTypes.number
})