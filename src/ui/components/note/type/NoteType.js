import PropTypes from "prop-types";

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    text: PropTypes.string
})